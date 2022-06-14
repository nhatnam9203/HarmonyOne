import { useLayoutEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { dataLocal } from "@redux/slices";
import NavigationService from "@navigation/NavigationService";
import { setI18nConfig } from "@localize";
import CodePush from "react-native-code-push";

export const useProps = (props) => {
  const dispatch = useDispatch();

  const refLanguageLoading = useRef();

  const [lang, setLang] = useState('en');

  useLayoutEffect(() => {
    setLang(language);
  }, []);

  return {
    lang,
    setLang,
    switchLanguage: () => {
      dispatch(dataLocal.changeLanguage(lang));
      refLanguageLoading?.current?.show();

      setTimeout(() => {
        refLanguageLoading?.current?.hide()
      }, 2000);

      setTimeout(() => {
        CodePush.restartApp();
      }, 1800);
      // NavigationService.back();
    },
    refLanguageLoading,
  };

};
