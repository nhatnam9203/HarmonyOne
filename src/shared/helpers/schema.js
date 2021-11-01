import * as yup from "yup";
import { isEmpty } from "lodash";

export const customerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    phone: yup.string().required("required"),
    email: yup.string().email("Invalid email")
});

export const categorySchema = yup.object().shape({
    categoryName: yup.string().required("required"),
});

export const serviceSchema = yup.object().shape({
    name: yup.string().required("required"),
    price: yup.string().required("required"),
    duration: yup.string().required("required"),
    category: yup.object().shape({
        value: yup.string(),
        label: yup.string(),
    })
        .nullable()
        .required('required')
});

export const productSchema = yup.object().shape({
    name: yup.string().required("required"),
    price: yup.string().required("required"),
    sku: yup.string().required("required"),
    quantity: yup.string().required("required"),
    minThreshold: yup.string().required("required"),
    maxThreshold: yup.string().required("required"),
    category: yup.object().shape({
        value: yup.string(),
        label: yup.string(),
    })
        .nullable()
        .required('required')
});


export const extraSchema = yup.object().shape({
    name: yup.string().required("required"),
    price: yup.string().required("required"),
    duration: yup.string().required("required"),
    supplyFee: yup.string().required("required"),
});


export const serviceSalarySchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    displayName: yup.string().required("required"),
    email: yup.string().email("Invalid email"),
    pin: yup.string().required("required").test('len', 'Pincode must be 4 characters', val => val.length === 4),
    confirmPin: yup.string()
        .oneOf([yup.ref('pin'), null], 'Pin code does not match')
});



export const profileStaffLoginSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    displayName: yup.string().required("required"),
    email: yup.string().email("Invalid email"),
});


export const settlmentEditAmountSchema = yup.object().shape({
    paymentByCash: yup.string().required("required"),
    otherPayment: yup.string().required("required"),
});