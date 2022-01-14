import React from "react";
import NavigationService from "@navigation/NavigationService";
import { useRoute, useIsFocused } from '@react-navigation/native';
import { useAndroidBackHandler } from "react-navigation-backhandler";

export const useProps = (props) => {

    const route = useRoute();
    const routeName = route.name;

    useAndroidBackHandler(() => {
        if (routeName == screenNames.ApplicationSubmit) {
            submit();
            return true;
        }

        return false;
    });

    const submit = () => {
        NavigationService.navigate(screenNames.LoginScreen);
    }


    return {

        onSubmit: () => {
            submit();
        }
    };
};
