import React from "react";
import { useTranslation } from "react-i18next";
import { colors } from "@shared/themes";
import { getPromotionMerchant, useAxiosQuery, sendStartPromotionById, useAxiosMutation } from "@src/apis";
import { useDispatch, useSelector } from "react-redux";
import { marketing, app } from "@redux/slices";
import { axios } from '@shared/services/axiosClient';
import NavigationService from '@navigation/NavigationService';


export const useProps = (_params) => {
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const dialogSendMessageRef = React.useRef();

  const {
    marketing: { promotion = [] },
    auth: { staff }
  } = useSelector(state => state);

  const [promotionIdSend, setPromotionIdSend] = React.useState(null);

  const [, fetchPromotion] = useAxiosQuery({
    ...getPromotionMerchant(),
    queryId: "getCampaign",
    enabled: false,
    onSuccess: (data, response) => {
      if (response.codeNumber == 200) {
        dispatch(marketing.setPromotion(data));
      }
    },
  });

  const [, submitSendPromotionById] = useAxiosMutation({
    ...sendStartPromotionById(),
    queryId: "submitSendPromotionById_campaignScreen",
    onSuccess: (data, response) => {
      fetchPromotion();
    },

    onLoginError: () => {

    }
  });

  const getCampaignDetail = async (promotionId) => {
    dispatch(app.showLoading());
    const params = {
      url: `MerchantPromotion/${promotionId}?api-version=1.2`,
      method: "GET",
    }
    try {
      const response = await axios(params);
      if (response?.data?.codeNumber == 200) {
        dispatch(marketing.setPromotionDetailById(response?.data?.data));
      }

    } catch (err) {

    } finally {
      dispatch(app.hideLoading());
    }
  }


  React.useEffect(() => {
    fetchPromotion();
  }, [])

  return {
    promotion,
    dialogSendMessageRef,
    setPromotionIdSend,

    newMarketing: () => {
      NavigationService.navigate(screenNames.MarketingNewScreen);
      dispatch(marketing.setPromotionDetailById(null));
    },

    editPromotion: (item) => {
      NavigationService.navigate(screenNames.MarketingNewScreen, { merchantPromotionId: item?.id, isViewDetail: true, });
      getCampaignDetail(item?.id);
    },

    sendPromotionById: async () => {
      if (promotionIdSend) {
        const body = await sendStartPromotionById(promotionIdSend);
        submitSendPromotionById(body.params);
      }
    }
  };
};
