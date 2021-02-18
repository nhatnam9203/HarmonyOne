import React from 'react'
import { View, FlatList } from 'react-native'
import { Text } from '@components'
import { scaleHeight, scaleWidth } from '@utils'
import { Header, AggregateRating, ItemReview } from './widget'
import styles from './styles'
import moment from 'moment';

const data = [
    {
        name: "Phan Nhật Nam",
        rating: 5,
        date: moment().format('MMMM DD, YYYY'),
        message: 'In love with it. Thanks to Irene',
        status: 'hidden',
        key: 1,
    },
    {
        name: "Phan Nhật Nam",
        rating: 5,
        date: moment().format('MMMM DD, YYYY'),
        message: 'In love with it. Thanks to Irene',
        status: 'hidden',
        key: 2,
    },
    {
        name: "Phan Nhật Nam",
        rating: 5,
        date: moment().format('MMMM DD, YYYY'),
        message: 'In love with it. Thanks to Irene',
        status: 'hidden',
        key: 3,
    },
    {
        name: "Phan Nhật Nam",
        rating: 5,
        date: moment().format('MMMM DD, YYYY'),
        message: 'In love with it. Thanks to Irene',
        status: 'hidden',
        key: 4,
    },
    {
        name: "Phan Nhật Nam",
        rating: 5,
        date: moment().format('MMMM DD, YYYY'),
        message: 'In love with it. Thanks to Irene',
        status: 'hidden',
        key: 5,
    },
    {
        name: "Phan Nhật Nam",
        rating: 5,
        date: moment().format('MMMM DD, YYYY'),
        message: 'In love with it. Thanks to Irene',
        status: 'hidden',
        key: 6,
    },
    {
        name: "Phan Nhật Nam",
        rating: 5,
        date: moment().format('MMMM DD, YYYY'),
        message: 'In love with it. Thanks to Irene',
        status: 'hidden',
        key: 7,
    },
];

const index = () => {
    return (
        <View style={styles.container}>
            <Header />
            <View style={{ padding: scaleWidth(5) }}>
                <AggregateRating />
                <Text style={{ marginVertical: scaleHeight(2.5) }} fontSize={scaleWidth(5)} color='#000000' fontFamily='medium'>
                    Reviews (122)
                </Text>
            </View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.key.toString()}
                renderItem={({ item }) => <ItemReview item={item} />}
            />
        </View>
    )
}

export default index;
