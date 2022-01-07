import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

export const useProps = (props) => {

    const form = useForm({
        // resolver: yupResolver(customerSchema)
    });

    const { setValue } = form;
    const errors = form.formState.errors;

    const inputHomePhoneHeadRef = React.useRef();
    const inputmobilePhoneHeadRef = React.useRef();
    const inputDateRef = React.useRef();

    return {
        form,
        errors,
        inputHomePhoneHeadRef,
        inputmobilePhoneHeadRef,
        inputDateRef,
        onResponseImagePicker: () => {

        },

        onSubmit: (values) => {

        }
    };
};
