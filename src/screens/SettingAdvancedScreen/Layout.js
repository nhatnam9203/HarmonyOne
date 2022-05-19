import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { Switch } from "react-native-paper";
import NavigationService from '@navigation/NavigationService';
import { Button, CustomInput, InputText } from "@shared/components";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const Layout = ({
  onSubmit,
  form,
  IsLoyaltyProgram,
  setIsLoyaltyProgram,
  resetValue,
  IsCashDiscount,
  setIsCashDiscount,
  setReceiptFooter,
  receiptFooter,
  isLoading
}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Advanced Settings')}
        isRight={false}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
      >
        {
          isLoading ?
            <View style={styles.containerLoading}>
              <ActivityIndicator size={'large'} color='grey' />
            </View> :
            <>
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <KeyboardAwareScrollView style={styles.content}>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text style={styles.title}>
                      Loyalty program
                    </Text>
                    <Switch
                      value={IsLoyaltyProgram}
                      onValueChange={setIsLoyaltyProgram}
                      color={colors.ocean_blue}
                      style={{ marginTop: scaleHeight(15) }}
                    />
                  </View>

                  {
                    IsLoyaltyProgram &&
                    <>
                      <Text style={[styles.txt, { marginTop: scaleHeight(24), fontFamily: fonts.MEDIUM, textAlign: "center" }]}>
                        Star earn per
                        <Text style={{ color: colors.ocean_blue, fontFamily: fonts.BOLD }}>
                          {` $1 `}
                        </Text>
                        spent
                      </Text>
                      <Text style={[styles.txt, { marginBottom: scaleHeight(30), marginTop: 4, fontFamily: fonts.MEDIUM, textAlign: "center" }]}>
                        by payment method
                      </Text>

                      <View style={{ flexDirection: "row", marginBottom: scaleHeight(16) }}>
                        <Text style={[styles.txt2, { width: scaleWidth(180) }]}>
                          Payment method
                        </Text>
                        <Text style={styles.txt2}>
                          Star earned
                        </Text>
                      </View>

                      <View style={styles.rowMethod}>
                        <Text style={[styles.txt, { width: scaleWidth(180) }]}>
                          Cash
                        </Text>
                        <InputText
                          form={form}
                          name="CashStarRate"
                          placeholder=""
                          style={{ width: scaleWidth(160) }}
                          type="money"
                          options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                          defaultValueRemove={"0.00"}
                        />
                      </View>

                      <View style={styles.rowMethod}>
                        <Text style={[styles.txt, { width: scaleWidth(180) }]}>
                          HarmonyPay
                        </Text>
                        <InputText
                          form={form}
                          name="HarmonyPayStarRate"
                          placeholder=""
                          style={{ width: scaleWidth(160) }}
                          type="money"
                          options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                          defaultValueRemove={"0.00"}
                        />
                      </View>

                      <View style={styles.rowMethod}>
                        <Text style={[styles.txt, { width: scaleWidth(180) }]}>
                          Credit card
                        </Text>
                        <InputText
                          form={form}
                          name="CreditCardStarRate"
                          placeholder=""
                          style={{ width: scaleWidth(160) }}
                          type="money"
                          options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                          defaultValueRemove={"0.00"}
                        />
                      </View>

                      <View style={styles.rowMethod}>
                        <Text style={[styles.txt, { width: scaleWidth(180) }]}>
                          Other
                        </Text>
                        <InputText
                          form={form}
                          name="OtherStarRate"
                          placeholder=""
                          style={{ width: scaleWidth(160) }}
                          type="money"
                          options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                          defaultValueRemove={"0.00"}
                        />
                      </View>

                    </>}

                  {/* Cash discount */}
                  <View style={styles.rowView}>
                    <Text style={styles.title}>
                      Apply Cash Discount program
                    </Text>
                    <Switch
                      value={IsCashDiscount}
                      onValueChange={setIsCashDiscount}
                      color={colors.ocean_blue}
                      style={{ marginTop: scaleHeight(15) }}
                    />
                  </View>

                  {/* --------  Receipt Footer  --------- */}
                  <Text style={styles.title}>
                    Receipt Footer
                  </Text>
                  <View style={styles.textInputView}>
                    <TextInput
                      style={{ flex: 1, fontSize: scaleFont(18) }}
                      placeholder="Receipt footer input here..."
                      value={receiptFooter}
                      onChangeText={(value) => { setReceiptFooter(value) }}
                      multiline={true}
                      numberOfLines={3}
                    />
                  </View>
                </KeyboardAwareScrollView>
              </TouchableWithoutFeedback>
              <View style={styles.bottom}>
                <Button
                  label="Cancel"
                  onPress={resetValue}
                  width={'48%'}
                  styleButton={{
                    backgroundColor: "#dddddd",
                    borderWidth: 0
                  }}
                  styleText={{
                    color: "#404040"
                  }}
                />
                <Button
                  label="Save"
                  onPress={form.handleSubmit(onSubmit)}
                  highlight={true}
                  width={'48%'}
                />
              </View>
            </>
        }

      </SingleScreenLayout>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  txt: {
    fontSize: scaleFont(17),
    fontFamily: fonts.REGULAR,
    color: "#333"
  },

  txt2: {
    fontSize: scaleFont(17),
    fontFamily: fonts.BOLD,
    color: colors.ocean_blue
  },

  rowMethod: {
    flexDirection: "row",
    marginBottom: scaleHeight(16),
    alignItems: "center"
  },


  content: {
    flex: 1,
    padding: scaleWidth(16),
    paddingTop: scaleHeight(16),
    paddingVertical: scaleWidth(32),
    backgroundColor: "#fafafa"
  },

  bottom: {
    padding: scaleWidth(24),
    width: scaleWidth(375),
    flexDirection: "row",
    justifyContent: "space-between"

  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: scaleHeight(15),
  },
  textInputView: {
    height: scaleHeight(60),
    flex: 1,
    borderWidth: 1,
    borderColor: "#C5C5C5",
    paddingHorizontal: scaleWidth(10),
    marginTop: scaleHeight(10),
  },
  title: {
    fontSize: scaleFont(17),
    fontFamily: fonts.REGULAR,
    color: "#333",
    marginTop: scaleHeight(20),
    fontWeight: "bold"
  },

  containerLoading: {
    alignItems: "center",
    paddingTop: scaleHeight(16)
  }

});
