import React from "react";
import {
  useAxiosQuery,
  useAxiosMutation,
  getExtra,
} from '@src/apis';

import { service, product, category, extra } from '@redux/slices';
import { useSelector, useDispatch } from "react-redux";
import { colors } from "@shared/themes";
import { useTranslation } from "react-i18next";
import NavigationService from '@navigation/NavigationService'

export const useProps = (props) => {
  const dispatch = useDispatch();

  const [valueSearch, setSearchValue] = React.useState("");
  const [isRefresh, setRefresh] = React.useState(false);

  const {
    extra: { extras },
  } = useSelector(state => state)

  const [t] = useTranslation();

  const [, getExtraList] = useAxiosQuery({
    ...getExtra(),
    isLoadingDefault: true,
    enabled: false,
    onSuccess: (data, response) => {
      dispatch(extra.setExtraList(data));
      setRefresh(false);
    },
  });

  const refreshList = () => {
    getExtraList();
    setSearchValue("");
  }

  React.useEffect(()=>{
    if(isRefresh){
      getExtraList();
    }
  },[isRefresh])

  React.useEffect(() => {
    getExtraList();
  }, [])

  return {

    valueSearch,
    isRefresh,

    onChangeSearch: (vl) => {
      setSearchValue(vl);
    },

    newExtra: () => {
      NavigationService.navigate(
        screenNames.ExtraNewScreen, { refreshList }
      );
    },

    editExtra: (item) => {
      NavigationService.navigate(
        screenNames.ExtraNewScreen,
        { isEdit: true, extraEdit: item, refreshList }
      );
    },

    onRefresh : () =>{
      setRefresh(true)
    },

    getData: () => {
      let extrasList = extras;
      if (valueSearch) {
        extrasList = extrasList.filter((e) => {
          if (e !== null) {
            return (
              e.name
                .trim()
                .toLowerCase()
                .indexOf(valueSearch.toLowerCase()) !== -1
            );
          }
          return null;
        });
      }

      return extrasList;
    }
  };
};
