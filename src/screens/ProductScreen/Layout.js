import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, SectionList } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { Button, IconButton, SearchInput, DialogConfirm, ItemService, ListEmptyComponent } from "@shared/components";
import { GroupButtonAdd, DiaglogExportProduct } from "./widget";
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

let ExportButton = ({ ...props }) => {
  return (
    <TouchableOpacity style={styles.btnExport} {...props}>
      <Image
        source={images.iconExport}
        style={[styles.treedot, { tintColor: "#404040" }]}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

ExportButton = WithPopupActionSheet(ExportButton);

export const Layout = ({
  valueSearch,
  getDataList,
  onChangeSearch,
  newCategory,
  newProduct,
  editProduct,
  getActionSheets,
  actionSheetExports,
  dialogDeleteCategoryRef,
  handleArchiveCategory,
  handleRestoreCategory,
  setTempCategory,
  tempCategory,
  isRefresh,
  onRefresh,
  diaglogExport,
  isNeedToOrder,
  setNeedToOrder,
  onExport,
}) => {

  const [t] = useTranslation();

  const data = getDataList();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Inventory')}
        isRight={true}
        headerRightComponent={() => <ExportButton actions={actionSheetExports()} />}
        isScrollLayout={false}
      >
        <View style={styles.content}>
          <SearchInput
            placeholder="Search by product name"
            value={valueSearch}
            onChangeText={onChangeSearch}
            removeText={() => onChangeSearch("")}
          />
          <SectionList
            sections={data}
            keyExtractor={(item, index) => item.productId.toString() + "product manage"}
            stickySectionHeadersEnabled={false}
            style={styles.flatList}
            onRefresh={onRefresh}
            refreshing={isRefresh}
            ListEmptyComponent={() => <ListEmptyComponent description={t('No Appointments')} image={images.iconNotFound} />}
            renderItem={({ item }) =>
              <ItemService
                item={item}
                onPress={editProduct}
                titleStyle={{ color: parseInt(item.quantity) < parseInt(item.minThreshold) ? "#DB0000" : "#404040" }}
                renderDuration={() =>
                  parseInt(item.quantity) < parseInt(item.minThreshold) ?
                    <Text style={styles.needToOrder}>Need to order</Text> :
                    <View />
                }
              />
            }
            renderSectionHeader={({ section }) => {
              return (
                <View style={styles.rowSectionHeader}>
                  <Text style={styles.categoryName}>
                    {section?.category?.name}
                  </Text>

                  <EditButton actions={getActionSheets(section?.category)} />
                </View>
              )
            }}
          />

          <GroupButtonAdd
            newCategory={newCategory}
            newService={newProduct}
          />
        </View>
        <DialogConfirm
          ref={dialogDeleteCategoryRef}
          title={t("Delete category")}
          titleContent={t("Are you sure you want to delete this category?")}
          onConfirmYes={handleArchiveCategory}
          onModalHide={() => setTempCategory("")}
        />
        <DiaglogExportProduct
          ref={diaglogExport}
          title={t("Export")}
          titleContent={t("Are you sure you want to delete this category?")}
          onConfirmYes={onExport}
          isNeedToOrder={isNeedToOrder}
          setNeedToOrder={setNeedToOrder}
          onModalHide={() => { }}
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
    fontFamily: fonts.BOLD,
    fontSize: scaleFont(20)
  },
  btnExport: {
    height: '100%',
    width: scaleWidth(35),
    justifyContent: 'center',
    alignItems: 'center',
  },
  needToOrder: {
    fontFamily: fonts.LIGHT,
    fontSize: scaleFont(15),
    color: "#7A98BB",
    fontStyle: "italic"
  }
});
