import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpGeneralInfoSchema, signUpGeneralInfoSchema2 } from "@shared/helpers/schema";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "@redux/slices";
import NavigationService from "@navigation/NavigationService";

export const useProps = (props) => {

    const dispatch = useDispatch();

    const [schemaValidate, setSchemaValidate] = React.useState(signUpGeneralInfoSchema2);

    console.log({ schemaValidate })

    const form = useForm({
        resolver: yupResolver(schemaValidate)
    });

    const { setValue } = form;
    const errors = form.formState.errors;

    const merchantTYpeRef = React.useRef();
    const inputPhoneHeadRef = React.useRef();
    const inputPhoneBusinessHeadRef = React.useRef();

    const [isSameBusinessAddress, setIsSameBusinessAddress] = React.useState(true);

    React.useEffect(() => {
        dispatch(signup.reset());
    }, []);

    return {
        form,
        errors,
        merchantTYpeRef,
        inputPhoneHeadRef,
        inputPhoneBusinessHeadRef,
        isSameBusinessAddress,
        setIsSameBusinessAddress,

        onSubmit: (values) => {
    
            const generalInfor = {
                businessName: values.businessPhone,
                businessAddress: {
                    city: values.cityBusinessAddress,
                    state: values.stateBusinessAddress,
                    street: values.streetBusinessAddress,
                    zip: values.zipBusinessAddress,
                },
                dbaAddress: {
                    city: values.cityBusinessAddress ?? values.cityDbaAddress,
                    state: values.stateBusinessAddress ?? values.stateDbaAddress,
                    street: values.streetBusinessAddress ?? values.streetDbaAddress,
                    zip: values.zipBusinessAddress ?? values.zipDbaAddress,
                },
                businessPhone: inputPhoneBusinessHeadRef?.current?.getValue()?.value + values.businessPhone,
                contactPhone: inputPhoneHeadRef?.current?.getValue()?.value + values.contactPhone,
                doingBusiness: values.doingBusiness,
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
                position: values.position,
                tax: values.tax
            }

            dispatch(signup.updateGeneralInformation({ generalInfor, type: values.type }));

            // NavigationService.navigate(screenNames.BusinessInformation);
        },

        onChangeIsSameBusinessAddress: (status) => {
            setIsSameBusinessAddress(status);
            if (!status) {
                form.setValue("streetDbaAddress", "");
                form.setValue("cityDbaAddress", "");
                form.setValue("zipDbaAddress", "");
                form.setValue("stateDbaAddress", "");
                setSchemaValidate(signUpGeneralInfoSchema);
            } else {
                setSchemaValidate(signUpGeneralInfoSchema2)
            }
        },
    };
};
