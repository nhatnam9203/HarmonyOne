import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import NavigationService from "@navigation/NavigationService";

export const useProps = (props) => {

    const form = useForm({
        // resolver: yupResolver(customerSchema)
    });

    const { setValue } = form;
    const errors = form.formState.errors;
    const [numberOfStaff, setNumberOfStaff] = React.useState(1);
    const [isMonthly, setIsMonthly] = React.useState(true);

    return {
        form,
        errors,
        numberOfStaff,
        setNumberOfStaff,
        isMonthly,
        setIsMonthly,
        onResponseImagePicker: () => {

        },

        onSubmit: (values) => {
            NavigationService.navigate(screenNames.ApplicationSubmit)
        }
    };
};
