import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpPrincipalInfoSchema } from "@shared/helpers/schema";
import { useDispatch } from "react-redux";
import { signup } from "@redux/slices";
import {
    useAxiosMutation,
    uploadAvatarStaff,
} from '@src/apis';
import { createFormData } from '@shared/utils';
import { Alert } from "react-native";

export const useProps = (props) => {
    const dispatch = useDispatch();

    const form = useForm({
        resolver: yupResolver(signUpPrincipalInfoSchema)
    });

    const { setValue } = form;
    const errors = form.formState.errors;

    const inputHomePhoneHeadRef = React.useRef();
    const inputmobilePhoneHeadRef = React.useRef();
    const inputDateRef = React.useRef();

    const [fileId, setFileId] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);

    const [, submitUploadImage] = useAxiosMutation({
        ...uploadAvatarStaff(),
        queryId: "upload_principal_image",
        onSuccess: (data, response) => {
            console.log('data update respoe :', { response })
            if (response.codeNumber == 200) {
                setFileId(data?.fileId ?? 0);
                setImageUrl(data?.url);
            }
        },
    });

    return {
        form,
        errors,
        inputHomePhoneHeadRef,
        inputmobilePhoneHeadRef,
        inputDateRef,
        onResponseImagePicker: async (response) => {
            let files = response?.assets ?? [];
            files = createFormData(files);
            console.log({ files })
            const body = await uploadAvatarStaff(files);
            submitUploadImage(body.params);
        },

        onSubmit: (values) => {

            if (!fileId) {
                Alert.alert("PLEASE UPDATE VOID CHECK")
            } else {
                const principalInformation = {
                    ...values,
                };

                dispatch(signup.updatePrincipalInformation(principalInformation));
            }

        }
    };
};
