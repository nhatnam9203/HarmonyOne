import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { useAxiosQuery, useAxiosMutation, addNewCustomer, editCustomer, getCustomerInfoById, customerGetByPhone } from '@src/apis';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { customerSchema } from "@shared/helpers/schema";
import { headerPhoneGroup, genders, customerGroup } from "@shared/utils";
import { axios } from '@shared/services/axiosClient';
import { useDispatch } from 'react-redux';
import { app, bookAppointment } from "@redux/slices";
import NavigationService from '@navigation/NavigationService';
import moment from "moment";


export const useProps = (props) => {
    const dispatch = useDispatch();

    const form = useForm({
        resolver: yupResolver(customerSchema)
    });

    const { setValue } = form;
    const errors = form.formState.errors;

    const isEdit = props?.route?.params?.isEdit;
    const isBookAppointment = props?.route?.params?.isBookAppointment;
    const isQuickCheckout = props?.route?.params?.isQuickCheckout;
    const isReviewConfirm = props?.route?.params?.isReviewConfirm;
    const isChangeCustomer = props?.route?.params?.isChangeCustomer;
    const customerId = props?.route?.params?.customerId;

    const navigation = useNavigation();
    const inputNoteRef = React.useRef();
    const inputPhoneHeadRef = React.useRef();
    const inputReferrerPhoneHeadRef = React.useRef();
    const inputCustomerGroupRef = React.useRef();
    const inputGenderRef = React.useRef();
    const inputDateRef = React.useRef();
    const [customerInfo, setCustomerInfo] = React.useState(null);

    const [isMounted, setMounted] = React.useState(false);

    const [, getCustomerById] = useAxiosQuery({
        ...getCustomerInfoById(customerId),
        queryId : "getCustomerById_roleStaff",
        isLoadingDefault: true,
        enabled: false,
        onSuccess: (data, response) => {
            setMounted(true);
            const customerInfo = data;
            setTimeout(() => {
                assignValue(customerInfo);
            }, 400);
        }
    });

    React.useEffect(() => {
        if (isChangeCustomer){
            getCustomerById();
        }
    }, []);

    const [, submitAddCustomer] = useAxiosMutation({
        ...addNewCustomer(),
        isLoadingDefault: true,
        queryId: "addCustomer_roleStaff",
        onSuccess: (data, response) => {
            console.log('response add appointment : ', { response });
            if (response?.codeNumber == 200) {
                const item = {
                    ...data
                }
                console.log({ item })
                dispatch(bookAppointment.setCustomerBooking(item));
                if (isReviewConfirm) {
                    NavigationService.navigate(screenNames.AppointmentNewScreen, { screen: screenNames.ReviewConfirm });
                } else {
                    if (isQuickCheckout) {
                        NavigationService.navigate(screenNames.CheckoutTabScreen);
                    } else {
                        NavigationService.navigate(screenNames.AppointmentNewScreen);
                    }
                }
            }
        }
    });

    const [, submitEditCustomer] = useAxiosMutation({
        ...editCustomer(),
        isLoadingDefault: true,
        queryId: "editCustomer_roleStaff",
        onSuccess: (data, response) => {

            if (response?.codeNumber == 200) {
                // NavigationService.back();
                const item = {
                    ...customerInfo
                }
                dispatch(bookAppointment.setCustomerBooking(item));
                if (isReviewConfirm) {
                    NavigationService.navigate(screenNames.AppointmentNewScreen, { screen: screenNames.ReviewConfirm });
                } else {
                    if (isQuickCheckout) {
                        NavigationService.navigate(screenNames.CheckoutTabScreen);
                    } else {
                        NavigationService.navigate(screenNames.AppointmentNewScreen);
                    }
                }
            }
        }
    });

    const submitFindCustomerByPhone = async (phoneNumber) => {
        dispatch(app.showLoading());
        const params = {
            url: `customer/getbyphone/${phoneNumber}`,
            method: "GET",
        }
        try {
            const response = await axios(params);
            if (response?.data?.codeNumber == 200) {
                setMounted(true);
                const customerDetail = response?.data?.data;
                setCustomerInfo(customerDetail);
                setTimeout(() => {
                    if (customerDetail?.customerId) {
                        assignValue(customerDetail);
                    }
                }, 400);
            } else {
                setCustomerInfo(null);
            }
        } catch (err) {

        } finally {
            dispatch(app.hideLoading());
            setMounted(true);
        }
    }

    const assignValue = (customerDetail) => {
        setValue("firstName", customerDetail?.firstName);
        setValue("lastName", customerDetail?.lastName);
        setValue("email", customerDetail?.email);
        setValue("note", customerDetail?.note);
        setValue("street", customerDetail?.street?.toString());
        setValue("city", customerDetail?.city?.toString());
        setValue("zip", customerDetail?.zip?.toString());
        setValue("state", customerDetail?.stateId?.toString());
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
        console.log('assuign value success')
    }



    return {
        inputDateRef,
        inputCustomerGroupRef,
        inputGenderRef,
        inputPhoneHeadRef,
        inputReferrerPhoneHeadRef,

        form,
        errors,
        isEdit,
        isMounted,

        findCustomerByPhone: () => {
            const values = form.getValues();
            const { phone } = values;
            const phoneHead = inputPhoneHeadRef?.current?.getValue().value;
            let phoneSubmit = `${phoneHead}${values.phone}`;
            phoneSubmit = phoneSubmit?.toString()?.replace("+", "");
            submitFindCustomerByPhone(phoneSubmit);
        },

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

            if (customerInfo?.customerId) {
                const body = await editCustomer(data, customerInfo?.customerId);
                submitEditCustomer(body.params);
            } else {
                const body = await addNewCustomer(data);
                submitAddCustomer(body.params);
            }
        },

    };
};
