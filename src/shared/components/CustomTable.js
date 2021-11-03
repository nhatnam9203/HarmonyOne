import { images as IMAGE } from "@shared/themes";
import {
  formatMoney,
  formatNumberFromCurrency,
  roundFloatNumber,
} from "@shared/utils";
import { fonts } from "@shared/themes";
import PropTypes from "prop-types";
import _ from "ramda";
import React, { forwardRef, useEffect, useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,TouchableOpacity
} from "react-native";
import { StickyForm } from "react-native-largelist-v3";
import { NormalHeader } from "react-native-spring-scrollview/NormalHeader";
import moment from "moment";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const TABLE_HEADER_HEIGHT = 50;
const TABLE_ROW_HEIGHT = 65;
const TABLE_CELL_DEFAULT_WIDTH = 160;
const HEAD_FONT_SIZE = 17;
const CELL_FONT_SIZE = 15;
const IndicatorWidth = 200;
const MAX_COLUMNS_COUNT = 3;

const TABLE_HEADER_KEY = "report-header";
const TABLE_SUMMARY_KEY = "report-summary";
const TABLE_ACTION_KEY = "action";
const KEY_CONCAT_FOR_INDEX = "#";

const DATE_FORMAT = "MM/DD/YYYY";

const uniqueId = (key, index, defaultPrefix = "key") =>
  defaultPrefix + key + "-index" + index;

/**server value string "345,666.89" */
const formatServerNumber = (numStr) => {
  if (!numStr) return 0;

  if (typeof numStr === "string") {
    return formatNumberFromCurrency(numStr);
  }

  return roundFloatNumber(numStr);
};

/**sum column of object  */
const sumPropertiesKey = (array, key) => {
  if (array?.length > 0) {
    const values = array.map((item) => formatNumberFromCurrency(item[key]));
    return values.reduce((a, b) => a + b);
  }
  return 0;
};

/**filter object for keys input */
const pickObjectFromKeys = (array, keys) => {
  if (!array || !keys) return [];
  Object.fromEntries =
    Object.fromEntries ||
    ((arr) => {
      return arr.reduce((acc, [k, v]) => ((acc[k] = v), acc), {});
    });

  return array.map((obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([key]) => keys.includes(key))
    );
  });
};

/**get unique key for render row */
const getCellKey = (item, primaryId) => {
  if (!primaryId || primaryId.length <= 0) {
    return item[0];
  }
  return `${item[primaryId]}`;
};

const strCompare = (a, b) => {
  if (moment(a).isValid() && moment(b).isValid()) {
    return moment(a, DATE_FORMAT) <= moment(b, DATE_FORMAT);
  }
  return a.toString().localeCompare(b.toString());
};

const SORT_STATE = {
  none: "NONE",
  desc: "DESC",
  asc: "ASC",
};

