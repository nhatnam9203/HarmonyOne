import React from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, SearchInput } from "@shared/components";
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { slop } from "@shared/utils";
import { isEmpty } from "lodash";
import ItemCustomer from "./ItemCustomer";

export const Layout = ({
    valueSearch,
    customerList,
    isRefresh,
    isLoading,
    currentPage,
    onChangeSearch,
    close,
    newCustomer,
    loadMoreCustomerList,
    onRefreshCustomer,

}) => {

    const [t] = useTranslation();

    return (
        <View style={styles.container}>
            <SingleScreenLayout
                pageTitle={t('New apppoinment')}
                isLeft={false}
                isScrollLayout={false}
                headerRightComponent={() =>
                    <IconButton
                        icon={images.iconClose}
                        iconStyle={styles.iconClose}
                        style={styles.buttonClose}
                        onPress={close}
                    />
                }
            >
                <View style={styles.content}>
                    <SearchInput
                        value={valueSearch}
                        onChangeText={onChangeSearch}
                        removeText={valueSearch.length > 0 ? () => onChangeSearch("") : () => { }}
                        placeholder="Search customer by phone or name"
                    />
                    {
                        (!isEmpty(valueSearch) && customerList.length === 0) ?
                            <>
                                <Text style={styles.noResult}>No result</Text>
                                <IconButton
                                    icon={images.buttonPlus}
                                    iconStyle={styles.iconPlus}
                                    onPress={newCustomer}
                                    style={styles.buttonPlus}
                                    renderText={() => <Text style={styles.txtNew}>Make new customer</Text>}
                                />
                                <View style={styles.seperateLine} />
                            </>
                            :
                            <FlatList
                                style={styles.flatList}
                                data={customerList}
                                renderItem={({ item }) => <ItemCustomer item={item} />}
                                keyExtractor={(item) => item.customerId.toString()}
                                onEndReached={loadMoreCustomerList}
                                onEndReachedThreshold={0.1}
                                refreshing={isRefresh}
                                onRefresh={onRefreshCustomer}
                                removeClippedSubviews={true}
                                initialNumToRender={20}
                                maxToRenderPerBatch={5}
                                ItemSeparatorComponent={() => <View style={styles.seperateLine} />}
                                ListFooterComponent={() =>
                                    <View style={styles.itemLoadMore}>
                                        {
                                            (isLoading && currentPage > 1) ?
                                                <ActivityIndicator
                                                    size="small"
                                                    color="#0764B0"
                                                /> : null
                                        }
                                    </View>}
                            />
                    }
                </View>
            </SingleScreenLayout>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    content: {
        flex: 1,
    },
    flatList: {
        flex: 1,
        // paddingHorizontal: scaleWidth(15),
    },
    iconClose: {
        tintColor: "#333",
        width: scaleWidth(30),
        height: scaleHeight(30),
    },
    buttonClose: {
        height: '100%',
        width: scaleWidth(35),
        justifyContent: 'center',
        alignItems: 'center',
    },
    seperateLine: {
        width: '100%',
        height: 1,
        backgroundColor: "#eeeeee"
    },
    buttonPlus: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: scaleHeight(20),
        marginBottom: scaleHeight(15),
        marginHorizontal: scaleWidth(15)
    },
    iconPlus: {
        width: scaleWidth(24),
        height: scaleWidth(24),
    },
    txtNew: {
        fontSize: scaleFont(18),
        color: '#1366AE',
        marginLeft: scaleWidth(15),
        fontFamily: fonts.MEDIUM
    },
    itemLoadMore: {
        height: scaleWidth(30),
        alignItems: "center",
        justifyContent: "center",
        marginTop: scaleHeight(10)
    },
    noResult: {
        fontSize: scaleFont(16),
        color: colors.greyish_brown_40,
        fontFamily: fonts.MEDIUM,
        marginLeft: scaleWidth(15),
        marginTop: scaleHeight(10)
    }
});