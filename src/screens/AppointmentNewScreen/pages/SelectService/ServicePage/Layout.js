import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Pressable, SectionList, Platform } from 'react-native';
import { colors, fonts } from "@shared/themes";
import { useSelector, useDispatch } from "react-redux";
import { ServiceItem } from "../../../widgets";

export const Layout = ({
    categoryRef,
    sectionListRef,
    categorySelected,
    data,
    servicesBooking,
    selectCategory,
    sectionListData,
}) => {

    const {
        category: { category = [] },
        service: { services = [] }
    } = useSelector(state => state);

    return (
        <View style={styles.container}>
            <View style={styles.categoryListContainer}>
                <FlatList
                    ref={categoryRef}
                    style={styles.categoryList}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={sectionListData}
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
            </View>

            <View style={styles.lineHeader} />

            <View style={styles.sectionList}>
                <SectionList
                    ref={sectionListRef}
                    sections={data}
                    keyExtractor={(item, index) => item?.serviceId.toString() + "sectionService"}
                    stickySectionHeadersEnabled={false}
                    renderItem={({ item }) =>
                        <ServiceItem
                            service={item}
                            disabled={servicesBooking.find(s => s?.serviceId == item?.serviceId)}
                        />
                    }
                    renderSectionHeader={({ section }) => {
                        return (
                            <Text style={styles.categoryName}>
                                {section?.category?.name}
                            </Text>
                        )
                    }}
                    ListFooterComponent={() => <View style={{ height: scaleHeight(0) }} />}
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
    categoryListContainer: {
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