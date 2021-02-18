import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight, slop } from '@utils'
import { check_box, check_box_empty } from '@assets'
import AntDesign from 'react-native-vector-icons/AntDesign'

const PopupFilter = () => {

    const [type, setType] = React.useState('All reviews');
    const [status, setStatus] = React.useState('All status');

    const onChangeType = (typeChange) => {
        setType(typeChange);
    }

    const onChangeStatus = (statusChange) => {
        setStatus(statusChange);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text fontFamily='bold' style={styles.txtHeader}> Filter </Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.title}>Type</Text>
                <ItemFilter isChecked={type == 'All reviews'} onPress={() => onChangeType('All reviews')} content='All reviews' />
                <ItemFilter isChecked={type == 'Good reviews' || type == 'All reviews'} onPress={() => onChangeType('Good reviews')} content='Good reviews' />
                <ItemFilter isChecked={type == 'Bad reviews' || type == 'All reviews'} onPress={() => onChangeType('Bad reviews')} content='Bad reviews' />

                <Text style={[styles.title, { marginTop: scaleHeight(3) }]}>Status</Text>
                <ItemFilter isChecked={status == 'All status'} onPress={() => onChangeStatus('All status')} content='All status' />
                <ItemFilter isChecked={status == 'Show' || status == 'All status'} onPress={() => onChangeStatus('Show')} content='Show' />
                <ItemFilter isChecked={status == 'Hidden' || status == 'All status'} onPress={() => onChangeStatus('Hidden')} content='Hidden' />
            </View>
        </View>
    )
}

const ItemFilter = ({ content, onPress, isChecked }) => {
    return (
        <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.row}>
            <Image source={isChecked ? check_box : check_box_empty} style={styles.checkbox} />
            <Text style={styles.content}>{content}</Text>
        </TouchableOpacity>
    )
}

export default PopupFilter;

const styles = StyleSheet.create({
    container: {
        width: scaleWidth(100),
    },
    header: {
        width: scaleWidth(100),
        height: scaleHeight(5.5),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1366AE',
    },
    txtHeader: {
        color: 'white',
        fontSize: scaleWidth(5)
    },
    body: {
        height: scaleHeight(40),
        backgroundColor: 'white',
        padding: scaleWidth(5),
        paddingBottom: scaleHeight(5)
    },
    title: {
        fontSize: scaleWidth(4.3),
        color: '#7B99BA'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scaleHeight(2)
    },
    content: {
        marginLeft: scaleWidth(3),
        fontSize: scaleWidth(4),
        color: '#404040',
    },
    checkbox: {
        width: scaleWidth(5),
        height: scaleWidth(5)
    }
})