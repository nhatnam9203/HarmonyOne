import React from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput } from 'react-native';
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { useWatch } from "react-hook-form";
import { IconButton, CustomInput, InputText, InputSelect, InputDate } from "@shared/components";

const numberLength = () => {
    let ch = "";
    for (let i = 1; i <= 1600; i++) {
        ch += "*";
    }
    return ch;
}

const MarketingContent = ({
    form,
    errors,
    defaultMessage,
}) => {

    const content = useWatch({
        control: form.control,
        name: 'message'
    });

    return (
        <>
            <CustomInput
                label='Content'
                labelStyle={{ color: colors.greyish_brown_40 }}
                style={{ flexDirection: 'row', justifyContent: 'space-between', width: scaleWidth(375 - 32), alignItems: 'center' }}
                renderRight={() =>
                    <IconButton
                        icon={images.iconSync}
                        iconStyle={styles.iconRefresh}
                        style={{ marginTop: -10 }}
                        renderText={() => <Text style={styles.txtDefault}>Use default content</Text>
                        }
                    />
                }
                renderInput={() =>
                    <InputText
                        form={form}
                        name="message"
                        options={{ mask: numberLength() }}
                        placeholder="Content"
                        multiline={true}
                        style={styles.inputContent}
                    />
                }
            />
            <Text style={styles.messageLimit}>Message length limit :
                <Text style={{ fontFamily: fonts.MEDIUM }}>{1600 - (content?.toString()?.length || 0)} character</Text>
            </Text>
        </>
    );
};

export default MarketingContent;

const styles = StyleSheet.create({
    txtDefault: {
        fontSize: scaleFont(15),
        textDecorationLine: 'underline',
        color: colors.ocean_blue,
    },

    iconRefresh: {
        width: scaleWidth(15),
        height: scaleWidth(15),
        marginRight: scaleWidth(8)
    },

    messageLimit: {
        fontSize: scaleFont(13),
        marginTop: -scaleHeight(12),
        fontFamily: fonts.LIGHT
    },

    inputContent: {
        height: scaleHeight(100),
        marginTop: scaleHeight(8),
        alignItems: 'flex-start',
        paddingTop: scaleHeight(8)
    }


});
