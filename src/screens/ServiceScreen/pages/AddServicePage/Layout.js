import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, SectionList } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { Button, IconButton, SearchInput, DialogConfirm, ItemService, ListEmptyComponent, GroupButtonAdd, DialogActiveGiftCard, InputSelectStaff } from "@shared/components";
import { fonts, colors, images } from '@shared/themes';
import { slop } from "@shared/utils";
import { useSelector } from "react-redux";
import { WithPopupActionSheet } from '@shared/HOC';
import { AddGiftCard } from "./AddGiftCard";

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
  onRefresh,
  dialogActiveGiftCard,
  onCheckGiftCardSucces,
  roleName,
  staff,
}) => {

  const [t] = useTranslation();

  const data = getDataList();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Service & product')}
        isRight={true}
        isScrollLayout={false}
        headerRightComponent={() => <AddGiftCard onPress={() => { dialogActiveGiftCard?.current?.show(); }} />}
      >
        <View style={styles.content}>

          <SearchInput
            placeholder="Search by service or product name"
            value={valueSearch}
            onChangeText={onChangeSearch}
            removeText={() => onChangeSearch("")}
          />
          <View style={{ position: "relative", flex: 1 }}>
            <SectionList
              sections={data}
              keyExtractor={(item, index) => item?.serviceId ? item?.serviceId?.toString() + "service addMore" : item?.productId?.toString() + "product addMore"}
              stickySectionHeadersEnabled={false}
              style={styles.flatList}
              onRefresh={onRefresh}
              refreshing={isRefresh}
              ListEmptyComponent={() => <ListEmptyComponent description={t('No Service')} image={images.iconNotFound} />}
              renderItem={({ item }) => {
                const isDiabled =
                  appointmentEdit?.services?.find(obj => obj?.serviceId == item?.serviceId) ||
                  appointmentEdit?.products?.find(obj => obj?.productId == item?.productId);

                if (item?.productId) {
                  return (
                    <View style={{ opacity: isDiabled ? 0.4 : 1 }}>
                      <ItemService
                        item={item}
                        onPress={isDiabled ? () => { } : getServiceDetail}
                      />
                    </View>
                  )
                } else if (item?.serviceId) {
                  if (roleName == "staff") {
                    return (
                      <View style={{ opacity: isDiabled ? 0.4 : 1 }}>
                        <ItemService
                          item={item}
                          onPress={isDiabled ? () => { } : () => {
                            const tempItem = {
                              ...item,
                              staffId: staff?.staffId
                            }
                            getServiceDetail(tempItem)
                          }}
                        />
                      </View>
                    )
                  } else {
                    if (appointmentEdit?.status == "waiting") {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            const tempItem = {
                              ...item,
                              staffId: -1,
                            }
                            getServiceDetail(tempItem)
                          }}
                          pointerEvents={isDiabled ? "none" : "auto"}
                          style={{ opacity: isDiabled ? 0.4 : 1 }}
                        >

                          <ItemService
                            item={item}
                            onPress={() => { }}
                            isDisabled={true}
                          />
                        </TouchableOpacity>
                      )
                    } else {
                      return (
                        <View pointerEvents={isDiabled ? "none" : "auto"} style={{ opacity: isDiabled ? 0.4 : 1 }}>
                          <InputSelectStaff
                            items={[]}
                            itemSelected={null}
                            serviceId={item?.serviceId}
                            onSelect={(staffId) => {
                              const tempItem = {
                                ...item,
                                staffId,
                              }
                              getServiceDetail(tempItem)
                            }}
                            txtNoStaff="No staff available for this service"
                            renderInput={() => (
                              <ItemService
                                item={item}
                                onPress={() => { }}
                                isDisabled={true}
                              />
                            )}
                          />
                        </View>
                      )
                    }
                  }
                }
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

        </View>
        <DialogConfirm
          ref={dialogDeleteCategoryRef}
          title={t("Delete category")}
          titleContent={t("Are you sure you want to delete this category?")}
          onConfirmYes={handleArchiveCategory}
          onModalHide={() => setTempCategory("")}
        />

        <DialogActiveGiftCard
          ref={dialogActiveGiftCard}
          title="Enter gift card serial number"
          onConfirmYes={() => { }}
          onModalHide={() => { }}
          onSuccess={onCheckGiftCardSucces}
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
    alignItems: 'center',
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
