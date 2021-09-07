import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { icon_close_grey, icon_search_blue } from "@assets";

const SearchInput = ({
    placeholder = "",
    value = "",
    onChangeText = () => { },
}) => {
    return (
        <View style={styles.wrapInput}>
            <TextInput
                placeholder={placeholder}
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
            />
            <TouchableOpacity>
                <Image source={icon_search_blue} style={styles.iconClose} />
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
        marginBottom : scaleHeight(16)
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