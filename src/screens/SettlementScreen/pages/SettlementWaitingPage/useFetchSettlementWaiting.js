
import React from "react";
import {
    useAxiosQuery,
    getListStaffsSales,
    getListGiftCardSales,
    getSettlementWating,
} from "@src/apis";
import { settlement, app } from "@redux/slices";
import { useSelector, useDispatch } from "react-redux";

const useFetchSettlementWaiting = () => {
    const dispatch = useDispatch();
    const {
        hardware: { 
          cloverMachineInfo, 
          dejavooMachineInfo, 
          paymentMachineType 
        },
      } = useSelector(state => state);

    const [responseListGiftCardSales, setResponseListGiftCardSales] = React.useState(null);
    const [responseListStaffSales, setResponseListStaffSales] = React.useState(null);
    const [responseSettlementWaiting, setResponseSettlementWaiting] = React.useState(null);
    const [valueNote, setValueNote] = React.useState("");

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
        dispatch(app.showLoading());

        const body = getListStaffsSales(terminalId);
        fetchListStaffsSales(body.params);

        const bodyGiftCard = getListGiftCardSales(terminalId)
        fetchListGiftCardSales(bodyGiftCard.params);

        const terminalType = paymentMachineType ? paymentMachineType.toLowerCase() : ""
        const bodySettleWaiting = getSettlementWating(terminalId, terminalType)
        fetchSettlementWating(bodySettleWaiting.params);
    
    }, [terminalId]);

    // React.useEffect(() => {
    //     dispatch(app.showLoading());
    //     fetchSettlementWating();
    //     fetchListStaffsSales();
    //     fetchListGiftCardSales();
    // }, []);

    React.useEffect(() => {
        if (responseListStaffSales && responseListGiftCardSales && responseSettlementWaiting) {
            dispatch(app.hideLoading());
        }
    }, [
        responseListStaffSales,
        responseListGiftCardSales,
        responseSettlementWaiting
    ])

    return [valueNote];
};

export default useFetchSettlementWaiting;