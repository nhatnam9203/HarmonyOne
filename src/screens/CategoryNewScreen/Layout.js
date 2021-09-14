import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { Button, CustomInput, InputText, IconButton, DropdownMenu } from "@shared/components";
import { fonts, colors, images } from '@shared/themes';
import NavigationService from '@navigation/NavigationService';

const categoryType = [
  { label: "Product", value: "Product" },
  { label: "Service", value: "Service" },
];


export const Layout = ({
  form,
  errors,
  onSubmit,
  inputCategoryRef,
}) => {

  const [t] = useTranslation();

  const back = () => {
    NavigationService.back();
  }

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('New Category')}
        isRight={true}
        isLeft={false}
        isScrollLayout={false}
        headerRightComponent={() =>
          <IconButton
            onPress={back}
            icon={images.iconClose}
            iconStyle={styles.icon}
            style={styles.button}
          />
        }
      >
        <View style={styles.content}>
          <CustomInput
            label='Category Type'
            isRequired
            style={{ width: '50%' }}
            renderInput={() =>
              <DropdownMenu
                ref={inputCategoryRef}
                items={categoryType}
                onChangeValue={() => { }}
                defaultIndex={0}
                width={scaleWidth(345)}
                height={scaleWidth(42)}
              />
            }
          />
          <CustomInput
            label='First name'
            isRequired
            error={errors?.categoryName}
            renderInput={() =>
              <InputText
                form={form}
                name="categoryName"
                placeholder="Category name"
                error={errors?.categoryName}
              />
            }
          />
        </View>

        <View style={styles.bottom}>
          <Button
            onPress={form.handleSubmit(onSubmit)}
            height={scaleHeight(48)}
            width='100%'
            label={t('Save')}
            highlight={true}
            disabled={errors?.categoryName}
          />
        </View>
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
    position: 'relative',
    paddingHorizontal: scaleWidth(16),
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
    paddingHorizontal: scaleWidth(16),
    paddingBottom: scaleHeight(8)
  }
});
