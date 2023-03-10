import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { Button, CustomInput, InputText, IconButton, DropdownMenu } from "@shared/components";
import { fonts, colors, images } from '@shared/themes';
import NavigationService from '@navigation/NavigationService';
import { translate } from "@localize";


export const Layout = ({
  form,
  errors,
  onSubmit,
  inputCategoryRef,
  isEdit,
  categoryEdit,
  categoryTypeList,
}) => {

  const [t] = useTranslation();

  const back = () => {
    NavigationService.back();
  }

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={isEdit ? translate('Edit Category') : translate('New Category')}
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
            label={translate('Category name')}
            isRequired
            error={errors?.categoryName}
            renderInput={() =>
              <InputText
                form={form}
                name="categoryName"
                placeholder={translate("Category name")}
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
            label={translate('txtSave')}
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
