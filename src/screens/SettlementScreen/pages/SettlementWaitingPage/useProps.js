
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

  const [terminalId, setTerminalId] = React.useState(null);
  const [valueNote, setValueNote] = React.useState("");
  const [countFetchhing, setCountFetching] = React.useState(0);

  const [noteValue] = useFetchSettlementWaiting();

  const {
    settlement: {
      settlementWaiting = {},
      listStaffSales = [],
      listGiftCardSales = [],

    },
    hardware: { 
      cloverMachineInfo, 
      dejavooMachineInfo, 
      paymentMachineType 
    },
  } = useSelector(state => state);

  const [, fetchGiftCardSalesBySettlementId] = useAxiosQuery({
    ...getGiftCardSalesBySettlementId(),
    queryId: "fetchGiftCardSalesBySettlementId_settlementWaiting",
    enabled: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(settlement.setListGiftCardSales(data))
      }
    }
  });

  const [, fetchListGiftCardSales] = useAxiosQuery({
    ...getListGiftCardSales(terminalId),
    queryId: "fetchListGiftCardSales_settlementWaiting",
    enabled: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(settlement.setListGiftCardSales(data))
      }
    }
  });

  const [, fetchListStaffsSales] = useAxiosQuery({
    ...getListStaffsSales(terminalId),
    queryId: "fetchListStaffsSales_settlementWaiting",
    enabled: false,
    isStopLoading: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(settlement.setListStaffsSales(data));
      }
    }
  });

  const [, fetchSettlementWating] = useAxiosQuery({
    ...getSettlementWating(terminalId, paymentMachineType.toLowerCase()),
    queryId: "fetchSettlementWating_settlementWaiting",
    enabled: false,
    isStopLoading: true,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(settlement.setSettlementWaiting(data));
        setValueNote(data?.note || "");
      }
    }
  });

  React.useEffect(() => {
    if (noteValue) {
      setValueNote(noteValue);
    }
  }, [noteValue])

  React.useEffect(() => {
    let terminalId = null
    if (paymentMachineType == PaymentTerminalType.Clover
        && _.get(cloverMachineInfo, 'isSetup')) {
          terminalId = _.get(cloverMachineInfo, 'serialNumber')
    } else if (paymentMachineType == PaymentTerminalType.Dejavoo
              && _.get(dejavooMachineInfo, 'isSetup')) {
        terminalId = _.get(dejavooMachineInfo, 'sn')
    }
    setTerminalId(terminalId)
   
  }, []);


  React.useEffect(() => {

    const body = getListStaffsSales(terminalId);
    fetchListStaffsSales(body.params);

    const bodyGiftCard = getListGiftCardSales(terminalId)
    fetchListGiftCardSales(bodyGiftCard.params);

    const terminalType = paymentMachineType ? paymentMachineType.toLowerCase() : ""
    const bodySettleWaiting = getSettlementWating(terminalId, terminalType)
    fetchSettlementWating(bodySettleWaiting.params);
    
  }, [terminalId]);

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
