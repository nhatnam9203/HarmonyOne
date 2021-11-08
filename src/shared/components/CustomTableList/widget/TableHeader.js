import React from 'react';
import { TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { TableRow } from './TableRow';
import { TableCell } from './TableCell';
import { colors, layouts, fonts } from '@shared/themes';
import { getUniqueId, SORT_TYPE } from '../helpers';
import { images } from '@shared/themes';

const DEFAULT_KEY = 'table.default-header';

export const TableHeader = ({
  style = styles.container,
  height = scaleHeight(48),
  children,
  onPress,
  disabled,
  whiteListKeys,
  headerKeyLabels,
  sortedKeys, // {'keyName1': 'asc', 'keyName2': 'desc'}
  onSortWithKey,
  getWidthForKey, // custom width for key
  draggable,
  renderHeaderCell,
  onSortDataLocal,
}) => {
  const handleSort = (sortKey) => {
    if (onSortWithKey && typeof onSortWithKey === 'function') {
      onSortWithKey(sortKey);
    }
    if (onSortDataLocal && typeof onSortDataLocal === 'function') {
      onSortDataLocal();
    }
  };

  const onRenderHeaderCell = (key, index) => {
    const width = getWidthForKey(key);
    if (renderHeaderCell && typeof renderHeaderCell === 'function') {
      const cell = renderHeaderCell({
        key,
        index,
        cellWidth: width,
        textStyle: styles.textStyle,
        text: headerKeyLabels[key] ?? ' ',
        sortComponent: () =>
          sortedKeys &&
          Object.keys(sortedKeys)?.includes(key) && (
            <TouchableOpacity
              style={styles.buttonSort}
              onPress={() => handleSort(key)}>
              <Image
                style={styles.imageSort}
                source={
                  sortedKeys[key] === SORT_TYPE.ASC
                    ? images.sortUp
                    : images.sortDown
                }
                resizeMode="center"
              />
            </TouchableOpacity>
          ),
      });
      if (cell) return cell;
    }

    return (
      <TableCell
        key={getUniqueId(key, index, 'header')}
        columnKey={key}
        index={index}
        text={headerKeyLabels[key] ?? ' '}
        textStyle={styles.textStyle}
        getWidthForKey={getWidthForKey}>
        {sortedKeys && Object.keys(sortedKeys)?.includes(key) && (
          <TouchableOpacity
            style={styles.buttonSort}
            onPress={() => handleSort(key)}>
            <Image
              style={styles.imageSort}
              source={
                sortedKeys[key] === SORT_TYPE.ASC
                  ? images.sortUp
                  : images.sortDown
              }
              resizeMode="center"
            />
          </TouchableOpacity>
        )}
      </TableCell>
    );
  };

  return (
    <TableRow
      onPress={onPress}
      disabled={disabled}
      key={DEFAULT_KEY}
      height={height}
      style={style}
      draggable={false}>
      <View style={[layouts.fill, styles.contentLayout]}>
        {draggable && <View style={{ width: scaleWidth(30) }} />}
        {whiteListKeys && whiteListKeys?.map(onRenderHeaderCell)}
      </View>

      {children}
    </TableRow>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.VERY_LIGHT_PINK_1,
  },

  contentLayout: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
  },

  textStyle: {
    fontFamily: fonts.MEDIUM,
    fontSize: scaleFont(17),
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'left',
    color: 'blue',
  },

  buttonSort: {
    width: scaleWidth(50),
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    paddingHorizontal: scaleWidth(4),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  imageSort: { width: scaleWidth(18), height: scaleHeight(18) },
});
