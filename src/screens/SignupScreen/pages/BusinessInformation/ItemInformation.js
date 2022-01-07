import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { InputText, IconButton } from "@shared/components";
import { images, fonts } from "@shared/themes"

export const ItemInformation = React.forwardRef(({ 
    form, errors, label, textYes, name = ""
 }, ref)=>{
    const [isCheck, setIsCheck] = React.useState(true);


    React.useImperativeHandle(ref, () => ({
        getStatus: () => {
            return isCheck;
        },
    }));
    return (
        <View style={{ marginBottom: scaleHeight(24) }}>
            <Text style={styles.lblCustom}>
                {label}
            </Text>
            <View style={styles.item}>
                <IconButton
                    icon={!isCheck ? images.checkBox : images.checkBoxEmpty}
                    onPress={() => { setIsCheck(!isCheck) }}
                    style={styles.btnIcon}
                    iconStyle={styles.checkBox}
                    resizeMode='cover'
                    renderText={() => <Text style={styles.txtIcon}>No</Text>}
                />

                <IconButton
                    icon={isCheck ? images.checkBox : images.checkBoxEmpty}
                    onPress={() => { setIsCheck(!isCheck) }}
                    style={[styles.btnIcon, { marginLeft: scaleWidth(24) }]}
                    iconStyle={styles.checkBox}
                    resizeMode='cover'
                    renderText={() => <Text style={styles.txtIcon}>{textYes}</Text>}
                />
            </View>

            {
                <View style={{ marginTop: scaleHeight(8) }}>
                    <InputText
                        form={form}
                        name={name}
                        placeholder=""
                        error={errors?.lastName}
                        editable={isCheck}
                    />
                </View>
            }
        </View>
    )
});



const styles = StyleSheet.create({

    item: {
        flexDirection: "row",
        marginTop: scaleHeight(8)
    },

    checkBox: {
        width: scaleWidth(20),
        height: scaleWidth(20)
    },

    txtIcon: {
        fontSize: scaleFont(13),
        fontFamily: fonts.REGULAR,
        marginLeft: scaleWidth(6),
        color: "#404040"
    },

    btnIcon: {
        marginTop: scaleHeight(4)
    },

    lblCustom: {
        fontSize: scaleFont(15),
        color: "#404040",
        fontFamily: fonts.MEDIUM
    },

});
