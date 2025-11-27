
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
// import { PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';
import type { Page, RecognizedFood, Nutrient, UserProfile, MealPlan, Recipe, ChatMessage, Badge, Meal, GreenFood, FoodLogEntry, WeightEntry, MealTypeKey } from './types';
import { recognizeFood, suggestMenu, createRecipe, getBotResponse, generateFoodImage, analyzeEatingHabits, getGreenFoodSuggestions, getFoodCalories } from './services/geminiService';
import { HomeIcon, ScanIcon, MenuIcon, ChefHatIcon, BotIcon, HeartPulseIcon, FlameIcon, FishIcon, DropletIcon, WheatIcon, AtomIcon, SproutIcon, TrophyIcon, SendIcon, CameraIcon, HeartIcon, ChevronDownIcon, BarChart3Icon, LeafIcon, BookOpenIcon, BellIcon, SparklesIcon, PlusIcon, WalkingIcon, ScaleIcon, NutriBuddyLogo, SettingsIcon, ClockIcon } from './components/icons';
import { useLanguage } from './contexts/LanguageContext';
import { resources } from './i18n';

const nutrientIconMap: Record<Nutrient['icon'], React.ComponentType<{ className?: string }>> = {
    CALORIES: FlameIcon,
    PROTEIN: FishIcon,
    FAT: DropletIcon,
    CARBS: WheatIcon,
    VITAMINS: AtomIcon,
    MINERALS: SproutIcon,
};

