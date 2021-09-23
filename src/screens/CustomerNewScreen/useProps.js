import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { useAxiosQuery, useAxiosMutation, addNewCustomer, editCustomer, getCustomerInfoById } from '@src/apis';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { customerSchema } from "@shared/helpers/schema";
import { headerPhoneGroup, genders } from "@shared/utils"
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

    const [, getCustomerById] = useAxiosQuery({
        ...getCustomerInfoById(customerDetail?.customerId),
        isLoadingDefault: true,
        enabled: false,
        onSuccess: (data, response) => {

        }
    });

    const [, submitAddCustomer] = useAxiosMutation({
        ...addNewCustomer(),
        isLoadingDefault: true,
        onSuccess: (data, response) => {
            if (response?.codeNumber == 200) {
                props?.route?.params?.refreshFromScreen();
                NavigationService.back();
            }
        }
    });

    const [, submitEditCustomer] = useAxiosMutation({
        ...editCustomer(),
        isLoadingDefault: true,
        onSuccess: (data, response) => {
            if (response?.codeNumber == 200) {
                getCustomerById();
                NavigationService.back();
            }
        }
    });

    React.useEffect(() => {
        if (isEdit) {
            setValue("firstName", customerDetail?.firstName);
            setValue("lastName", customerDetail?.lastName);
            setValue("email", customerDetail?.email);
            setValue("note", customerDetail?.note);
            setValue("street", customerDetail?.addressPost?.street?.toString());
            setValue("city", customerDetail?.addressPost?.city?.toString());
            setValue("zip", customerDetail?.addressPost?.zip?.toString());
            setValue("state", customerDetail?.addressPost?.state?.toString());
            setValue("referrerBy", customerDetail?.referrerBy?.toString());

            let customerPhone = customerDetail?.phone;
            let customerReferrerPhone = customerDetail?.referrerPhone;
            let phone = '';
            let referrerPhone = '';
            if (customerPhone.toString().includes("+84")) {
                phone = customerPhone.toString().slice(3);
                setValue("phone", phone);
                inputPhoneHeadRef?.current?.changeValue({ label: "+84", value: "+84" });
            } else {
                phone = customerPhone.toString().slice(2);
                setValue("phone", phone);
                inputPhoneHeadRef?.current?.changeValue({ label: "+1", value: "+1" });
            }

            if (customerReferrerPhone) {
                if (customerReferrerPhone.toString().includes("+84")) {
                    referrerPhone = customerReferrerPhone.toString().slice(3);
                    setValue("referrerPhone", referrerPhone);
                    inputReferrerPhoneHeadRef?.current?.changeValue({ label: "+84", value: "+84" });
                } else {
                    referrerPhone = customerReferrerPhone.toString().slice(2);
                    setValue("referrerPhone", referrerPhone);
                    inputReferrerPhoneHeadRef?.current?.changeValue({ label: "+1", value: "+1" });
                }
            }

            const group = customerGroup.find(obj => obj.value == customerDetail.isVip);
            const gender = genders.find(obj => obj.value == customerDetail.gender);
            group && inputCustomerGroupRef?.current?.changeValue(group);
            gender && inputGenderRef?.current?.changeValue(gender);

            inputDateRef?.current?.changeValue(new Date(customerDetail?.birthdate));
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
                isVip: inputCustomerGroupRef?.current?.getValue()?.value,
                gender: inputGenderRef?.current?.getValue()?.value,
                birthDate: moment(inputDateRef?.current?.getValue()).format("YYYY-MM-DD"),
            }

            if (isEdit) {
                const body = await editCustomer(data, customerDetail.customerId);
                submitEditCustomer(body.params);
            } else {
                const body = await addNewCustomer(data);
                submitAddCustomer(body.params);
            }
        },

    };
};
