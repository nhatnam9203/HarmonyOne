import React, { useEffect } from 'react'
import { setI18nConfig } from '@localize';
import { useSelector } from "react-redux";


export const useChangeLanguage = () => {
    const onChangeLanguage = async (lang = 'en') => {
        try {
            let finalLang = lang;
            await setI18nConfig(lang);
        } catch (e) {
            Logger.debug(e, 'LanguageProvider Exception');
        }
    };

    return [onChangeLanguage];

};

export const LanguageProvider = () => {
    const language = useSelector(state => state.dataLocal.language);

    const [onChangeLanguage] = useChangeLanguage();

    useEffect(() => {
        onChangeLanguage(language);
    }, []);

    return <></>;
}