let autoScrollTimer;
function TableListExtended({
  tableData,
  tableHead,
  tableCellWidth,
  whiteKeys,
  calcSumKeys,
  sumTotalKey,
  priceKeys,
  primaryId,
  noHead = false,
  renderCell,
  onCellPress,
  onRowPress,
  renderActionCell,
  checkSumItem,
  sortKey,
  unitKeys,
  sortDefault,
  onRefresh,
  isRefreshing,
  onLoadMore = () => { },
  endLoadMore = false,
  maxColumnCount,
  isRenderSection = false,
  heightSection = 0,
  headStyle,
  arrTextTotal = [],
  styleFirstCell,
  styleFirstSection
}) {
  /**state */
  const [headerContent, setHeaderContent] = useState({});
  const [data, setData] = useState([]);
  const [dataFactory, setDataFactory] = useState([]);
  const [sumObject, setSumObject] = useState({});
  const [tableWidth, setTableWidth] = useState(1);
  const [sortState, setSortState] = useState(SORT_STATE.none);

  const stickyFormRef = React.useRef(null);
  // scroll

  const [fullSizeContentWidth, setFullSizeContentWidth] = useState(1);
  const [visibleScrollPartWidth, setVisibleScrollPartWidth] = useState(1);
  const [indicatorFlexibleWidth] = useState(IndicatorWidth);
  const [offsetXMap, setOffsetXMap] = useState(new Map());
  const [scrollIndicatorContainerWidth, setScrollIndicatorContainerWidth] =
    useState(1);
  const [fromLeft, setFromLeft] = useState(0);
  const [currentOffset, setCurrentOffset] = useState({ x: 0, y: 0 });

  const setListData = (sort) => {
    let sortList = [...tableData];
    if (sortKey && sortList.length > 0 && sort !== SORT_STATE.none) {
      sortList.sort((a, b) => {
        if (sort === SORT_STATE.desc) {
          return strCompare(a[sortKey], b[sortKey]);
        } else if (sort === SORT_STATE.asc) {
          return strCompare(b[sortKey], a[sortKey]);
        }
      });
    }

    setData(sortList);
  };

  const changeSortData = () => {
    if (!sortKey) {
      setSortState(SORT_STATE.none);
      return;
    }

    let sort = sortState;
    if (sortState === SORT_STATE.desc) {
      sort = SORT_STATE.asc;
    } else {
      sort = SORT_STATE.desc;
    }
    setSortState(sort);
    setListData(sort);
  };
  /**effect */
  // bind header - table data
  useEffect(() => {
    if (noHead) {
      setHeaderContent({});
      return;
    }

    if (_.isEmpty(tableHead)) {
      const firstRowKeys = Object.keys(tableData[0]);
      setHeaderContent(firstRowKeys);
      return;
    }

    setHeaderContent(tableHead);
  }, [noHead, tableData, tableHead]);

  // bind sum row data
  useEffect(() => {
    if (whiteKeys?.length > 0 && tableData) {
      let sumObj = {};

      if (calcSumKeys?.length > 0) {
        calcSumKeys.forEach((key) => {
          sumObj[key] =
            checkSumItem && checkSumItem[key]
              ? checkSumItem[key]
              : sumPropertiesKey(tableData, key);
        });
        setSumObject(sumObj);
      }
      if (sortDefault) {
        setSortState(sortDefault);
        setListData(sortDefault);
      } else {
        setListData(sortState);
      }
      const valueObject = pickObjectFromKeys(
        tableData,
        whiteKeys.filter((x) => x !== sumTotalKey)
      );

      let factoryItems = [];
      let width = 0;
      tableData.forEach((item, index) => {
        let itemObject = Object.create({});
        itemObject["title"] = item[sumTotalKey];
        itemObject["data"] = Object.values(valueObject[index]);
        factoryItems.push(itemObject);
      });

      const data = Object.create({
        sectionTitle: "",
        items: factoryItems,
      });

      let dataArr = [];
      dataArr.push(data);
      setDataFactory(dataArr);

      let map = new Map();
      whiteKeys.forEach((key, index) => {
        width += getCellWidth(index, key);
        map.set(index + KEY_CONCAT_FOR_INDEX + key, width);
      });
      setOffsetXMap(map);
      setTableWidth(width);
    }
  }, [tableData, whiteKeys]);

  useEffect(() => {
    // set data and sort -> render
    if (!sortDefault) {
      setSortState(SORT_STATE.asc);
      setListData(SORT_STATE.asc);
    } else {
      setSortState(sortDefault);
      setListData(sortDefault);
    }
  }, [sortKey, sortDefault]);

  // get width render cell with index or key
  const getCellWidth = (index, key) => {

    if (tableCellWidth && tableCellWidth[key]) {
      return tableCellWidth[key];
    }

    if (!!tableCellWidth) {
      return screenWidth / (maxColumnCount ? maxColumnCount : MAX_COLUMNS_COUNT)
    }

    return TABLE_CELL_DEFAULT_WIDTH;
  };

  const isPriceCell = (key) => {
    return priceKeys?.indexOf(key) >= 0;
  };

  const onScroll = ({
    nativeEvent: {
      contentOffset: { x, y },
    },
  }) => {
    const movePercent =
      fullSizeContentWidth === visibleScrollPartWidth
        ? 0
        : x / ((fullSizeContentWidth - visibleScrollPartWidth) / 100);

    const position =
      ((visibleScrollPartWidth -
        indicatorFlexibleWidth -
        (visibleScrollPartWidth - scrollIndicatorContainerWidth)) /
        100) *
      movePercent;

    setFromLeft(position);
    setCurrentOffset({ x: x, y: y });
  };

  const isContentSmallerThanScrollView =
    fullSizeContentWidth - visibleScrollPartWidth <= 0;

  // khi kéo và thả sẽ gọi
  const onMomentumScrollBegin = () => {
    if (autoScrollTimer) {
      clearTimeout(autoScrollTimer);
    }
  };

  const onMomentumScrollEnd = () => {
    autoScroll();
  };

  onScrollBeginDrag = () => { };

  const onScrollEndDrag = () => {
    autoScroll();
  };

  const autoScroll = () => {
    if (isRefreshing) return;
    if (autoScrollTimer) {
      clearTimeout(autoScrollTimer);
    }

    autoScrollTimer = setTimeout(() => {
      offsetXMap?.forEach((value, key, map) => {
        const arrStr = key.split(KEY_CONCAT_FOR_INDEX);
        const cellWidth = getCellWidth(arrStr[0], arrStr[1]);

        let { x, y } = currentOffset;

        if (x > value - cellWidth && x <= value) {
          x = x <= value - cellWidth / 2 ? value - cellWidth : value;

          stickyFormRef.current?.scrollTo({ x: x, y: y });
          return;
        }
      });
    }, 1000);
  };

  /**render */
  // render cell
  const renderItem = ({ row }) => {
    const item = data[row];
    const cellKey = getCellKey(item, primaryId);

    return (
      <TableRow
        style={{
          flexDirection: "row",
          borderBottomColor: "#E5E5E5",
          borderBottomWidth: 1,
        }}
        key={cellKey}
        onPress={() => onRowPress({ item, row })}
        delayPressIn={200}
        disabled={!onRowPress}
      >
        {whiteKeys.map((key, keyIndex) => {
          const keyUnique = uniqueId(key, keyIndex);

          const actProps = Object.create({
            key: key,
            row: row,
            column: keyIndex,
            item: item,
            isPrice: isPriceCell(key),
          });
          const cellRender = renderCell(actProps);
          const cellActionRender =
            renderActionCell && renderActionCell(actProps);

          return keyIndex === 0 ? (
            <View
              style={[styles.headName, { backgroundColor: "#fff" }]}
              key={keyUnique}
            >
              <TableCell
                onPress={() => onCellPress(actProps)}
                style={[{
                  width: getCellWidth(keyIndex, key),
                  ...(isPriceCell(key) && { alignItems: "flex-end" }),
                },styleFirstCell]}
                disabled={!onCellPress}
              >
                {key === TABLE_ACTION_KEY
                  ? cellActionRender
                  : cellRender ?? (
                    <Text style={styles.txtCell}>
                      {isPriceCell(key)
                        ? unitKeys[key]
                          ? item[key] + " " + unitKeys[key]
                          : "$ " + item[key]
                        : item[key]}
                    </Text>
                  )}
              </TableCell>
            </View>
          ) : (
              <TableCell
                onPress={() => onCellPress(actProps)}
                key={keyUnique}
                style={{
                  width: getCellWidth(keyIndex, key),
                  alignItems : 'flex-start',
                  ...(keyIndex == whiteKeys?.length - 1 && { alignItems: "flex-end" }),
                }}
                disabled={!onCellPress}
              >
                {key === TABLE_ACTION_KEY
                  ? cellActionRender
                  : cellRender ?? (
                    <Text style={styles.txtCell}>
                      {isPriceCell(key)
                        ? unitKeys[key]
                          ? item[key] + " " + unitKeys[key]
                          : "$ " + item[key]
                        : item[key] || "-"}
                    </Text>
                  )}
              </TableCell>
            );
        })}
      </TableRow>
    );
  };

  const renderHeader = () => (
    <TableRow
      style={[styles.head, { flexDirection: "row" }]}
      key={TABLE_HEADER_KEY}
      disabled={true}
    >
      {whiteKeys.map((key, index) => {
        return index === 0 ? (
          <View style={[styles.headName, { borderBottomWidth: 1, borderBottomColor: "#eeeeee" }]} key={uniqueId(key, index, "header")}>
            <TableCell
              style={[{
                width: getCellWidth(index, key),
                ...(isPriceCell(key) && { alignItems: "flex-end" }),
                ...(sortKey === key && { flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }),
              }, styleFirstCell]}
              disabled={true}
            >
              <Text style={[styles.txtHead, headStyle]}>{headerContent[key] ?? ""}</Text>
              {sortKey === key && (
                <TouchableOpacity
                  style={styles.btnSort}
                  onPress={changeSortData}
                >
                  <View>
                    <Image
                      style={{ width: scaleWidth(18), height: scaleWidth(18) }}
                      source={
                        sortState === SORT_STATE.asc
                          ? IMAGE.sortUp
                          : sortState === SORT_STATE.desc
                            ? IMAGE.sortDown
                            : IMAGE.sortNone
                      }
                      resizeMode="center"
                    />
                  </View>
                </TouchableOpacity>
              )}
            </TableCell>
          </View>
        ) : (
            <TableCell
              key={uniqueId(key, index, "header")}
              style={{
                width: getCellWidth(index, key),
                alignItems : 'flex-start',
                ...(index == whiteKeys?.length - 1 && { alignItems: "flex-end" }),
                ...(sortKey === key && { flexDirection: "row" }),
                backgroundColor: "white",
                borderBottomWidth: 1, borderBottomColor: "#eeeeee"
              }}
              disabled={true}
            >
              <Text style={[styles.txtHead, headStyle]}>{headerContent[key] ?? ""}</Text>
              {sortKey === key && (
                <TouchableOpacity style={styles.btnSort} onPress={changeSortData}>
                  <View>
                    <Image
                      style={{ width: scaleWidth(18), height: scaleWidth(18) }}
                      source={
                        sortState === SORT_STATE.asc
                          ? IMAGE.sortUp
                          : sortState === SORT_STATE.desc
                            ? IMAGE.sortDown
                            : IMAGE.sortNone
                      }
                      resizeMode="center"
                    />
                  </View>
                </TouchableOpacity>
              )}
            </TableCell>
          );
      })}
    </TableRow>
  );

  // render header
  const renderSection = () => {
    if (!isRenderSection)
      return <></>;
    return (
      <TableRow
        style={{
          ...styles.head,
          flexDirection: "row",
        }}
        key={TABLE_SUMMARY_KEY}
        disabled={true}
      >
        {whiteKeys.map((key, index) => {
          
          return index === 0 ? (
            <View
              style={[styles.headName, { backgroundColor: "#fafafa", borderBottomWidth: 1, borderBottomColor: "#eeeeee"}]}
              key={uniqueId(key, index, "summary")}
            >
              <TableCell
                style={[
                  styleFirstSection,{
                  width: getCellWidth(index, key),
                  ...(isPriceCell(key) && {
                    alignItems: "flex-end",
                    backgroundColor: "#fafafa",
                  }),
                }]}
                disabled={true}
              >
                {key === sumTotalKey && (
                  <Text style={[styles.txtSum, { textAlign: "left" }]}>{"Total"}</Text>
                )}

                {calcSumKeys.indexOf(key) > -1 && (
                  <Text style={styles.txtSum}>
                    {isPriceCell(key)
                      ? "$ " + formatMoney(sumObject[key])
                      : sumObject[key] ?? ""}
                  </Text>
                )}
              </TableCell>
            </View>
          ) : (
              <TableCell
                key={uniqueId(key, index, "summary")}
                style={{
                  width: getCellWidth(index, key),
                  ...(index == whiteKeys?.length - 1 && { alignItems: "flex-end" }),
                  backgroundColor: "#fafafa",
                  borderBottomWidth: 1, borderBottomColor: "#eeeeee",
                }}
                disabled={true}
              >
                {/* {key === sumTotalKey && (
                  <Text style={styles.txtSum}>{"Total"}</Text>
                )} */}

                {
                  arrTextTotal.includes(key) == true && <Text style={[styles.txtSum, { textAlign: "right" }]}>{"Total"}</Text>
                }

                {calcSumKeys.indexOf(key) > -1 && (
                  <Text style={styles.txtSum}>
                    {isPriceCell(key)
                      ? unitKeys[key]
                        ? formatServerNumber(sumObject[key]) + " " + unitKeys[key]
                        : "$ " + formatMoney(sumObject[key])
                      : sumObject[key] + " " }
                  </Text>
                )}
              </TableCell>
            );
        })}
      </TableRow>
    );
  };

  React.useEffect(() => {
    if (!isRefreshing) {
      stickyFormRef.current?.endRefresh();
    }
  }, [isRefreshing]);

  const onHandleLoadMore = () => {
    // if (endLoadMore) {
    //   stickyFormRef.current.endLoading();
    //   return;
    // }
    onLoadMore();
    setTimeout(() => {
      stickyFormRef.current?.endLoading();
    }, 100);
  };

  return (
    <View style={styles.container}>
      <StickyForm
        ref={stickyFormRef}
        style={{ backgroundColor: "white", marginBottom: 5 }}
        contentStyle={{ width: tableWidth ?? "100%" }}
        onContentSizeChange={({ width }) => {
          setFullSizeContentWidth(width);
        }}
        onSizeChange={({ width }) => {
          setVisibleScrollPartWidth(width);
        }}
        onLayout={(e) => setVisibleScrollPartWidth(e.nativeEvent.layout.width)}
        data={dataFactory}
        heightForSection={() => heightSection}
        heightForIndexPath={() => TABLE_ROW_HEIGHT}
        renderHeader={renderHeader}
        renderSection={renderSection}
        renderIndexPath={renderItem}
        // bounces={false}

        alwaysBounceHorizontal={false}
        showsHorizontalScrollIndicator={isContentSmallerThanScrollView}
        showsVerticalScrollIndicator={true}
        onScroll={onScroll}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onMomentumScrollEnd={onMomentumScrollEnd}
        scrollEventThrottle={16}
        onScrollEndDrag={onScrollEndDrag}
        onScrollBeginDrag={onScrollBeginDrag}
        directionalLockEnabled={true}
        showsHorizontalScrollIndicator={false}
        renderFooter={() => <View style={{ height: 20 }} />}
        onRefresh={() => {
          onRefresh();
          setTimeout(() => {
            stickyFormRef.current?.endRefresh();
          }, 2000);
        }}
        refreshHeader={NormalHeader}
        onLoading={onHandleLoadMore}
      />
       {/* {!isContentSmallerThanScrollView && (
        <Animated.View
          style={styles.scrollIndicatorContainer}
          onLayout={(e) =>
            setScrollIndicatorContainerWidth(e.nativeEvent.layout.width)
          }
        >
          <View
            style={[
              styles.scrollIndicator,
              { left: fromLeft, width: indicatorFlexibleWidth },
            ]}
          />
        </Animated.View>
      )}  */}
    </View>
  );
}