const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();

    const languages: { code: 'vi' | 'en' | 'ja' | 'zh'; label: string }[] = [
        { code: 'vi', label: 'VIE' },
        { code: 'en', label: 'ENG' },
        { code: 'ja', label: 'JPN' },
        { code: 'zh', label: 'CHN' },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value as 'vi' | 'en' | 'ja' | 'zh');
    };

    return (
        <div>
            <select 
                value={language} 
                onChange={handleChange}
                className="bg-white border border-gray-300 text-gray-700 text-sm rounded-full py-1.5 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                aria-label="Select language"
            >
                {languages.map((lang, index) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

// #region Helper Components
type PageContainerProps = {
    title: string;
};
const PageContainer: React.FC<React.PropsWithChildren<PageContainerProps>> = ({ title, children }) => (
    <div className="animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">{title}</h2>
        {children}
    </div>
);

const LoadingSpinner = () => (
    <div className="flex justify-center items-center my-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
    </div>
);

type NutrientCardProps = {
    nutrient: Nutrient;
};
const NutrientCard: React.FC<NutrientCardProps> = ({ nutrient }) => {
    const Icon = nutrientIconMap[nutrient.icon] || FlameIcon;
    return (
        <div className="flex flex-col items-center justify-center p-3 bg-green-50 rounded-lg text-center">
            <Icon className="w-8 h-8 text-green-500" />
            <p className="mt-1 text-sm font-semibold text-gray-700">{nutrient.ten}</p>
            <p className="text-xs text-gray-500">{nutrient.giaTri} {nutrient.donVi}</p>
        </div>
    );
};

const HomeCard = ({ icon, title, onClick }: { icon: React.ReactNode, title: string, onClick: () => void }) => (
    <div
        onClick={onClick}
        className="bg-white rounded-2xl p-4 sm:p-6 text-center shadow-md hover:shadow-xl transition-shadow cursor-pointer transform hover:-translate-y-1"
    >
        {icon}
        <h3 className="mt-4 font-semibold text-gray-700">{title}</h3>
    </div>
);

const BottomNavBar = ({ activePage, onNavigate }: { activePage: Page, onNavigate: (page: Page) => void }) => {
    const { t } = useLanguage();
    const navItems: { page: Page; icon: React.ComponentType<{ className?: string }>; labelKey: string }[] = [
        { page: 'home', icon: HomeIcon, labelKey: 'nav_home' },
        { page: 'recognize', icon: ScanIcon, labelKey: 'nav_recognize' },
        { page: 'suggest', icon: MenuIcon, labelKey: 'nav_suggest' },
        { page: 'recipe', icon: ChefHatIcon, labelKey: 'nav_recipe' },
        { page: 'bot', icon: BotIcon, labelKey: 'nav_bot' },
        { page: 'journey', icon: HeartPulseIcon, labelKey: 'nav_journey' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-10">
            <div className="max-w-4xl mx-auto grid grid-cols-6">
                {navItems.map(({ page, icon: Icon, labelKey }) => (
                    <button
                        key={page}
                        onClick={() => onNavigate(page)}
                        className={`flex flex-col items-center justify-center py-2 px-1 text-xs transition-colors duration-200 ${
                            activePage === page ? 'text-green-600' : 'text-gray-500 hover:text-green-500'
                        }`}
                    >
                        <Icon className="w-6 h-6 mb-1" />
                        <span className="text-center leading-tight">{t(labelKey)}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
};

const NutritionRobotGuide = ({ onClick }: { onClick: () => void }) => {
    const { t } = useLanguage();

    return (
        <div className="fixed bottom-24 right-4 z-20 flex items-center gap-2 cursor-pointer" onClick={onClick}>
            <div className="bg-white p-3 rounded-xl shadow-lg relative">
                <p className="text-sm text-gray-700">{t('guide_text')}</p>
                <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white"></div>
            </div>
            <button
                className="bg-green-500 p-3 rounded-full shadow-lg text-white hover:bg-green-600 transition-transform transform hover:scale-110"
                aria-label="Chat with NutriBuddy"
            >
                <BotIcon className="w-8 h-8" />
            </button>
        </div>
    );
};
// #endregion

// Main App Component
export default function App() {
    const [activePage, setActivePage] = useState<Page>('home');
    const [waterGoal, setWaterGoal] = useState(() => {
        try {
            const saved = localStorage.getItem('nutribuddy_water_goal');
            return saved ? parseInt(saved, 10) : 8;
        } catch {
            return 8;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('nutribuddy_water_goal', waterGoal.toString());
        } catch (error) {
            console.error('Failed to save water goal', error);
        }
    }, [waterGoal]);

    const renderPage = () => {
        switch (activePage) {
            case 'home': return <HomePage onNavigate={setActivePage} />;
            case 'recognize': return <FoodRecognitionPage />;
            case 'suggest': return <MenuSuggestionPage />;
            case 'recipe': return <RecipeCreatorPage />;
            case 'bot': return <NutritionBotPage />;
            case 'journey': return <HealthJourneyPage waterGoal={waterGoal} />;
            case 'green': return <GreenNutritionPage />;
            case 'settings': return <SettingsPage waterGoal={waterGoal} setWaterGoal={setWaterGoal} />;
            default: return <HomePage onNavigate={setActivePage} />;
        }
    };

    return (
        <div className="min-h-screen bg-green-50 text-gray-800 flex flex-col relative">
            {/* Header with Logo */}
            <header className="bg-white shadow-sm sticky top-0 z-30 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActivePage('home')}>
                    <NutriBuddyLogo className="w-10 h-10" />
                    <h1 className="text-2xl font-bold text-green-600 hidden sm:block tracking-tight">NutriBuddy</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => setActivePage('settings')} className="text-gray-500 hover:text-green-600 transition-colors" aria-label="Settings">
                        <SettingsIcon className="w-6 h-6" />
                    </button>
                    <LanguageSwitcher />
                </div>
            </header>

            <main className="flex-grow p-4 pb-24">
                <div className="max-w-4xl mx-auto">
                    {renderPage()}
                </div>
            </main>
            <NutritionRobotGuide onClick={() => setActivePage('bot')} />
            <BottomNavBar activePage={activePage} onNavigate={setActivePage} />
        </div>
    );
}

// Sub-components defined in the same file to keep file count low

// #region Page Components

const HomePage = ({ onNavigate }: { onNavigate: (page: Page) => void }) => {
    const { t } = useLanguage();
    return (
        <div className="text-center animate-fade-in">
            <div className="mb-8 flex justify-center">
                 <NutriBuddyLogo className="w-24 h-24 sm:hidden" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-green-600">{t('page_title_home')}</h1>
            <p className="mt-4 text-lg text-gray-600">{t('home_subtitle')}</p>
            
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
                <HomeCard icon={<ScanIcon className="w-12 h-12 mx-auto text-orange-500" />} title={t('home_card_recognize')} onClick={() => onNavigate('recognize')} />
                <HomeCard icon={<MenuIcon className="w-12 h-12 mx-auto text-orange-500" />} title={t('home_card_suggest')} onClick={() => onNavigate('suggest')} />
                <HomeCard icon={<ChefHatIcon className="w-12 h-12 mx-auto text-orange-500" />} title={t('home_card_recipe')} onClick={() => onNavigate('recipe')} />
                <HomeCard icon={<BotIcon className="w-12 h-12 mx-auto text-orange-500" />} title={t('home_card_bot')} onClick={() => onNavigate('bot')} />
                <HomeCard icon={<HeartPulseIcon className="w-12 h-12 mx-auto text-orange-500" />} title={t('home_card_journey')} onClick={() => onNavigate('journey')} />
                <HomeCard icon={<LeafIcon className="w-12 h-12 mx-auto text-orange-500" />} title={t('home_card_green')} onClick={() => onNavigate('green')} />
            </div>
        </div>
    );
};

const SettingsPage = ({ waterGoal, setWaterGoal }: { waterGoal: number, setWaterGoal: (val: number) => void }) => {
    const { t } = useLanguage();
    const [localGoal, setLocalGoal] = useState<string | number>(waterGoal);
    const [saved, setSaved] = useState(false);

    const [mealTimes, setMealTimes] = useState(() => {
        try {
            const saved = localStorage.getItem('nutribuddy_meal_times');
            return saved ? JSON.parse(saved) : {
                breakfast: '07:00',
                lunch: '11:30',
                dinner: '18:30',
                snack: '15:00'
            };
        } catch {
            return { breakfast: '07:00', lunch: '11:30', dinner: '18:30', snack: '15:00' };
        }
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Save Water Goal
        const parsed = parseInt(String(localGoal), 10);
        const finalVal = isNaN(parsed) || parsed < 1 ? 8 : parsed;
        setWaterGoal(finalVal);
        setLocalGoal(finalVal);

        // Save Meal Times
        localStorage.setItem('nutribuddy_meal_times', JSON.stringify(mealTimes));
        
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleTimeChange = (key: string, value: string) => {
        setMealTimes((prev: any) => ({ ...prev, [key]: value }));
    };

    return (
        <PageContainer title={t('page_title_settings')}>
            <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto space-y-6">
                
                {/* Water Goal Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('settings_water_goal')}</label>
                    <div className="flex items-center gap-4">
                        <DropletIcon className="w-8 h-8 text-blue-500" />
                        <input 
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*" 
                            value={localGoal}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val === '' || /^\d*$/.test(val)) {
                                    setLocalGoal(val);
                                }
                            }}
                            className="block w-full border border-gray-300 rounded-md shadow-sm p-2 text-lg"
                        />
                    </div>
                </div>

                {/* Meal Times Section */}
                <div className="border-t border-gray-100 pt-4">
                    <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <ClockIcon className="w-6 h-6 text-orange-500" />
                        {t('settings_section_meal_times')}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Breakfast */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('settings_time_breakfast')}</label>
                             <input 
                                type="time"
                                value={mealTimes.breakfast}
                                onChange={(e) => handleTimeChange('breakfast', e.target.value)}
                                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                            />
                        </div>
                        {/* Lunch */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('settings_time_lunch')}</label>
                             <input 
                                type="time"
                                value={mealTimes.lunch}
                                onChange={(e) => handleTimeChange('lunch', e.target.value)}
                                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                            />
                        </div>
                         {/* Dinner */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('settings_time_dinner')}</label>
                             <input 
                                type="time"
                                value={mealTimes.dinner}
                                onChange={(e) => handleTimeChange('dinner', e.target.value)}
                                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                            />
                        </div>
                         {/* Snack */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('settings_time_snack')}</label>
                             <input 
                                type="time"
                                value={mealTimes.snack}
                                onChange={(e) => handleTimeChange('snack', e.target.value)}
                                className="block w-full border border-gray-300 rounded-md shadow-sm p-2 text-sm"
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-full hover:bg-green-600 transition-colors">
                    {t('save_button')}
                </button>
                {saved && <p className="text-green-600 text-center font-medium animate-fade-in">{t('settings_saved')}</p>}
            </form>
        </PageContainer>
    );
};

const FoodRecognitionPage = () => {
    const [image, setImage] = useState<string | null>(null);
    const [result, setResult] = useState<RecognizedFood | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [isCameraReady, setIsCameraReady] = useState(false);
    const { t, language } = useLanguage();
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
                setResult(null);
                setError('');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = async () => {
        if (!image) return;
        setLoading(true);
        setError('');
        try {
            const base64Image = image.split(',')[1];
            const analysisResult = await recognizeFood(base64Image, language);
            setResult(analysisResult);
        } catch (err) {
            setError(t('recognize_error_generic'));
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    
    const stopCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setIsCameraOpen(false);
        setIsCameraReady(false);
    }, []);

    const startCamera = async () => {
        setIsCameraReady(false);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                // play() is a promise, but we'll use onCanPlay to determine readiness
                videoRef.current.play();
                setIsCameraOpen(true);
                setError('');
            }
        } catch (err) {
            console.error("Lỗi mở camera:", err);
            setError(t('recognize_error_camera_open'));
            stopCamera();
        }
    };

    const captureImage = () => {
        if (videoRef.current && canvasRef.current && videoRef.current.videoWidth > 0 && isCameraReady) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/jpeg');
                setImage(dataUrl);
                setResult(null);
                setError('');
            }
            stopCamera();
        } else {
             setError(t('recognize_error_camera_capture'));
        }
    };

    useEffect(() => {
        return () => {
            stopCamera();
        };
    }, [stopCamera]);


    return (
        <PageContainer title={t('page_title_recognize')}>
            <div className="w-full max-w-md mx-auto">
                {isCameraOpen ? (
                     <div className="animate-fade-in space-y-4">
                        <div className="relative">
                            <video ref={videoRef} onCanPlay={() => setIsCameraReady(true)} autoPlay playsInline muted className="w-full rounded-xl shadow-lg" />
                            {!isCameraReady && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                                    <p className="text-white">{t('loading')}...</p>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-center gap-4">
                            <button onClick={captureImage} disabled={!isCameraReady} className="flex-1 bg-green-500 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed">{t('recognize_button_capture')}</button>
                            <button onClick={stopCamera} className="flex-1 bg-red-500 text-white font-bold py-3 px-6 rounded-full hover:bg-red-600 transition-transform transform hover:scale-105">{t('recognize_button_cancel')}</button>
                        </div>
                        <canvas ref={canvasRef} className="hidden" />
                    </div>
                ) : (
                    <>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-white">
                             <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                            {image ? (
                                <img src={image} alt="Món ăn đã chọn" className="w-full h-auto max-h-64 object-contain rounded-lg" />
                            ) : (
                                <div className="flex flex-col items-center text-gray-500">
                                   <ScanIcon className="w-16 h-16 text-gray-400 mb-2"/>
                                   <p>{t('recognize_placeholder')}</p>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                             <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center gap-2 w-full bg-white border border-gray-300 text-gray-700 font-bold py-3 px-4 rounded-full hover:bg-gray-100 transition-colors">
                                <ScanIcon/> {t('recognize_button_upload')}
                            </button>
                            <button onClick={startCamera} className="flex items-center justify-center gap-2 w-full bg-white border border-gray-300 text-gray-700 font-bold py-3 px-4 rounded-full hover:bg-gray-100 transition-colors">
                                <CameraIcon/> {t('recognize_button_camera')}
                            </button>
                        </div>

                        {image && (
                            <button onClick={handleAnalyze} disabled={loading} className="mt-4 w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-full hover:bg-orange-600 transition-transform transform hover:scale-105 disabled:bg-gray-400">
                                {loading ? t('recognize_button_analyzing') : t('recognize_button_analyze')}
                            </button>
                        )}
                    </>
                )}
                
                {loading && <LoadingSpinner />}
                {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

                {result && (
                    <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg animate-fade-in-up">
                        <h3 className="text-2xl font-bold text-green-600">{result.tenMonAn}</h3>
                        <p className="text-sm text-white bg-green-400 inline-block px-3 py-1 rounded-full my-2">{result.danhMuc}</p>
                        <p className="mt-2 text-gray-600">{result.moTa}</p>
                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {result.dinhDuong.map(n => <NutrientCard key={n.ten} nutrient={n} />)}
                        </div>
                    </div>
                )}
            </div>
        </PageContainer>
    );
};

const MenuSuggestionPage = () => {
    const { t, language } = useLanguage();
    
    const defaultProfile: UserProfile = { tuoi: 10, gioiTinh: 'male', chieuCao: 140, canNang: 35, mucTieu: 'duy_tri', tinhTrangSucKhoe: '' };

    const [profile, setProfile] = useState<UserProfile>(() => {
        try {
            const savedProfileJSON = localStorage.getItem('nutribuddy_profile');
            if (!savedProfileJSON) return defaultProfile;

            const savedProfile = JSON.parse(savedProfileJSON);

            // Migrate gioiTinh for backward compatibility
            if (savedProfile.gioiTinh === 'Nam') {
                savedProfile.gioiTinh = 'male';
            } else if (savedProfile.gioiTinh === 'Nữ') {
                savedProfile.gioiTinh = 'female';
            }

            // Reset default health status to avoid language mismatch
            const allDefaultStatuses = Object.values(resources).map(lang => lang.translation.suggest_health_status_default);
            if (allDefaultStatuses.includes(savedProfile.tinhTrangSucKhoe)) {
                savedProfile.tinhTrangSucKhoe = '';
            }

            return { ...defaultProfile, ...savedProfile };
        } catch (error) {
            console.error('Failed to load profile from local storage', error);
            return defaultProfile;
        }
    });
    
    const foodStyles = [
        { key: 'vietnamese', tKey: 'suggest_food_style_vietnamese' },
        { key: 'fast', tKey: 'suggest_food_style_fast' },
        { key: 'vegetarian', tKey: 'suggest_food_style_vegetarian' },
        { key: 'healthy_breakfast', tKey: 'suggest_food_style_healthy_breakfast' },
        { key: 'other', tKey: 'suggest_food_style_other' },
    ];

    const [preferenceKey, setPreferenceKey] = useState('vietnamese');
    const [customPreference, setCustomPreference] = useState('');
    const [menu, setMenu] = useState<MealPlan | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [expandedMeal, setExpandedMeal] = useState<string | null>(null);
    const [recipeCache, setRecipeCache] = useState<Record<string, Recipe | 'loading' | 'error'>>({});
    const [imageCache, setImageCache] = useState<Record<string, string | 'loading' | 'error'>>({});

    const [favorites, setFavorites] = useState<string[]>(() => {
        try {
            const savedFavorites = localStorage.getItem('nutribuddy_favorites');
            return savedFavorites ? JSON.parse(savedFavorites) : [];
        } catch (error) {
            console.error('Failed to load favorites', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('nutribuddy_profile', JSON.stringify(profile));
        } catch (error) {
            console.error('Failed to save profile to local storage', error);
        }
    }, [profile]);
    
    useEffect(() => {
        try {
            localStorage.setItem('nutribuddy_favorites', JSON.stringify(favorites));
        } catch (error) {
            console.error('Failed to save favorites', error);
        }
    }, [favorites]);

    const handleToggleFavorite = (mealName: string) => {
        setFavorites(prev =>
            prev.includes(mealName)
                ? prev.filter(name => name !== mealName)
                : [...prev, mealName]
        );
    };
    
    const handleMealClick = (mealName: string) => {
        const isOpening = expandedMeal !== mealName;
        setExpandedMeal(isOpening ? mealName : null);

        if (isOpening) {
            // Fetch recipe if not already in cache
            if (!recipeCache[mealName]) {
                setRecipeCache(prev => ({ ...prev, [mealName]: 'loading' }));
                createRecipe(mealName, language)
                    .then(recipeResult => {
                        setRecipeCache(prev => ({ ...prev, [mealName]: recipeResult }));
                    })
                    .catch(err => {
                        console.error(`Failed to create recipe for ${mealName}`, err);
                        setRecipeCache(prev => ({ ...prev, [mealName]: 'error' }));
                    });
            }
            // Fetch image if not already in cache
            if (!imageCache[mealName]) {
                 setImageCache(prev => ({ ...prev, [mealName]: 'loading' }));
                generateFoodImage(mealName, language)
                    .then(imageUrl => {
                        setImageCache(prev => ({ ...prev, [mealName]: imageUrl }));
                    })
                    .catch(err => {
                        console.error(`Failed to generate image for ${mealName}`, err);
                        setImageCache(prev => ({ ...prev, [mealName]: 'error' }));
                    });
            }
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMenu(null);
        setExpandedMeal(null);
        setRecipeCache({});
        setImageCache({});
        try {
            const preferenceTKey = foodStyles.find(fs => fs.key === preferenceKey)?.tKey ?? '';
            const finalPreference = preferenceKey === 'other' ? customPreference : t(preferenceTKey);

            if (preferenceKey === 'other' && !customPreference.trim()) {
                setError(t('suggest_error_preference_empty'));
                setLoading(false);
                return;
            }
            const result = await suggestMenu(profile, finalPreference, language);
            setMenu(result);
        } catch (err) {
            setError(t('suggest_error_generic'));
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    
    const mealTypeTranslations: Record<Meal['tenBua'], string> = {
        'Bữa Sáng': t('meal_type_breakfast'),
        'Bữa Trưa': t('meal_type_lunch'),
        'Bữa Tối': t('meal_type_dinner'),
        'Bữa Phụ': t('meal_type_snack'),
    };

    return (
        <PageContainer title={t('page_title_suggest')}>
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded-2xl shadow-lg space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('suggest_label_age')}</label>
                        <input type="number" value={profile.tuoi || ''} placeholder="10" min="1" onChange={e => setProfile({...profile, tuoi: +e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">{t('suggest_label_gender')}</label>
                        <select value={profile.gioiTinh} onChange={e => setProfile({...profile, gioiTinh: e.target.value as 'male' | 'female'})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                            <option value="male">{t('suggest_gender_male')}</option>
                            <option value="female">{t('suggest_gender_female')}</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">{t('suggest_label_height')}</label>
                        <input type="number" value={profile.chieuCao || ''} placeholder="140" min="1" onChange={e => setProfile({...profile, chieuCao: +e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">{t('suggest_label_weight')}</label>
                        <input type="number" value={profile.canNang || ''} placeholder="35" min="1" onChange={e => setProfile({...profile, canNang: +e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                </div>
                <div>
                     <label className="block text-sm font-medium text-gray-700">{t('suggest_label_health_status')}</label>
                    <input
                        type="text"
                        value={profile.tinhTrangSucKhoe}
                        onChange={e => setProfile({...profile, tinhTrangSucKhoe: e.target.value})}
                        placeholder={t('suggest_health_status_placeholder')}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t('suggest_label_goal')}</label>
                    <select value={profile.mucTieu} onChange={e => setProfile({...profile, mucTieu: e.target.value as any})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                        <option value="duy_tri">{t('suggest_goal_maintain')}</option>
                        <option value="tang_can">{t('suggest_goal_gain')}</option>
                        <option value="giam_can">{t('suggest_goal_lose')}</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">{t('suggest_label_food_style')}</label>
                    <select value={preferenceKey} onChange={e => setPreferenceKey(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                         {foodStyles.map(style => (
                            <option key={style.key} value={style.key}>{t(style.tKey)}</option>
                        ))}
                    </select>
                </div>
                {preferenceKey === 'other' && (
                    <div className="animate-fade-in">
                        <label className="block text-sm font-medium text-gray-700">{t('suggest_label_other_preference')}</label>
                        <input 
                            type="text" 
                            value={customPreference} 
                            onChange={e => setCustomPreference(e.target.value)}
                            placeholder={t('suggest_other_preference_placeholder')}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                )}
                <button type="submit" disabled={loading} className="w-full bg-orange-500 text-white font-bold py-3 px-4 rounded-full hover:bg-orange-600 transition-transform transform hover:scale-105 disabled:bg-gray-400">
                    {loading ? t('suggest_button_loading') : t('suggest_button_submit')}
                </button>
            </form>

            {loading && <LoadingSpinner />}
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

            {menu && (
                 <div className="mt-8 space-y-4 animate-fade-in-up">
                    <h3 className="text-2xl font-bold text-center text-green-600">{t('suggest_result_title')}</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        {menu.buaAn.map((meal, index) => {
                             const isExpanded = expandedMeal === meal.monAn;
                             const recipeState = recipeCache[meal.monAn];
                             const imageState = imageCache[meal.monAn];
                             const isFavorite = favorites.includes(meal.monAn);

                             return (
                                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all hover:shadow-lg">
                                    <div 
                                        className="p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-start"
                                        onClick={() => handleMealClick(meal.monAn)}
                                    >
                                        <div className="flex-1">
                                            <span className="text-xs font-bold text-green-600 uppercase tracking-wide">{mealTypeTranslations[meal.tenBua] || meal.tenBua}</span>
                                            <h4 className="text-xl font-bold text-gray-800 mt-1">{meal.monAn}</h4>
                                            <p className="text-sm text-gray-600 mt-2 italic">"{meal.lyDo}"</p>
                                        </div>
                                         <button 
                                            onClick={(e) => { e.stopPropagation(); handleToggleFavorite(meal.monAn); }}
                                            className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-300 hover:text-red-300'}`}
                                        >
                                            <HeartIcon filled={isFavorite} />
                                        </button>
                                        <div className={`ml-2 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                                            <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <div className="px-4 pb-4 border-t border-gray-100 bg-green-50/30 animate-fade-in">
                                             {/* Image Section */}
                                            <div className="my-4">
                                                {imageState === 'loading' && <div className="text-center text-gray-500 text-sm py-4"><span className="animate-pulse">{t('suggest_image_loading')}</span></div>}
                                                {imageState === 'error' && <div className="text-center text-red-400 text-xs py-2">{t('suggest_image_error')}</div>}
                                                {typeof imageState === 'string' && imageState !== 'loading' && imageState !== 'error' && (
                                                    <img src={imageState} alt={meal.monAn} className="w-full h-48 object-cover rounded-lg shadow-sm animate-fade-in" />
                                                )}
                                            </div>

                                            {/* Recipe Section */}
                                            {recipeState === 'loading' && <div className="flex justify-center py-4"><LoadingSpinner /></div>}
                                            {recipeState === 'error' && <p className="text-red-500 text-sm text-center">{t('suggest_recipe_error')}</p>}
                                            {typeof recipeState === 'object' && recipeState !== null && (
                                                <div className="animate-fade-in space-y-3">
                                                    <p className="text-gray-700 text-sm">{recipeState.moTa}</p>
                                                    <div>
                                                        <h5 className="font-bold text-green-600 text-sm mb-1">{t('recipe_section_ingredients')}:</h5>
                                                        <ul className="list-disc list-inside text-sm text-gray-700">
                                                            {recipeState.nguyenLieu.map((ing, i) => <li key={i}>{ing}</li>)}
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h5 className="font-bold text-green-600 text-sm mb-1">{t('recipe_section_steps')}:</h5>
                                                         <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
                                                            {recipeState.buocLam.map((step, i) => <li key={i}>{step}</li>)}
                                                        </ol>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                 </div>
            )}
        </PageContainer>
    );
};

const RecipeCreatorPage = () => {
    const { t, language } = useLanguage();
    const [ingredients, setIngredients] = useState('');
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!ingredients.trim()) return;
        setLoading(true);
        setError('');
        setRecipe(null);
        try {
            const result = await createRecipe(ingredients, language);
            setRecipe(result);
        } catch (err) {
            setError(t('recipe_error_generic'));
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageContainer title={t('page_title_recipe')}>
             <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('recipe_label_ingredients')}</label>
                    <textarea 
                        value={ingredients}
                        onChange={e => setIngredients(e.target.value)}
                        placeholder={t('recipe_ingredients_placeholder')}
                        className="block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all h-32"
                    />
                </div>
                <button type="submit" disabled={loading || !ingredients.trim()} className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-full hover:bg-green-600 transition-transform transform hover:scale-105 disabled:bg-gray-400">
                    {loading ? t('recipe_button_loading') : t('recipe_button_submit')}
                </button>
            </form>
             {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
             {recipe && (
                <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg animate-fade-in-up border-t-4 border-green-500">
                    <h3 className="text-2xl font-bold text-center text-green-600 mb-2">{recipe.tenMon}</h3>
                    <p className="text-gray-600 text-center italic mb-4">{recipe.moTa}</p>
                    
                    <div className="space-y-4">
                        <div className="bg-green-50 p-4 rounded-xl">
                             <h4 className="font-bold text-green-700 mb-2 flex items-center gap-2">
                                <LeafIcon className="w-5 h-5"/> {t('recipe_section_ingredients')}
                            </h4>
                             <ul className="list-disc list-inside text-gray-700 space-y-1">
                                {recipe.nguyenLieu.map((ing, i) => <li key={i}>{ing}</li>)}
                            </ul>
                        </div>
                         <div className="bg-orange-50 p-4 rounded-xl">
                            <h4 className="font-bold text-orange-700 mb-2 flex items-center gap-2">
                                <ChefHatIcon className="w-5 h-5"/> {t('recipe_section_steps')}
                            </h4>
                            <ol className="list-decimal list-inside text-gray-700 space-y-2">
                                {recipe.buocLam.map((step, i) => <li key={i}>{step}</li>)}
                            </ol>
                        </div>
                    </div>
                </div>
            )}
        </PageContainer>
    );
};

const NutritionBotPage = () => {
    const { t, language } = useLanguage();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    // Initial greeting
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([{ sender: 'bot', text: t('bot_greeting') }]);
        }
    }, [t, messages.length]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        setLoading(true);

        try {
            // Convert chat history for Gemini API
            const history = messages.map(m => ({
                role: m.sender === 'user' ? 'user' : 'model',
                parts: [{ text: m.text }]
            }));
            
            const reply = await getBotResponse(history, userMsg, language);
            setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
        } catch (error) {
            setMessages(prev => [...prev, { sender: 'bot', text: t('bot_error_generic') }]);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageContainer title={t('page_title_bot')}>
            <div className="flex flex-col h-[60vh] bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-green-500 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-start">
                             <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none">
                                <div className="flex space-x-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-200 flex gap-2">
                    <input 
                        type="text" 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && handleSend()}
                        placeholder={t('bot_input_placeholder')}
                        className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button onClick={handleSend} disabled={loading || !input.trim()} className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors disabled:bg-gray-300">
                        <SendIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </PageContainer>
    );
};

const HealthJourneyPage = ({ waterGoal }: { waterGoal: number }) => {
    const { t, language } = useLanguage();
    
    // --- State Initialization ---
    // Badge Tracking
    const [badges, setBadges] = useState<Badge[]>([
        { id: 'water', name: 'badge_water_name', description: 'badge_water_desc', earned: false, icon: DropletIcon },
        { id: 'veggie', name: 'badge_veggie_name', description: 'badge_veggie_desc', earned: false, icon: LeafIcon },
        { id: 'chef', name: 'badge_chef_name', description: 'badge_chef_desc', earned: false, icon: ChefHatIcon },
    ]);

    // Daily Counters
    const [waterCount, setWaterCount] = useState<number>(0);
    const [veggieCount, setVeggieCount] = useState<number>(0);
    const [lastActiveDate, setLastActiveDate] = useState<string>('');

    // Load persisted state
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const savedDate = localStorage.getItem('nutribuddy_last_active_date');
        
        // Load counts
        if (savedDate === today) {
            const savedWater = parseInt(localStorage.getItem('nutribuddy_water_count') || '0', 10);
            const savedVeggie = parseInt(localStorage.getItem('nutribuddy_veggie_count') || '0', 10);
            setWaterCount(savedWater);
            setVeggieCount(savedVeggie);
        } else {
            // Reset if new day
            setWaterCount(0);
            setVeggieCount(0);
            localStorage.setItem('nutribuddy_last_active_date', today);
        }
        setLastActiveDate(today);

        // Load badges
        const savedBadges = localStorage.getItem('nutribuddy_badges');
        if (savedBadges) {
            const parsedBadges = JSON.parse(savedBadges);
            setBadges(prev => prev.map(b => {
                const saved = parsedBadges.find((p: any) => p.id === b.id);
                return saved ? { ...b, earned: saved.earned } : b;
            }));
        }
    }, []);

    // Persist state changes
    useEffect(() => {
        localStorage.setItem('nutribuddy_water_count', waterCount.toString());
        localStorage.setItem('nutribuddy_veggie_count', veggieCount.toString());
        // Simplify badges for storage (avoid circular ref with icon component)
        const badgesToSave = badges.map(({ id, earned }) => ({ id, earned }));
        localStorage.setItem('nutribuddy_badges', JSON.stringify(badgesToSave));
    }, [waterCount, veggieCount, badges]);

    // --- Interaction Handlers ---
    const handleWaterInc = () => {
        if (waterCount < waterGoal) {
            const newCount = waterCount + 1;
            setWaterCount(newCount);
            if (newCount >= waterGoal) {
                unlockBadge('water');
            }
        }
    };

    const handleVeggieInc = () => {
        if (veggieCount < 5) {
            const newCount = veggieCount + 1;
            setVeggieCount(newCount);
            if (newCount >= 5) {
                unlockBadge('veggie');
            }
        }
    };

    const unlockBadge = (id: string) => {
        setBadges(prev => prev.map(b => b.id === id && !b.earned ? { ...b, earned: true } : b));
    };

    // --- Other State ---
    const [weight, setWeight] = useState('');
    const [weightHistory, setWeightHistory] = useState<WeightEntry[]>(() => {
        try {
            return JSON.parse(localStorage.getItem('nutribuddy_weight_history') || '[]');
        } catch { return []; }
    });
    
    // Food Log
    const [foodLog, setFoodLog] = useState<FoodLogEntry[]>(() => {
        try {
            return JSON.parse(localStorage.getItem('nutribuddy_food_log') || '[]');
        } catch { return []; }
    });
    const [newFoodName, setNewFoodName] = useState('');
    const [newFoodCalories, setNewFoodCalories] = useState('');
    const [newFoodMealType, setNewFoodMealType] = useState<MealTypeKey>('breakfast');
    const [estimatingCalories, setEstimatingCalories] = useState(false);

    // Analysis
    const [analysis, setAnalysis] = useState('');
    const [analyzing, setAnalyzing] = useState(false);

    // Reminders
    const [reminders, setReminders] = useState<Record<string, boolean>>({
        water: false, walk: false, breakfast: false, lunch: false, dinner: false, sleep: false
    });

    // --- Effects & Helpers ---
    useEffect(() => {
        localStorage.setItem('nutribuddy_weight_history', JSON.stringify(weightHistory));
    }, [weightHistory]);

    useEffect(() => {
        localStorage.setItem('nutribuddy_food_log', JSON.stringify(foodLog));
    }, [foodLog]);

    const handleAddWeight = (e: React.FormEvent) => {
        e.preventDefault();
        if (!weight) return;
        const today = new Date().toISOString().split('T')[0];
        const newEntry = { date: today, weight: parseFloat(weight) };
        setWeightHistory(prev => {
            const filtered = prev.filter(p => p.date !== today);
            return [...filtered, newEntry].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        });
        setWeight('');
    };

    const handleAnalyzeHabits = async () => {
        const favorites = JSON.parse(localStorage.getItem('nutribuddy_favorites') || '[]');
        if (favorites.length === 0) {
            setAnalysis(t('journey_analysis_no_favorites'));
            return;
        }
        setAnalyzing(true);
        try {
            const result = await analyzeEatingHabits(favorites, language);
            setAnalysis(result);
        } catch (err) {
            setAnalysis(t('journey_analysis_error'));
        } finally {
            setAnalyzing(false);
        }
    };

    const toggleReminder = (key: string) => {
        setReminders(prev => {
            const newState = { ...prev, [key]: !prev[key] };
            if (newState[key] && 'Notification' in window) {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                         new Notification('NutriBuddy', { body: t('journey_reminder_notification_body', { reminder: t(`journey_reminder_${key}`) }) });
                    }
                });
            }
            return newState;
        });
    };

    const handleEstimateCalories = async () => {
        if (!newFoodName) return;
        setEstimatingCalories(true);
        try {
            const result = await getFoodCalories(newFoodName, language);
            setNewFoodCalories(result.calories.toString());
        } catch (error) {
            alert(t('journey_log_calories_error'));
        } finally {
            setEstimatingCalories(false);
        }
    };

    const handleAddFoodLog = () => {
        if (!newFoodName || !newFoodCalories) return;
        const entry: FoodLogEntry = {
            id: Date.now().toString(),
            date: new Date().toISOString().split('T')[0],
            mealType: newFoodMealType,
            foodName: newFoodName,
            calories: parseInt(newFoodCalories),
        };
        setFoodLog(prev => [entry, ...prev]);
        setNewFoodName('');
        setNewFoodCalories('');
    };

    const todayLog = useMemo(() => {
        const today = new Date().toISOString().split('T')[0];
        return foodLog.filter(e => e.date === today);
    }, [foodLog]);

    const totalCaloriesToday = useMemo(() => todayLog.reduce((acc, curr) => acc + curr.calories, 0), [todayLog]);

    return (
        <PageContainer title={t('page_title_journey')}>
            <div className="space-y-8 pb-10">
                
                {/* 1. Health Analysis */}
                <section className="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold text-green-600 flex items-center gap-2 mb-4">
                        <BookOpenIcon className="w-6 h-6"/> {t('journey_section_analysis_report')}
                    </h3>
                    
                    {/* Charts */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-gray-700 mb-2">{t('journey_subsection_progress')}</h4>
                         <div className="h-64 w-full bg-gray-50 rounded-lg p-2 flex items-center justify-center">
                            {weightHistory.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={weightHistory}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis domain={['auto', 'auto']} />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="weight" name={t('journey_chart_weight_label')} stroke="#22c55e" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <p className="text-gray-400 text-center text-sm" dangerouslySetInnerHTML={{__html: t('journey_chart_no_data')}}></p>
                            )}
                        </div>
                        <form onSubmit={handleAddWeight} className="mt-4 flex gap-2">
                             <input 
                                type="number" 
                                step="0.1" 
                                value={weight} 
                                onChange={e => setWeight(e.target.value)} 
                                placeholder={t('journey_weight_input_placeholder')}
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            />
                            <button type="submit" className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600">
                                <PlusIcon />
                            </button>
                        </form>
                    </div>

                    {/* AI Insight */}
                    <div className="border-t border-gray-100 pt-6">
                         <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2"><SparklesIcon className="text-yellow-500"/> {t('journey_subsection_nutribuddy_insight')}</h4>
                         {analysis ? (
                             <div className="bg-green-50 p-4 rounded-xl text-gray-700 italic border-l-4 border-green-400 animate-fade-in">
                                 "{analysis}"
                             </div>
                         ) : (
                             <div className="text-center">
                                 <p className="text-gray-500 text-sm mb-3">{t('journey_analysis_prompt')}</p>
                                 <button onClick={handleAnalyzeHabits} disabled={analyzing} className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-orange-600 transition-colors disabled:bg-gray-300">
                                     {analyzing ? t('journey_analysis_button_loading') : t('journey_analysis_button_submit')}
                                 </button>
                             </div>
                         )}
                    </div>
                </section>

                {/* 2. Management & Tracking */}
                <section className="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold text-green-600 flex items-center gap-2 mb-4">
                        <BarChart3Icon className="w-6 h-6"/> {t('journey_section_management_tracking')}
                    </h3>

                    {/* Food Log */}
                    <div className="mb-6">
                         <h4 className="font-semibold text-gray-700 mb-2">{t('journey_subsection_food_log')}</h4>
                         <div className="flex flex-col gap-2 mb-4 bg-gray-50 p-3 rounded-xl">
                            <select 
                                value={newFoodMealType} 
                                onChange={e => setNewFoodMealType(e.target.value as MealTypeKey)}
                                className="border border-gray-300 rounded-md p-2 text-sm"
                            >
                                <option value="breakfast">{t('meal_type_breakfast')}</option>
                                <option value="lunch">{t('meal_type_lunch')}</option>
                                <option value="dinner">{t('meal_type_dinner')}</option>
                                <option value="snack">{t('meal_type_snack')}</option>
                            </select>
                            <input 
                                type="text" 
                                placeholder={t('journey_log_food_name_placeholder')}
                                value={newFoodName}
                                onChange={e => setNewFoodName(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 text-sm"
                            />
                            <div className="flex gap-2">
                                <input 
                                    type="number" 
                                    placeholder={t('journey_log_calories_placeholder')}
                                    value={newFoodCalories}
                                    onChange={e => setNewFoodCalories(e.target.value)}
                                    className="border border-gray-300 rounded-md p-2 text-sm flex-1"
                                />
                                <button onClick={handleEstimateCalories} disabled={estimatingCalories || !newFoodName} className="bg-blue-100 text-blue-600 px-3 py-2 rounded-md text-xs font-bold hover:bg-blue-200 disabled:opacity-50">
                                    {estimatingCalories ? '...' : t('journey_log_ai_estimate_button')}
                                </button>
                            </div>
                            <button onClick={handleAddFoodLog} disabled={!newFoodName || !newFoodCalories} className="bg-green-500 text-white py-2 rounded-md font-bold hover:bg-green-600 disabled:bg-gray-300">
                                <PlusIcon className="w-5 h-5 mx-auto"/>
                            </button>
                         </div>

                         <div>
                             <div className="flex justify-between items-center mb-2">
                                 <span className="text-sm font-bold text-gray-600">{t('journey_log_today_title')}</span>
                                 <span className="text-sm font-bold text-green-600">{t('journey_log_total_today')}: {totalCaloriesToday} kcal</span>
                             </div>
                             {todayLog.length === 0 ? (
                                 <p className="text-gray-400 text-xs italic">{t('journey_log_empty_today')}</p>
                             ) : (
                                 <ul className="space-y-2">
                                     {todayLog.map(entry => (
                                         <li key={entry.id} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg text-sm">
                                             <span><span className="font-bold text-gray-500 text-xs uppercase mr-2">{entry.mealType.charAt(0)}</span>{entry.foodName}</span>
                                             <span className="font-semibold text-gray-700">{entry.calories}</span>
                                         </li>
                                     ))}
                                 </ul>
                             )}
                         </div>
                    </div>

                    {/* Reminders */}
                    <div className="border-t border-gray-100 pt-6">
                        <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2"><BellIcon className="text-blue-500"/> {t('journey_subsection_reminders')}</h4>
                        <p className="text-xs text-gray-500 mb-3">{t('journey_reminders_subtitle')}</p>
                        <div className="grid grid-cols-2 gap-3">
                            {Object.keys(reminders).map(key => (
                                <button 
                                    key={key} 
                                    onClick={() => toggleReminder(key)}
                                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors border ${reminders[key] ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                                >
                                    {t(`journey_reminder_${key}`)}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. Badges Collection */}
                <section className="bg-white p-6 rounded-2xl shadow-lg">
                     <h3 className="text-xl font-bold text-green-600 flex items-center gap-2 mb-4">
                        <TrophyIcon className="w-6 h-6"/> {t('journey_section_badges')}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {badges.map(badge => {
                            const Icon = badge.icon;
                            // Helper to render tracking UI
                            const renderTracking = () => {
                                if (badge.id === 'water') {
                                    return (
                                        <div className="mt-2 flex flex-col items-center">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 dark:bg-gray-200">
                                                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${Math.min((waterCount / waterGoal) * 100, 100)}%` }}></div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-blue-600">{waterCount}/{waterGoal}</span>
                                                {!badge.earned && (
                                                    <button onClick={handleWaterInc} className="bg-blue-100 text-blue-600 rounded-full p-1 hover:bg-blue-200 transition-colors">
                                                        <PlusIcon className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                }
                                if (badge.id === 'veggie') {
                                    return (
                                        <div className="mt-2 flex flex-col items-center">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 dark:bg-gray-200">
                                                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${Math.min((veggieCount / 5) * 100, 100)}%` }}></div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-green-600">{veggieCount}/5</span>
                                                {!badge.earned && (
                                                    <button onClick={handleVeggieInc} className="bg-green-100 text-green-600 rounded-full p-1 hover:bg-green-200 transition-colors">
                                                        <PlusIcon className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            };

                            return (
                                <div key={badge.id} className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${badge.earned ? 'border-yellow-400 bg-yellow-50 transform scale-105' : 'border-gray-200 grayscale opacity-70'}`}>
                                    <div className={`p-3 rounded-full mb-2 ${badge.earned ? 'bg-yellow-200' : 'bg-gray-200'}`}>
                                        <Icon className={`w-8 h-8 ${badge.earned ? 'text-yellow-600' : 'text-gray-500'}`} />
                                    </div>
                                    <h4 className="font-bold text-gray-800 text-center">{t(badge.name)}</h4>
                                    <p className="text-xs text-center text-gray-500 mt-1">{t(badge.description)}</p>
                                    {renderTracking()}
                                </div>
                            );
                        })}
                    </div>
                </section>
                
                {/* 4. Favorites List */}
                <section className="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold text-green-600 flex items-center gap-2 mb-4">
                        <HeartIcon className="w-6 h-6" filled/> {t('journey_section_favorites')}
                    </h3>
                    {(() => {
                        const favs = JSON.parse(localStorage.getItem('nutribuddy_favorites') || '[]');
                        if (favs.length === 0) return <p className="text-gray-500 text-center italic">{t('journey_favorites_empty')}</p>;
                        return (
                            <div className="flex flex-wrap gap-2">
                                {favs.map((f: string, i: number) => (
                                    <span key={i} className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-medium">{f}</span>
                                ))}
                            </div>
                        )
                    })()}
                </section>
            </div>
        </PageContainer>
    );
};

const GreenNutritionPage = () => {
    const { t, language } = useLanguage();
    const [suggestions, setSuggestions] = useState<GreenFood[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLoadSuggestions = async () => {
        setLoading(true);
        setError('');
        try {
            const result = await getGreenFoodSuggestions(language);
            setSuggestions(result);
        } catch (err) {
            setError(t('green_error_generic'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageContainer title={t('page_title_green')}>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex flex-col items-center text-center mb-6">
                    <div className="bg-green-100 p-4 rounded-full mb-4">
                        <SproutIcon className="w-12 h-12 text-green-600" />
                    </div>
                    <p className="text-gray-700 text-lg mb-6">{t('green_intro')}</p>
                    <button 
                        onClick={handleLoadSuggestions} 
                        disabled={loading}
                        className="bg-green-600 text-white font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-transform transform hover:scale-105 disabled:bg-gray-400"
                    >
                        {loading ? t('green_button_loading') : t('green_button_submit')}
                    </button>
                </div>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {suggestions.length > 0 && (
                    <div className="grid gap-4 sm:grid-cols-2 animate-fade-in-up">
                        {suggestions.map((item, index) => (
                            <div key={index} className="border border-green-100 rounded-xl p-4 hover:shadow-md transition-shadow bg-green-50/50">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-3xl">{item.emoji}</span>
                                    <h4 className="font-bold text-lg text-green-800">{item.tenThucPham}</h4>
                                </div>
                                <p className="text-gray-700 text-sm mb-2">{item.moTa}</p>
                                <div className="bg-white p-2 rounded-lg text-xs text-green-700 font-medium">
                                    🌍 {item.lyDoThanThien}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </PageContainer>
    );
};
// #endregion
