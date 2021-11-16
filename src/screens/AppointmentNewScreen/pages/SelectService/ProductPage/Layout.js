import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Pressable, SectionList, Alert } from 'react-native';
import { colors, fonts } from "@shared/themes";
import { ListEmptyComponent } from "@shared/components";
import { useSelector, useDispatch } from "react-redux";
import { ServiceItem } from "../../../widgets";
import { AddGiftCard } from "./AddGiftCard";

export const Layout = ({
    categoryRef,
    sectionListRef,
    categorySelected,
    data,
    categoryList,
    selectCategory,
    selectProduct,
    productsBooking,
}) => {

    const {
        category: { category = [] },
        service: { services = [] }
    } = useSelector(state => state);

    return (
        <View style={styles.container}>
            <View style={styles.categoryListContainer}>
                {
                    categoryList.length > 0 &&
                    <FlatList
                        ref={categoryRef}
                        style={styles.categoryList}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={categoryList}
                        keyExtractor={item => item?.categoryId?.toString() + "serviceCategory"}
                        renderItem={({ item }) =>
                            <Pressable
                                onPress={() => selectCategory(item?.categoryId)}
                                style={styles.itemCategory(categorySelected, item?.categoryId)}
                            >
                                <Text style={styles.txtItemCategory(categorySelected, item?.categoryId)}>
                                    {item?.name}
                                </Text>
                            </Pressable>
                        }
                    />
                }
            </View>

            <View style={styles.lineHeader} />

            <View style={styles.sectionList}>
                <SectionList
                    ref={sectionListRef}
                    sections={data}
                    keyExtractor={(item, index) => item?.productId.toString() + "sectionProduct"}
                    stickySectionHeadersEnabled={false}
                    renderItem={({ item }) =>
                        <ServiceItem
                            service={item}
                            onPress={() => selectProduct(item)}
                            disabled={productsBooking.find(s => s?.productId == item?.productId)}
                        />
                    }
                    renderSectionHeader={({ section }) => {
                        return (
                            <Text style={styles.categoryName}>
                                {section?.category?.name}
                            </Text>
                        )
                    }}
                    ListEmptyComponent={() => <ListEmptyComponent description={"No Product"} />}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: "#eeeeee"
    },
    itemCategory: (categorySelected, categoryId) => {
        return {
            marginLeft: scaleWidth(8),
            borderRadius: 20,
            paddingHorizontal: scaleWidth(14),
            paddingVertical: scaleWidth(5),
            backgroundColor: categorySelected == categoryId ? colors.ocean_blue : "transparent",
            justifyContent: 'center',
            alignItems: 'center'
        }
    },
    txtItemCategory: (categorySelected, categoryId) => {
        return {
            fontSize: scaleFont(15),
            color: categorySelected == categoryId ? colors.white : "#404040",
            fontFamily: categorySelected == categoryId ? fonts.MEDIUM : fonts.REGULAR
        }
    },
    categoryListContainer : {
        shadowColor: Platform.OS == "ios" ? "#4040401A" : "#404040",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 3,
        
        elevation: 3,
    },
    categoryList: {
        paddingBottom: scaleHeight(16),
        paddingTop: scaleHeight(16),
        backgroundColor: colors.white,

        shadowColor: Platform.OS == "ios" ? "#4040401A" : "#404040",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 3,
        
        elevation: 3,

    },
    sectionList: {
        flex: 1,
    },
    categoryName: {
        color: "#404040",
        marginVertical: scaleHeight(16),
        marginTop: scaleHeight(24),
        fontFamily: fonts.MEDIUM,
        fontSize: scaleFont(20),
        marginLeft: scaleWidth(16)
    }
})