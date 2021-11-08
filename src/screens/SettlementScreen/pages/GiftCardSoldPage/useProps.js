import React from "react";
import {

} from "@src/apis";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import NavigationService from "@navigation/NavigationService";


export const useProps = (props) => {

  const form = useForm();
  const giftCardListRef = React.useRef();
  const [giftCarList, setGiftCardList] = React.useState([]);
  const [giftCardSelected, setGiftCardSelected] = React.useState("");

  const {
    settlement: { listGiftCardSales = [], }
  } = useSelector(state => state);

  React.useEffect(() => {
    let tempGiftCardList = listGiftCardSales.map((s) => ({ label: s?.name, value: s?.appointmentId }));
    tempGiftCardList = [{ label: "All type", value: "all" }, ...tempGiftCardList,];
    setGiftCardList(tempGiftCardList);
    setGiftCardSelected({ label: "All type", value: "all" });
  }, [listGiftCardSales]);


  return {
    form,
    giftCardListRef,
    giftCarList,
    giftCardSelected,
    listGiftCardSales,
    setGiftCardSelected,
    setGiftCardList,

    getGiftCardSelectedData: () => {
      let tempArr = [];
      const tempGiftCard = listGiftCardSales.find(obj => obj?.name == giftCardSelected?.label);
      if (tempGiftCard) {
        tempArr.push(tempGiftCard);
      }else{
        tempArr = listGiftCardSales;
      }

      return tempArr;
    }
  };
};
