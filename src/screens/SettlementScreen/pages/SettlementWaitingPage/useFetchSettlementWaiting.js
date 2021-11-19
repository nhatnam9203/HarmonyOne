
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

    const [responseListGiftCardSales, setResponseListGiftCardSales] = React.useState(null);
    const [responseListStaffSales, setResponseListStaffSales] = React.useState(null);
    const [responseSettlementWaiting, setResponseSettlementWaiting] = React.useState(null);
    const [valueNote, setValueNote] = React.useState("");


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
        ...getListStaffsSales(),
        queryId: "fetchListStaffsSales_settlementWaiting",
        enabled: false,
        isLoadingDefault: false,
        isStopLoading: true,
        onSuccess: (data, response) => {
            setResponseListStaffSales(response);
            if (response?.codeNumber == 200) {
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
            setResponseSettlementWaiting(response);
            if (response?.codeNumber == 200) {
                dispatch(settlement.setSettlementWaiting(data));
                setValueNote(data?.note || "");
            }
        }
    });


    React.useEffect(() => {
        dispatch(app.showLoading());
        fetchSettlementWating();
        fetchListStaffsSales();
        fetchListGiftCardSales();
    }, []);

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