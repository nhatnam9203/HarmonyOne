import React from 'react'
import { View, FlatList } from 'react-native'
import { Text } from '@components'
import { Header, Item } from './widget'
import PopupDelete from './widget/PopupDelete'
import styles from './styles'

const data = [
    {
        title: 'New appointment',
        code: '#9876456454',
        content: 'You have a new appointment to confirm',
        date: '02/20/2020',
        time: '03:16 PM',
        isRead: false
    },
    {
        title: 'New appointment',
        code: '#9876456454',
        content: 'You have a new appointment to confirm',
        date: '02/20/2020',
        time: '03:16 PM',
        isRead: false
    },
    {
        title: 'New appointment',
        code: '#9876456454',
        content: 'You have a new appointment to confirm',
        date: '02/20/2020',
        time: '03:16 PM',
        isRead: false

    },
    {
        title: 'New appointment',
        code: '#9876456454',
        content: 'You have a new appointment to confirm',
        date: '02/20/2020',
        time: '03:16 PM',
        isRead: false

    },
    {
        title: 'New appointment',
        code: '#9876456454',
        content: 'You have a new appointment to confirm',
        date: '02/20/2020',
        time: '03:16 PM',
        isRead: true
    },
    {
        title: 'New appointment',
        code: '#9876456454',
        content: 'You have a new appointment to confirm',
        date: '02/20/2020',
        time: '03:16 PM',
        isRead: true
    },
    {
        title: 'New appointment',
        code: '#9876456454',
        content: 'You have a new appointment to confirm',
        date: '02/20/2020',
        time: '03:16 PM',
        isRead: true

    },
    {
        title: 'New appointment',
        code: '#9876456454',
        content: 'You have a new appointment to confirm',
        date: '02/20/2020',
        time: '03:16 PM',
        isRead: true

    },
    {
        title: 'New appointment',
        code: '#9876456454',
        content: 'You have a new appointment to confirm',
        date: '02/20/2020',
        time: '03:16 PM',
        isRead: true
    },
    {
        title: 'New appointment',
        code: '#9876456454',
        content: 'You have a new appointment to confirm',
        date: '02/20/2020',
        time: '03:16 PM',
        isRead: true

    },
    {
        title: 'New appointment',
        code: '#9876456454',
        content: 'You have a new appointment to confirm',
        date: '02/20/2020',
        time: '03:16 PM',
        isRead: true

    },
    {
        title: 'New appointment',
        code: '#9876456454',
        content: 'You have a new appointment to confirm',
        date: '02/20/2020',
        time: '03:16 PM',
        isRead: true

    },
    {
        title: 'New appointment',
        code: '#9876456454',
        content: 'You have a new appointment to confirm',
        date: '02/20/2020',
        time: '03:16 PM',
        isRead: true

    },
    {
        title: 'New appointment',
        code: '#9876456454',
        content: 'You have a new appointment to confirm',
        date: '02/20/2020',
        time: '03:16 PM',
        isRead: true

    },
];

const index = () => {

    const [isPopupDelete, setPopupDelete] = React.useState(false);

    const openPopupDelete = () => {
        setPopupDelete(true);
    }

    const closePopupDelete = () => {
        setPopupDelete(false);
    }
    
    const onPressYes = () =>{
        closePopupDelete();
    }

    return (
        <View style={styles.container}>
            <Header openPopupDelete={openPopupDelete} />
            <FlatList
                data={data}
                keyExtractor={(item) => item.code + Math.random().toString()}
                renderItem={({ item }) => <Item item={item} />}
                style={{ flex: 1 }}
            />
            <PopupDelete
                isPopupDelete={isPopupDelete}
                closePopupDelete={closePopupDelete}
                onPressYes = {onPressYes}
            />
        </View>
    )
}

export default index;
