import React from 'react';
import { CustomModal } from '@shared/components';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { colors, fonts } from '@shared/themes';

/**
 * @input
 * action object {id: "text-id", func: () => {}, label: "label", textColor: "#fff", icon: ""}
 */

export const PopupActionSheet = React.forwardRef(
  ({ actions, onClose = () => {} }, ref) => {
    const [closeAction] = React.useState({
      id: 'close-action',
      label: 'Close',
      func: () => {
        setOpen(false);
      },
    });

    const [open, setOpen] = React.useState(false);

    const onModalHide = () => {
      setOpen(false);
    };

    React.useImperativeHandle(ref, () => ({
      show: () => {
        setOpen(true);
      },
    }));

    return (
      <CustomModal
        isVisible={open}
        onRequestClose={onModalHide}
        style={styles.modal}>
        <View style={styles.container}>
          {actions?.length > 0 && (
            <View style={styles.content}>
              {actions.map((x, index) => (
                <ActionSheetItem
                  key={x.id}
                  item={x}
                  bottomBorder={index >= 0 && index < actions?.length - 1}
                />
              ))}
            </View>
          )}
          <View style={styles.content}>
            <ActionSheetItem key={closeAction.id} item={closeAction} />
          </View>
        </View>
      </CustomModal>
    );
  },
);

const ActionSheetItem = ({ item, bottomBorder }) => {
  return (
    <TouchableOpacity
      style={[styles.itemContent, bottomBorder && styles.bottomBorder]}
      onPress={item.func}>
      <Text
        style={[styles.textItem, item.textColor && { color: item.textColor }]}>
        {item?.label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
    paddingHorizontal: scaleWidth(16),
    paddingBottom: scaleHeight(16),
  },

  container: {
    flex: 0,
    width: '100%',
  },

  content: {
    borderRadius: scaleHeight(5),
    backgroundColor: colors.white,
    marginVertical: scaleHeight(8),
    paddingHorizontal: scaleWidth(16),
  },

  bottomBorder: {
    borderBottomColor: '#eee',
    borderBottomWidth: scaleHeight(1),
  },

  itemContent: {
    height: scaleHeight(44),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textItem: {
    fontFamily: fonts.MEDIUM,
    fontSize: scaleFont(17),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.41,
    textAlign: 'center',
    color: colors.greyish_brown_40,
  },
});