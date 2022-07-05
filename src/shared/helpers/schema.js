import * as yup from "yup";
import { isEmpty } from "lodash";
import { translate } from "@localize";

export const customerSchema = yup.object().shape({
    firstName: yup.string().required(translate("required")),
    lastName: yup.string().required(translate("required")),
    phone: yup.string().required(translate("required")),
    email: yup.string().nullable().email("Invalid email")
});

export const categorySchema = yup.object().shape({
    categoryName: yup.string().required(translate("required")),
});

export const serviceSchema = yup.object().shape({
    name: yup.string().required(translate("required")),
    price: yup.string().required(translate("required")),
    duration: yup.string().required(translate("required")),
    category: yup.object().shape({
        value: yup.string(),
        label: yup.string(),
    })
        .nullable()
        .required(translate('required'))
});

export const productSchema = yup.object().shape({
    name: yup.string().required(translate("required")),
    price: yup.string().required(translate("required")),
    sku: yup.string().required(translate("required")),
    quantity: yup.string().required(translate("required")),
    minThreshold: yup.string().required(translate("required")),
    maxThreshold: yup.string().required(translate("required")),
    category: yup.object().shape({
        value: yup.string(),
        label: yup.string(),
    })
        .nullable()
        .required('required')
});


export const extraSchema = yup.object().shape({
    name: yup.string().required(translate("required")),
    price: yup.string().required(translate("required")),
    duration: yup.string().required(translate("required")),
    supplyFee: yup.string().required(translate("required")),
});


export const serviceSalarySchema = yup.object().shape({
    firstName: yup.string().required(translate("required")),
    lastName: yup.string().required(translate("required")),
    displayName: yup.string().required(translate("required")),
    email: yup.string().email("Invalid email"),
    pin: yup.string().required(translate("required")).test('len', translate('Pincode must be 4 characters'), val => val.length === 4),
    confirmPin: yup.string()
        .oneOf([yup.ref('pin'), null], translate('Pin code does not match'))
});



export const profileStaffLoginSchema = yup.object().shape({
    firstName: yup.string().required(translate("required")),
    lastName: yup.string().required(translate("required")),
    displayName: yup.string().required(translate("required")),
    phone: yup.string().required(translate("required")),
    email: yup.string().email("Invalid email"),
});


export const settlmentEditAmountSchema = yup.object().shape({
    paymentByCash: yup.string().required(translate("required")),
    otherPayment: yup.string().required(translate("required")),
});

export const basicEditSchema = yup.object().shape({
    businessName: yup.string().required(translate("required")),
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
    businessName: yup.string().required(translate("required")),
    doingBusiness: yup.string().required(translate("required")),
    tax: yup.string().required(translate("required")),
    businessPhone: yup.string().required(translate("required")),
    firstName: yup.string().required(translate("required")),
    lastName: yup.string().required(translate("required")),
    position: yup.string().required(translate("required")),
    contactPhone: yup.string().required(translate("required")),

    streetBusinessAddress: yup.string().required(translate("required")),
    cityBusinessAddress: yup.string().required(translate("required")),
    zipBusinessAddress: yup.string().required(translate("required")),
    stateBusinessAddress: yup.string()
        .required(translate("required")).test("state-isValid", "State invalid",
            function (value) {
                return checkStateValid(stateCity, value)
            })
        .nullable(),

    streetDbaAddress: yup.string().required(translate("required")),
    cityDbaAddress: yup.string().required(translate("required")),
    zipDbaAddress: yup.string().required(translate("required")),

    stateDbaAddress: yup.string()
        .required(translate("required")).test("state-isValid", "State invalid",
            function (value) {
                return checkStateValid(stateCity, value)
            })
        .nullable(),

    email: yup.string().required(translate("required")).email("Invalid email"),
});

export const signUpGeneralInfoSchema2 = (stateCity) => {
    const test = checkStateValid(stateCity, "Ohi6");
    return yup.object().shape({
        businessName: yup.string().required(translate("required")),
        doingBusiness: yup.string().required(translate("required")),
        tax: yup.string().required(translate("required")),
        businessPhone: yup.string().required(translate("required")),
        firstName: yup.string().required(translate("required")),
        lastName: yup.string().required(translate("required")),
        position: yup.string().required(translate("required")),
        contactPhone: yup.string().required(translate("required")),

        streetBusinessAddress: yup.string().required(translate("required")),
        cityBusinessAddress: yup.string().required(translate("required")),
        zipBusinessAddress: yup.string().required(translate("required")),
        stateBusinessAddress: yup.string()
            .required(translate("required")).test("state-isValid", "State invalid",
                function (value) {
                    return checkStateValid(stateCity, value)
                })
            .nullable(),

        email: yup.string().required(translate("required")).email("Invalid email"),
    });
};

export const signUpBusiniessInfoSchema = yup.object().shape({

});

export const signUpBankInformation = yup.object().shape({
    accountHolderName: yup.string().required(translate("required")),
    bankName: yup.string().required(translate("required")),
    accountNumber: yup.string().required(translate("required")),
    routingNumber: yup.string().required(translate("required")),
});

export const signUpPrincipalInfoSchema = (stateCity) => yup.object().shape({
    principalInfor: yup.array().of(
        yup.object().shape({
            ownership: yup.string().required(translate("required")),
            // homePhone: yup.string().required(translate("required")),
            mobilePhone: yup.string().required(translate("required")),
            firstName: yup.string().required(translate("required")),
            lastName: yup.string().required(translate("required")),
            position: yup.string().required(translate("required")),

            street: yup.string().required(translate("required")),
            city: yup.string().required(translate("required")),
            state: yup.string()
                .required(translate("required")).test("state-isValid", "State invalid",
                    function (value) {
                        return checkStateValid(stateCity, value)
                    })
                .nullable(),
            zip: yup.string().required(translate("required")),

            email: yup.string().required(translate("required")).email("Invalid email"),
            stateIssued: yup.string()
                .required(translate("required")).test("state-isValid", "State invalid",
                    function (value) {
                        return checkStateValid(stateCity, value)
                    })
                .nullable(),
            yearAtThisAddress: yup.string().required(translate("required")),

            driverLicense: yup.string().required(translate("required")),
            ssn: yup.string().required(translate("required")),
            fileId: yup.string().required(translate("required")),
        })
    ),
});

export const locationEditSchema = yup.object().shape({
    address: yup.string().required(translate("required")),
    city: yup.string().required(translate("required")),
    zip: yup.string().required(translate("required")),
    longitude: yup.string().required(translate("required")),
    latitude: yup.string().required(translate("required")),
});
