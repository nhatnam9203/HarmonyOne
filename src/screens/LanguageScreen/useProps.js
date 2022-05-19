import { useLayoutEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dataLocal } from "@redux/slices";
import NavigationService from "@navigation/NavigationService";
import { setI18nConfig } from "@localize";

export const useProps = (props) => {
  const dispatch = useDispatch();
  const language = useSelector(state => state.dataLocal.language);

  const [lang, setLang] = useState('en');

  useLayoutEffect(() => {
    setLang(language);
  }, []);

  return {
    language,
    lang,
    setLang,
    switchLanguage: () => {
      dispatch(dataLocal.changeLanguage(lang));
      setI18nConfig(lang);
      NavigationService.back();
    },
  };

};
