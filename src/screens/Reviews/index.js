import React from 'react'
import { View, FlatList } from 'react-native'
import { Text, Modalize } from '@components'
import { scaleHeight, scaleWidth } from '@utils'
import { Header, AggregateRating, ItemReview, GroupButtonReview, GroupButtonReply, PopupFilter } from './widget'
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

    const modalizeRef = React.useRef(null);
    const refButtonReply = React.useRef(null);
    const refPopupFilter = React.useRef(null);

    const openButtonReview = () => {
        modalizeRef.current?.open();
    };

    const closeButtonReview = () => {
        modalizeRef.current?.close();
    }

    const openButtonReply = () => {
        refButtonReply.current?.open();
    };

    const closeButtonReply = () => {
        refButtonReply.current?.close();
    }

    const showReviews = () => {

    }

    const deleteReviews = () => {

    }

    const editReply = () => {

    }

    const deleteReply = () => {

    }

    const openPopupFilter = () => {
        refPopupFilter.current?.open();
    }

    const closePopupFilter = () =>{
        refPopupFilter.current?.close();
    }

    return (
        <View style={styles.container}>
            <Header openPopupFilter={openPopupFilter} />
            <View style={{ padding: scaleWidth(5) }}>
                <AggregateRating />
                <Text
                    style={{ marginVertical: scaleHeight(2.5) }}
                    fontSize={scaleWidth(4.5)}
                    color='#000000'
                    fontFamily='medium'
                >
                    Reviews (122)
                </Text>
            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => item.key.toString()}
                renderItem={({ item }) =>
                    <ItemReview
                        item={item}
                        openButtonReview={openButtonReview}
                        openButtonReply={openButtonReview}
                    />}
            />
            <Modalize
                close={closeButtonReview}
                refModal={modalizeRef}
            >
                <GroupButtonReview
                    closeModal={closeButtonReview}
                    onPressShow={showReviews}
                    onPressDelete={deleteReviews}
                />
            </Modalize>

            <Modalize
                close={closeButtonReply}
                refModal={refButtonReply}
            >
                <GroupButtonReply
                    closeModal={closeButtonReply}
                    onPressEdit={editReply}
                    onPressDelete={deleteReply}
                />
            </Modalize>
            <Modalize
                close={closeButtonReply}
                refModal={refPopupFilter}
            >
                <PopupFilter
                    closeModal={closePopupFilter}
                />
            </Modalize>
        </View>
    )
}

export default index;
