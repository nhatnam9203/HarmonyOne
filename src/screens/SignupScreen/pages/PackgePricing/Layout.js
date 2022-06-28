import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { Button } from "@shared/components";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { images } from "@shared/themes/resources";
import { fonts, colors } from "@shared/themes";
import { Switch } from "react-native-paper";
import NavigationService from '@navigation/NavigationService';
import ToggleSwitch from 'toggle-switch-react-native';
import { translate } from "@localize";

export const Layout = ({
    onSubmit,
    numberOfStaff,
    setNumberOfStaff,
    isMonthly,
    setIsMonthly
}) => {

    const [t] = useTranslation();

    return (
        <View style={styles.container}>
            <SingleScreenLayout
                pageTitle={translate('Packages & Pricing')}
                isRight={false}
                isScrollLayout={false}
                containerStyle={{ paddingVertical: 0 }}
            >
                <KeyboardAwareScrollView style={styles.content}>
                    <View style={{ marginBottom: scaleHeight(24) }}>
                        <Text style={styles.txtTrryApp}>
                            {translate("Try Harmony One apps free for 30 days!")}
                        </Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text style={styles.txtTrryApp}>
                                {translate("No payment information required")} {" "}
                            </Text>
                            <Image source={images.happy_face} style={styles.happy_face} />
                        </View>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => setNumberOfStaff(1)} style={[styles.containerHeaderItem, { borderBottomColor: numberOfStaff == 1 ? "#55A8DC" : "#dddddd", borderBottomWidth: numberOfStaff == 1 ? 5 : 1 }]}>
                            <Text style={[styles.txtHeader, { color: numberOfStaff == 1 ? colors.ocean_blue : "#000" }]}>
                                {translate("SOLO")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setNumberOfStaff(2)} style={[styles.containerHeaderItem, { borderBottomColor: numberOfStaff == 2 ? "#55A8DC" : "#dddddd", borderBottomWidth: numberOfStaff == 2 ? 5 : 1 }]}>
                            <Text style={[styles.txtHeader, { color: numberOfStaff == 2 ? colors.ocean_blue : "#000" }]}>
                                {translate("DUO")}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <ItemPackage title={translate("Number of Staff")} numberOfStaff={numberOfStaff} />
                    <ItemPackage title={translate("Mobbile POS")} />
                    <ItemPackage title={translate("Check-in App" )}/>
                    <ItemPackage title={translate("Marketing")} />
                    <ItemPackage title={translate("Report")} isBottom={true} />

                    <View style={styles.containerBottom}>
                        {
                            numberOfStaff == 1 ?
                                <Text style={styles.txtPricing}>
                                    {` ${isMonthly ? "$199.50" : "$19.50"}/`}
                                    <Text style={[styles.txtPricing, { fontFamily: fonts.MEDIUM, fontSize: scaleFont(14) }]}>
                                        {isMonthly ? "year" : "month"}
                                    </Text>
                                </Text> :
                                <Text style={styles.txtPricing}>
                                    {` ${isMonthly ? "$299.50" : "$29.50"}/`}
                                    <Text style={[styles.txtPricing, { fontFamily: fonts.MEDIUM, fontSize: scaleFont(14) }]}>
                                        {isMonthly ? "year" : "month"}
                                    </Text>
                                </Text>
                        }
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <View style={{ alignItems: "center" }}>
                                <Text style={styles.txtBilled}>{translate("Billed")}</Text>
                                <Text style={styles.txtBilled}>{translate("Monthly")}</Text>
                            </View>
                            <View style={{ marginHorizontal: scaleWidth(10) }}>
                                <ToggleSwitch
                                    isOn={isMonthly}
                                    onColor={colors.ocean_blue}
                                    offColor={colors.ocean_blue}
                                    size="large"
                                    onToggle={(isOn) => setIsMonthly(isOn)}
                                />
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <Text style={styles.txtBilled}>{translate("Billed")}</Text>
                                <Text style={styles.txtBilled}>{translate("Anually")}</Text>
                            </View>
                        </View>
                    </View>


                    <View style={{ height: scaleHeight(100) }} />
                </KeyboardAwareScrollView>
                <View style={styles.bottom}>
                    <Button
                        label={translate("Start free trial")}
                        onPress={onSubmit}
                        highlight={true}
                        width={'100%'}
                    />
                </View>
            </SingleScreenLayout>
        </View>
    );
};

const ItemPackage = ({ title = "", numberOfStaff, isLeft = false, isRight = false, isBottom }) => (
    <View style={styles.containerItem}>
        <View style={[
            styles.item, {
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderBottomWidth: isBottom ? 1 : 0,
                borderColor: "#dddddd",
                paddingLeft: scaleWidth(8),
                alignItems: "center"
            }
        ]}>
            <Text style={styles.txtItem}>{title}</Text>
        </View>
        <View style={[styles.item, {
            justifyContent: "center",
            borderRightWidth: 1,
            borderBottomWidth: isBottom ? 1 : 0,
            borderColor: "#dddddd",
            alignItems: "center"
        }]}>
            {
                numberOfStaff ?
                    <Text style={styles.numberOfStaff}>
                        {numberOfStaff}
                    </Text>
                    :
                    <Image
                        source={images.check_package_pricing}
                        style={styles.check_package_pricing}
                    />
            }
        </View>
    </View>
)

const styles = StyleSheet.create({
    containerBottom: {
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: scaleHeight(24)
    },
    txtBilled: {
        color: colors.ocean_blue,
        fontSize: scaleFont(16),
        fontFamily: fonts.BOLD,
    },
    txtPricing: {
        color: "#4CA356",
        fontSize: scaleFont(22),
        fontFamily: fonts.BOLD,
        marginBottom: scaleHeight(20)
    },
    txtHeader: {
        color: "#000",
        fontSize: scaleFont(16),
        fontFamily: fonts.BOLD
    },
    containerHeaderItem: {
        width: "50%",
        alignItems: "center",
        padding: scaleHeight(10),
        borderBottomWidth: 4,
        borderBottomColor: "#55A8DC",
    },
    numberOfStaff: {
        color: colors.ocean_blue,
        fontFamily: fonts.BOLD,
        fontSize: scaleFont(18)
    },
    check_package_pricing: {
        width: scaleWidth(19),
        height: scaleWidth(19)
    },
    txtItem: {
        fontSize: scaleFont(17),
        fontFamily: fonts.MEDIUM,
        color: "#000",
    },
    item: {
        width: scaleWidth(375 / 2 - 16),
        height: scaleHeight(45),
        flexDirection: "row"
    },
    containerItem: {
        width: scaleWidth(375),
        flexDirection: "row",
    },
    containerPackage: {
        flexDirection: "row",
        height: scaleHeight(600),
        backgroundColor: "blue"
    },
    txtTrryApp: {
        fontSize: scaleFont(16),
        fontFamily: fonts.MEDIUM,
        color: "#585858",
        marginTop: 8
    },
    happy_face: {
        width: scaleWidth(25),
        height: scaleWidth(25),

    },

    container: {
        flex: 1,
        backgroundColor: "white",
    },

    content: {
        flex: 1,
        padding: scaleWidth(16),
        paddingTop: scaleHeight(16),
    },
    bottom: {
        padding: scaleWidth(16),
        width: scaleWidth(375),
    },

});
