import React from 'react';
import NavigationService from '@navigation/NavigationService';

export const useProps = (props) => {

    const [valueSearch, setValueSearch] = React.useState("");


    return {
        valueSearch,
        onChangeSearch: (value) => {
            setValueSearch(value);
        },
        close: () => {
            NavigationService.back();
        }

    }
};