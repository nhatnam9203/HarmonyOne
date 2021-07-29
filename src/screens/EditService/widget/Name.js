import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight } from '@utils'

const Name = ({ name }) => {
    return (
        <View style={styles.container}>
            <Text fontFamily='medium' style={styles.title}>
                {name}
            </Text>
        </View>
    )
}


export default Name;

const styles = StyleSheet.create({
    title: {
        fontSize: scaleWidth(4.8),
        color: '#1366AE'
    },
    container : {
        borderBottomWidth: 1,
        borderBottomColor : '#eeeeee',
        paddingBottom : scaleHeight(2),
        marginBottom : scaleHeight(2)
    }
})