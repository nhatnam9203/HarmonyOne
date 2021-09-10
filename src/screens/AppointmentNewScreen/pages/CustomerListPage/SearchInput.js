import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native';
import { images } from "@shared/themes/resources";
import { IconButton } from "@shared/components";

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

            <IconButton
                icon={value.length > 0 ? images.iconCloseGrey : images.iconSearchBlue}
                iconStyle={styles.iconClose}
                onPress={removeText}
            />
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