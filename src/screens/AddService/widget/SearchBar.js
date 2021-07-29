import React from 'react'
import { View, StyleSheet , TextInput , Image } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight } from '@utils'
import { search } from '@assets'

const SearchBar = ({ valueSearch, onChangeSearch }) => {

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder='Search by service name'
                placeholderTextColor='#CCCCCC'
                value={valueSearch}
                onChangeText={text=>onChangeSearch(text)}
            />

            <Image source={search} style={styles.iconSearch} />
        </View>
    )
}

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        padding : scaleWidth(3.5),
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius : 5,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
    },
    input : {
        color : '#404040',
        fontSize : scaleWidth(4),
        flex : 1,
    },
    iconSearch : {
        width : scaleWidth(5),
        height : scaleWidth(5),
    }
})