import React from 'react'
import { View, StyleSheet, TextInput , Platform } from 'react-native';
import { images } from "@shared/themes/resources";
import { IconButton } from "@shared/components";

export const SearchInput = ({
    placeholder = "",
    value = "",
    onChangeText = () => { },
    removeText = () => { },
    onSubmit = () =>{}
}) => {
    return (
        <View style={styles.wrapInput}>
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmit}
            />

            <IconButton
                icon={value.length > 0 ? images.iconCloseGrey : images.iconSearchBlue}
                iconStyle={styles.iconClose}
                onPress={removeText}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapInput: {
        width: scaleWidth(345),
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal : scaleWidth(10),
        paddingVertical : Platform.OS === "android" ? 0 : scaleHeight(10),
        marginBottom: scaleHeight(16),
        marginHorizontal : scaleWidth(16)
    },
    input: {
        flex: 1,
        fontSize: scaleFont(17)
    },
    iconClose: {
        width: scaleWidth(22),
        height: scaleWidth(22),
    }
})