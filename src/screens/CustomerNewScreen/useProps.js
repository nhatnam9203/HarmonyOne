import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { useAxiosQuery, useAxiosMutation, addNewCustomer } from '@src/apis';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { customerSchema } from "@shared/helpers/schema";
import NavigationService from '@navigation/NavigationService';
import moment from "moment";

export const useProps = (props) => {

    const form = useForm({
        resolver: yupResolver(customerSchema)
    });
    const { setValue } = form;
    const errors = form.formState.errors;

    const isEdit = props?.route?.params?.isEdit;
    const customerDetail = props?.route?.params?.customerDetail;

    const navigation = useNavigation();

    const inputNoteRef = React.useRef();
    const inputPhoneHeadRef = React.useRef();
    const inputReferrerPhoneHeadRef = React.useRef();
    const inputCustomerGroupRef = React.useRef();
    const inputGenderRef = React.useRef();
    const inputDateRef = React.useRef();

    const [{ isLoading }, mutate] = useAxiosMutation({
        ...addNewCustomer(),
        isLoadingDefault: true,
        onSuccess: (data, response) => {
            if (response?.codeNumber == 200) {
                props?.route?.params?.refreshFromScreen();
                NavigationService.back();
            }
        },
    });

    React.useEffect(() => {
        if (isEdit) {
            setValue("firstName", customerDetail?.firstName);
            setValue("lastName", customerDetail?.lastName);
            setValue("email", customerDetail?.email);
            setValue("note", customerDetail?.note);
            setValue("street", customerDetail?.street?.toString());
            setValue("city", customerDetail?.city?.toString());
            setValue("zip", customerDetail?.zip?.toString());
            setValue("state", customerDetail?.state?.toString());
        }
    }, []);

    return {
        inputDateRef,
        inputCustomerGroupRef,
        inputGenderRef,
        inputPhoneHeadRef,
        inputReferrerPhoneHeadRef,

        form,
        errors,
        isEdit,
        customerDetail,

        onSubmit: async (values) => {
            const referrerPhoneHead = inputReferrerPhoneHeadRef?.current?.getValue().value;
            const phoneHead = inputPhoneHeadRef?.current?.getValue().value;

            const data = {
                firstName: values.firstName,
                lastName: values.lastName,
                phone: `${phoneHead}${values.phone}`,
                referrerPhone: values.referrerPhone ? `${referrerPhoneHead}${values.referrerPhone}` : "",
                referrerBy: values.referrerBy,
                email: values.email,
                addressPost: {
                    street: values.street,
                    city: values.city,
                    state: values.state ? values.state : "0",
                    zip: values.zip,
                },
                note: values.note,
                isGroup: inputCustomerGroupRef?.current?.getValue()?.value,
                gender: inputGenderRef?.current?.getValue()?.value,
                birthDate: moment(inputDateRef?.current?.getValue()?.value).format("YYYY-MM-DD"),
            }

            const body = await addNewCustomer(data);
            mutate(body.params);
        },

    };
};
