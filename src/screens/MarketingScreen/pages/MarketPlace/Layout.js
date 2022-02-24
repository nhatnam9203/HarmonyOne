import React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { CustomImage } from "@shared/components";
import { isEmpty } from "lodash";

export const Layout = ({
  marketPlaces,
  loadMore,
  isLoading,
  currentPage,
}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>

      <FlatList
        data={marketPlaces}
        style={styles.flatList}
        keyExtractor={(item) => "marketPlace" + item?.marketPlaceId?.toString()}
        renderItem={({ item }) => <ItemMarketPlace item={item} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        initialNumToRender={20}
        maxToRenderPerBatch={5}
        bounces={false}
        ListFooterComponent={() =>
          <>
            <View style={styles.itemLoadMore}>
              {
                (isLoading && currentPage > 1) ?
                  <ActivityIndicator
                    size="small"
                    color="#0764B0"
                  /> : null
              }
            </View>
            <View style={{ height: scaleHeight(100) }} />
          </>
        }
      />
    </View>
  );
};

const ItemMarketPlace = ({ item }) => {

  const openLinkMarket = (link) => {
    if (Linking.canOpenURL(link)) {
      Linking.openURL(link);
    }
  }

  return (
    <TouchableOpacity
      onPress={() => openLinkMarket(item?.link)}
      style={styles.item}
    >
      <CustomImage
        source={{ uri: item?.fileURL }}
        resizeMode='cover'
        style={styles.imgMarket}
      />
      <View style={styles.bottomItem}>
        <Text style={styles.name}>{item?.name}</Text>
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  flatList: {
    flex: 1,
    padding: scaleWidth(16),
    backgroundColor : "#fafafa"
  },
  iconStyle: {
    width: scaleWidth(12),
    height: scaleWidth(12),
    resizeMode: 'contain'
  },
  item: {
    width: scaleWidth(375 - 32),
    minHeight: scaleHeight(120),
    resizeMode: 'contain',
    shadowColor: "#403F3F",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2.84,
    elevation: 5,
    backgroundColor: colors.white,
    marginBottom: scaleWidth(16),
    borderRadius: 8
  },
  imgMarket: {
    width: "100%",
    height: scaleHeight(150),
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  bottomItem: {
    padding: scaleWidth(16),
  },
  name: {
    fontSize: scaleFont(16),
    fontFamily: fonts.BOLD,
    color: colors.ocean_blue
  },
  itemLoadMore: {
    height: scaleWidth(30),
    alignItems: "center",
    justifyContent: "center",
    marginTop: scaleHeight(10)
  },
});
