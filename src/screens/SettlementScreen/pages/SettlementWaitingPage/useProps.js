
import React from "react";
import {
  useAxiosQuery,
  getListStaffsSales,
  getListGiftCardSales,
  getSettlementWating,
} from "@src/apis";
import { settlement, app } from "@redux/slices";
import { useSelector, useDispatch } from "react-redux";
import { useQueries } from 'react-query';

import NavigationService from '@navigation/NavigationService';

export const useProps = (props) => {
  const dispatch = useDispatch();

  const [valueNote, setValueNote] = React.useState("");
  const [countFetchhing, setCountFetching] = React.useState(0);

  const {
    settlement: {
      settlementWaiting = {},
      listStaffSales = [],
      listGiftCardSales = [],

    }
  } = useSelector(state => state);

  const [, fetchListGiftCardSales] = useAxiosQuery({
    ...getListGiftCardSales(),
    queryId: "fetchListGiftCardSales_settlementWaiting",
    enabled: false,
    isLoadingDefault: false,
    isStopLoading: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        setCountFetching(count => count++);
        dispatch(settlement.setListGiftCardSales(data))
      }
    }
  });

  const [, fetchListStaffsSales] = useAxiosQuery({
    ...getListStaffsSales(),
    queryId: "fetchListStaffsSales_settlementWaiting",
    enabled: false,
    isLoadingDefault: false,
    isStopLoading: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        setCountFetching(count => count++);
        dispatch(settlement.setListStaffsSales(data));
      }
    }
  });

  const [, fetchSettlementWating] = useAxiosQuery({
    ...getSettlementWating(),
    queryId: "fetchSettlementWating_settlementWaiting",
    enabled: false,
    isLoadingDefault: false,
    isStopLoading: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        setCountFetching(count => count++);
        dispatch(settlement.setSettlementWaiting(data));
        setValueNote(data?.note || "");
      }
    }
  });

  React.useEffect(() => {
    if (countFetchhing == 3) {
      dispatch(app.hideLoading());
      setCountFetching(0);
    }
  }, [countFetchhing]);


  React.useEffect(() => {
    dispatch(app.showLoading());
    fetchSettlementWating();
    fetchListStaffsSales();
    fetchListGiftCardSales();
  }, []);

  return {
    settlementWaiting,
    listStaffSales,
    listGiftCardSales,
    valueNote,
    onChangeNote: (note) => {
      setValueNote(note)
    },

    editActualAmount: () => {
      NavigationService.navigate(screenNames.EditActualAmountPage);
    },

    reviewSettlement: () => {
      dispatch(settlement.updateNote(valueNote));
      NavigationService.navigate(screenNames.ReviewSettlementPage);
    },

    viewGiftCardSold: () => {
      if (listGiftCardSales?.length > 0) {
        NavigationService.navigate(screenNames.GiftCardSoldPage, { listGiftCardSales });
      }
    }
  };
};
