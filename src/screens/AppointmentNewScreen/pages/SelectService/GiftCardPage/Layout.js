import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { colors, fonts } from "@shared/themes";
import {  DialogActiveGiftCard } from "@shared/components";
import { AddGiftCard } from "./AddGiftCard";

export const Layout = ({
    dialogActiveGiftCard,
    hideDialogGiftCard,
    showDialogGiftCard,
    onCheckGiftCardSucces,
    data
}) => {

    return (
        <View style={styles.container}>
            <AddGiftCard onPress={showDialogGiftCard} data={data} />
            <DialogActiveGiftCard
                ref={dialogActiveGiftCard}
                title="Enter gift card serial number"
                onConfirmYes={() => { }}
                onModalHide={() => { }}
                onSuccess={onCheckGiftCardSucces}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: "#eeeeee"
    },
})