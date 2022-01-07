import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpGeneralInfoSchema, signUpGeneralInfoSchema2 } from "@shared/helpers/schema";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "@redux/slices";
import NavigationService from "@navigation/NavigationService";

export const useProps = (props) => {

    const dispatch = useDispatch();

    const [schemaValidate, setSchemaValidate] = React.useState(signUpGeneralInfoSchema);

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
            const generalInformation = {
                ...values,
                tax :`${values.prefixTax}-${values.suffixTax}`,
                type : merchantTypeGroup?.current?.getValue()?.value,
                businessPhone : inputPhoneBusinessHeadRef?.current?.getValue()?.value + values.businessPhone,
                phone : inputPhoneHeadRef?.current?.getValue()?.value + values.phone,

            };

            dispatch(signup.updateGeneralInformation(generalInformation));

            NavigationService.navigate(screenNames.BusinessInformation);
        },

        onChangeIsSameBusinessAddress: (status) => {
            setIsSameBusinessAddress(status);
            if (!status) {
                form.setValue("streetDbaAddress", "");
                form.setValue("cityDbaAddress", "");
                form.setValue("zipDbaAddress", "");
                form.setValue("stateDbaAddress", "");
                setSchemaValidate(signUpGeneralInfoSchema);
            }else{
                setSchemaValidate(signUpGeneralInfoSchema2)
            }
        },
    };
};
