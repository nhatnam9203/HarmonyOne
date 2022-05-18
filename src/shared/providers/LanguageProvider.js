import React, { useEffect } from 'react'
import { setI18nConfig } from '@localize';

export const LanguageProvider = () => {

    const onChangeLanguage = async (lang = 'vi') => {
        try {
            let finalLang = lang;
            await setI18nConfig(lang);
        } catch (e) {
            Logger.debug(e, 'LanguageProvider Exception');
        }
    };

    useEffect(() => {
        onChangeLanguage("vi");
    }, []);

    return <></>;
}