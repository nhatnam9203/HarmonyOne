import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpBankInformation } from "@shared/helpers/schema";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { signup, app } from "@redux/slices";
import { createFormData } from '@shared/utils';
import { axios } from '@shared/services/axiosClient';

export const useProps = (props) => {
    const dispatch = useDispatch();

    const form = useForm({
        resolver: yupResolver(signUpBankInformation)
    });

    const { setValue } = form;
    const errors = form.formState.errors;
    const [fileId, setFileId] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);

    const uploadImage = async (body) => {
        try {
            dispatch(app.showLoading());
            const response = await axios(body);
            const codeNumber = response?.data?.codeNumber;

            if(response?.data?.codeNumber == 200){
                dispatch(app.hideLoading());
                setFileId(response?.data?.data?.fileId ?? 0);
                setImageUrl(response?.data?.data?.url);
            }else{
                dispatch(app.hideLoading());
            }
        } catch (err) {
            dispatch(app.hideLoading());
        } finally {
        
        }
    }

    return {
        form,
        errors,
        imageUrl,
        onResponseImagePicker: async (response) => {
            let files = response?.assets ?? [];
            files = createFormData(files);
            const body = await uploadAvatarStaff(files);
            uploadImage(body.params);
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
