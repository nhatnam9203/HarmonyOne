import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList, Platform } from 'react-native';
import { SingleScreenLayout } from '@shared/layouts';
import { IconButton, SearchInput, AppointmentServiceItem, Button, NotificationIcon } from "@shared/components";
import { fonts, colors, images } from '@shared/themes';
import { slop } from "@shared/utils";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import CheckBox from "@react-native-community/checkbox";


export const Layout = ({
  valueSearch,
  onChangeSearch,

  newExtra,
  editExtra,
  getActionSheets,
  onRefresh,
  isRefresh,
  getData,
  extrasSelection,
  selectExtra,
  apply
}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Select extras')}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
        headerRightComponent={() =>
          <IconButton
            icon={images.iconAdd}
            style={styles.buttonAdd}
            iconStyle={styles.iconAdd}
            onPress={newExtra}
          />
        }
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
            renderItem={({ item }) =>
              <TouchableOpacity
                onPress={() => selectExtra(item)}
                style={styles.rowItem}
              >
                {
                  Platform.OS == "ios" ?
                    <CheckBox
                      disabled={true}
                      value={item?.checked}
                      onValueChange={() => { }}
                      boxType='square'
                      onFillColor={colors.ocean_blue}
                      onCheckColor={colors.white}
                      onTintColor="transparent"
                      onAnimationType='one-stroke'
                      offAnimationType='one-stroke'
                      style={{ width: 21, height: 21, marginRight: scaleWidth(16) }}
                    /> :
                    <Image
                      source={item?.checked ? images.checkBox : images.checkBoxEmpty}
                      style={styles.imageCheckbox}
                    />
                }
                <Text style={styles.txtItem}>
                  {item?.name}
                </Text>
              </TouchableOpacity>
            }
            ListFooterComponent={() => <View style={{ height: scaleHeight(100) }} />}
          />
        </View>

        <View style={styles.bottom}>
          <Button
            label="Apply"
            onPress={apply}
            highlight={true}
            width={'100%'}
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
    paddingTop: scaleHeight(16)
  },

  flatList: {
    flex: 1,
    paddingHorizontal: scaleWidth(16),
    paddingTop: scaleHeight(16)
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

  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scaleHeight(24)
  },

  txtItem: {
    color: "#404040",
    fontFamily: fonts.REGULAR,
    fontSize: scaleFont(17)
  },

  bottom: {
    padding: scaleWidth(16),
    width: scaleWidth(375),
  },

  iconAdd: {
    tintColor: "#333",
    width: scaleWidth(19),
    height: scaleWidth(19),
  },
  buttonAdd: {
    height: "100%",
    justifyContent: "center",
    width: scaleWidth(37)
  },

  imageCheckbox : {
    width: scaleWidth(25), 
    height: scaleWidth(25), 
    marginRight: scaleWidth(15) 
  }

});
