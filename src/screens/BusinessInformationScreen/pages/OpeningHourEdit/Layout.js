import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { Button, WorkingTime } from "@shared/components";
import { images } from "@shared/themes/resources";
import { translate } from "@localize";

export const Layout = ({
    merchantDetail,
    workingTimeRef,
    onSave,
}) => {

    return (
        <View style={styles.container}>
            <SingleScreenLayout
                pageTitle={translate("Opening hour")}
                isLeft={true}
                isRight={false}
                isScrollLayout={false}
                containerStyle={{ paddingVertical: 0 }}
            >
                <View style={styles.content}>
                    <WorkingTime
                        renderTitle={() => <View style={{ height: scaleHeight(10) }} />}
                        ref={workingTimeRef}
                    />
                </View>
                <View style={styles.bottom}>
                    <Button
                        onPress={onSave}
                        width='100%'
                        label={translate('txtSave')}
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
        paddingBottom: scaleHeight(16)
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
