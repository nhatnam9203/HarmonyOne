import React from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { ButtonFilter, CustomInput, DropdownMenu, SearchInput } from "@shared/components";
import { images } from "@shared/themes/resources";
import { InvoiceList } from "./InvoiceList";
import { translate } from "@localize";

const paymentMethodFilter = [
  { label: translate("All"), value: "" },
  { label: "HarmonyPay", value: "harmony" },
  { label: translate("Credit Card"), value: "credit_card" },
  { label: translate("Cash"), value: "cash" },
  { label: translate("Other"), value: "other" },
  { label: translate("Gift card"), value: "giftcard" },
];

const statusFilter = [
  { label: translate("All"), value: "" },
  { label: translate("Complete"), value: "complete" },
  { label: translate("Incomplete"), value: "incomplete" },
  { label: translate("Paid"), value: "paid" },
  { label: translate("Void"), value: "void" },
  { label: translate("Refund"), value: "refund" },
  { label: translate("Cancel"), value: "cancel" },
  { label: translate("Transaction Fail"), value: "transaction fail" },
];


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

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={translate("txtInvoices")}
        isLeft={true}
        isRight={true}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
        headerRightComponent={() =>
          <View style={styles.button}>
            <ButtonFilter
              onApply={() => {
                const status = statusRef?.current?.getValue()?.value;
                const paymentMethod = paymentMethodRef?.current?.getValue()?.value;
                onChangeFilter(status, paymentMethod);
              }}

              onReset={() => {
                statusRef?.current?.changeValue(
                  { label: "All", value: "" },
                );
                paymentMethodRef?.current?.changeValue(
                  { label: "All", value: "" },
                );
              }}

              onOpen={() => {
                const statusObj = statusFilter.find(obj => obj.value == status);
                const paymentObj = paymentMethodFilter.find(obj => obj.value == paymentMethod);
                setTimeout(() => {
                  statusObj && statusRef?.current?.changeValue(statusObj);
                  paymentObj && paymentMethodRef?.current?.changeValue(paymentObj);
                }, 200)
              }}
            >
              <CustomInput
                label={translate('Payment method')}
                name="paymentMethod"
                labelStyle={{ color: colors.greyish_brown_40 }}
                renderInput={() =>
                  <DropdownMenu
                    ref={paymentMethodRef}
                    items={paymentMethodFilter}
                    onChangeValue={() => { }}
                    defaultIndex={0}
                    width={scaleWidth(280)}
                    height={scaleWidth(42)}
                    styleDropDown={styles.styleDropDown}
                  />
                }
              />
              <CustomInput
                label={translate('Status')}
                name="status"
                labelStyle={{ color: colors.greyish_brown_40 }}
                renderInput={() =>
                  <DropdownMenu
                    ref={statusRef}
                    items={statusFilter}
                    onChangeValue={() => { }}
                    defaultIndex={0}
                    width={scaleWidth(280)}
                    height={scaleWidth(42)}
                    styleDropDown={styles.styleDropDown}
                  />
                }
              />
            </ButtonFilter>
          </View>
        }
      >
        <View style={styles.content}>
          <SearchInput
            value={valueSearch}
            onChangeText={onChangeSearch}
            removeText={valueSearch.length > 0 ? () => onChangeSearch("") : () => { }}
            placeholder={translate("Search client by phone or name")}
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
      </SingleScreenLayout>
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
    borderRadius: 5,
    zIndex : 2
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
