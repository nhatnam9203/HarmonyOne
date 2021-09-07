import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { icon_close } from "@assets";
import { SearchInput, ItemCustomer } from "./widget";

const dataCustomerList = [
    {
        customerName: "Ozawa Mikami",
        phone: "123-456-789"
    },
    {
        customerName: "Ozawa Mikami",
        phone: "123-456-789"
    },
    {
        customerName: "Ozawa Mikami",
        phone: "123-456-789"
    },
    {
        customerName: "Ozawa Mikami",
        phone: "123-456-789"
    },
    {
        customerName: "Ozawa Mikami",
        phone: "123-456-789"
    },
    {
        customerName: "Ozawa Mikami",
        phone: "123-456-789"
    },
    {
        customerName: "Ozawa Mikami",
        phone: "123-456-789"
    },
];

export const Layout = ({
    valueSearch,
    onChangeSearch,
    close,
}) => {

    const [t] = useTranslation();

    return (
        <View style={styles.container}>
            <SingleScreenLayout
                pageTitle={t('New apppoinment')}
                isLeft={false}
                headerRightComponent={() =>
                    <TouchableOpacity onPress={close} style={styles.buttonClose}>
                        <Image
                            style={styles.iconClose}
                            source={icon_close}
                        />
                    </TouchableOpacity>
                }
            >
                <View style={styles.content}>
                    <SearchInput
                        value={valueSearch}
                        onChangeText={onChangeSearch}
                    />
                    <FlatList
                        style={styles.flatList}
                        data={dataCustomerList}
                        renderItem={({ item }) => <ItemCustomer item={item} />}
                        keyExtractor={(item) => Math.random().toString()}
                        ItemSeparatorComponent={() => <View style={styles.seperateLine} />}
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
        paddingHorizontal: scaleWidth(15)
    },
    flatList: {
        flex: 1,
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
    seperateLine : {
        width: '100%',
        height: 1,
        backgroundColor : "#eeeeee"
    }
});
