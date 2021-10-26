import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { SearchInput } from "@shared/components";
import { images } from "@shared/themes/resources";
import { InvoiceList } from "./InvoiceList";

export const Layout = ({
  paymentMethodRef,
  statusRef,
  loadMore,
  currentPage,
  onChangeFilter,
  status,
  paymentMethod,
  isRefresh,
  onRefresh,
  valueSearch,
  onChangeSearch,
  onSubmitSearch,
  selectPeriod,
  invoiceList,
  getContentDate,
  onLoadMore,
}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <SearchInput
          value={valueSearch}
          onChangeText={onChangeSearch}
          removeText={valueSearch.length > 0 ? () => onChangeSearch("") : () => { }}
          placeholder="Search client by phone or name"
          onSubmit={onSubmitSearch}
        />

        <TouchableOpacity
          onPress={selectPeriod}
          style={styles.buttonDateRange}
        >
          <Text style={styles.txtDateRange}>{getContentDate()}</Text>
          <Image
            source={images.date_range}
            style={{ width: scaleWidth(24), height: scaleWidth(24) }}
            resizeMode='contain'
          />
        </TouchableOpacity>

        <InvoiceList
          data={invoiceList}
          currentPage={currentPage}
          onLoadMore={onLoadMore}
          onRefresh={onRefresh}
          isRefresh={isRefresh}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  txtDateRange: {
    fontSize: scaleFont(15),
    fontFamily: fonts.REGULAR,
    color: "#404040"
  },

  buttonDateRange: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: scaleWidth(8),
    marginHorizontal: scaleWidth(16),
    marginBottom: scaleHeight(16),
    borderWidth: 1,
    borderColor: "#dddddd",
    borderRadius: 5
  },
  wrapper: {
    padding: 0,
  },

  container: {
    flex: 1,
    backgroundColor: "white",
  },

  content: {
    paddingTop: scaleHeight(16),
    flex: 1,
  },

  button: {
    height: '100%',
    width: scaleWidth(35),
    justifyContent: 'center',
    alignItems: 'center',
  },

  styleDropDown: {
    backgroundColor: "white",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
});
