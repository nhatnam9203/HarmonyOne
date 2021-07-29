import React from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight, slop } from '@utils'
import { rightButton } from '@assets'

const ItemMethod = ({ name, onPress = () => { }, color }) => {
    return (
        <React.Fragment>
            <TouchableOpacity onPress={onPress} style={styles.container}>
                <Text color={color} fontFamily='medium' style={styles.txtButton}>{name}</Text>
                <Image
                    source={rightButton}
                    style={styles.iconRight(color)}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </React.Fragment>
    )
}

export default ItemMethod;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
        paddingBottom: scaleHeight(2),
        marginBottom: scaleHeight(2),
        paddingHorizontal: scaleWidth(5)
    },
    txtButton: {
        fontSize: scaleWidth(4.5)
    },
    iconRight: color => {
        return {
            width: scaleWidth(3),
            height: scaleWidth(3),
            tintColor: color,
        }
    }
})