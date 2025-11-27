
import type { Language } from './types';

export const resources = {
  vi: {
    translation: {
      // General
      loading: 'Đang tải',
      error_generic: 'Đã có lỗi xảy ra. Vui lòng thử lại.',
      save_button: 'Lưu',
      locale_code: 'vi-VN',
      language_name: 'tiếng Việt',
      
      // Nutrients
      nutrient_năng_lượng: 'Năng lượng',
      nutrient_đạm: 'Đạm',
      nutrient_chất_béo: 'Chất béo',
      nutrient_tinh_bột: 'Tinh bột',
      'nutrient_vitamin_&_khoáng_chất': 'Vitamin & Khoáng chất',

      // Nav
      nav_home: 'Trang chủ',
      nav_recognize: 'Nhận diện',
      nav_suggest: 'Thực đơn',
      nav_recipe: 'Công thức',
      nav_bot: 'Hỏi đáp',
      nav_journey: 'Sức khỏe',

      // Page Titles
      page_title_home: 'Chào mừng đến với NutriBuddy!',
      page_title_recognize: 'Nhận diện món ăn',
      page_title_suggest: 'Gợi ý thực đơn thông minh',
      page_title_recipe: 'Đầu bếp tí hon',
      page_title_bot: 'Robot Dinh Dưỡng',
      page_title_journey: 'Hành trình sức khỏe',
      page_title_green: 'Dinh dưỡng xanh',
      page_title_settings: 'Cài đặt',

      // Home Page
      home_subtitle: 'Người bạn đồng hành giúp bé ăn uống lành mạnh và vui vẻ mỗi ngày.',
      home_card_recognize: 'Nhận diện món ăn',
      home_card_suggest: 'Gợi ý thực đơn',
      home_card_recipe: 'Công thức sáng tạo',
      home_card_bot: 'Robot dinh dưỡng',
      home_card_journey: 'Hành trình sức khỏe',
      home_card_green: 'Dinh dưỡng xanh',

      // Recognize Page
      recognize_placeholder: 'Tải ảnh lên hoặc dùng camera để bắt đầu',
      recognize_button_upload: 'Tải ảnh lên',
      recognize_button_camera: 'Dùng camera',
      recognize_button_analyze: 'Phân tích món ăn',
      recognize_button_analyzing: 'Đang phân tích...',
      recognize_button_capture: 'Chụp!',
      recognize_button_cancel: 'Hủy',
      recognize_error_generic: 'Ôi, mình không nhận ra món này! Bạn thử lại với ảnh khác nhé.',
      recognize_error_camera_open: 'Không thể mở camera. Bạn hãy cấp quyền truy cập và thử lại nhé!',
      recognize_error_camera_capture: 'Camera chưa sẵn sàng, bạn đợi một chút rồi thử lại nhé!',
      
      // Suggest Page
      suggest_label_age: 'Tuổi',
      suggest_label_gender: 'Giới tính',
      suggest_gender_male: 'Nam',
      suggest_gender_female: 'Nữ',
      suggest_label_height: 'Chiều cao (cm)',
      suggest_label_weight: 'Cân nặng (kg)',
      suggest_label_health_status: 'Tình trạng sức khỏe',
      suggest_health_status_placeholder: 'Ví dụ: Rất khỏe mạnh, Hơi gầy...',
      suggest_health_status_default: 'Bình thường',
      suggest_label_goal: 'Mục tiêu của bạn',
      suggest_goal_maintain: 'Duy trì cân nặng',
      suggest_goal_gain: 'Tăng cân',
      suggest_goal_lose: 'Giảm cân',
      suggest_label_food_style: 'Kiểu món ăn',
      suggest_food_style_vietnamese: 'Món Việt',
      suggest_food_style_fast: 'Món nhanh',
      suggest_food_style_vegetarian: 'Ăn chay',
      suggest_food_style_healthy_breakfast: 'Ăn sáng lành mạnh',
      suggest_food_style_other: 'Khác...',
      suggest_label_other_preference: 'Sở thích khác của bạn',
      suggest_other_preference_placeholder: 'Ví dụ: ít cay, nhiều rau...',
      suggest_error_preference_empty: 'Bạn hãy nhập sở thích của mình nhé!',
      suggest_error_generic: 'Mình chưa nghĩ ra thực đơn nào cả. Bạn thử lại nhé!',
      suggest_button_loading: 'Đang nấu ý tưởng...',
      suggest_button_submit: 'Gợi ý thực đơn cho tớ!',
      suggest_result_title: 'Thực đơn hôm nay của bạn!',
      suggest_image_loading: 'Đang vẽ tranh...',
      suggest_image_error: 'Ôi, mình không vẽ được hình cho món này!',
      suggest_recipe_loading: 'Đang tìm công thức...',
      suggest_recipe_error: 'Ôi, mình không tìm thấy công thức cho món này!',

      // Recipe Page
      recipe_label_ingredients: 'Nguyên liệu bạn đang có?',
      recipe_ingredients_placeholder: 'Ví dụ: trứng, cà chua, hành lá...',
      recipe_button_loading: 'Đang tìm công thức...',
      recipe_button_submit: 'Nấu món gì đây?',
      recipe_error_generic: 'Hmm, mình chưa nghĩ ra món nào với những nguyên liệu này. Bạn thử lại nhé!',
      recipe_section_ingredients: 'Nguyên liệu cần có',
      recipe_section_steps: 'Cách làm siêu dễ',

      // Bot Page
      bot_greeting: 'Chào bạn, mình là Robot Dinh Dưỡng Nutri! Bạn có câu hỏi gì cho mình không?',
      bot_input_placeholder: 'Hỏi mình về dinh dưỡng nhé...',
      bot_error_generic: 'Ối, mình bị lỗi rồi! Bạn thử lại sau nhé.',

      // Journey Page
      journey_section_analysis_report: 'Phân tích & Báo cáo Sức khỏe',
      journey_subsection_progress: 'Theo dõi tiến trình cá nhân',
      journey_chart_weight_label: 'Cân nặng (kg)',
      journey_chart_no_data: 'Chưa có dữ liệu. <br/> Hãy nhập cân nặng của bạn bên dưới để bắt đầu!',
      journey_weight_input_placeholder: 'Nhập cân nặng hôm nay (kg)',
      journey_subsection_nutribuddy_insight: 'Góc nhìn của NutriBuddy',
      journey_analysis_loading: 'Mình đang xem xét đây...',
      journey_analysis_prompt: 'Nhấn nút bên dưới để mình phân tích thói quen ăn uống từ các món bạn yêu thích nhé!',
      journey_analysis_button_loading: 'Đang phân tích...',
      journey_analysis_button_submit: 'Phân tích thói quen',
      journey_analysis_no_favorites: 'Bạn chưa có món ăn yêu thích nào để mình phân tích. Hãy "thả tim" cho các món ăn trong mục "Thực đơn" nhé!',
      journey_analysis_error: 'Ôi, mình gặp chút lỗi khi phân tích. Bạn thử lại sau nhé!',
      journey_section_management_tracking: 'Quản lý & Theo dõi Sức khỏe',
      journey_subsection_food_log: 'Nhật ký ăn uống',
      journey_log_food_name_placeholder: 'Tên món ăn',
      journey_log_calories_placeholder: 'Calo',
      journey_log_ai_estimate_button: 'AI Ước tính',
      journey_log_calories_error: 'Mình không ước tính được lượng calo cho món này. Bạn thử lại nhé!',
      journey_log_today_title: 'Hôm nay bạn ăn',
      journey_log_empty_today: 'Chưa có gì trong nhật ký hôm nay.',
      journey_log_total_today: 'Tổng cộng hôm nay',
      journey_subsection_reminders: 'Nhắc nhở thông minh',
      journey_reminders_subtitle: 'Bật nhắc nhở để NutriBuddy giúp bạn tạo thói quen tốt nhé! (Cần cho phép thông báo trên trình duyệt)',
      journey_reminder_water: 'Uống nước',
      journey_reminder_walk: 'Đi bộ',
      journey_reminder_breakfast: 'Ăn sáng',
      journey_reminder_lunch: 'Ăn trưa',
      journey_reminder_dinner: 'Ăn tối',
      journey_reminder_sleep: 'Đi ngủ',
      journey_reminder_notification_body: 'Bạn đã bật nhắc nhở {{reminder}}. Cố gắng lên nhé!',
      journey_section_badges: 'Bộ sưu tập huy hiệu',
      journey_section_favorites: 'Món ăn yêu thích',
      journey_favorites_empty: 'Bạn chưa có món ăn yêu thích nào. Hãy khám phá và thêm trong trang "Thực đơn" nhé!',

      // Badges
      badge_water_name: 'Siêu uống nước',
      badge_water_desc: 'Uống đủ 8 ly nước 3 ngày liền!',
      badge_veggie_name: 'Anh hùng rau củ',
      badge_veggie_desc: 'Ăn rau trong 5 bữa ăn!',
      badge_chef_name: 'Đầu bếp tí hon',
      badge_chef_desc: 'Tự tạo một công thức mới!',

      // Green Page
      green_intro: '"Dinh dưỡng xanh" là chọn những món ăn vừa tốt cho sức khỏe của bạn, vừa tốt cho cả Trái Đất nữa đó! Cùng NutriBuddy khám phá những thực phẩm thân thiện với môi trường nhé!',
      green_button_loading: 'Đang tìm...',
      green_button_submit: 'Gợi ý cho tớ vài món!',
      green_error_generic: 'Ôi, mình chưa nghĩ ra được gợi ý nào cả. Bạn thử lại sau nhé!',
      
      // Settings Page
      settings_water_goal: 'Số ly nước mục tiêu mỗi ngày',
      settings_section_meal_times: 'Thời gian bữa ăn',
      settings_time_breakfast: 'Bữa sáng',
      settings_time_lunch: 'Bữa trưa',
      settings_time_dinner: 'Bữa tối',
      settings_time_snack: 'Bữa phụ',
      settings_saved: 'Đã lưu cài đặt!',

      // Misc
      guide_text: 'Cần giúp đỡ? Hỏi mình nhé!',
      meal_type_breakfast: 'Bữa Sáng',
      meal_type_lunch: 'Bữa Trưa',
      meal_type_dinner: 'Bữa Tối',
      meal_type_snack: 'Bữa Phụ',

      // Prompts
      prompt_recognize: `Bạn là NutriBuddy, một trợ lý AI thân thiện cho trẻ em 10 tuổi. Hãy phân tích hình ảnh món ăn này.
               Nhận diện tên món ăn bằng {{language}}.
               Cung cấp mô tả ngắn gọn, vui vẻ.
               Phân loại món ăn.
               Liệt kê các thành phần dinh dưỡng chính (Năng lượng, Đạm, Chất béo, Tinh bột, Vitamin & Khoáng chất) với giá trị ước tính.
               Sử dụng ngôn ngữ đơn giản. Xuất kết quả dưới dạng JSON theo schema đã cung cấp.`,
      prompt_suggest_menu: `Bạn là NutriBuddy, một chuyên gia dinh dưỡng AI vui tính cho trẻ em. Dựa vào thông tin sau:
    - Tuổi: {{tuoi}}
    - Giới tính: {{gioiTinh}}
    - Chiều cao: {{chieuCao}} cm
    - Cân nặng: {{canNang}} kg
    - Mục tiêu: {{mucTieu}}
    - Tình trạng sức khỏe: {{tinhTrangSucKhoe}}
    - Sở thích: {{preference}}
    Hãy tạo một thực đơn 1 ngày cân đối và lành mạnh (Bữa Sáng, Trưa, Tối, và một Bữa Phụ). Cung cấp lý do ngắn gọn, vui vẻ cho mỗi món ăn. Trả về kết quả dưới dạng JSON.`,
      prompt_create_recipe: `Bạn là NutriBuddy, đầu bếp AI siêu sáng tạo. Một bạn nhỏ 10 tuổi có những nguyên liệu sau: {{ingredients}}.
    Hãy gợi ý một món ăn đơn giản, an toàn và vui nhộn mà bạn ấy có thể làm.
    Cung cấp tên món, mô tả, danh sách nguyên liệu và các bước hướng dẫn cực kỳ đơn giản.
    Trả về kết quả dưới dạng JSON.`,
      prompt_bot_system: 'Bạn là Robot Dinh Dưỡng Nutri, một trợ lý AI thông minh và thân thiện cho trẻ em Việt Nam 10 tuổi. Luôn vui vẻ, khích lệ và dùng ngôn ngữ đơn giản. Xưng là "mình" và gọi người dùng là "bạn". Giữ câu trả lời ngắn gọn và dễ hiểu.',
      prompt_generate_food_image: `Một hình ảnh minh họa món ăn "{{foodName}}" theo phong cách hoạt hình, tươi sáng, hấp dẫn cho trẻ em. Nền trắng đơn giản.`,
      prompt_analyze_eating_habits: `Bạn là NutriBuddy, một chuyên gia dinh dưỡng AI vui tính cho trẻ em 10 tuổi.
    Dựa trên danh sách các món ăn yêu thích sau: {{favoriteFoods}}.

    Hãy viết một đoạn nhận xét ngắn (khoảng 3-4 câu), thật vui vẻ và khích lệ về thói quen ăn uống.
    - Bắt đầu bằng cách khen các món ăn đó.
    - Đưa ra một gợi ý nhỏ và đơn giản để giúp bạn nhỏ ăn uống đa dạng hơn (ví dụ: thêm rau, thử một loại trái cây mới).
    - Kết thúc bằng một lời động viên.
    
    Luôn giữ giọng văn cực kỳ thân thiện, đơn giản, và tích cực. Xưng là "mình" và gọi người dùng là "bạn".`,
      prompt_green_food: `Bạn là NutriBuddy, một AI thân thiện cho trẻ em Việt Nam 10 tuổi. 
    Hãy gợi ý 5 món ăn hoặc thực phẩm "xanh" (thân thiện với môi trường).
    Với mỗi gợi ý, hãy cung cấp:
    1. Tên thực phẩm.
    2. Mô tả ngắn gọn, vui vẻ.
    3. Lý do tại sao nó lại tốt cho Trái Đất (ví dụ: cần ít nước, không cần nhiều đất, có thể trồng tại nhà).
    4. Một emoji phù hợp.
    
    Hãy dùng ngôn ngữ thật đơn giản và gần gũi. Trả về kết quả dưới dạng JSON.`,
      prompt_get_calories: `Bạn là một chuyên gia dinh dưỡng AI. Hãy ước tính lượng calo cho 1 suất ăn thông thường của món sau: "{{foodName}}". Chỉ trả về một con số là lượng calo.`,
    }
  },
  en: {
    translation: {
      // General
      loading: 'Loading',
      error_generic: 'An error occurred. Please try again.',
      save_button: 'Save',
      locale_code: 'en-US',
      language_name: 'English',

      // Nutrients
      nutrient_năng_lượng: 'Calories',
      nutrient_đạm: 'Protein',
      nutrient_chất_béo: 'Fat',
      nutrient_tinh_bột: 'Carbs',
      'nutrient_vitamin_&_khoáng_chất': 'Vitamins & Minerals',

      // Nav
      nav_home: 'Home',
      nav_recognize: 'Recognize',
      nav_suggest: 'Menu',
      nav_recipe: 'Recipe',
      nav_bot: 'Chat',
      nav_journey: 'Journey',

      // Page Titles
      page_title_home: 'Welcome to NutriBuddy!',
      page_title_recognize: 'Food Recognition',
      page_title_suggest: 'Smart Menu Suggestions',
      page_title_recipe: 'Little Chef',
      page_title_bot: 'Nutrition Bot',
      page_title_journey: 'Health Journey',
      page_title_green: 'Green Nutrition',
      page_title_settings: 'Settings',

      // Home Page
      home_subtitle: 'Your companion for healthy and fun eating every day.',
      home_card_recognize: 'Recognize Food',
      home_card_suggest: 'Suggest Menu',
      home_card_recipe: 'Creative Recipe',
      home_card_bot: 'Nutrition Bot',
      home_card_journey: 'Health Journey',
      home_card_green: 'Green Nutrition',
      
      // Recognize Page
      recognize_placeholder: 'Upload an image or use the camera to start',
      recognize_button_upload: 'Upload Image',
      recognize_button_camera: 'Use Camera',
      recognize_button_analyze: 'Analyze Food',
      recognize_button_analyzing: 'Analyzing...',
      recognize_button_capture: 'Capture!',
      recognize_button_cancel: 'Cancel',
      recognize_error_generic: "Oops, I couldn't recognize this dish! Please try another photo.",
      recognize_error_camera_open: "Couldn't open the camera. Please grant permission and try again!",
      recognize_error_camera_capture: "Camera isn't ready yet, please wait a moment and try again!",

      // Suggest Page
      suggest_label_age: 'Age',
      suggest_label_gender: 'Gender',
      suggest_gender_male: 'Male',
      suggest_gender_female: 'Female',
      suggest_label_height: 'Height (cm)',
      suggest_label_weight: 'Weight (kg)',
      suggest_label_health_status: 'Health Status',
      suggest_health_status_placeholder: 'E.g., Very healthy, A bit thin...',
      suggest_health_status_default: 'Normal',
      suggest_label_goal: 'Your Goal',
      suggest_goal_maintain: 'Maintain weight',
      suggest_goal_gain: 'Gain weight',
      suggest_goal_lose: 'Lose weight',
      suggest_label_food_style: 'Food Style',
      suggest_food_style_vietnamese: 'Vietnamese',
      suggest_food_style_fast: 'Fast food',
      suggest_food_style_vegetarian: 'Vegetarian',
      suggest_food_style_healthy_breakfast: 'Healthy Breakfast',
      suggest_food_style_other: 'Other...',
      suggest_label_other_preference: 'Your other preference',
      suggest_other_preference_placeholder: 'E.g., less spicy, more veggies...',
      suggest_error_preference_empty: 'Please enter your preference!',
      suggest_error_generic: "I couldn't come up with a menu. Please try again!",
      suggest_button_loading: 'Cooking up ideas...',
      suggest_button_submit: 'Suggest a menu for me!',
      suggest_result_title: "Here's your menu for today!",
      suggest_image_loading: 'Drawing picture...',
      suggest_image_error: "Oops, I couldn't draw an image for this dish!",
      suggest_recipe_loading: 'Finding recipe...',
      suggest_recipe_error: "Oops, I couldn't find a recipe for this dish!",

      // Recipe Page
      recipe_label_ingredients: 'What ingredients do you have?',
      recipe_ingredients_placeholder: 'E.g., eggs, tomatoes, scallions...',
      recipe_button_loading: 'Finding recipe...',
      recipe_button_submit: "What can I cook?",
      recipe_error_generic: "Hmm, I can't think of a dish with these ingredients. Please try again!",
      recipe_section_ingredients: 'Ingredients',
      recipe_section_steps: 'Super Easy Steps',

      // Bot Page
      bot_greeting: 'Hi, I am Nutri, the Nutrition Bot! Do you have any questions for me?',
      bot_input_placeholder: 'Ask me about nutrition...',
      bot_error_generic: 'Oops, something went wrong! Please try again later.',

      // Journey Page
      journey_section_analysis_report: 'Health Analysis & Report',
      journey_subsection_progress: 'Personal Progress Tracking',
      journey_chart_weight_label: 'Weight (kg)',
      journey_chart_no_data: "No data yet. <br/> Enter your weight below to start!",
      journey_weight_input_placeholder: "Enter today's weight (kg)",
      journey_subsection_nutribuddy_insight: "NutriBuddy's Insight",
      journey_analysis_loading: 'Analyzing...',
      journey_analysis_prompt: 'Press the button below for me to analyze your eating habits from your favorite foods!',
      journey_analysis_button_loading: 'Analyzing...',
      journey_analysis_button_submit: 'Analyze Habits',
      journey_analysis_no_favorites: "You don't have any favorite dishes for me to analyze. Go 'heart' some dishes in the 'Menu' page!",
      journey_analysis_error: 'Oops, I ran into an error while analyzing. Please try again later!',
      journey_section_management_tracking: 'Health Management & Tracking',
      journey_subsection_food_log: 'Food Log',
      journey_log_food_name_placeholder: 'Food name',
      journey_log_calories_placeholder: 'Calories',
      journey_log_ai_estimate_button: 'AI Estimate',
      journey_log_calories_error: "I couldn't estimate the calories for this dish. Please try again!",
      journey_log_today_title: "Today you ate",
      journey_log_empty_today: "Nothing in today's log yet.",
      journey_log_total_today: 'Total today',
      journey_subsection_reminders: 'Smart Reminders',
      journey_reminders_subtitle: 'Turn on reminders to let NutriBuddy help you build good habits! (Requires notification permission)',
      journey_reminder_water: 'Drink water',
      journey_reminder_walk: 'Take a walk',
      journey_reminder_breakfast: 'Eat breakfast',
      journey_reminder_lunch: 'Eat lunch',
      journey_reminder_dinner: 'Eat dinner',
      journey_reminder_sleep: 'Go to sleep',
      journey_reminder_notification_body: 'You have enabled the {{reminder}} reminder. You can do it!',
      journey_section_badges: 'Badge Collection',
      journey_section_favorites: 'Favorite Foods',
      journey_favorites_empty: "You don't have any favorite foods yet. Discover and add some from the 'Menu' page!",

      // Badges
      badge_water_name: 'Super Hydrated',
      badge_water_desc: 'Drank 8 glasses of water 3 days in a row!',
      badge_veggie_name: 'Veggie Hero',
      badge_veggie_desc: 'Ate vegetables in 5 meals!',
      badge_chef_name: 'Little Chef',
      badge_chef_desc: 'Created a new recipe!',

      // Green Page
      green_intro: '"Green nutrition" means choosing foods that are good for both your health and the Earth! Let\'s explore eco-friendly foods with NutriBuddy!',
      green_button_loading: 'Searching...',
      green_button_submit: 'Suggest some for me!',
      green_error_generic: "Oops, I couldn't think of any suggestions. Please try again later!",
      
      // Settings Page
      settings_water_goal: 'Daily Water Goal (glasses)',
      settings_section_meal_times: 'Meal Times',
      settings_time_breakfast: 'Breakfast',
      settings_time_lunch: 'Lunch',
      settings_time_dinner: 'Dinner',
      settings_time_snack: 'Snack',
      settings_saved: 'Settings saved!',

      // Misc
      guide_text: 'Need help? Ask me!',
      meal_type_breakfast: 'Breakfast',
      meal_type_lunch: 'Lunch',
      meal_type_dinner: 'Dinner',
      meal_type_snack: 'Snack',

      // Prompts
      prompt_recognize: `You are NutriBuddy, a friendly AI assistant for 10-year-old children. Please analyze this food image.
               Identify the food name in {{language}}.
               Provide a short, cheerful description.
               Categorize the food.
               List the main nutritional components (Calories, Protein, Fat, Carbs, Vitamins & Minerals) with estimated values.
               Use simple language. Output the result as JSON according to the provided schema.`,
      prompt_suggest_menu: `You are NutriBuddy, a cheerful AI nutritionist for kids. Based on the following information:
    - Age: {{tuoi}}
    - Gender: {{gioiTinh}}
    - Height: {{chieuCao}} cm
    - Weight: {{canNang}} kg
    - Goal: {{mucTieu}}
    - Health status: {{tinhTrangSucKhoe}}
    - Preference: {{preference}}
    Create a balanced and healthy 1-day menu (Breakfast, Lunch, Dinner, and a Snack). Provide a short, fun reason for each dish. Return the result as JSON.`,
      prompt_create_recipe: `You are NutriBuddy, a super creative AI chef. A 10-year-old child has the following ingredients: {{ingredients}}.
    Suggest a simple, safe, and fun dish they can make.
    Provide the dish name, description, list of ingredients, and extremely simple instructions.
    Return the result as JSON.`,
      prompt_bot_system: 'You are Nutri, the Nutrition Robot, a smart and friendly AI assistant for 10-year-old Vietnamese children. Always be cheerful, encouraging, and use simple language. Refer to yourself as "I" and the user as "you". Keep answers short and easy to understand.',
      prompt_generate_food_image: `An illustration of the dish "{{foodName}}" in a cartoon style, bright, and appealing to children. Simple white background.`,
      prompt_analyze_eating_habits: `You are NutriBuddy, a cheerful AI nutritionist for 10-year-old children.
    Based on the following list of favorite foods: {{favoriteFoods}}.

    Write a short (about 3-4 sentences), cheerful, and encouraging comment about their eating habits.
    - Start by complimenting the dishes.
    - Give a small, simple suggestion to help the child eat more diversely (e.g., add vegetables, try a new fruit).
    - End with a word of encouragement.
    
    Always maintain an extremely friendly, simple, and positive tone. Refer to yourself as "I" and the user as "you".`,
      prompt_green_food: `You are NutriBuddy, a friendly AI for 10-year-old children. 
    Suggest 5 "green" (eco-friendly) foods or dishes.
    For each suggestion, provide:
    1. The food name.
    2. A short, cheerful description.
    3. A simple reason why it's good for the Earth (e.g., needs little water, doesn't need much land, can be grown at home).
    4. A suitable emoji.
    
    Use very simple and relatable language. Return the result as JSON.`,
      prompt_get_calories: `You are an AI nutrition expert. Estimate the calories for a typical serving of the following dish: "{{foodName}}". Only return a number representing the calories.`,
    }
  },
  ja: {
    translation: {
      // General
      loading: '読み込み中',
      error_generic: 'エラーが発生しました。もう一度お試しください。',
      save_button: '保存',
      locale_code: 'ja-JP',
      language_name: '日本語',

      // Nutrients
      nutrient_năng_lượng: 'カロリー',
      nutrient_đạm: 'タンパク質',
      nutrient_chất_béo: '脂質',
      nutrient_tinh_bột: '炭水化物',
      'nutrient_vitamin_&_khoáng_chất': 'ビタミンとミネラル',

      // Nav
      nav_home: 'ホーム',
      nav_recognize: '認識',
      nav_suggest: 'メニュー',
      nav_recipe: 'レシピ',
      nav_bot: 'チャット',
      nav_journey: '健康',

      // Page Titles
      page_title_home: 'NutriBuddyへようこそ！',
      page_title_recognize: '食品認識',
      page_title_suggest: 'スマートメニュー提案',
      page_title_recipe: '小さなシェフ',
      page_title_bot: '栄養ボット',
      page_title_journey: '健康の旅',
      page_title_green: 'グリーン栄養',
      page_title_settings: '設定',

      // Home Page
      home_subtitle: '毎日の健康的で楽しい食事のためのあなたの相棒。',
      home_card_recognize: '食品を認識',
      home_card_suggest: 'メニューを提案',
      home_card_recipe: 'クリエイティブレシピ',
      home_card_bot: '栄養ボット',
      home_card_journey: '健康の旅',
      home_card_green: 'グリーン栄養',

      // Recognize Page
      recognize_placeholder: '画像をアップロードするか、カメラを使って開始します',
      recognize_button_upload: '画像をアップロード',
      recognize_button_camera: 'カメラを使用',
      recognize_button_analyze: '食品を分析',
      recognize_button_analyzing: '分析中...',
      recognize_button_capture: '撮影！',
      recognize_button_cancel: 'キャンセル',
      recognize_error_generic: 'おっと、この料理を認識できませんでした！別の写真でお試しください。',
      recognize_error_camera_open: 'カメラを開けませんでした。許可を与えてもう一度お試しください！',
      recognize_error_camera_capture: 'カメラの準備ができていません。しばらく待ってからもう一度お試しください！',

      // Suggest Page
      suggest_label_age: '年齢',
      suggest_label_gender: '性別',
      suggest_gender_male: '男性',
      suggest_gender_female: '女性',
      suggest_label_height: '身長 (cm)',
      suggest_label_weight: '体重 (kg)',
      suggest_label_health_status: '健康状態',
      suggest_health_status_placeholder: '例：非常に健康、少し痩せている...',
      suggest_health_status_default: '普通',
      suggest_label_goal: 'あなたの目標',
      suggest_goal_maintain: '体重を維持',
      suggest_goal_gain: '体重を増やす',
      suggest_goal_lose: '体重を減らす',
      suggest_label_food_style: '食事のスタイル',
      suggest_food_style_vietnamese: 'ベトナム料理',
      suggest_food_style_fast: 'ファーストフード',
      suggest_food_style_vegetarian: 'ベジタリアン',
      suggest_food_style_healthy_breakfast: '健康的な朝食',
      suggest_food_style_other: 'その他',
      suggest_label_other_preference: 'その他の好み',
      suggest_other_preference_placeholder: '例：辛さ控えめ、野菜多め...',
      suggest_error_preference_empty: '好みを入力してください！',
      suggest_error_generic: 'メニューを考え出せませんでした。もう一度お試しください！',
      suggest_button_loading: 'アイデアを料理中...',
      suggest_button_submit: 'メニューを提案して！',
      suggest_result_title: '今日のメニューはこちら！',
      suggest_image_loading: '絵を描いています...',
      suggest_image_error: 'おっと、この料理の絵を描けませんでした！',
      suggest_recipe_loading: 'レシピを検索中...',
      suggest_recipe_error: 'おっと、この料理のレシピが見つかりませんでした！',

      // Recipe Page
      recipe_label_ingredients: 'どんな材料がありますか？',
      recipe_ingredients_placeholder: '例：卵、トマト、ネギ...',
      recipe_button_loading: 'レシピを検索中...',
      recipe_button_submit: '何が作れる？',
      recipe_error_generic: 'うーん、これらの材料で料理が思いつきません。もう一度お試しください！',
      recipe_section_ingredients: '必要な材料',
      recipe_section_steps: '超簡単な手順',

      // Bot Page
      bot_greeting: 'こんにちは、栄養ボットのNutriです！何か質問はありますか？',
      bot_input_placeholder: '栄養について聞いてね...',
      bot_error_generic: 'おっと、何か問題が発生しました！後でもう一度お試しください。',

      // Journey Page
      journey_section_analysis_report: '健康分析とレポート',
      journey_subsection_progress: '個人の進捗状況の追跡',
      journey_chart_weight_label: '体重 (kg)',
      journey_chart_no_data: 'データはまだありません。<br/>下で体重を入力して始めましょう！',
      journey_weight_input_placeholder: '今日の体重を入力 (kg)',
      journey_subsection_nutribuddy_insight: 'NutriBuddyのインサイト',
      journey_analysis_loading: '分析中...',
      journey_analysis_prompt: '下のボタンを押すと、あなたの好きな食べ物から食習慣を分析します！',
      journey_analysis_button_loading: '分析中...',
      journey_analysis_button_submit: '習慣を分析',
      journey_analysis_no_favorites: '分析する好きな料理がまだありません。「メニュー」ページで料理に「ハート」を付けてください！',
      journey_analysis_error: 'おっと、分析中にエラーが発生しました。後でもう一度お試しください！',
      journey_section_management_tracking: '健康管理と追跡',
      journey_subsection_food_log: '食事記録',
      journey_log_food_name_placeholder: '料理名',
      journey_log_calories_placeholder: 'カロリー',
      journey_log_ai_estimate_button: 'AI見積もり',
      journey_log_calories_error: 'この料理のカロリーを見積もれませんでした。もう一度お試しください！',
      journey_log_today_title: '今日食べたもの',
      journey_log_empty_today: '今日の記録はまだありません。',
      journey_log_total_today: '今日の合計',
      journey_subsection_reminders: 'スマートリマインダー',
      journey_reminders_subtitle: 'リマインダーをオンにして、NutriBuddyが良い習慣作りをお手伝いします！（通知許可が必要です）',
      journey_reminder_water: '水を飲む',
      journey_reminder_walk: '散歩する',
      journey_reminder_breakfast: '朝食を食べる',
      journey_reminder_lunch: '昼食を食べる',
      journey_reminder_dinner: '夕食を食べる',
      journey_reminder_sleep: '寝る',
      journey_reminder_notification_body: '{{reminder}}のリマインダーを有効にしました。頑張って！',
      journey_section_badges: 'バッジコレクション',
      journey_section_favorites: '好きな料理',
      journey_favorites_empty: 'まだ好きな料理がありません。「メニュー」ページで発見して追加しましょう！',

      // Badges
      badge_water_name: 'スーパー水分補給',
      badge_water_desc: '3日連続で水を8杯飲みました！',
      badge_veggie_name: '野菜ヒーロー',
      badge_veggie_desc: '5回の食事で野菜を食べました！',
      badge_chef_name: 'リトルシェフ',
      badge_chef_desc: '新しいレシピを作りました！',

      // Green Page
      green_intro: '「グリーン栄養」とは、あなたの健康と地球の両方に良い食べ物を選ぶことです！NutriBuddyと一緒に環境に優しい食べ物を探しましょう！',
      green_button_loading: '検索中...',
      green_button_submit: 'いくつか提案して！',
      green_error_generic: 'おっと、提案が思いつきませんでした。後でもう一度お試しください！',
      
      // Settings Page
      settings_water_goal: '1日の水分補給目標（杯）',
      settings_section_meal_times: '食事の時間',
      settings_time_breakfast: '朝食',
      settings_time_lunch: '昼食',
      settings_time_dinner: '夕食',
      settings_time_snack: 'おやつ',
      settings_saved: '設定を保存しました！',

      // Misc
      guide_text: '助けが必要ですか？聞いてください！',
      meal_type_breakfast: '朝食',
      meal_type_lunch: '昼食',
      meal_type_dinner: '夕食',
      meal_type_snack: 'おやつ',

      // Prompts (Simplified for brevity as they are sent to LLM)
       prompt_recognize: `You are NutriBuddy, a friendly AI assistant for 10-year-old children. Please analyze this food image. Identify the food name in {{language}}.`,
      prompt_suggest_menu: `You are NutriBuddy. Create a balanced 1-day menu based on user data.`,
      prompt_create_recipe: `You are NutriBuddy. Suggest a simple recipe based on ingredients: {{ingredients}}.`,
      prompt_bot_system: 'You are Nutri, the Nutrition Robot. Always be cheerful and use simple language.',
      prompt_generate_food_image: `An illustration of the dish "{{foodName}}" in a cartoon style.`,
      prompt_analyze_eating_habits: `Analyze eating habits based on favorites: {{favoriteFoods}}.`,
      prompt_green_food: `Suggest 5 eco-friendly foods.`,
      prompt_get_calories: `Estimate calories for: "{{foodName}}".`,
    }
  },
  zh: {
    translation: {
      // General
      loading: '载入中',
      error_generic: 'An error occurred. Please try again.',
      save_button: 'Save',
      locale_code: 'zh-CN',
      language_name: 'Chinese',

      // Nutrients
      nutrient_năng_lượng: 'Calories',
      nutrient_đạm: 'Protein',
      nutrient_chất_béo: 'Fat',
      nutrient_tinh_bột: 'Carbs',
      'nutrient_vitamin_&_khoáng_chất': 'Vitamins & Minerals',

      // Nav
      nav_home: 'Home',
      nav_recognize: 'Recognize',
      nav_suggest: 'Menu',
      nav_recipe: 'Recipe',
      nav_bot: 'Chat',
      nav_journey: 'Journey',

      // Page Titles
      page_title_home: 'Welcome to NutriBuddy!',
      page_title_recognize: 'Food Recognition',
      page_title_suggest: 'Smart Menu Suggestions',
      page_title_recipe: 'Little Chef',
      page_title_bot: 'Nutrition Bot',
      page_title_journey: 'Health Journey',
      page_title_green: 'Green Nutrition',
      page_title_settings: 'Settings',

      // Home Page
      home_subtitle: 'Your companion for healthy and fun eating every day.',
      home_card_recognize: 'Recognize Food',
      home_card_suggest: 'Suggest Menu',
      home_card_recipe: 'Creative Recipe',
      home_card_bot: 'Nutrition Bot',
      home_card_journey: 'Health Journey',
      home_card_green: 'Green Nutrition',
      
      // Recognize Page
      recognize_placeholder: 'Upload an image or use the camera to start',
      recognize_button_upload: 'Upload Image',
      recognize_button_camera: 'Use Camera',
      recognize_button_analyze: 'Analyze Food',
      recognize_button_analyzing: 'Analyzing...',
      recognize_button_capture: 'Capture!',
      recognize_button_cancel: 'Cancel',
      recognize_error_generic: "Oops, I couldn't recognize this dish! Please try another photo.",
      recognize_error_camera_open: "Couldn't open the camera. Please grant permission and try again!",
      recognize_error_camera_capture: "Camera isn't ready yet, please wait a moment and try again!",

      // Suggest Page
      suggest_label_age: 'Age',
      suggest_label_gender: 'Gender',
      suggest_gender_male: 'Male',
      suggest_gender_female: 'Female',
      suggest_label_height: 'Height (cm)',
      suggest_label_weight: 'Weight (kg)',
      suggest_label_health_status: 'Health Status',
      suggest_health_status_placeholder: 'E.g., Very healthy, A bit thin...',
      suggest_health_status_default: 'Normal',
      suggest_label_goal: 'Your Goal',
      suggest_goal_maintain: 'Maintain weight',
      suggest_goal_gain: 'Gain weight',
      suggest_goal_lose: 'Lose weight',
      suggest_label_food_style: 'Food Style',
      suggest_food_style_vietnamese: 'Vietnamese',
      suggest_food_style_fast: 'Fast food',
      suggest_food_style_vegetarian: 'Vegetarian',
      suggest_food_style_healthy_breakfast: 'Healthy Breakfast',
      suggest_food_style_other: 'Other...',
      suggest_label_other_preference: 'Your other preference',
      suggest_other_preference_placeholder: 'E.g., less spicy, more veggies...',
      suggest_error_preference_empty: 'Please enter your preference!',
      suggest_error_generic: "I couldn't come up with a menu. Please try again!",
      suggest_button_loading: 'Cooking up ideas...',
      suggest_button_submit: 'Suggest a menu for me!',
      suggest_result_title: "Here's your menu for today!",
      suggest_image_loading: 'Drawing picture...',
      suggest_image_error: "Oops, I couldn't draw an image for this dish!",
      suggest_recipe_loading: 'Finding recipe...',
      suggest_recipe_error: "Oops, I couldn't find a recipe for this dish!",

      // Recipe Page
      recipe_label_ingredients: 'What ingredients do you have?',
      recipe_ingredients_placeholder: 'E.g., eggs, tomatoes, scallions...',
      recipe_button_loading: 'Finding recipe...',
      recipe_button_submit: "What can I cook?",
      recipe_error_generic: "Hmm, I can't think of a dish with these ingredients. Please try again!",
      recipe_section_ingredients: 'Ingredients',
      recipe_section_steps: 'Super Easy Steps',

      // Bot Page
      bot_greeting: 'Hi, I am Nutri, the Nutrition Bot! Do you have any questions for me?',
      bot_input_placeholder: 'Ask me about nutrition...',
      bot_error_generic: 'Oops, something went wrong! Please try again later.',

      // Journey Page
      journey_section_analysis_report: 'Health Analysis & Report',
      journey_subsection_progress: 'Personal Progress Tracking',
      journey_chart_weight_label: 'Weight (kg)',
      journey_chart_no_data: "No data yet. <br/> Enter your weight below to start!",
      journey_weight_input_placeholder: "Enter today's weight (kg)",
      journey_subsection_nutribuddy_insight: "NutriBuddy's Insight",
      journey_analysis_loading: 'Analyzing...',
      journey_analysis_prompt: 'Press the button below for me to analyze your eating habits from your favorite foods!',
      journey_analysis_button_loading: 'Analyzing...',
      journey_analysis_button_submit: 'Analyze Habits',
      journey_analysis_no_favorites: "You don't have any favorite dishes for me to analyze. Go 'heart' some dishes in the 'Menu' page!",
      journey_analysis_error: 'Oops, I ran into an error while analyzing. Please try again later!',
      journey_section_management_tracking: 'Health Management & Tracking',
      journey_subsection_food_log: 'Food Log',
      journey_log_food_name_placeholder: 'Food name',
      journey_log_calories_placeholder: 'Calories',
      journey_log_ai_estimate_button: 'AI Estimate',
      journey_log_calories_error: "I couldn't estimate the calories for this dish. Please try again!",
      journey_log_today_title: "Today you ate",
      journey_log_empty_today: "Nothing in today's log yet.",
      journey_log_total_today: 'Total today',
      journey_subsection_reminders: 'Smart Reminders',
      journey_reminders_subtitle: 'Turn on reminders to let NutriBuddy help you build good habits! (Requires notification permission)',
      journey_reminder_water: 'Drink water',
      journey_reminder_walk: 'Take a walk',
      journey_reminder_breakfast: 'Eat breakfast',
      journey_reminder_lunch: 'Eat lunch',
      journey_reminder_dinner: 'Eat dinner',
      journey_reminder_sleep: 'Go to sleep',
      journey_reminder_notification_body: 'You have enabled the {{reminder}} reminder. You can do it!',
      journey_section_badges: 'Badge Collection',
      journey_section_favorites: 'Favorite Foods',
      journey_favorites_empty: "You don't have any favorite foods yet. Discover and add some from the 'Menu' page!",

      // Badges
      badge_water_name: 'Super Hydrated',
      badge_water_desc: 'Drank 8 glasses of water 3 days in a row!',
      badge_veggie_name: 'Veggie Hero',
      badge_veggie_desc: 'Ate vegetables in 5 meals!',
      badge_chef_name: 'Little Chef',
      badge_chef_desc: 'Created a new recipe!',

      // Green Page
      green_intro: '"Green nutrition" means choosing foods that are good for both your health and the Earth! Let\'s explore eco-friendly foods with NutriBuddy!',
      green_button_loading: 'Searching...',
      green_button_submit: 'Suggest some for me!',
      green_error_generic: "Oops, I couldn't think of any suggestions. Please try again later!",
      
      // Settings Page
      settings_water_goal: 'Daily Water Goal (glasses)',
      settings_section_meal_times: 'Meal Times',
      settings_time_breakfast: 'Breakfast',
      settings_time_lunch: 'Lunch',
      settings_time_dinner: 'Dinner',
      settings_time_snack: 'Snack',
      settings_saved: 'Settings saved!',

      // Misc
      guide_text: 'Need help? Ask me!',
      meal_type_breakfast: 'Breakfast',
      meal_type_lunch: 'Lunch',
      meal_type_dinner: 'Dinner',
      meal_type_snack: 'Snack',

      // Prompts
      prompt_recognize: `You are NutriBuddy, a friendly AI assistant for 10-year-old children. Please analyze this food image.
               Identify the food name in {{language}}.
               Provide a short, cheerful description.
               Categorize the food.
               List the main nutritional components (Calories, Protein, Fat, Carbs, Vitamins & Minerals) with estimated values.
               Use simple language. Output the result as JSON according to the provided schema.`,
      prompt_suggest_menu: `You are NutriBuddy, a cheerful AI nutritionist for kids. Based on the following information:
    - Age: {{tuoi}}
    - Gender: {{gioiTinh}}
    - Height: {{chieuCao}} cm
    - Weight: {{canNang}} kg
    - Goal: {{mucTieu}}
    - Health status: {{tinhTrangSucKhoe}}
    - Preference: {{preference}}
    Create a balanced and healthy 1-day menu (Breakfast, Lunch, Dinner, and a Snack). Provide a short, fun reason for each dish. Return the result as JSON.`,
      prompt_create_recipe: `You are NutriBuddy, a super creative AI chef. A 10-year-old child has the following ingredients: {{ingredients}}.
    Suggest a simple, safe, and fun dish they can make.
    Provide the dish name, description, list of ingredients, and extremely simple instructions.
    Return the result as JSON.`,
      prompt_bot_system: 'You are Nutri, the Nutrition Robot, a smart and friendly AI assistant for 10-year-old Vietnamese children. Always be cheerful, encouraging, and use simple language. Refer to yourself as "I" and the user as "you". Keep answers short and easy to understand.',
      prompt_generate_food_image: `An illustration of the dish "{{foodName}}" in a cartoon style, bright, and appealing to children. Simple white background.`,
      prompt_analyze_eating_habits: `You are NutriBuddy, a cheerful AI nutritionist for 10-year-old children.
    Based on the following list of favorite foods: {{favoriteFoods}}.

    Write a short (about 3-4 sentences), cheerful, and encouraging comment about their eating habits.
    - Start by complimenting the dishes.
    - Give a small, simple suggestion to help the child eat more diversely (e.g., add vegetables, try a new fruit).
    - End with a word of encouragement.
    
    Always maintain an extremely friendly, simple, and positive tone. Refer to yourself as "I" and the user as "you".`,
      prompt_green_food: `You are NutriBuddy, a friendly AI for 10-year-old children. 
    Suggest 5 "green" (eco-friendly) foods or dishes.
    For each suggestion, provide:
    1. The food name.
    2. A short, cheerful description.
    3. A simple reason why it's good for the Earth (e.g., needs little water, doesn't need much land, can be grown at home).
    4. A suitable emoji.
    
    Use very simple and relatable language. Return the result as JSON.`,
      prompt_get_calories: `You are an AI nutrition expert. Estimate the calories for a typical serving of the following dish: "{{foodName}}". Only return a number representing the calories.`,
    }
  }
};

export const translate = (language: Language, key: string, options?: { [key: string]: string | number }): string => {
    let translation =
        (resources[language]?.translation as any)?.[key] ??
        (resources.en.translation as any)?.[key] ??
        key;
    
    if (options && typeof translation === 'string') {
        Object.keys(options).forEach(optionKey => {
            const regex = new RegExp(`{{${optionKey}}}`, 'g');
            translation = translation.replace(regex, String(options[optionKey]));
        });
    }
    
    return translation;
};
