import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

export const useProps = (props) => {

    const form = useForm({
        // resolver: yupResolver(customerSchema)
    });

    const { setValue } = form;
    const errors = form.formState.errors;

    return {
        form,
        errors,
        onResponseImagePicker: () => {

        },

        onSubmit: (values) => {

        }
    };
};
