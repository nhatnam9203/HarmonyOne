import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { useAxiosQuery, getListCustomer } from '@src/apis';
import NavigationService from '@navigation/NavigationService';

export const useProps = (props) => {

    const [valueSearch, setValueSearch] = React.useState("");
    const [customerList, setCustomerList] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(1);
    const [isRefresh, setRefresh] = React.useState(false);

    const navigation = useNavigation();

    const [, refetch] = useAxiosQuery({
        ...getListCustomer(valueSearch, currentPage),
        isLoadingDefault : (!isRefresh && currentPage === 1) || currentPage < 2,
        onLoginSuccess: (data, response) => {
            if (currentPage === 1) {
                setCustomerList(data);
            } else {
                setCustomerList(customerList.concat(data));
            }
            setTotalPage(response.pages);
        },
    });

    React.useEffect(async () => {
        await refetch();
        if (isRefresh) {
            setRefresh(false);
        }
    }, [currentPage]);

    React.useEffect(async () => {
        if (isRefresh && currentPage === 1) {
            await refetch();
            setRefresh(false);
        }
    }, [isRefresh, currentPage]);

    return {
        valueSearch,
        customerList,
        isRefresh,

        onChangeSearch: (value) => {
            setValueSearch(value);
        },

        close: () => {
            NavigationService.back();
        },

        newCustomer: () => {
            navigation.navigate(screenNames.CustomerNewScreen);
        },

        loadMoreCustomerList: () => {
            if (currentPage < totalPage) {
                setCurrentPage(currentPage + 1);
            }
        },

        onRefreshCustomer: () => {
            setRefresh(true);
            setCurrentPage(1);
        },
    }
};