import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpPrincipalInfoSchema } from "@shared/helpers/schema";
import { useDispatch } from "react-redux";
import { signup } from "@redux/slices";

export const useProps = (props) => {
    const dispatch = useDispatch();

    const form = useForm({
        resolver: yupResolver(signUpPrincipalInfoSchema)
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
            const principalInformation = {
                ...values,
            };

            dispatch(signup.updatePrincipalInformation(principalInformation));

        }
    };
};
