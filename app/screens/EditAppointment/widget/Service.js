import React from 'react'
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight } from '@utils'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Service = ({ }) => {
    return (
        <React.Fragment>
            <Text style={styles.title} fontFamily='medium'>
                Services
            </Text>
            <ItemService />
            <ItemService />
        </React.Fragment>
    )
}

const ItemService = () => {
    const renderLeftActions = (progress, dragX) => {
        /*       const trans = dragX.interpolate({
                  inputRange: [0, 50, 100, 101],
                  outputRange: [-20, 0, 0, 1],
              }); */
        return (
            <TouchableOpacity style={styles.rightButton} onPress={() => { }}>
                <AntDesign name='close' size={scaleWidth(5)} color='white' />
            </TouchableOpacity>
        );
    };

    return (
        <Swipeable renderRightActions={renderLeftActions}>
            <View style={styles.itemService}>
                <Text style={styles.time} fontFamily='bold'>
                    10:00 AM
            </Text>
                <View style={styles.row}>
                    <Text fontFamily='medium' style={styles.serviceName}>
                        Spa pedi - Artwork & Gel color
                    </Text>
                    <Text fontFamily='medium' style={styles.price}>
                        $ 50.00
                    </Text>
                </View>
                <Text style={styles.duration}>
                    60 min
                </Text>
            </View>
        </Swipeable>
    )
}

export default Service;

const styles = StyleSheet.create({
    title: {
        fontSize: scaleWidth(4),
        color: '#404040',
        marginVertical: scaleHeight(2),
        marginLeft: scaleWidth(5)
    },
    time: {
        color: '#000000',
        fontSize: scaleWidth(4.5)
    },
    serviceName: {
        fontSize: scaleWidth(4),
        color: '#1366AE',
        width : scaleWidth(70)
    },
    price: {
        fontSize: scaleWidth(4),
        color: '#000000'
    },
    duration: {
        color: '#585858',
        fontSize: scaleWidth(3.7),
        marginTop: scaleHeight(0.8)
    },
    itemService: {
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
        paddingBottom: scaleHeight(1),
        marginBottom: scaleHeight(1),
        borderRightWidth: 4,
        borderRightColor: '#EB1E26',
        marginLeft: scaleWidth(5)
    },
    row2: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: scaleHeight(0.8),
        paddingRight : scaleWidth(4)
    },
    rightButton: {
        backgroundColor: '#EB1E26',
        justifyContent: 'center',
        alignItems: 'center',
        height: '91%',
        width: scaleWidth(11)
    }
})