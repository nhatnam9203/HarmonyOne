import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBannerMerchant, getMerchantById, useAxiosQuery } from "@src/apis";
import { InteractionManager } from "react-native";
import { merchant } from "@redux/slices";

export const useProps = (_params) => {
  const dispatch = useDispatch();

  const [latitude,] = React.useState("");


  const {
    merchant: { merchantDetail = {}, bannersMerchant = [] },
    auth: { staff }
  } = useSelector(state => state);

  const [isReady, setReady] = React.useState(false)

  React.useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setReady(true);
    });
  }, []);

  const [, fetchBannerMerchant] = useAxiosQuery({
    ...getBannerMerchant(staff?.merchantId),
    enabled: false,
    isLoadingDefault: isReady,
    onSuccess: (data, response) => {
      if (response.codeNumber == 200) {
        dispatch(merchant.setBannerMerchant(data));
      }
    }
  });

  /************************************** GET MERCHANT INFO ***************************************/
  const [, fetchMerchantById] = useAxiosQuery({
    ...getMerchantById(staff?.merchantId),
    queryId: "fetchMerchantById_businessPage",
    enabled: false,
    isLoadingDefault: isReady,
    onSuccess: (data, response) => {
      dispatch(merchant.setMerchantDetail(data));
    },
  });

  React.useEffect(() => {
    fetchBannerMerchant();
    fetchMerchantById();
  }, []);


  return {
    merchantDetail,
    bannersMerchant,
    isReady
  };
};
