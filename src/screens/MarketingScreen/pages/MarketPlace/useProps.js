import React from "react";
import { useTranslation } from "react-i18next";
import { colors } from "@shared/themes";
import { getMarketPlaces, useAxiosQuery } from "@src/apis";
import { useDispatch, useSelector } from "react-redux";
import { marketing } from "@redux/slices";
import { isEmpty } from "lodash";
import NavigationService from '@navigation/NavigationService';

export const useProps = (_params) => {
  const dispatch = useDispatch();
  const [t] = useTranslation();

  const [currentPage, setCurrentPage] = React.useState(1);

  const {
    marketing: { marketPlaces = [], pagesMarketPace = 0 }
  } = useSelector(state => state);

  const [{ isLoading }, fetchMarketPlaces] = useAxiosQuery({
    ...getMarketPlaces(currentPage),
    isLoadingDefault: currentPage == 1 ? true : false,
    enabled: true,
    onSuccess: (data, response) => {
      if (response.codeNumber == 200) {
        dispatch(marketing.setMarketPlaces({
          ...response,
          currentPage,
        }));
      }
    },
  })

  return {
    marketPlaces,
    isLoading,
    currentPage,

    loadMore : () =>{
      if (currentPage < pagesMarketPace){
        setCurrentPage(currentPage + 1)
      }
    }
  };
};
