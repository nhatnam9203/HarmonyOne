import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpPrincipalInfoSchema } from "@shared/helpers/schema";
import { useDispatch } from "react-redux";
import { signup, app } from "@redux/slices";
import { createFormData } from '@shared/utils';
import { Alert } from "react-native";
import { axios } from '@shared/services/axiosClient';
import { uploadAvatarStaff } from "@src/apis";

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


    const uploadImage = async (body) => {
        try {
            dispatch(app.showLoading());
            const response = await axios(body);

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
        inputHomePhoneHeadRef,
        inputmobilePhoneHeadRef,
        inputDateRef,
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
                const principalInformation = {
                    ...values,
                    fileId
                };

                dispatch(signup.updatePrincipalInformation(principalInformation));
            }

        }
    };
};
