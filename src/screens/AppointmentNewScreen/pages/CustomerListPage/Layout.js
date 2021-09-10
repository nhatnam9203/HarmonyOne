import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton } from "@shared/components";
import { fonts } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { slop } from "@shared/utils";
import SearchInput from "./SearchInput";
import ItemCustomer from "./ItemCustomer";

export const Layout = ({
    valueSearch,
    customerList,
    isRefresh,
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
                    <TouchableOpacity onPress={close} style={styles.buttonClose}>
                        <Image
                            style={styles.iconClose}
                            source={images.iconClose}
                        />
                    </TouchableOpacity>
                }
            >
                <View style={styles.content}>
                    <SearchInput
                        value={valueSearch}
                        onChangeText={onChangeSearch}
                        removeText={valueSearch.length > 0 ? () => onChangeSearch("") : () => { }}
                    />
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
                    />
                    <IconButton
                        icon={images.buttonPlus}
                        iconStyle={styles.iconPlus}
                        onPress={newCustomer}
                        style={styles.buttonPlus}
                        renderText={() => <Text style={styles.txtNew}>Make new customer</Text>}
                    />
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
        paddingHorizontal: scaleWidth(15),
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
        marginHorizontal: scaleWidth(15)
    },
    iconPlus: {
        width: scaleWidth(24),
        height: scaleWidth(24),
    },
    txtNew: {
        fontSize: scaleFont(20),
        color: '#1366AE',
        marginLeft: scaleWidth(15),
        fontFamily: fonts.MEDIUM
    }
});
