import React from 'react'
import { View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight, slop } from '@utils'
import { icon_close } from '@assets'

const InputDuration = ({
    title,
    minutes,
    setMinutes,
    openTime,
    setOpenTime,
    secondTime,
    setSecondTime
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Duration</Text>
            <View style={styles.row}>
                <Input title='Minutes' value={minutes} onChange={setMinutes} />
                <Input title='Open time' value={openTime} onChange={setOpenTime} />
                <Input title='Second time' value={secondTime} onChange={setSecondTime} />
            </View>
        </View>
    )
}

const Input = ({ value = '', onChange = () => { }, placeholder = '00', title = '' }) => {
    return (
        <View style={{ marginTop: scaleHeight(1.5) }}>
            <Text color='#404040' fontSize={scaleWidth(4)}>
                {title}
            </Text>
            <View style={styles.wrapInput}>
                <TextInput
                    value={value}
                    style={styles.input}
                    onChangeText={onChange}
                    placeholderTextColor='grey'
                    placeholder={placeholder}
                    maxLength={2}
                    keyboardType='numeric'
                />
                <Text color='#000000' fontSize={scaleWidth(4)}>
                    min
                </Text>
            </View>
        </View>
    )
}

export default InputDuration;

const styles = StyleSheet.create({
    container: {
        marginTop: scaleHeight(2)
    },
    title: {
        color: '#7B99BA',
        fontSize: scaleWidth(4.5)
    },
    wrapInput: {
        padding: scaleWidth(2.8),
        width: scaleWidth(28),
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
        fontSize: scaleWidth(4)
    },
    close: {
        width: scaleWidth(5),
        height: scaleWidth(5)
    },
    row: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    }
})