TableListExtended.propTypes = {
  tableData: PropTypes.array.isRequired,
  tableHead: PropTypes.array,
  noHead: PropTypes.bool,
  calcSumKeys: PropTypes.array,
  tableCellWidth: PropTypes.array,
  whiteKeys: PropTypes.array.isRequired,
  primaryId: PropTypes.any.isRequired,
  sumTotalKey: PropTypes.string,
  priceKeys: PropTypes.array,
  extraData: PropTypes.object.extraData,
  renderCell: PropTypes.object,
  onCellPress: PropTypes.func,
  onRowPress: PropTypes.func,
  showSumOnBottom: PropTypes.bool,
  onChangeSumObjects: PropTypes.func,
  renderFooter: PropTypes.func,
  renderIconCell: PropTypes.func,
};
export const CustomTable = forwardRef(TableListExtended);

//================================
// Component
//================================

function TableRow({ style, children, onPress, disabled }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={[styles.row, style]}>{children}</View>
    </TouchableOpacity>
  );
}

function TableCell({ style, children, onPress, disabled }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={[styles.cell, style]}>{children}</View>
    </TouchableOpacity>
  );
}

TableListExtended.Row = TableRow;
TableListExtended.Cell = TableCell;

//================================
// Style
//================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    marginBottom: 5,
  },

  row: {
    backgroundColor: "#FFFFFF",
    height: TABLE_ROW_HEIGHT,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  head: {
    height: TABLE_HEADER_HEIGHT,
    backgroundColor: "#FAFAFA",
  },

  cell: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: 10,
  },

  txtCell: {
    fontSize: CELL_FONT_SIZE,
    color: "#6A6A6A",
    textAlign: "left",
    flexWrap: "wrap",
  },

  txtHead: {
    fontSize: scaleFont(15),
    color: "#404040",
    fontWeight: "600",
    flexWrap: "wrap",
    textAlign: "left",
    fontFamily: fonts.MEDIUM
  },

  separator: {
    height: 1,
    backgroundColor: "#E5E5E5",
  },

  txtSum: {
    fontSize: HEAD_FONT_SIZE,
    color: "#404040",
    fontWeight: "600",
    flexWrap: "wrap",
    textAlign: "left",
  },

  headName: {
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },

  btnSort: {
    width: 30,
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  scrollIndicatorContainer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    overflow: "hidden",
    borderRadius: 5,
    height: 10,
    margin: 4,
    backgroundColor: "#E1E1E1",
    borderWidth: 1,
    borderColor: "#F5F5F5",
  },

  scrollIndicator: {
    position: "absolute",
    bottom: 0,
    top: 0,
    borderRadius: 5,
    opacity: 0.5,
    backgroundColor: "#6D6D6D",
  },
});
