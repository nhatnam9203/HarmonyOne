import React from 'react';
import { View, StyleSheet, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import { useTranslation } from "react-i18next";
import { fonts, colors } from "@shared/themes";
import { guid } from "@shared/utils";
import { images } from "@shared/themes/resources";
import { ListEmptyComponent } from "@shared/components";
import { ItemReview } from "./widget";
import { useSelector } from "react-redux";

import moment from 'moment';

export const ReviewList = ({
    getActionSheetReview,
    getActionSheetReply,
    loadMore,
    isLoading,
    currentPage,
    isRefresh,
    onRefresh,
    showReview,
    hideReview,
}) => {

    const [t] = useTranslation();

    const {
        review: { listReviews = [], count = 0, pages }
    } = useSelector(state => state);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t(`Review (${count})`)}</Text>
            <FlatList
                data={listReviews}
                keyExtractor={(item) => item?.staffRatingId?.toString()}
                style={styles.flatList}
                refreshing={isRefresh}
                onRefresh={onRefresh}
                renderItem={({ item }) =>
                    <ItemReview
                        item={item}
                        openButtonReview={() => { }}
                        openButtonReply={() => { }}
                        getActionSheetReview={() => getActionSheetReview(item)}
                        getActionSheetReply={getActionSheetReply}
                        showReview={showReview}
                        hideReview={hideReview}
                    />}

                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
                initialNumToRender={20}
                maxToRenderPerBatch={5}
                ListEmptyComponent={() => <ListEmptyComponent description={t('There is no reviews')} image={images.iconNotFound} />}
                ListFooterComponent={() =>
                    <>
                        <View style={styles.itemLoadMore}>
                            {
                                (isLoading && currentPage > 1) ?
                                    <ActivityIndicator
                                        size="small"
                                        color="#0764B0"
                                    /> : null
                            }
                        </View>
                        <View style={{ height: scaleHeight(400) }} />
                    </>
                }
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

