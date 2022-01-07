import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpBankInformation } from "@shared/helpers/schema";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { signup } from "@redux/slices";
import {
    useAxiosMutation,
    uploadAvatarStaff,
} from '@src/apis';
import { createFormData } from '@shared/utils';

export const useProps = (props) => {
    const dispatch = useDispatch();

    const form = useForm({
        resolver: yupResolver(signUpBankInformation)
    });

    const { setValue } = form;
    const errors = form.formState.errors;
    const [fileId, setFileId] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState('');

    const [, submitUploadImage] = useAxiosMutation({
        ...uploadAvatarStaff(),
        queryId: "upload_voiCheck",
        onSuccess: (data, response) => {
            console.log('response upload image : ', { response })
            if (response.codeNumber == 200) {
                setFileId(data?.fileId ?? 0);
                setImageUrl(data?.url);
            }
        },
    });

    return {
        form,
        errors,
        onResponseImagePicker: async (response) => {
            let files = response?.assets ?? [];
            files = createFormData(files);
            const body = await uploadAvatarStaff(files);
            submitUploadImage(body.params);
        },

        onSubmit: (values) => {
            if (!fileId) {
                Alert.alert("PLEASE UPDATE VOID CHECK")
            } else {
                const bankInformation = {
                    ...values,
                    fileId
                };

                dispatch(signup.updateBankInformation(bankInformation));
            }
        }
    };
};
