import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import {slop} from "@shared/utils";
import { images } from "@shared/themes/resources";
import { IconButton } from "@shared/components";

export const Layout = ({
  newMarketing,
  promotion,
  editPromotion
}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>

      <FlatList
        data={promotion}
        style={styles.flatList}
        keyExtractor={(item) => "promotion" + item?.id?.toString()}
        renderItem={({ item }) =>
          <IconButton
            icon={item?.isDisabled == 1 ? images.circleGrey : images.circleGreen}
            iconStyle={styles.iconStyle}
            style={styles.item}
            onPress={()=>editPromotion(item)}
            slop={slop()}
            renderText={() => <Text style={styles.name}>{item?.name}</Text>}
          />
        }
        ListFooterComponent={()=><View style={{ height : scaleHeight(300) }} />}
      />

      <IconButton
        icon={images.iconAdd}
        iconStyle={styles.addIcon}
        onPress={newMarketing}
        style={styles.btnAdd}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  flatList: {
    flex: 1
  },

  addIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },

  btnAdd: {
    position: 'absolute',
    bottom: scaleHeight(48),
    right: scaleWidth(16),
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#1366AE',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  iconStyle: {
    width: scaleWidth(12),
    height: scaleWidth(12),
    resizeMode: 'contain'
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    padding: scaleWidth(16)
  },
  name: {
    fontSize: scaleFont(16),
    fontFamily: fonts.MEDIUM,
  }


});
