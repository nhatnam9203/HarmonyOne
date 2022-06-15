import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { SearchInput, PeriodPicker } from "@shared/components";
import { images } from "@shared/themes/resources";
import { DataList } from "./DataList";
import { translate } from "@localize";

export const Layout = ({
  isRefresh,
  onRefresh,
  valueSearch,
  onChangeSearch,
  onSubmitSearch,
  batchHistory,
  getContentDate,
  onLoadMore,

  timeStart,
  timeEnd,
  setTimeStart,
  setTimeEnd,
  onChangeDate,
  pages,
  currentPage,
  removeSearch,
}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <SearchInput
          value={valueSearch}
          onChangeText={onChangeSearch}
          removeText={valueSearch.length > 0 ? () => removeSearch() : () => { }}
          placeholder={translate("Search client by phone or name")}
          onSubmit={onSubmitSearch}
        />

        <PeriodPicker
          timeStart={timeStart}
          timeEnd={timeEnd}
          setTimeStart={setTimeStart}
          setTimeEnd={setTimeEnd}
          onAccept={(startDate, endDate) => onChangeDate(startDate, endDate)}
        />


        <DataList
          data={batchHistory}
          currentPage={currentPage}
          onLoadMore={onLoadMore}
          onRefresh={onRefresh}
          isRefresh={isRefresh}
          endLoadMore={currentPage >= pages}
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
