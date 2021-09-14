import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, SectionList } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { Button, IconButton } from "@shared/components";
import { fonts, colors, images } from '@shared/themes';
import { ItemService, GroupButtonAdd } from "./widget";
import { useSelector } from "react-redux";

export const Layout = ({
  getDataList,
}) => {

  const [t] = useTranslation();

  const data = getDataList();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Add services')}
        isRight={false}
        isScrollLayout={false}
      >
        <View style={styles.content}>
          <SectionList
            sections={data}
            keyExtractor={(item, index) => item.serviceId.toString()}
            stickySectionHeadersEnabled={false}
            style={styles.flatList}
            renderItem={({ item }) =>
              <ItemService item={item} />
            }
            renderSectionHeader={({ section }) => {
              return (
                <View style={styles.rowSectionHeader}>
                  <Text style={styles.categoryName}>
                    {section?.category?.name}
                  </Text>

                  {/* <TouchableOpacity onPress={openModal} hitSlop={slop}>
                  <Image source={treedot} style={styles.treedot} resizeMode='contain' />
                </TouchableOpacity> */}
                </View>
              )
            }

            }
          />

          <GroupButtonAdd />
        </View>
      </SingleScreenLayout>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    flex: 1,
    position: 'relative'
  },
  flatList: {
    flex: 1,
    paddingHorizontal: scaleWidth(16),
  },
  rowSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  treedot: {
    width: scaleWidth(5),
    height: scaleWidth(5)
  },
  categoryName: {
    color: "#404040",
    marginVertical: scaleHeight(16),
    fontFamily: fonts.BOLD,
    fontSize: scaleFont(20)
  },
});
