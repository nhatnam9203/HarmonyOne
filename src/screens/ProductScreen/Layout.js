import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, SectionList } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { Button, IconButton, SearchInput, DialogConfirm, ItemService, ListEmptyComponent , GroupButtonAdd} from "@shared/components";
import { DiaglogExportProduct } from "./widget";
import { fonts, colors, images } from '@shared/themes';
import { slop } from "@shared/utils";
import { useSelector } from "react-redux";
import { WithPopupActionSheet } from '@shared/HOC';
import { translate } from "@localize";

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
  newProductWithCategory
}) => {

  const data = getDataList();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={translate('Inventory')}
        isRight={true}
        headerRightComponent={() => <ExportButton actions={actionSheetExports()} />}
        isScrollLayout={false}
      >
        <View style={styles.content}>
          <SearchInput
            placeholder={translate("Search by product name")}
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
            ListEmptyComponent={() => <ListEmptyComponent description={translate('No products')} image={images.iconNotFound} />}
            renderItem={({ item }) =>
              <ItemService
                item={item}
                onPress={editProduct}
                titleStyle={{ color: parseInt(item.quantity) < parseInt(item.minThreshold) ? "#DB0000" : colors.ocean_blue }}
                renderDuration={() =>
                  parseInt(item.quantity) < parseInt(item.minThreshold) ?
                    <Text style={styles.needToOrder}>{translate("Need to order")}</Text> :
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
            ListFooterComponent={()=><View style={{ height: scaleHeight(120) }} />}
          />

          <GroupButtonAdd
            newCategory={newCategory}
            newService={newProduct}
            titleButton2={translate("New Product")}
          />
        </View>
        <DialogConfirm
          ref={dialogDeleteCategoryRef}
          title={translate("Delete category")}
          titleContent={translate("Are you sure you want to delete this category?")}
          onConfirmYes={handleArchiveCategory}
          onModalHide={() => setTempCategory("")}
        />
        <DiaglogExportProduct
          ref={diaglogExport}
          title={translate("Export")}
          titleContent={translate("Are you sure you want to delete this category?")}
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
    color: "#333",
    marginVertical: scaleHeight(16),
    marginTop: scaleHeight(24),
    fontFamily: fonts.MEDIUM,
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
