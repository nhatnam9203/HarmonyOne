import React from 'react'
import { View, StyleSheet } from 'react-native'
import { scaleWidth, scaleHeight } from '@utils'
import { Text } from '@components'
import Ionicons from 'react-native-vector-icons/Ionicons'

const AggregateRating = () => {
    return (
        <View style={styles.wrap}>
            <View style={styles.row}>
                <Text fontFamily='medium' style={styles.title}>
                    Aggregate Rating
                </Text>
                <Text fontFamily='bold' style={styles.number}>
                    4.7
                </Text>
            </View>

            <View style={[styles.row, { marginTop: scaleHeight(0.7) }]}>
                <Text style={styles.content}>
                    All time statictis
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    {
                        new Array(4).fill().map(() => (
                            <Ionicons
                                key={Math.random()}
                                name='ios-star-sharp'
                                color='#F5C750'
                                size={scaleWidth(5)}
                            />
                        ))
                    }
                    <Ionicons
                        name='md-star-half-sharp'
                        color='#F5C750'
                        size={scaleWidth(5)}
                    />
                </View>
            </View>
            <Text style={[styles.content, { textAlign: 'right', marginTop: scaleHeight(0.7) }]}>
                122 reviews
            </Text>
        </View>
    )
}

export default AggregateRating;

const styles = StyleSheet.create({
    wrap: {
        backgroundColor: 'white',
        padding: scaleWidth(4),
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.15,
        shadowRadius: 2.34,
        elevation: 3,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: scaleWidth(4.7),
        color: '#0764B0'
    },
    number: {
        fontSize: scaleWidth(5.5),
        color: '#404040'
    },
    content: {
        fontSize: scaleWidth(4),
        color: '#585858'
    }
})
