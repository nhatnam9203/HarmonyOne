import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { Button, CustomInput, InputText } from "@shared/components";
import { fonts, images } from '@shared/themes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isEmpty } from "lodash";
import NavigationService from '@navigation/NavigationService';

export const Layout = ({
  form,
  errors,
  onSubmit,
}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Edit actual amount')}
        isRight={false}
        isLeft={true}
        isScrollLayout={false}
      >
        <KeyboardAwareScrollView style={styles.content}>

          <View pointerEvents="none" style={styles.disabledView}>
            <CustomInput
              label='Harmony account'
              renderInput={() =>
                <InputText
                  form={form}
                  name="paymentByHarmony"
                  placeholder="0.00"
                  type="money"
                  style={{ alignItems: 'center' }}
                  options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                  renderLeft={() =>
                    <Text style={styles.dollar}>$</Text>
                  }
                />
              }
            />
          </View>

          <View pointerEvents="none" style={styles.disabledView}>
            <CustomInput
              label='Credit card'
              renderInput={() =>
                <InputText
                  form={form}
                  name="paymentByCreditCard"
                  placeholder="0.00"
                  type="money"
                  style={{ alignItems: 'center' }}
                  options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                  renderLeft={() =>
                    <Text style={styles.dollar}>$</Text>
                  }
                />
              }
            />
          </View>

          <CustomInput
            label='Cash'
            error={errors?.paymentByCash}
            renderInput={() =>
              <InputText
                form={form}
                error={errors?.paymentByCash}
                name="paymentByCash"
                placeholder="0.00"
                type="money"
                style={{ alignItems: 'center' }}
                options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                renderLeft={() =>
                  <Text style={styles.dollar}>$</Text>
                }
              />
            }
          />

          <View pointerEvents="none" style={styles.disabledView}>
            <CustomInput
              label='Giftcard'
              renderInput={() =>
                <InputText
                  form={form}
                  name="paymentByGiftcard"
                  placeholder="0.00"
                  type="money"
                  style={{ alignItems: 'center' }}
                  options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                  renderLeft={() =>
                    <Text style={styles.dollar}>$</Text>
                  }
                />
              }
            />
          </View>

          <CustomInput
            label='Other'
            error={errors?.otherPayment}
            renderInput={() =>
              <InputText
                form={form}
                error={errors?.otherPayment}
                name="otherPayment"
                placeholder="0.00"
                type="money"
                style={{ alignItems: 'center' }}
                options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                renderLeft={() =>
                  <Text style={styles.dollar}>$</Text>
                }
              />
            }
          />

          <View pointerEvents="none" style={styles.disabledView}>
            <CustomInput
              label='Discount'
              renderInput={() =>
                <InputText
                  form={form}
                  name="discount"
                  placeholder="0.00"
                  type="money"
                  style={{ alignItems: 'center' }}
                  options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                  renderLeft={() =>
                    <Text style={styles.dollar}>$</Text>
                  }
                />
              }
            />
          </View>


        </KeyboardAwareScrollView>
      </SingleScreenLayout>
      <View style={styles.bottom}>
        <Button
          label="Save"
          onPress={form.handleSubmit(onSubmit)}
          highlight={true}
          width={'100%'}
        />
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: 'relative',
  },
  content: {
    flex: 1,
    paddingHorizontal: scaleWidth(15),
  },

  dollar: {
    fontSize: scaleFont(18),
    color: "#404040",
    marginRight: scaleWidth(8),
    fontFamily: fonts.MEDIUM
  },

  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  duration: {
    fontSize: scaleFont(15),
    color: "#333"
  },

  labelDuration: {
    color: '#333',
    fontFamily: fonts.LIGHT,
    fontSize: scaleFont(15)
  },

  titleDuration: {
    fontSize: scaleFont(17),
    color: '#7A98BB',
    marginBottom: scaleHeight(10),
    fontFamily: fonts.REGULAR
  },

  icon: {
    width: scaleWidth(30),
    height: scaleWidth(30),
    tintColor: "#333"
  },

  button: {
    height: '100%',
    alignItems: 'center'
  },

  bottom: {
    padding: scaleWidth(16),
    width: scaleWidth(375),
  },

  iconUpload: {
    width: scaleWidth(50),
    height: scaleWidth(50),
    marginBottom: 5
  },

  wrapIconUpload: {
    padding: scaleWidth(15),
    backgroundColor: '#FAFAFA',
    width: scaleWidth(120),
    height: scaleWidth(120),
    marginBottom: scaleHeight(20),
    justifyContent: 'center',
    alignItems: 'center'
  },

  imageUpload: {
    width: '100%',
    height: '100%'
  },

  disabledView: {
    opacity: 0.5
  }

});
