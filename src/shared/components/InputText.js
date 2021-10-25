import { IconButton } from '@shared/components';
import { colors, fonts } from '@shared/themes';
import { images } from '@shared/themes/resources';
import React from 'react';
import { useController } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export const InputText = React.forwardRef(
  (
    {
      placeholder = '',
      style,
      inputStyle,
      multiline = false,
      type = 'custom',
      options = {
        mask: '**************************************************',
      },
      name,
      form,
      error,
      keyboardType = 'default',
      renderLeft = null,
      renderRight = null,
      secureTextEntry = false,
      defaultValue = '',
      defaultValueRemove = '',
      maxLength = 1600,
      onBlur = () =>{}
    },
    ref,
  ) => {
    const [isFocus, setFocus] = React.useState(false);

    const onBlurInput = () =>{
      setFocus(false);
      onBlur();
    }

    const { field } = useController({
      control: form.control,
      defaultValue,
      name,
    });

    return (
      <View style={[styles.containerInput]}>
        <View
          style={[
            styles.wrapInput,
            style,
            {
              borderColor: isFocus
                ? colors.ocean_blue
                : error
                ? 'red'
                : '#cccccc',
            },
          ]}>
          {renderLeft && renderLeft()}
          <TextInputMask
            type={type}
            options={options}
            secureTextEntry={secureTextEntry}
            onChangeText={field.onChange}
            placeholder={placeholder}
            value={field.value}
            style={[styles.input, inputStyle]}
            multiline={multiline}
            textAlignVertical="top"
            maxLength={maxLength}
            keyboardType={keyboardType}
            onFocus={() => setFocus(true)}
            onBlur={onBlurInput}
          />
          {renderRight
            ? renderRight()
            : field?.value?.length > 0 && (
                <IconButton
                  icon={images.iconClose}
                  iconStyle={styles.iconClose}
                  onPress={() => field.onChange(defaultValueRemove)}
                />
              )}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  containerInput: {},
  label: {
    fontSize: scaleFont(16),
    color: '#7A98BB',
    marginBottom: scaleHeight(10),
    fontFamily: fonts.REGULAR,
  },
  wrapInput: {
    width: '100%',
    height: scaleWidth(42),
    borderWidth: 1,
    borderColor: '#cccccc',
    flexDirection: 'row',
    borderRadius: 3,
    paddingHorizontal: scaleWidth(10),
  },
  input: {
    flex: 1,
    fontSize: scaleFont(17),
    fontFamily: fonts.REGULAR,
    color: colors.black,
  },
  iconClose: {
    width: scaleWidth(24),
    height: scaleWidth(24),
  },
  required: {
    color: 'red',
    marginLeft: scaleWidth(8),
    fontSize: scaleFont(18),
  },
});
