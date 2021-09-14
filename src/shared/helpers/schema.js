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
