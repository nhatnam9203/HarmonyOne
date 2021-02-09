import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight } from '@utils'
import { buttonAddMore } from '@assets'

const TotalInfo = () => {
    return (
        <View style={{ paddingHorizontal : scaleWidth(5) }}>
            <Text style={styles.totalDuration}>
                Total Duration : 90 min
            </Text>
            <ButtonAddMore />
            <View style={[styles.row, { marginTop: scaleHeight(2) }]}>
                <Text
                    fontFamily='bold'
                    fontSize={scaleWidth(4)}
                    style={{ color: '#7B99BA' }}
                >
                    Total
                </Text>
                <Text
                    fontFamily='bold'
                    fontSize={scaleWidth(5)}
                    style={{ color: '#50CF25' }}
                >
                    $ 100.00
                </Text>
            </View>
        </View>
    )
}

const ButtonAddMore = ({ onPress = () => { } }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.wrapAddMore}>
            <Image source={buttonAddMore} style={styles.iconAddMore} />
            <Text style={styles.txtAddmore}>Add more</Text>
        </TouchableOpacity>
    )
}

export default TotalInfo;

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: scaleHeight(0.8)
    },
    totalDuration: {
        color: '#7B99BA',
        fontSize: scaleWidth(3.8),
        alignSelf: 'flex-end',
        marginTop: scaleHeight(0.5)
    },
    iconAddMore: {
        width: scaleWidth(5),
        height: scaleWidth(5)
    },
    txtAddmore: {
        color: '#1366AE',
        fontSize: scaleWidth(4),
        marginLeft: scaleWidth(3)
    },
    wrapAddMore: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scaleHeight(1)
    }
});

