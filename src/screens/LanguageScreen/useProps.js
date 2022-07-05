import { useLayoutEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dataLocal } from "@redux/slices";
import NavigationService from "@navigation/NavigationService";
import { setI18nConfig } from "@localize";
import { useChangeLanguage } from '@shared/providers/LanguageProvider';

export const useProps = (props) => {
  const dispatch = useDispatch();

  const [lang, setLang] = useState('en');
  const language = useSelector(state => state.dataLocal.language);

  const [changeLanguage] = useChangeLanguage();


  useLayoutEffect(() => {
    setLang(language);
  }, []);

  return {
    lang,
    setLang,
    switchLanguage: () => {
      dispatch(dataLocal.changeLanguage(lang));
      changeLanguage(lang);

      NavigationService.back();
    },
  };

};
