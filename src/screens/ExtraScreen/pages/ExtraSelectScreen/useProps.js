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
  const extrasPassed = props?.route?.params?.extrasSelection || [];
  const dispatch = useDispatch();
  const [valueSearch, setSearchValue] = React.useState("");
  const [isRefresh, setRefresh] = React.useState(false);
  const [extrasSelection, setExtrasSelection] = React.useState([]);

  const {
    extra: { extras = [] },
  } = useSelector(state => state);

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

  React.useEffect(() => {
    if (extrasPassed?.length == 0) {
      setExtrasSelection(
        extras.filter(
          ex => ex.isDisabled == 0 && ex.isDeleted == 0
        ).map(
          (ex) => ({ ...ex, checked: false })
        )
      );
    } else {
      setExtrasSelection(extrasPassed);
    }
  }, []);

  return {

    valueSearch,
    isRefresh,
    extrasSelection,

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

    onRefresh: () => {
      setRefresh(true)
    },

    selectExtra: (item) => {
      const findIndex = extrasSelection.findIndex(
        ex => ex?.extraId == item?.extraId
      );
      if (findIndex !== -1) {
        let tempExtra = [...extrasSelection];
        tempExtra[findIndex].checked = !tempExtra[findIndex].checked;
        setExtrasSelection(tempExtra);
      }
    },

    apply: () => {
      NavigationService.navigate(
        screenNames.ServiceNewScreen,
        { extrasSelection }
      );
    },

    getData: () => {
      let extrasList = extrasSelection;
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
