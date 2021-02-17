import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight } from '@utils'
import moment from 'moment'

const TotalInfo = ({ status }) => {
    return (
        <View>
            <Text style={styles.totalDuration}>
                Total Duration : 90 min
            </Text>
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
            {status == 'paid' && <View style={{ marginTop : scaleHeight(2) }}>
                <Text style={styles.txtPaid}>Paid at</Text>
                <Text style={[styles.txtPaid,{ marginTop: scaleHeight(0.5) }]}>{moment().format('hh:mm A dddd, MM/DD/YYYY')}</Text>
            </View>}
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
    txtPaid : {
        color: '#404040',
        fontSize : scaleWidth(4)
    }
})