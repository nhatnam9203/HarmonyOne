import React from 'react';
import * as ImagePicker from "react-native-image-picker";
import { View } from 'react-native';
import { colors } from "@shared/themes";
import DatePicker from 'react-native-date-picker';

const options = {
    title: "Select Image",
    storageOptions: {
        skipBackup: true,
        path: "images",
    },
};

export const WithPopupDatePicker = (WrappedComponent) => {
    return function WithComponent({ onPress, onConfirm ,...props }) {

        const [visibleDatePicker, setVisibleDatePicker] = React.useState(false);

        const showConfirmDialog = () => {
            setVisibleDatePicker(true);
        };

        return (
            <View>
                <WrappedComponent {...props} onPress={showConfirmDialog} />
                <DatePicker
                    modal
                    open={visibleDatePicker}
                    date={new Date()}
                    mode={'date'}
                    is24hourSource="device"
                    androidVariant="iosClone"
                    onConfirm={(date) => {
                        setVisibleDatePicker(false)
                        onConfirm((date))
                    }}
                    onCancel={() => {
                        setVisibleDatePicker(false)
                    }}
                />
            </View>
        );
    };
};
