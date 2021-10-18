import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { Button } from "@shared/components";
import { images } from "@shared/themes/resources";

export const Layout = ({
    merchantDetail,
}) => {

    const [t] = useTranslation();

    const onSave = () =>{

    }

    return (
        <View style={styles.container}>
            <SingleScreenLayout
                pageTitle={t("Photos")}
                isLeft={true}
                isRight={false}
                isScrollLayout={false}
                containerStyle={{ paddingVertical: 0, paddingTop: scaleHeight(8) }}
            >
                <View style={styles.content}>
               
                </View>
                <View style={styles.bottom}>
                    <Button
                        onPress={onSave}
                        height={scaleHeight(48)}
                        width='100%'
                        label={t('Save')}
                        highlight={true}
                    />
                </View>
            </SingleScreenLayout>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },

    content: {
        flex: 1,
        padding: scaleWidth(16)
    },

    bottom: {
        paddingHorizontal: scaleWidth(16),
        paddingBottom: scaleHeight(32)
    },

    inputPhone: {
        width: scaleWidth(250),
        height: scaleWidth(42),
        borderWidth: 1,
        borderColor: '#dddddd',
        flexDirection: 'row',
        borderRadius: 5,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        paddingHorizontal: scaleWidth(10),
        alignItems: 'center'
    },

    styleDropDown: {
        backgroundColor: "#fafafa",
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRightWidth: 0,
    },

    row: {
        flexDirection: 'row'
    },

});
