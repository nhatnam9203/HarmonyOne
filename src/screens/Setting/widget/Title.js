import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight } from '@utils'

const Title = ({text}) => {
    return (
        <Text fontFamily='medium' style={styles.title}>
           {text} 
        </Text>
    )
}

export default Title;

const styles = StyleSheet.create({
    title: {
        fontSize : scaleWidth(5),
        marginTop: scaleHeight(2)
    }
})
