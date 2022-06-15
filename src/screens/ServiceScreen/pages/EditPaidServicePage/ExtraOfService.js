import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, ScrollView, Pressable } from 'react-native';
import { colors, fonts, images } from "@shared/themes";
import { CustomImage, IconButton, Button } from "@shared/components";
import { convertMinsToHrsMins } from "@shared/utils";
import { formatNumberFromCurrency, formatMoney } from "@shared/utils";
import { isEmpty } from "lodash";
import CheckBox from "@react-native-community/checkbox";
import { TextInputMask } from "react-native-masked-text";

export const ExtraOfService = ({ extras = [], onChangeExtraService, durationService = 0, service }) => {
    const getTotalDuration = () => {
        let total = 0;
        total += parseInt(durationService);
        for (const el of extras) {
            total += parseInt(el.duration);
        }
        return `${convertMinsToHrsMins(total)}`;
    }

    const getTotalPrice = () => {
        let total = 0;
        total += formatNumberFromCurrency(service.price);
        for (const el of extras) {
             total += formatNumberFromCurrency(el.price);
        }
        return formatMoney(total);
    }

    return (
        <View style={styles.containerExtras}>
            <Text style={styles.titleExtra}>Extra services</Text>
            {
                extras.map((extra, key) => {
                    return (
                        <ItemExtra
                            key={extra?.extraId + "extraService"}
                            extra={extra}
                            onChangeExtraService={onChangeExtraService}
                        />
                    )
                })
            }
            <View style={styles.totalRow}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.total}>Total:</Text>
                    <Text style={styles.total}>{getTotalDuration()}</Text>
                </View>
                <Text style={[styles.total, { fontFamily: fonts.BOLD }]}>
                    {getTotalPrice()}
                </Text>
            </View>
            <View style={styles.totalRow}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.total}>Tip:</Text>
                </View>
                <Text style={[styles.total, { fontFamily: fonts.BOLD }]}>
                    {service?.tipAmount}
                </Text>
            </View>
        </View>
    );
};

const ItemExtra = ({ extra, onChangeExtraService }) => {
    const inputPriceRef = React.useRef();

    const changeIsEditPrice = (newValue) => {
        onChangeExtraService({
            ...extra,
            isEditPrice: newValue,
        });
    }

    const setPrice = (newPrice) => {
        onChangeExtraService({
            ...extra,
            price: newPrice,
            isEditPrice: false,
        });

    } 

    return (
        <Pressable style={styles.wrapExtra}>
            {
                isEmpty(extra?.imageUrl) ?
                    <CustomImage
                        style={styles.serviceImage}
                        source={images.serviceDefault}
                        resizeMode="cover"
                    /> :
                    <CustomImage
                        style={styles.serviceImage}
                        source={{ uri: extra?.imageUrl }}
                        resizeMode="cover"
                    />
            }
            <View style={styles.wrapContent}>
                <Text style={styles.textServiceName}>{extra?.name}</Text>
                <View style={styles.bottomContent}>
                    <Text style={styles.textServiceDuration}>
                        {`${extra?.duration} min`}
                    </Text>
                    {
                    extra?.isEditPrice && <TextInputMask
                        ref={inputPriceRef}
                        value={extra?.price}
                        onChangeText={text => setPrice(text)}
                        style={[styles.duration, styles.textInput]}
                        type="money"
                        editable={extra?.isEditPrice}
                        options={{ precision: 2, 
                            separator: '.', 
                            delimiter: ',', 
                            unit: '', 
                            suffixUnit: '' }}
                    />
                    }
                    {
                    !extra?.isEditPrice && <Text
                        style={[styles.duration, { fontSize: scaleFont(18) }]}
                    >
                        {extra?.price}
                    </Text>
                    }
                    <TouchableOpacity onPress={() => {
                        if (extra?.isEditPrice) {
                            changeIsEditPrice(false);

                        } else {
                            changeIsEditPrice(true);
                            setTimeout(() => {
                                inputPriceRef?.current?._inputElement?.focus();
                            }, 250);
                        }
                    }}
                    >
                        <Image
                        source={!extra?.isEditPrice ? images.penEdit : images.iconChecked}
                        resizeMode='contain'
                        style={[styles.iconEditPencil, { tintColor: !extra?.isEditPrice ? "#333" : "#4AD100" }]}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    containerExtras: {
        marginTop: scaleHeight(16)
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: scaleHeight(16),
        paddingRight: scaleWidth(16)
    },
    total: {
        marginLeft: scaleWidth(17),
        fontFamily: fonts.REGULAR,
        fontSize: scaleFont(17),
        letterSpacing: 0,
        color: colors.greyish_brown_40,
    },
    titleExtra: {
        marginLeft: scaleWidth(17),
        fontFamily: fonts.MEDIUM,
        fontSize: scaleFont(17),
        letterSpacing: 0,
        color: colors.ocean_blue,
    },
    wrapExtra: {
        height: scaleHeight(90),
        flexDirection: 'row',
        paddingVertical: scaleHeight(16),
        borderBottomColor: '#eeeeee',
        borderBottomWidth: scaleHeight(1),
        marginHorizontal: scaleWidth(16)
    },
    wrapContent: { flex: 1, marginLeft: scaleWidth(16), justifyContent: 'space-between' },
    textTitle: {
        fontFamily: fonts.BOLD,
        fontSize: scaleFont(17),
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.greyish_brown_40,
    },
    serviceImage: {
        width: scaleHeight(60),
        height: scaleHeight(60),
        borderRadius: scaleHeight(3),
    },
    textServiceName: {
        fontFamily: fonts.MEDIUM,
        fontSize: scaleFont(15),
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        color: colors.ocean_blue,
        flex: 1,
    },
    bottomContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textServiceDuration: {
        fontFamily: fonts.LIGHT,
        fontSize: scaleFont(14),
        fontWeight: '300',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'right',
        color: colors.greyish_brown_40,
    },
    textServiceTotal: {
        fontFamily: fonts.MEDIUM,
        fontSize: scaleFont(14),
        letterSpacing: 0,
        textAlign: 'right',
        color: colors.greyish_brown_40,
    },
    iconEditPencil: {
        width: scaleWidth(16),
        height: scaleWidth(16),
        tintColor: "#404040"
    },
    textInput: { 
        fontSize: scaleFont(18), 
        paddingVertical: 7, 
        flex: 0, 
        includeFontPadding: false, 
    },
});
