
import React from "react";
import {
    useAxiosQuery,
    getListStaffsSales,
    getListGiftCardSales,
    getSettlementWating,
} from "@src/apis";
import { settlement, app } from "@redux/slices";
import { useSelector, useDispatch } from "react-redux";
import { PaymentTerminalType } from "@shared/utils";
import _ from "lodash";

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
    const [terminalId, setTerminalId] = React.useState(null);


    const [, fetchListGiftCardSales] = useAxiosQuery({
        ...getListGiftCardSales(),
        queryId: "fetchListGiftCardSales_settlementWaiting",
        enabled: false,
        isLoadingDefault: false,
        isStopLoading: true,
        onSuccess: (data, response) => {
            setResponseListGiftCardSales(response);
            if (response?.codeNumber == 200) {
                dispatch(settlement.setListGiftCardSales(data))
            }
        }
    });

    const [, fetchListStaffsSales] = useAxiosQuery({
        ...getListStaffsSales(terminalId),
        queryId: "fetchListStaffsSales_settlementWaiting",
        enabled: false,
        isLoadingDefault: false,
        isStopLoading: true,
        onSuccess: (data, response) => {
            setResponseListStaffSales(response);
            console.log('response list staff sales : ',{ data })
            if (response?.codeNumber == 200) {
                dispatch(settlement.setListStaffsSales(data));
            }
        }
    });

    const [, fetchSettlementWating] = useAxiosQuery({
        ...getSettlementWating(terminalId, paymentMachineType.toLowerCase()),
        queryId: "fetchSettlementWating_settlementWaiting",
        enabled: false,
        isLoadingDefault: false,
        isStopLoading: true,
        onSuccess: (data, response) => {
            setResponseSettlementWaiting(response);
            if (response?.codeNumber == 200) {
                dispatch(settlement.setSettlementWaiting(data));
                setValueNote(data?.note || "");
            }
        }
    });

    const resetSettlementWaiting = () =>{
        dispatch(settlement.setListGiftCardSales([]));
        dispatch(settlement.setListStaffsSales([]));
        dispatch(settlement.setSettlementWaiting({}));
        setValueNote("");
    }

    React.useEffect(()=>{
        resetSettlementWaiting()
    },[]);


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
        fetchSettlement();
    }, [terminalId]);

    const fetchSettlement = async() =>{
        dispatch(app.showLoading());

        const body = await getListStaffsSales(terminalId);
        fetchListStaffsSales(body.params);

        const bodyGiftCard = await getListGiftCardSales(terminalId)
        fetchListGiftCardSales(bodyGiftCard.params);

        const terminalType = paymentMachineType ? paymentMachineType.toLowerCase() : ""
        const bodySettleWaiting = await getSettlementWating(terminalId, terminalType)
        fetchSettlementWating(bodySettleWaiting.params);
    }




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