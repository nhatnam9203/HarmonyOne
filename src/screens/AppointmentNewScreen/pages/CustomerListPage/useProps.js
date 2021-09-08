import React from 'react';
import { useNavigation } from '@react-navigation/core';
import NavigationService from '@navigation/NavigationService';

export const useProps = (props) => {

    const [valueSearch, setValueSearch] = React.useState("");

    const navigation = useNavigation();

    return {
        valueSearch,
        onChangeSearch: (value) => {
            setValueSearch(value);
        },
        close: () => {
            NavigationService.back();
        },
        newCustomer: () => {
            navigation.push(screenNames.CustomerNewScreen);
        }

    }
};