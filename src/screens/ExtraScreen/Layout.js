import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList, } from 'react-native';
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, SearchInput, AppointmentServiceItem, ItemService } from "@shared/components";
import { fonts, colors, images } from '@shared/themes';
import { slop } from "@shared/utils";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

export const Layout = ({
  valueSearch,
  onChangeSearch,

  newExtra,
  editExtra,
  getActionSheets,
  onRefresh,
  isRefresh,
  getData
}) => {

  const data = getData();

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Extras')}
        isRight={false}
        isScrollLayout={false}
      >
        <View style={styles.content}>
          <SearchInput
            placeholder="Search by extra name"
            value={valueSearch}
            onChangeText={onChangeSearch}
            removeText={() => onChangeSearch("")}
          />

          <FlatList
            data={getData()}
            keyExtractor={(item, index) => item.extraId.toString() + "extra manage"}
            style={styles.flatList}
            onRefresh={onRefresh}
            refreshing={isRefresh}
            renderItem={({ item }) =>
              <ItemService
                item={item}
                onPress={()=>editExtra(item)}
              />
            }
            ListFooterComponent={() => <View style={{ height: scaleHeight(200) }} />}
          />

          <IconButton
            icon={images.iconAdd}
            iconStyle={styles.addIcon}
            onPress={newExtra}
            style={styles.btnAdd}
          />
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
    width: scaleWidth(24),
    height: scaleWidth(24),
    marginTop: scaleHeight(5)
  },
  categoryName: {
    color: "#404040",
    marginVertical: scaleHeight(16),
    marginTop: scaleHeight(24),
    fontFamily: fonts.MEDIUM,
    fontSize: scaleFont(20)
  },


  addIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },

  btnAdd: {
    position: 'absolute',
    bottom: scaleHeight(32),
    right: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#1366AE',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
