import React from "react";
import { useTranslation } from "react-i18next";
import { colors } from "@shared/themes";
import { getPromotionMerchant, useAxiosQuery } from "@src/apis";
import { useDispatch, useSelector } from "react-redux";
import { marketing } from "@redux/slices";
import NavigationService from '@navigation/NavigationService';

export const useProps = (_params) => {
  const dispatch = useDispatch();
  const [t] = useTranslation();

  const {
    marketing: { promotion = [] }
  } = useSelector(state => state);

  const [, fetchPromotion] = useAxiosQuery({
    ...getPromotionMerchant(),
    enabled: false,
    onSuccess: (data, response) => {
      if (response.codeNumber == 200) {
        dispatch(marketing.setPromotion(data));
      }
    },
  })

  React.useEffect(() => {
    fetchPromotion();
  }, [])

  return {
    promotion,

    newMarketing : () =>{
      NavigationService.navigate(screenNames.MarketingNewScreen);
    }
  };
};
