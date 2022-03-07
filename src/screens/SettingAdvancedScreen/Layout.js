import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { Switch } from "react-native-paper";
import NavigationService from '@navigation/NavigationService';
import { Button, CustomInput, InputText } from "@shared/components";


export const Layout = ({
  onSubmit,
  form,
  IsLoyaltyProgram,
  setIsLoyaltyProgram,
  resetValue
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
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.content}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={styles.txt}>
                Loyalty program
              </Text>
              <Switch
                value={IsLoyaltyProgram}
                onValueChange={setIsLoyaltyProgram}
                color={colors.ocean_blue}
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
          </View>
        </TouchableWithoutFeedback>



        <View style={styles.bottom}>
          <Button
            label="Cancel"
            onPress={resetValue}
            width={'48%'}
            styleButton={{
              backgroundColor : "#dddddd",
              borderWidth : 0
            }}
            styleText={{
              color : "#404040"
            }}
          />
          <Button
            label="Save"
            onPress={form.handleSubmit(onSubmit)}
            highlight={true}
            width={'48%'}
          />
        </View>
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
    padding: scaleWidth(16),
    width: scaleWidth(375),
    flexDirection : "row",
    justifyContent : "space-between"

  },

});
