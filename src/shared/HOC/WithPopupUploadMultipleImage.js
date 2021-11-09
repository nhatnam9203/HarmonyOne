import { PopupActionSheet } from '@shared/components/PopupActionSheet';
import React from 'react';
import * as ImagePicker from "react-native-image-picker";
import ImageMultiplePicker from 'react-native-image-crop-picker';

import { Alert, View } from 'react-native';
import { useTranslation } from "react-i18next";
import { colors } from "@shared/themes";

const options = {
    title: "Select Image",
    storageOptions: {
        skipBackup: true,
        path: "images",
    },
};

export const WithPopupUploadMultipleImage = (WrappedComponent) => {
    return function WithDialogConfirmComponent({ onPress, onResponseImagePicker, ...props }) {

        const popupRef = React.useRef(null);

        const [t] = useTranslation();

        const responseCamera = (response) => {
            if (response.didCancel) {
            } else if (response.error) {
            } else {
                onResponseImagePicker(response);
            }
        }

        const pickImage = () => {
            setTimeout(() => {
                ImageMultiplePicker.openPicker({
                    multiple: true
                }).then(response => {
                    console.log('response multiple image : ')
                    console.log({ response })
                    responseCamera(response)
                });
            }, 500);
        }

        const takePicture = () => {
            setTimeout(() => {
                ImagePicker.launchCamera(options, (response) => {
                    responseCamera(response);
                });
            }, 500);
        }

        const actions = [
            {
                id: 'picker-image',
                label: t('Picker Image'),
                func: () => {
                    pickImage();
                },
            },
            {
                id: 'take-photo',
                label: t('Launch camera'),
                func: () => {
                    takePicture();
                },
            },
        ]

        const showConfirmDialog = () => {
            popupRef.current?.show();
        };

        return (
            <View>
                <WrappedComponent {...props} onPress={showConfirmDialog} />
                <PopupActionSheet ref={popupRef} actions={actions} />
            </View>
        );
    };
};
