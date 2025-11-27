import { GoogleGenAI, Type, Modality } from "@google/genai";
import type { UserProfile, Recipe, MealPlan, RecognizedFood, GreenFood, Language } from './types';
import { translate } from '../i18n';

// IMPORTANT: This key is read from environment variables. Do not hardcode.
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    console.warn("API_KEY environment variable not set. Using a placeholder. AI features will not work.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });

const foodRecognitionSchema = {
    type: Type.OBJECT,
    properties: {
        tenMonAn: { type: Type.STRING, description: "Tên món ăn bằng tiếng Việt." },
        moTa: { type: Type.STRING, description: "Mô tả ngắn gọn, thân thiện về món ăn cho trẻ 10 tuổi." },
        danhMuc: { type: Type.STRING, description: "Phân loại món ăn vào một trong các danh mục sau: Rau củ, Trái cây, Tinh bột, Đạm, Chất béo, Đồ ngọt, Khác" },
        dinhDuong: {
            type: Type.ARRAY,
            description: "Danh sách các chất dinh dưỡng chính.",
            items: {
                type: Type.OBJECT,
                properties: {
                    ten: { type: Type.STRING, description: "Tên chất dinh dưỡng (vd: Năng lượng, Protein)." },
                    giaTri: { type: Type.STRING, description: "Giá trị ước tính của chất dinh dưỡng." },
                    donVi: { type: Type.STRING, description: "Đơn vị tính (vd: kcal, g, mg)." },
                    icon: { type: Type.STRING, description: "Loại icon, một trong: CALORIES, PROTEIN, FAT, CARBS, VITAMINS, MINERALS" }
                },
                required: ["ten", "giaTri", "donVi", "icon"]
            }
        }
    },
    required: ["tenMonAn", "moTa", "danhMuc", "dinhDuong"]
};


export const recognizeFood = async (base64Image: string, language: Language): Promise<RecognizedFood> => {
    const imagePart = {
        inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image,
        },
    };
    const textPart = {
        text: translate(language, 'prompt_recognize', { language: translate(language, 'language_name') })
    };

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] },
        config: {
            responseMimeType: "application/json",
            responseSchema: foodRecognitionSchema
        }
    });

    const jsonString = response.text;
    return JSON.parse(jsonString);
};

const mealPlanSchema = {
    type: Type.OBJECT,
    properties: {
        buaAn: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    tenBua: { type: Type.STRING, description: "Tên bữa ăn: Bữa Sáng, Bữa Trưa, Bữa Tối, hoặc Bữa Phụ." },
                    monAn: { type: Type.STRING, description: "Tên món ăn gợi ý." },
                    lyDo: { type: Type.STRING, description: "Lý do vui vẻ, ngắn gọn tại sao nên ăn món này." }
                },
                 required: ["tenBua", "monAn", "lyDo"]
            }
        }
    },
    required: ["buaAn"]
}

export const suggestMenu = async (profile: UserProfile, preference: string, language: Language): Promise<MealPlan> => {
    const { tuoi, gioiTinh, chieuCao, canNang, mucTieu, tinhTrangSucKhoe } = profile;
    const gioiTinhText = gioiTinh === 'male' ? translate(language, 'suggest_gender_male') : translate(language, 'suggest_gender_female');
    
    const goalKeyMap: Record<UserProfile['mucTieu'], string> = {
        duy_tri: 'maintain',
        tang_can: 'gain',
        giam_can: 'lose'
    };
    const mucTieuText = translate(language, `suggest_goal_${goalKeyMap[mucTieu]}`);

    const prompt = translate(language, 'prompt_suggest_menu', {
        tuoi,
        gioiTinh: gioiTinhText,
        chieuCao,
        canNang,
        mucTieu: mucTieuText,
        tinhTrangSucKhoe: tinhTrangSucKhoe || translate(language, 'suggest_health_status_default'),
        preference
    });

     const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: mealPlanSchema
        }
    });
    
    const jsonString = response.text;
    return JSON.parse(jsonString);
};

const recipeSchema = {
    type: Type.OBJECT,
    properties: {
        tenMon: { type: Type.STRING, description: "Tên món ăn sáng tạo." },
        moTa: { type: Type.STRING, description: "Mô tả ngắn gọn, hấp dẫn về món ăn." },
        nguyenLieu: { type: Type.ARRAY, items: { type: Type.STRING } },
        buocLam: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Các bước thực hiện đơn giản, dễ hiểu cho trẻ em." }
    },
    required: ["tenMon", "moTa", "nguyenLieu", "buocLam"]
}

export const createRecipe = async (ingredients: string, language: Language): Promise<Recipe> => {
    const prompt = translate(language, 'prompt_create_recipe', { ingredients });
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: recipeSchema
        }
    });

    const jsonString = response.text;
    return JSON.parse(jsonString);
};

export const getBotResponse = async (history: { role: string; parts: { text: string }[] }[], newMessage: string, language: Language) => {
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: translate(language, 'prompt_bot_system'),
        },
        history: history
    });

    const response = await chat.sendMessage({ message: newMessage });
    return response.text;
};

export const generateFoodImage = async (foodName: string, language: Language): Promise<string> => {
    const prompt = translate(language, 'prompt_generate_food_image', { foodName });

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [{ text: prompt }],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            return `data:image/png;base64,${base64ImageBytes}`;
        }
    }

    throw new Error("Không thể tạo hình ảnh cho món ăn.");
};

export const analyzeEatingHabits = async (favoriteFoods: string[], language: Language): Promise<string> => {
    const prompt = translate(language, 'prompt_analyze_eating_habits', { favoriteFoods: favoriteFoods.join(', ') });

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return response.text;
};

const greenFoodSuggestionsSchema = {
    type: Type.OBJECT,
    properties: {
        suggestions: {
            type: Type.ARRAY,
            description: "Danh sách các gợi ý thực phẩm thân thiện với môi trường.",
            items: {
                type: Type.OBJECT,
                properties: {
                    tenThucPham: { type: Type.STRING, description: "Tên thực phẩm bằng tiếng Việt." },
                    moTa: { type: Type.STRING, description: "Mô tả ngắn gọn, vui vẻ về thực phẩm." },
                    lyDoThanThien: { type: Type.STRING, description: "Lý do đơn giản tại sao thực phẩm này tốt cho môi trường." },
                    emoji: { type: Type.STRING, description: "Một emoji duy nhất phù hợp với thực phẩm." }
                },
                required: ["tenThucPham", "moTa", "lyDoThanThien", "emoji"]
            }
        }
    },
    required: ["suggestions"]
};

export const getGreenFoodSuggestions = async (language: Language): Promise<GreenFood[]> => {
    const prompt = translate(language, 'prompt_green_food');

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: greenFoodSuggestionsSchema
        }
    });

    const jsonString = response.text;
    const result: { suggestions: GreenFood[] } = JSON.parse(jsonString);
    return result.suggestions;
};


export const getFoodCalories = async (foodName: string, language: Language): Promise<{ calories: number }> => {
    const prompt = translate(language, 'prompt_get_calories', { foodName });
    const schema = {
        type: Type.OBJECT,
        properties: {
            calories: { type: Type.NUMBER, description: "Số calo ước tính." }
        },
        required: ["calories"]
    };
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: schema
        }
    });
    const jsonString = response.text;
    return JSON.parse(jsonString);
};
