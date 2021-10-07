import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { IconButton, CustomInput, InputText, InputSelect, InputDate, ButtonUpload } from "@shared/components";
import { WithPopupActionSheet } from "@shared/HOC";
import { Switch } from "react-native-paper";
import { RadioButton } from 'react-native-paper';
import RadioButtonRN from 'radio-buttons-react-native';
import Collapsible from "react-native-collapsible";

const dataRadioButton = [
    {
        label: 'SMS'
    },
    {
        label: 'MMS'
    }
];


let EditButton = ({ ...props }) => {
    return (
        <IconButton
            icon={images.treedot}
            iconStyle={styles.treedot}
            style={styles.buttonTreedot}
            onPress={() => { }}
            {...props}
        />
    );
};

EditButton = WithPopupActionSheet(EditButton);

const MarketingSmsConfiguration = ({
    onUploadImage,
    imageUrl,
}) => {

    const [smsType, setSmsType] = React.useState("SMS");

    return (
        <>
            <CustomInput
                label='SMS/MMS configuration'
                renderInput={() =>
                    <RadioButtonRN
                        data={dataRadioButton}
                        selectedBtn={(e) => setSmsType(e?.label)}
                        box={false}
                        style={{ flexDirection: 'row' }}
                        boxStyle={{ width: scaleWidth(140) }}
                        textStyle={{ marginLeft: scaleWidth(8), fontSize: scaleFont(16) }}
                        activeColor='#1B68AC'
                        initial={1}
                    />
                }
            />

            <Collapsible collapsed={smsType == "SMS"} duration={200}>
                <Text style={[styles.txtItem, { color: colors.black }]}>
                    Media
                </Text>
                <ButtonUpload
                    onResponseImagePicker={onUploadImage}
                    imageUrl={imageUrl}
                />
                <Text style={styles.messageLimit}>
                    Image size less than <Text style={{ fontFamily: fonts.BOLD }}>5MB</Text>, support jpeg, png, gif.
                </Text>
            </Collapsible>
        </>
    );
};

export default MarketingSmsConfiguration;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },

    content: {
        flex: 1,
        padding: scaleWidth(16),
    },

    buttonTreedot: {
        height: '100%',
        width: scaleWidth(35),
        justifyContent: 'center',
        alignItems: 'center',
    },

    treedot: {
        tintColor: colors.black,
        width: scaleHeight(20),
        height: scaleHeight(20),
    },

    rowReverse: {
        justifyContent: 'space-between',
        flexDirection: 'row-reverse',
        marginBottom: scaleHeight(16)
    },

    txtItem: {
        fontSize: scaleFont(16),
        fontFamily: fonts.REGULAR,
        color: '#809DBD',
    },

    messageLimit: {
        fontSize: scaleFont(13),
        marginTop: -scaleHeight(12),
        fontFamily: fonts.LIGHT,
        marginBottom: scaleHeight(16)
    },

    textDate: {
        fontSize: scaleFont(15),
    },

    iconCalendar: {
        width: scaleWidth(20), height: scaleWidth(20)
    },

    iconTime: {
        width: scaleWidth(12), height: scaleWidth(12)
    }
});