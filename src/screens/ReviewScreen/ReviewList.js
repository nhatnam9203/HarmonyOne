import React from 'react';
import { View, StyleSheet, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import { useTranslation } from "react-i18next";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { ItemReview } from "./widget";
import { useSelector } from "react-redux";

import moment from 'moment';

export const ReviewList = ({
    getActionSheetReview,
    getActionSheetReply,
    loadMore,
    isLoading,
    currentPage,
}) => {

    const [t] = useTranslation();

    const {
        review: { listReviews = [], count = 0 }
    } = useSelector(state => state);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t(`Review (${count})`)}</Text>
            <FlatList
                data={listReviews}
                keyExtractor={(item) => item?.staffRatingId?.toString()}
                style={styles.flatList}
                renderItem={({ item }) =>
                    <ItemReview
                        item={item}
                        openButtonReview={() => { }}
                        openButtonReply={() => { }}
                        getActionSheetReview={getActionSheetReview}
                        getActionSheetReply={getActionSheetReply}
                    />}

                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
                // refreshing={isRefresh}
                // onRefresh={onRefreshCustomer}
                removeClippedSubviews={true}
                initialNumToRender={20}
                maxToRenderPerBatch={5}
                ListFooterComponent={() =>
                    <View style={styles.itemLoadMore}>
                        {
                            (isLoading && currentPage > 1) ?
                                <ActivityIndicator
                                    size="small"
                                    color="#0764B0"
                                /> : null
                        }
                    </View>
                }
            // ListFooterComponent={() => <View style={{ height: scaleHeight(300) }} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: scaleHeight(24)
    },
    flatList: {
        marginTop: scaleHeight(20),
        padding: scaleWidth(16)
    },
    title: {
        color: colors.black,
        fontFamily: fonts.MEDIUM,
        fontSize: scaleFont(18),
        marginLeft: scaleWidth(16)
    },
    itemLoadMore: {
        height: scaleWidth(30),
        alignItems: "center",
        justifyContent: "center",
        marginTop: scaleHeight(10)
    }
})
