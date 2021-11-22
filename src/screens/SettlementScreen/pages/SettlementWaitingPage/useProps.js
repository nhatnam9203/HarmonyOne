
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
import useFetchSettlementWaiting from "./useFetchSettlementWaiting";
import NavigationService from '@navigation/NavigationService';
import { PaymentTerminalType } from "@shared/utils";
import _ from "lodash";

export const useProps = (props) => {
  const dispatch = useDispatch();

  const [valueNote, setValueNote] = React.useState("");
  const [countFetchhing, setCountFetching] = React.useState(0);

  const [noteValue] = useFetchSettlementWaiting();

  const {
    settlement: {
      settlementWaiting = {},
      listStaffSales = [],
      listGiftCardSales = [],

    },
  } = useSelector(state => state);

  React.useEffect(() => {
    if (noteValue) {
      setValueNote(noteValue);
    }
  }, [noteValue])

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
