import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBannerMerchant, useAxiosQuery } from "@src/apis";
import { merchant } from "@redux/slices";

export const useProps = (_params) => {
  const dispatch = useDispatch();

  const [latitude,] = React.useState("");


  const {
    merchant: { merchantDetail = {}, bannersMerchant = [] },
    auth: { staff }
  } = useSelector(state => state);

  const [, fetchBannerMerchant] = useAxiosQuery({
    ...getBannerMerchant(staff?.merchantId),
    enabled: false,
    onSuccess: (data, response) => {
      if (response.codeNumber == 200) {
        dispatch(merchant.setBannerMerchant(data));
      }
    }
  });

  React.useEffect(() => {
    fetchBannerMerchant();
  }, []);


  return {
    merchantDetail,
    bannersMerchant,
  };
};
