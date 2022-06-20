import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { Button, CustomInput, InputText } from "@shared/components";
import { translate } from "@localize";

export const Layout = ({
  form,
  onSubmit,
  isChange,
  setIsChange,
}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={translate('Tax Settings')}
        isRight={false}
        isLeft={true}
        isScrollLayout={false}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.content}>
            <CustomInput
              label={`${translate("Service")} (%)`}
              renderInput={() =>
                <InputText
                  form={form}
                  name="taxService"
                  placeholder="10"
                  defaultValue="0.00"
                  defaultValueRemove="0.00"
                  onChangeInput={() => setIsChange(true)}
                  type="money"
                  options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                  renderRight={()=>null}
                />
              }
            />
            <CustomInput
              label={`${translate("Product")} (%)`}
              renderInput={() =>
                <InputText
                  form={form}
                  name="taxProduct"
                  placeholder="10"
                  defaultValue="0.00"
                  defaultValueRemove="0.00"
                  onChangeInput={() => setIsChange(true)}
                  type="money"
                  options={{ precision: 2, separator: '.', delimiter: ',', unit: '', suffixUnit: '' }}
                  renderRight={()=>null}
                />
              }
            />
          </View>
        </TouchableWithoutFeedback>
      </SingleScreenLayout>
      <View style={styles.bottom}>
        <Button
          label={translate("txtSave")}
          onPress={form.handleSubmit(onSubmit)}
          highlight={true}
          disabled={!isChange}
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
  bottom: {
    padding: scaleWidth(24),
    width: scaleWidth(375),
  }
});
