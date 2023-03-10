import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Pressable } from 'react-native';
import { colors, fonts, images } from "@shared/themes";
import { CustomImage, IconButton, Button, ProgressiveImage } from "@shared/components";
import { convertMinsToHrsMins } from "@shared/utils";
import { formatNumberFromCurrency, formatMoney } from "@shared/utils";
import { isEmpty } from "lodash";
import CheckBox from "@react-native-community/checkbox";
import { translate } from "@localize";

export const ExtraOfService = ({ extras = [], onChangeExtraService, durationService = 0, service, servicePrice }) => {

    const getTotalDuration = () => {
        let total = 0;
        total += parseInt(durationService);
        for (const el of extras) {
            if (el.checked) {
                total += parseInt(el.duration);
            }
        }
        return `${convertMinsToHrsMins(total)}`;
    }

    const getTotalPrice = () => {
        let total = 0;
        total += formatNumberFromCurrency(servicePrice);
        for (const el of extras) {
            if (el.checked) {
                total += formatNumberFromCurrency(el.price);
            }
        }
        return `$ ${formatMoney(total)}`;
    }

    return (
        <View style={styles.containerExtras}>
            <Text style={styles.titleExtra}>{translate("txtExtras")}</Text>
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
                    <Text style={styles.total}>{translate("txtTotal")}:</Text>
                    <Text style={styles.total}>{getTotalDuration()}</Text>
                </View>
                <Text style={[styles.total, { fontFamily: fonts.BOLD }]}>
                    {getTotalPrice()}
                </Text>
            </View>
        </View>
    );
};

const ItemExtra = ({ extra, onChangeExtraService }) => {
    const changeChecked = (newValue) => {
        onChangeExtraService({
            ...extra,
            checked: newValue,
        });
    }

    return (
        <Pressable onPress={() => changeChecked(!extra?.checked)} style={styles.wrapExtra}>
            <CheckBox
                disabled={false}
                value={extra?.checked}
                tintColor={colors.ocean_blue}
                onValueChange={(newValue) => { changeChecked(newValue) }}
                boxType='square'
                tintColors={colors.ocean_blue}
                style={{ width: scaleWidth(20), height: scaleWidth(20), marginRight: scaleWidth(16) }}
            />

            {
                isEmpty(extra?.imageUrl) ?
                    <CustomImage
                        style={styles.serviceImage}
                        source={images.serviceDefault}
                        resizeMode="cover"
                    /> :
                    <ProgressiveImage
                        url={extra?.imageUrl}
                        resizeMode='cover'
                        width={scaleHeight(60)}
                        height={scaleHeight(60)}
                        style={styles.serviceImage}
                    />
            }
            <View style={styles.wrapContent}>
                <Text style={styles.textServiceName}>{extra?.name}</Text>
                <View style={styles.bottomContent}>
                    <Text style={styles.textServiceDuration}>
                        {`${extra?.duration} ${translate("min")}`}
                    </Text>
                    <Text style={styles.textServiceTotal}>
                        {`$ ${extra?.price}`}
                    </Text>
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
});
