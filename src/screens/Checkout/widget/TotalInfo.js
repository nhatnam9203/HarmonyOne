import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity, } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight } from '@utils'
import { buttonAddMore, rightButton } from '@assets'

const TotalInfo = ({ }) => {
    return (
        <View>
            <View style={styles.row}>
                <Text style={styles.txtSubtotal}>Subtotal</Text>
                <Text style={styles.txtSubtotal} fontFamily='bold'>$ 78.00</Text>
            </View>

            <View style={styles.rowInfo}>
                <Text style={styles.txtSubtotal}>Tips</Text>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={buttonAddMore} style={styles.iconAddMore} />
                    <Text style={styles.txtAddTip}>Add tip</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.rowInfo}>
                <Text style={styles.txtSubtotal}>Discount</Text>
                <Text style={styles.txtSubtotal} fontFamily='bold'>$ 78.00</Text>
            </View>

            <View style={styles.rowInfo}>
                <Text style={[styles.txtSubtotal, { color: '#1366AE' }]} fontFamily='medium'>
                    Promotion name 1
                </Text>
                <Text style={styles.txtSubtotal} fontFamily='bold'>$ 78.00</Text>
            </View>

            <View style={styles.line} />

            <View style={[styles.row, styles.rowTotal]}>
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
    txtPaid: {
        color: '#404040',
        fontSize: scaleWidth(4)
    },
    txtAddTip: {
        fontSize: scaleWidth(4),
        color: '#1366AE',
    },
    iconAddMore: {
        width: scaleWidth(4.5),
        height: scaleWidth(4.5),
        marginRight: scaleWidth(2)
    },
    rowInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: scaleHeight(1.7)
    },
    txtSubtotal: {
        fontSize: scaleWidth(4.15)
    },
    line: {
        width: '100%',
        marginVertical: scaleHeight(1.5),
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee'
    },
    rowTotal: {
        borderWidth: 1,
        borderColor: '#dddddd',
        backgroundColor: '#FAFAFA',
        padding: scaleWidth(3),
        borderRadius: 5
    },
})