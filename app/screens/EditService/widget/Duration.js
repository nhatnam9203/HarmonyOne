import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight , convertMinsToHrsMins } from '@utils'

const Duration = ({
    duration,
    calculateDuration
}) => {
    return (
        <View>
            <Text fontFamily='medium' style={styles.title}>
                {'Duration'}
            </Text>
            <View style={styles.row}>
                <TouchableOpacity
                    onPress={() => calculateDuration('minus')}
                    style={styles.button}
                >
                    <Text style={styles.txtButton}>-</Text>
                </TouchableOpacity>
                <View style={styles.wrapTime}>
                    <Text fontFamily='bold' style={styles.time}>{`${convertMinsToHrsMins(duration)}`}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => calculateDuration('plus')}
                    style={styles.button}
                >
                    <Text style={styles.txtButton}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default Duration;

const styles = StyleSheet.create({
    title: {
        fontSize: scaleWidth(4),
        color: '#7B99BA',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: scaleHeight(1.5),
        height: scaleHeight(5),
    },
    wrapTime: {
        width: scaleWidth(58),
        height: '100%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1.84,
        backgroundColor: 'white',
        elevation: 3,
    },
    time: {
        color: '#000000',
        fontSize: scaleWidth(4.2),
    },
    button: {
        width: scaleWidth(12),
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.15,
        shadowRadius: 1.84,
        backgroundColor: 'white',
        elevation: 3,
        borderRadius: 5
    },
    txtButton: {
        color : '#000000',
        fontSize : scaleWidth(5)
    }
})