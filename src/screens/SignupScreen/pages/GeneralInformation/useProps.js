import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

export const useProps = (props) => {

    const form = useForm({
        // resolver: yupResolver(customerSchema)
    });

    const { setValue } = form;
    const errors = form.formState.errors;

    const merchantTYpeRef = React.useRef();
    const inputPhoneHeadRef = React.useRef();
    const inputPhoneBusinessHeadRef = React.useRef();

    const [isSameBusinessAddress, setIsSameBusinessAddress] = React.useState(true);

    return {
        form,
        errors,
        merchantTYpeRef,
        inputPhoneHeadRef,
        inputPhoneBusinessHeadRef,
        isSameBusinessAddress,
        setIsSameBusinessAddress,

        onSubmit : (values) => {

        }
    };
};
