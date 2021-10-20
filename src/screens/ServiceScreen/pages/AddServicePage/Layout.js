import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, SectionList } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { Button, IconButton, SearchInput, DialogConfirm, ItemService, ListEmptyComponent, GroupButtonAdd } from "@shared/components";
import { fonts, colors, images } from '@shared/themes';
import { slop } from "@shared/utils";
import { useSelector } from "react-redux";
import { WithPopupActionSheet } from '@shared/HOC';

let EditButton = ({ ...props }) => {
  return (
    <TouchableOpacity {...props}>
      <Image
        source={images.iconMore}
        style={styles.treedot}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

EditButton = WithPopupActionSheet(EditButton);

export const Layout = ({
  appointmentEdit,
  valueSearch,
  getDataList,
  onChangeSearch,
  newCategory,
  newService,
  getServiceDetail,
  getActionSheets,
  dialogDeleteCategoryRef,
  handleArchiveCategory,
  handleRestoreCategory,
  setTempCategory,
  tempCategory,
  isRefresh,
  onRefresh
}) => {

  const [t] = useTranslation();

  const data = getDataList();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Add service')}
        isRight={false}
        isScrollLayout={false}
      >
        <View style={styles.content}>
          <SearchInput
            placeholder="Search by service name"
            value={valueSearch}
            onChangeText={onChangeSearch}
            removeText={() => onChangeSearch("")}
          />
          <SectionList
            sections={data}
            keyExtractor={(item, index) => item?.serviceId?.toString() + "service manage"}
            stickySectionHeadersEnabled={false}
            style={styles.flatList}
            onRefresh={onRefresh}
            refreshing={isRefresh}
            ListEmptyComponent={() => <ListEmptyComponent description={t('No Service')} image={images.iconNotFound} />}
            renderItem={({ item }) => {
              const isDiabled = appointmentEdit?.services?.find(obj => obj?.serviceId == item?.serviceId);
              return (
                <View style={{ opacity: isDiabled ? 0.4 : 1 }}>
                  <ItemService
                    item={item}
                    onPress={isDiabled ? () =>{} : getServiceDetail}
                  />
                </View>
              )
            }
            }
            renderSectionHeader={({ section }) => {
              return (
                <View style={styles.rowSectionHeader}>
                  <Text style={styles.categoryName}>
                    {section?.category?.name}
                  </Text>
                </View>
              )
            }}
          />

        </View>
        <DialogConfirm
          ref={dialogDeleteCategoryRef}
          title={t("Delete category")}
          titleContent={t("Are you sure you want to delete this category?")}
          onConfirmYes={handleArchiveCategory}
          onModalHide={() => setTempCategory("")}
        />
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
});
