
import React from "react";
import {
  useAxiosQuery,
  getListStaffsSales,
  getListGiftCardSales,
  getSettlementWating,
  getGiftCardSalesBySettlementId
} from "@src/apis";
import { settlement } from "@redux/slices";
import { useSelector, useDispatch } from "react-redux";
import NavigationService from '@navigation/NavigationService';

export const useProps = (props) => {
  const dispatch = useDispatch();

  const [valueNote, setValueNote] = React.useState("66876");

  const {
    settlement: {
      settlementWaiting = {},
      listStaffSales = [],
      listGiftCardSales = [],

    }
  } = useSelector(state => state);

  const [, fetchGiftCardSalesBySettlementId] = useAxiosQuery({
    ...getGiftCardSalesBySettlementId(),
    queryId: "fetchGiftCardSalesBySettlementId_settlementWaiting",
    enabled: false,
    onSuccess: (data, response) => {
      console.log('get list giftcard sales : ', { response })
      if (response?.codeNumber == 200) {
        dispatch(settlement.setListGiftCardSales(data))
      }
    }
  });

  const [, fetchListGiftCardSales] = useAxiosQuery({
    ...getListGiftCardSales(),
    queryId: "fetchListGiftCardSales_settlementWaiting",
    enabled: false,
    onSuccess: (data, response) => {
      console.log('get list giftcard sales : ', { response })
      if (response?.codeNumber == 200) {
        dispatch(settlement.setListGiftCardSales(data))
      }
    }
  });

  const [, fetchListStaffsSales] = useAxiosQuery({
    ...getListStaffsSales(),
    queryId: "fetchListStaffsSales_settlementWaiting",
    enabled: false,
    isStopLoading: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(settlement.setListStaffsSales(data));
        fetchSettlementWating();
      }
    }
  });

  const [, fetchSettlementWating] = useAxiosQuery({
    ...getSettlementWating(),
    queryId: "fetchSettlementWating_settlementWaiting",
    enabled: false,
    isStopLoading: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        console.log('get settlement wauting: ', { response })
        dispatch(settlement.setSettlementWaiting(data));
        setValueNote(data?.note || "");
      }
    }
  });


  React.useEffect(() => {
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
