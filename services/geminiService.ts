// src/services/geminiService.ts (ví dụ)

import { Type, Modality } from "@google/genai";
import type {
  UserProfile,
  Recipe,
  MealPlan,
  RecognizedFood,
  GreenFood,
  Language,
} from "./types";
import { translate } from "../i18n";

// URL của Vercel Serverless Function
const GEMINI_PROXY_URL = "/api/gemini-proxy";

/**
 * Gọi API proxy trên Vercel (api/gemini-proxy.ts)
 * Proxy này mới là chỗ giữ GEMINI_API_KEY.
 */
async function callGeminiProxy(payload: any) {
  const res = await fetch(GEMINI_PROXY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini proxy error: ${res.status} - ${text}`);
  }

  return res.json(); // JSON trả về từ Gemini
}

/**
 * Helper: lấy text từ response của Gemini
 */
function extractText(response: any): string {
  return (
    response?.candidates?.[0]?.content?.parts?.find((p: any) => p.text)?.text ??
    ""
  );
}

/* -------------------------------------------------------
 * 1. Nhận diện món ăn từ ảnh
 * -----------------------------------------------------*/

const foodRecognitionSchema = {
  type: Type.OBJECT,
  properties: {
    tenMonAn: {
      type: Type.STRING,
      description: "Tên món ăn bằng tiếng Việt.",
    },
    moTa: {
      type: Type.STRING,
      description:
        "Mô tả ngắn gọn, thân thiện về món ăn cho trẻ 10 tuổi.",
    },
    danhMuc: {
      type: Type.STRING,
      description:
        "Phân loại món ăn vào một trong các danh mục sau: Rau củ, Trái cây, Tinh bột, Đạm, Chất béo, Đồ ngọt, Khác",
    },
    dinhDuong: {
      type: Type.ARRAY,
      description: "Danh sách các chất dinh dưỡng chính.",
      items: {
        type: Type.OBJECT,
        properties: {
          ten: {
            type: Type.STRING,
            description: "Tên chất dinh dưỡng (vd: Năng lượng, Protein).",
          },
          giaTri: {
            type: Type.STRING,
            description: "Giá trị ước tính của chất dinh dưỡng.",
          },
          donVi: {
            type: Type.STRING,
            description: "Đơn vị tính (vd: kcal, g, mg).",
          },
          icon: {
            type: Type.STRING,
            description:
              "Loại icon, một trong: CALORIES, PROTEIN, FAT, CARBS, VITAMINS, MINERALS",
          },
        },
        required: ["ten", "giaTri", "donVi", "icon"],
      },
    },
  },
  required: ["tenMonAn", "moTa", "danhMuc", "dinhDuong"],
};

export const recognizeFood = async (
  base64Image: string,
  language: Language
): Promise<RecognizedFood> => {
  const imagePart = {
    inlineData: {
      mimeType: "image/jpeg",
      data: base64Image,
    },
  };
  const textPart = {
    text: translate(language, "prompt_recognize", {
      language: translate(language, "language_name"),
    }),
  };

  const payload = {
    model: "gemini-2.5-flash",
    contents: [
      {
        parts: [imagePart, textPart],
      },
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: foodRecognitionSchema,
    },
  };

  const response = await callGeminiProxy(payload);
  const jsonString = extractText(response);
  return JSON.parse(jsonString);
};

/* -------------------------------------------------------
 * 2. Gợi ý thực đơn
 * -----------------------------------------------------*/

const mealPlanSchema = {
  type: Type.OBJECT,
  properties: {
    buaAn: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          tenBua: {
            type: Type.STRING,
            description:
              "Tên bữa ăn: Bữa Sáng, Bữa Trưa, Bữa Tối, hoặc Bữa Phụ.",
          },
          monAn: {
            type: Type.STRING,
            description: "Tên món ăn gợi ý.",
          },
          lyDo: {
            type: Type.STRING,
            description: "Lý do vui vẻ, ngắn gọn tại sao nên ăn món này.",
          },
        },
        required: ["tenBua", "monAn", "lyDo"],
      },
    },
  },
  required: ["buaAn"],
};

export const suggestMenu = async (
  profile: UserProfile,
  preference: string,
  language: Language
): Promise<MealPlan> => {
  const { tuoi, gioiTinh, chieuCao, canNang, mucTieu, tinhTrangSucKhoe } =
    profile;

  const gioiTinhText =
    gioiTinh === "male"
      ? translate(language, "suggest_gender_male")
      : translate(language, "suggest_gender_female");

  const goalKeyMap: Record<UserProfile["mucTieu"], string> = {
    duy_tri: "maintain",
    tang_can: "gain",
    giam_can: "lose",
  };
  const mucTieuText = translate(language, `suggest_goal_${goalKeyMap[mucTieu]}`);

  const prompt = translate(language, "prompt_suggest_menu", {
    tuoi,
    gioiTinh: gioiTinhText,
    chieuCao,
    canNang,
    mucTieu: mucTieuText,
    tinhTrangSucKhoe:
      tinhTrangSucKhoe || translate(language, "suggest_health_status_default"),
    preference,
  });

  const payload = {
    model: "gemini-2.5-flash",
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: mealPlanSchema,
    },
  };

  const response = await callGeminiProxy(payload);
  const jsonString = extractText(response);
  return JSON.parse(jsonString);
};

/* -------------------------------------------------------
 * 3. Tạo công thức món ăn
 * -----------------------------------------------------*/

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    tenMon: { type: Type.STRING, description: "Tên món ăn sáng tạo." },
    moTa: {
      type: Type.STRING,
      description: "Mô tả ngắn gọn, hấp dẫn về món ăn.",
    },
    nguyenLieu: { type: Type.ARRAY, items: { type: Type.STRING } },
    buocLam: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Các bước thực hiện đơn giản, dễ hiểu cho trẻ em.",
    },
  },
  required: ["tenMon", "moTa", "nguyenLieu", "buocLam"],
};

export const createRecipe = async (
  ingredients: string,
  language: Language
): Promise<Recipe> => {
  const prompt = translate(language, "prompt_create_recipe", { ingredients });

  const payload = {
    model: "gemini-2.5-flash",
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: recipeSchema,
    },
  };

  const response = await callGeminiProxy(payload);
  const jsonString = extractText(response);
  return JSON.parse(jsonString);
};

/* -------------------------------------------------------
 * 4. Chat bot
 * -----------------------------------------------------*/

export const getBotResponse = async (
  history: { role: string; parts: { text: string }[] }[],
  newMessage: string,
  language: Language
): Promise<string> => {
  const systemText = translate(language, "prompt_bot_system");

  const contents = [
    {
      role: "system",
      parts: [{ text: systemText }],
    },
    ...history,
    {
      role: "user",
      parts: [{ text: newMessage }],
    },
  ];

  const payload = {
    model: "gemini-2.5-flash",
    contents,
  };

  const response = await callGeminiProxy(payload);
  return extractText(response);
};

/* -------------------------------------------------------
 * 5. Sinh ảnh món ăn
 * -----------------------------------------------------*/

export const generateFoodImage = async (
  foodName: string,
  language: Language
): Promise<string> => {
  const prompt = translate(language, "prompt_generate_food_image", {
    foodName,
  });

  const payload = {
    model: "gemini-2.5-flash-image",
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  const response = await callGeminiProxy(payload);

  const parts = response?.candidates?.[0]?.content?.parts ?? [];
  for (const part of parts) {
    if (part.inlineData?.data) {
      const base64ImageBytes: string = part.inlineData.data;
      return `data:image/png;base64,${base64ImageBytes}`;
    }
  }

  throw new Error("Không thể tạo hình ảnh cho món ăn.");
};

/* -------------------------------------------------------
 * 6. Phân tích thói quen ăn uống (trả text)
 * -----------------------------------------------------*/

export const analyzeEatingHabits = async (
  favoriteFoods: string[],
  language: Language
): Promise<string> => {
  const prompt = translate(language, "prompt_analyze_eating_habits", {
    favoriteFoods: favoriteFoods.join(", "),
  });

  const payload = {
    model: "gemini-2.5-flash",
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  const response = await callGeminiProxy(payload);
  return extractText(response);
};

/* -------------------------------------------------------
 * 7. Gợi ý thực phẩm xanh
 * -----------------------------------------------------*/

const greenFoodSuggestionsSchema = {
  type: Type.OBJECT,
  properties: {
    suggestions: {
      type: Type.ARRAY,
      description:
        "Danh sách các gợi ý thực phẩm thân thiện với môi trường.",
      items: {
        type: Type.OBJECT,
        properties: {
          tenThucPham: {
            type: Type.STRING,
            description: "Tên thực phẩm bằng tiếng Việt.",
          },
          moTa: {
            type: Type.STRING,
            description: "Mô tả ngắn gọn, vui vẻ về thực phẩm.",
          },
          lyDoThanThien: {
            type: Type.STRING,
            description:
              "Lý do đơn giản tại sao thực phẩm này tốt cho môi trường.",
          },
          emoji: {
            type: Type.STRING,
            description: "Một emoji duy nhất phù hợp với thực phẩm.",
          },
        },
        required: ["tenThucPham", "moTa", "lyDoThanThien", "emoji"],
      },
    },
  },
  required: ["suggestions"],
};

export const getGreenFoodSuggestions = async (
  language: Language
): Promise<GreenFood[]> => {
  const prompt = translate(language, "prompt_green_food");

  const payload = {
    model: "gemini-2.5-flash",
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: greenFoodSuggestionsSchema,
    },
  };

  const response = await callGeminiProxy(payload);
  const jsonString = extractText(response);
  const result: { suggestions: GreenFood[] } = JSON.parse(jsonString);
  return result.suggestions;
};

/* -------------------------------------------------------
 * 8. Lấy calo của món ăn
 * -----------------------------------------------------*/

export const getFoodCalories = async (
  foodName: string,
  language: Language
): Promise<{ calories: number }> => {
  const prompt = translate(language, "prompt_get_calories", { foodName });

  const schema = {
    type: Type.OBJECT,
    properties: {
      calories: {
        type: Type.NUMBER,
        description: "Số calo ước tính.",
      },
    },
    required: ["calories"],
  };

  const payload = {
    model: "gemini-2.5-flash",
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  };

  const response = await callGeminiProxy(payload);
  const jsonString = extractText(response);
  return JSON.parse(jsonString);
};
