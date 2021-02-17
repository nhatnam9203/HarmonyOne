import React from 'react'
import { View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight, slop } from '@utils'
import { icon_close } from '@assets'

const InputProfile = ({ title, value, onChange = () => { }, placeholder = '' }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.wrapInput}>
                <TextInput
                    value={value}
                    style={styles.input}
                    onChange={onChange}
                    placeholderTextColor='grey'
                    placeholder={placeholder}
                />
                <TouchableOpacity onPress={() => onChange('')} hitSlop={slop}>
                    <Image
                        source={icon_close}
                        style={styles.close}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default InputProfile;

const styles = StyleSheet.create({
    container: {
        marginTop: scaleHeight(2.5)
    },
    title: {
        color: '#7B99BA',
        fontSize: scaleWidth(4.5)
    },
    wrapInput: {
        padding: scaleWidth(2.8),
        width: '100%',
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: scaleHeight(1.3)
    },
    input: {
        flex: 1,
        fontSize: scaleWidth(4.3)
    },
    close: {
        width: scaleWidth(5),
        height: scaleWidth(5)
    }
})