import React, { createContext, useState, useContext, ReactNode, PropsWithChildren } from 'react';
import { resources } from '../i18n';

type Language = 'vi' | 'en' | 'ja' | 'zh';

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string, options?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// FIX: Changed props to use PropsWithChildren for better type safety.
export const LanguageProvider = ({ children }: PropsWithChildren<{}>) => {
    const [language, setLanguage] = useState<Language>('vi');

    const t = (key: string, options?: { [key: string]: string | number }): string => {
        // Safely access translation, falling back to English, then to the key itself.
        // This prevents crashes and showing raw keys if a translation is missing.
        // The type `any` allows indexing with a dynamic string `key`.
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

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};