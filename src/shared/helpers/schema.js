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
    phone: yup.string().required("required"),
    email: yup.string().email("Invalid email"),
});


export const settlmentEditAmountSchema = yup.object().shape({
    paymentByCash: yup.string().required("required"),
    otherPayment: yup.string().required("required"),
});

export const basicEditSchema = yup.object().shape({
    businessName: yup.string().required("required"),
    email: yup.string().email("Invalid email").nullable(),
});

const checkStateValid = (stateCity, value) => {
    let check = false;
    for (let i = 0; i < stateCity.length; i++) {
        if (stateCity[i].name.includes(value)) {
            check = true;
            return true;
        }
    }
    return check;
}

export const signUpGeneralInfoSchema = (stateCity) => yup.object().shape({
    businessName: yup.string().required("required"),
    doingBusiness: yup.string().required("required"),
    tax: yup.string().required("required"),
    businessPhone: yup.string().required("required"),
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    position: yup.string().required("required"),
    contactPhone: yup.string().required("required"),

    streetBusinessAddress: yup.string().required("required"),
    cityBusinessAddress: yup.string().required("required"),
    zipBusinessAddress: yup.string().required("required"),
    stateBusinessAddress: yup.string()
        .required("required").test("state-isValid", "State invalid",
            function (value) {
                return checkStateValid(stateCity, value)
            })
        .nullable(),

    streetDbaAddress: yup.string().required("required"),
    cityDbaAddress: yup.string().required("required"),
    zipDbaAddress: yup.string().required("required"),

    stateDbaAddress: yup.string()
        .required("required").test("state-isValid", "State invalid",
            function (value) {
                return checkStateValid(stateCity, value)
            })
        .nullable(),

    email: yup.string().required("required").email("Invalid email"),
});

export const signUpGeneralInfoSchema2 = (stateCity) => {
    const test = checkStateValid(stateCity, "Ohi6");
    return yup.object().shape({
        businessName: yup.string().required("required"),
        doingBusiness: yup.string().required("required"),
        tax: yup.string().required("required"),
        businessPhone: yup.string().required("required"),
        firstName: yup.string().required("required"),
        lastName: yup.string().required("required"),
        position: yup.string().required("required"),
        contactPhone: yup.string().required("required"),

        streetBusinessAddress: yup.string().required("required"),
        cityBusinessAddress: yup.string().required("required"),
        zipBusinessAddress: yup.string().required("required"),
        stateBusinessAddress: yup.string()
            .required("required").test("state-isValid", "State invalid",
                function (value) {
                    return checkStateValid(stateCity, value)
                })
            .nullable(),

        email: yup.string().required("required").email("Invalid email"),
    });
};

export const signUpBusiniessInfoSchema = yup.object().shape({

});

export const signUpBankInformation = yup.object().shape({
    accountHolderName: yup.string().required("required"),
    bankName: yup.string().required("required"),
    accountNumber: yup.string().required("required"),
    routingNumber: yup.string().required("required"),
});

export const signUpPrincipalInfoSchema = yup.object().shape({
    principalInfor: yup.array().of(
        yup.object().shape({
            ownership: yup.string().required("required"),
            homePhone: yup.string().required("required"),
            mobilePhone: yup.string().required("required"),
            firstName: yup.string().required("required"),
            lastName: yup.string().required("required"),
            position: yup.string().required("required"),

            street: yup.string().required("required"),
            city: yup.string().required("required"),
            state: yup.string().required("required"),
            zip: yup.string().required("required"),

            email: yup.string().required("required").email("Invalid email"),
            stateIssued: yup.string().required("required").email("Invalid email"),
            yearAtThisAddress: yup.string().required("required"),

            driverLicense: yup.string().required("required"),
            ssn: yup.string().required("required"),
            fileId: yup.string().required("required"),
        })
    ),
});

