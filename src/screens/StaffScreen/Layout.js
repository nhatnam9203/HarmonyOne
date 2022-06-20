import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList, } from 'react-native';
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, SearchInput, AppointmentServiceItem, ItemService, ItemStaff } from "@shared/components";
import { fonts, colors, images } from '@shared/themes';
import { slop } from "@shared/utils";
import { useSelector } from "react-redux";
import { translate } from "@localize";
import { translateManual } from "@shared/utils";

export const Layout = ({
  valueSearch,
  onChangeSearch,

  newStaff,
  editStaff,
  getActionSheets,
  onRefresh,
  isRefresh,
  getData,
  language
}) => {

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={translate('txtStaff')}
        isRight={false}
        isScrollLayout={false}
      >
        <View style={styles.content}>
          <SearchInput
            placeholder={translate("Search by name")}
            value={valueSearch}
            onChangeText={onChangeSearch}
            removeText={() => onChangeSearch("")}
          />

          <FlatList
            data={getData()}
            keyExtractor={(item, index) => item.staffId.toString() + "staff manage"}
            style={styles.flatList}
            onRefresh={onRefresh}
            refreshing={isRefresh}
            renderItem={({ item }) =>
              <ItemStaff
                item={item}
                onPress={() => editStaff(item)}
                language={language}
                translateManual={translateManual}
              />
            }
            ListFooterComponent={() => <View style={{ height: scaleHeight(100) }} />}
          />

          <IconButton
            icon={images.iconAdd}
            iconStyle={styles.addIcon}
            onPress={newStaff}
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
    position: 'relative',
  },
  flatList: {
    flex: 1,
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
