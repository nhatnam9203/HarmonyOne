
import React from "react";
import {
  useAxiosQuery,
  getListStaffsSales,
  getListGiftCardSales,
  getSettlementWating,
} from "@src/apis";
import { settlement } from "@redux/slices";
import { useSelector, useDispatch } from "react-redux";
import NavigationService from '@navigation/NavigationService';

export const useProps = (props) => {
  const dispatch = useDispatch();

  const [valueNote,setValueNote] = React.useState("66876");

  const {
    settlement: { 
      settlementWaiting = {},
      listStaffSales = [],
      listGiftCardSales = [],
    
    }
  } = useSelector(state => state);

  const [, fetchListGiftCardSales] = useAxiosQuery({
    ...getListGiftCardSales(),
    enabled: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(settlement.setListGiftCardSales(data))
      }
    }
  });

  const [, fetchListStaffsSales] = useAxiosQuery({
    ...getListStaffsSales(),
    enabled: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(settlement.setListStaffsSales(data))
      }
    }
  });

  const [, fetchSettlementWating] = useAxiosQuery({
    ...getSettlementWating(),
    enabled: false,
    onSuccess: (data, response) => {
      if (response?.codeNumber == 200) {
        dispatch(settlement.setSettlementWaiting(data));
        setValueNote(data?.note || "");
      }
    }
  });

  
  React.useEffect(() => {
    fetchSettlementWating();
    fetchListGiftCardSales();
    fetchListStaffsSales();
  }, []);

  return {        
    settlementWaiting,
    listStaffSales,
    listGiftCardSales,
    valueNote,
    onChangeNote : (note) =>{
      setValueNote(note)
    },

    editActualAmount : () =>{
      NavigationService.navigate(screenNames.EditActualAmountPage);
    }
  };
};
