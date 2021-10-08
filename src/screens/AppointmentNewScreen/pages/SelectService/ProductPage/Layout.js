import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Pressable, SectionList } from 'react-native';
import { colors, fonts } from "@shared/themes";
import { useSelector, useDispatch } from "react-redux";
import { ServiceItem } from "../../../widgets";

export const Layout = ({
    categoryRef,
    sectionListRef,
    categorySelected,
    data,
    categoryList,
    selectCategory,
}) => {

    const {
        category: { category = [] },
        service: { services = [] }
    } = useSelector(state => state);

    return (
        <View style={styles.container}>
            <View>
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
                        />
                    }
                    renderSectionHeader={({ section }) => {
                        return (
                            <Text style={styles.categoryName}>
                                {section?.category?.name}
                            </Text>
                        )
                    }}
                    ListFooterComponent={() => <View style={{ height: scaleHeight(300) }} />}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingTop: scaleWidth(16),
        flex: 1,
        borderTopWidth: 1,
        borderTopColor: "#eeeeee"
    },
    itemCategory: (categorySelected, categoryId) => {
        return {
            marginLeft: scaleWidth(8),
            borderRadius: 20,
            paddingHorizontal: scaleWidth(14),
            backgroundColor: categorySelected == categoryId ? colors.ocean_blue : "transparent",
            height: scaleHeight(30),
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
    categoryList: {
        paddingBottom: scaleHeight(16),
        paddingTop: scaleHeight(4),
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',

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