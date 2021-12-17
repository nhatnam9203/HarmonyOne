import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { Button, CustomInput, InputText } from "@shared/components";

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
        pageTitle={t('Tax Settings')}
        isRight={false}
        isLeft={true}
        isScrollLayout={false}
      >
        <View style={styles.content}>
          <CustomInput
            label='Service (%)'
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
              />
            }
          />
          <CustomInput
            label='Product (%)'
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
              />
            }
          />
        </View>
      </SingleScreenLayout>
      <View style={styles.bottom}>
        <Button
          label="Save"
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
    padding: scaleWidth(16),
    width: scaleWidth(375),
  }
});
