import * as yup from "yup";

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
});
