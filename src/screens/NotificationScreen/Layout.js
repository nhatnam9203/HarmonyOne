import React from 'react';
import { View, StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { ListEmptyComponent, IconButton } from "@shared/components";
import { images } from "@shared/themes/resources";
import { ItemNotification } from "./ItemNotification";
import { translate } from "@localize";

export const Layout = ({
  notifications,
  isRefresh,
  loadMore,
  onRefresh,
  isLoading,
  currentPage,
  clearAll,
  onPressItem,
}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={translate("Notification")}
        isLeft={true}
        isRight={true}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
        headerRightComponent={() =>
          <IconButton
            icon={images.clear_all}
            iconStyle={styles.iconClear}
            style={styles.buttonClear}
            onPress={clearAll}
          />
        }
      >
        <View style={styles.content}>
          <FlatList
            style={styles.flatList}
            data={notifications}
            renderItem={({ item }) =>
              <ItemNotification
                item={item}
                onPressItem={()=>onPressItem(item)}
              />
            }
            keyExtractor={(item) => item?.merchantNotificationId?.toString()}
            onEndReached={loadMore}
            onEndReachedThreshold={0.1}
            refreshing={isRefresh}
            onRefresh={onRefresh}
            removeClippedSubviews={true}
            initialNumToRender={20}
            maxToRenderPerBatch={5}
            ItemSeparatorComponent={() => <View style={styles.seperateLine} />}
            ListEmptyComponent={() => <ListEmptyComponent image={images.iconNotFound} description={translate('No Notification')} />}
            ListFooterComponent={() =>
              <View style={styles.itemLoadMore}>
                {
                  (isLoading && currentPage > 1) ?
                    <ActivityIndicator
                      size="small"
                      color="grey"
                    /> : null
                }
              </View>}
          />
        </View>
      </SingleScreenLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  content: {
    flex: 1,
    paddingTop : scaleHeight(8)
  },
  flatList: {
    flex: 1
  },
  iconClear: {
    width: scaleWidth(30),
    height: scaleWidth(30),
  },

  buttonClear: {
    height: '100%',
    alignItems: 'center'
  },

  itemLoadMore: {
    height: scaleWidth(30),
    alignItems: "center",
    justifyContent: "center",
    marginTop: scaleHeight(10)
  }
});
