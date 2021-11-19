
import React from "react";
import {
    useAxiosQuery,
    getListStaffsSales,
    getListGiftCardSales,
    getSettlementWating,
    getBatchHistory,
    getTransactions
} from "@src/apis";
import { settlement, app } from "@redux/slices";
import { useSelector, useDispatch } from "react-redux";

const useRefetchSettlementWaiting = () => {
    const dispatch = useDispatch();

    const [responseListGiftCardSales, setResponseListGiftCardSales] = React.useState(null);
    const [responseListStaffSales, setResponseListStaffSales] = React.useState(null);
    const [responseSettlementWaiting, setResponseSettlementWaiting] = React.useState(null);
    const [resoponseBatchHistory, setResoponseBatchHistory] = React.useState(null);
    const [responseTransactions, setResponseTransactions] = React.useState(null);


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
            }
        }
    });

    const [, fetchBatchHistory] = useAxiosQuery({
        ...getBatchHistory("", "", "", "", 1),
        queryId: "fetchBatchHistory_reviewSettlement",
        enabled: false,
        isLoadingDefault: false,
        isStopLoading: true,
        onSuccess: (data, response) => {
            setResoponseBatchHistory(response);
            if (response?.codeNumber == 200) {
                dispatch(settlement.setBatchHistory({
                    ...response,
                    currentPage: 1
                }));
            }
        },
    });

    const [, fetchTransactions] = useAxiosQuery({
        ...getTransactions(),
        queryId: "fetchTransactions_reviewSettlementPage",
        enabled: false,
        isLoadingDefault: false,
        isStopLoading: true,
        onSuccess: (data, response) => {
            setResponseTransactions(response);
            if (response?.codeNumber == 200) {
                dispatch(
                    settlement.setTransactions({
                        ...response,
                        currentPage: 1
                    }));
            }
        },
    });



    const refetchSettlementWaiting = () => {
        fetchSettlementWating();
        fetchTransactions();
        fetchListStaffsSales();
        fetchListGiftCardSales();
        fetchBatchHistory();
    }


    React.useEffect(() => {
        if (responseListStaffSales && responseListGiftCardSales && responseSettlementWaiting && resoponseBatchHistory && responseTransactions) {
            dispatch(app.hideLoading());
        }
    }, [
        responseListStaffSales,
        responseListGiftCardSales,
        responseSettlementWaiting,
        resoponseBatchHistory,
        responseTransactions,
    ])

    return [refetchSettlementWaiting];
};

export default useRefetchSettlementWaiting;