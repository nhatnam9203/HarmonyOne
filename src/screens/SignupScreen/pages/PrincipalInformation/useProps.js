import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpPrincipalInfoSchema } from "@shared/helpers/schema";
import { useDispatch } from "react-redux";
import { signup, app } from "@redux/slices";
import { createFormData } from '@shared/utils';
import { Alert } from "react-native";
import { useFieldArray } from "react-hook-form";

const initialValues = {
    firstName: "",
    lastName: "",
    position: "",
    ownership: "",
    homePhone: "",
    mobilePhone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    yearAtThisAddress: "",
    ssn: "",
    dateOfBirth: new Date(),
    email: "",
    driverLicense: "",
    stateIssued: "",
    fileId: null,
};

export const useProps = (props) => {
    const dispatch = useDispatch();

    const form = useForm({
        defaultValues: {
            principalInfor: [initialValues, initialValues],
        },
        resolver: yupResolver(signUpPrincipalInfoSchema)
    });
    const { setValue } = form;
    const errors = form.formState.errors;

    const [fileId, setFileId] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "principalInfor",
    });


    const checkValidPrincpal = (values) => {
        for (const [key, value] of Object.entries(values)) {
            if (!value) {
                return false;
            }
        }
        return true;
    }

    const countValidPrincipal = (values) => {
        let count = 0;
        for (const [key, value] of Object.entries(values)) {
            if (value) {
                count = count + 1;
            }
        }
        return count;
    }

    const checkErrors = () => {
        let isValid = true;

        const formValues = form.getValues().principalInfor;
        const principal1 = formValues[0];
        const principal2 = formValues[1];

        const isValidPrincipal_1 = checkValidPrincpal(principal1);
        const isValidPrincipal_2 = checkValidPrincpal(principal2);

        if (!isValidPrincipal_1) {
            for (const [key, value] of Object.entries(principal1)) {
                if (!value) {
                    form.setError(`principalInfor.0.${key}`, { message: "required", type: "required" });
                } else {
                    form.clearErrors(`principalInfor.0.${key}`);
                }
            }
            isValid = false;
        }

        const countValidPrincipal_2 = countValidPrincipal(principal2);

        if (!isValidPrincipal_2 && countValidPrincipal_2 > 1) {
            for (const [key, value] of Object.entries(principal2)) {
                if (!value) {
                    form.setError(`principalInfor.1.${key}`, { message: "required", type: "required" });
                } else {
                    form.clearErrors(`principalInfor.1.${key}`);
                }
            }
            isValid = false;
        } else {
            form.clearErrors(`principalInfor.1`)
        }

        return isValid;
    }


    return {
        form,
        errors,
        imageUrl,
        fields,
        append,
        remove,
        checkErrors,

        onSubmit: () => {
            const isValid = checkErrors();
            if(isValid){

            }

        }
    };
};
