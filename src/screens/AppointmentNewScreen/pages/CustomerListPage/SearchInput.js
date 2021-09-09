import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { iconCloseGrey, iconSearchBlue } from "@shared/themes/resources";

const SearchInput = ({
    placeholder = "",
    value = "",
    onChangeText = () => { },
    removeText = () => { },
}) => {
    return (
        <View style={styles.wrapInput}>
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
            />
            <TouchableOpacity
                onPress={removeText}
                activeOpacity={1}
            >
                <Image
                    source={value.length > 0 ? iconCloseGrey : iconSearchBlue}
                    style={styles.iconClose}
                />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput;

const styles = StyleSheet.create({
    wrapInput: {
        width: '100%',
        borderWidth: 2,
        borderColor: '#eeeeee',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: scaleWidth(10),
        marginBottom: scaleHeight(16)
    },
    input: {
        flex: 1,
        fontSize: scaleFont(16)
    },
    iconClose: {
        width: scaleWidth(22),
        height: scaleWidth(22),
    }
})