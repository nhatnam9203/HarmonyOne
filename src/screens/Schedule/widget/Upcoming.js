import React from 'react'
import { View, SectionList, StyleSheet, Image } from 'react-native'
import { Text } from '@components'
import { scaleWidth, scaleHeight } from '@utils'
import moment from 'moment';
import Item from './Item'

const data = [
    {
        title: moment().format('dddd, MMMM DD, YYYY'),
        data: [
            {
                fromTime: '08:00 AM',
                toTime: '10:00 AM',
                userName: 'Kevin Baber',
                phone: '(+84) 35514-0858',
                status: 'unconfirm'
            },
            {
                fromTime: '08:00 AM',
                toTime: '10:00 AM',
                userName: 'Kevin Baber',
                phone: '(+84) 35514-0858',
                status: 'confirm'
            },
            {
                fromTime: '08:00 AM',
                toTime: '10:00 AM',
                userName: 'Kevin Baber',
                phone: '(+84) 35514-0858',
                status: 'checkin'
            },
            {
                fromTime: '08:00 AM',
                toTime: '10:00 AM',
                userName: 'Kevin Baber',
                phone: '(+84) 35514-0858',
                status: 'paid'
            },

        ]
    },
    {
        title: moment().add('days', 1).format('dddd, MMMM DD, YYYY'),
        data: [
            {
                fromTime: '08:00 AM',
                toTime: '10:00 AM',
                userName: 'Kevin Baber',
                phone: '(+84) 35514-0858',
                status: 'unconfirm'
            },
            {
                fromTime: '08:00 AM',
                toTime: '10:00 AM',
                userName: 'Kevin Baber',
                phone: '(+84) 35514-0858',
                status: 'confirm'
            },
            {
                fromTime: '08:00 AM',
                toTime: '10:00 AM',
                userName: 'Kevin Baber',
                phone: '(+84) 35514-0858',
                status: 'checkin'
            },
            {
                fromTime: '08:00 AM',
                toTime: '10:00 AM',
                userName: 'Kevin Baber',
                phone: '(+84) 35514-0858',
                status: 'paid'
            },
        ]
    },
    {
        title: moment().add('days', 2).format('dddd, MMMM DD, YYYY'),
        data: [
            {
                fromTime: '08:00 AM',
                toTime: '10:00 AM',
                userName: 'Kevin Baber',
                phone: '(+84) 35514-0858',
                status: 'unconfirm'
            },
            {
                fromTime: '08:00 AM',
                toTime: '10:00 AM',
                userName: 'Kevin Baber',
                phone: '(+84) 35514-0858',
                status: 'confirm'
            },
            {
                fromTime: '08:00 AM',
                toTime: '10:00 AM',
                userName: 'Kevin Baber',
                phone: '(+84) 35514-0858',
                status: 'checkin'
            },
            {
                fromTime: '08:00 AM',
                toTime: '10:00 AM',
                userName: 'Kevin Baber',
                phone: '(+84) 35514-0858',
                status: 'paid'
            },
        ]
    },
    {
        title: moment().add('days', 3).format('dddd, MMMM DD, YYYY'),
        data: [
            {
                fromTime: '08:00 AM',
                toTime: '10:00 AM',
                userName: 'Kevin Baber',
                phone: '(+84) 35514-0858',
                status: 'unconfirm'
            },
            {
                fromTime: '08:00 AM',
                toTime: '10:00 AM',
                userName: 'Kevin Baber',
                phone: '(+84) 35514-0858',
                status: 'confirm'
            },
            {
                fromTime: '08:00 AM',
                toTime: '10:00 AM',
                userName: 'Kevin Baber',
                phone: '(+84) 35514-0858',
                status: 'checkin'
            },
            {
                fromTime: '08:00 AM',
                toTime: '10:00 AM',
                userName: 'Kevin Baber',
                phone: '(+84) 35514-0858',
                status: 'paid'
            },
        ]
    }
]

const Upcoming = (props) => {

    const [data2, setData] = React.useState([]);

    React.useEffect(() => {
        setData(data)
    }, []);

    return (
        <View style={styles.container}>
            <SectionList
                sections={data2}
                stickySectionHeadersEnabled={false}
                keyExtractor={(item, index) => item + index}
                renderSectionHeader={({ section }) => <SectionHeader date={section.title} />}
                renderItem={({ item }) => <Item item={item} />}
            />
        </View>
    )
}

const SectionHeader = ({ date }) => {
    return (
        <Text
            fontFamily='medium'
            style={styles.date}
        >
            {date}
        </Text>
    )
}

export default Upcoming;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA'
    },
    date: {
        fontSize: scaleWidth(4.35),
        marginVertical: scaleHeight(1.6),
        marginLeft: scaleWidth(3),
        color: '#404040'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
})