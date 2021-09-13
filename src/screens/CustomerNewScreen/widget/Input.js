import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { fonts, colors } from '@shared/themes';
import { images } from "@shared/themes/resources";

const Input = React.forwardRef(({
    label = '',
    isRequired = false,
    renderInput = null,
    error = null,
}, ref) => {

    return (
        <View style={styles.containerInput}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.label}>
                        {label}
                    </Text>
                    {isRequired && <Text style={styles.required}>*</Text>}
                </View>
                {
                    error && error?.message && <Text style={styles.errorMessage}>{error?.message}</Text>
                }
            </View>
            { renderInput && renderInput()}
        </View>
    )
});



const styles = StyleSheet.create({
    containerInput: {
        marginBottom: scaleHeight(20)
    },
    label: {
        fontSize: scaleFont(17),
        color: '#7A98BB',
        marginBottom: scaleHeight(10),
        fontFamily: fonts.REGULAR
    },
    required: {
        color: "red",
        marginLeft: scaleWidth(8),
        fontSize: scaleFont(18)
    },
    errorMessage: {
        fontSize: scaleFont(14),
        color: "red",
        marginBottom: scaleHeight(10),
        fontFamily: fonts.REGULAR
    }
});

export default Input;