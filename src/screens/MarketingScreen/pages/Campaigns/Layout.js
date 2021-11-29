import React from 'react';
import { View, StyleSheet, Text, FlatList, Image } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { slop } from "@shared/utils";
import { images } from "@shared/themes/resources";
import { IconButton, DialogConfirm, Button } from "@shared/components";


export const Layout = ({
  newMarketing,
  promotion,
  editPromotion,
  dialogSendMessageRef,
  setPromotionIdSend,
  sendPromotionById,
}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>

      <FlatList
        data={promotion.filter(obj => obj?.isDeleted == 0)}
        style={styles.flatList}
        keyExtractor={(item) => "promotion" + item?.id?.toString()}
        renderItem={({ item }) =>
          <IconButton
            iconComponent={() => (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {
                  item?.isDisabled == 0 ?
                    <Button
                      label="Send"
                      onPress={() => {
                        setPromotionIdSend(item?.id)
                        dialogSendMessageRef?.current?.show();
                      }}
                      highlight={true}
                      width={scaleWidth(80)}
                      height={scaleWidth(35)}
                      styleButton={{ marginRight: scaleWidth(16) }}
                      styleText={{ fontSize: scaleFont(14) }}
                    /> : null
                }
                <Image
                  style={styles.iconStyle}
                  source={item?.isDisabled == 1 ? images.circleGrey : images.circleGreen}
                />
              </View>
            )}
            style={styles.item}
            onPress={() => editPromotion(item)}
            slop={slop()}
            renderText={() =>
              <Text style={styles.name}>{item?.name}</Text>
            }
          />
        }
        ListFooterComponent={() => <View style={{ height: scaleHeight(300) }} />}
        ListEmptyComponent={() => <EmptyCampaign />}
      />

      <IconButton
        icon={images.iconAdd}
        iconStyle={styles.addIcon}
        onPress={newMarketing}
        style={styles.btnAdd}
      />


      <DialogConfirm
        ref={dialogSendMessageRef}
        title={t("Warning !")}
        titleContent={
          t("Are you sure you want to send message for this Campaign ?")
        }
        onConfirmYes={sendPromotionById}
        onModalHide={() => { }}
      />
    </View>
  );
};

const EmptyCampaign = () => {
  return (
    <View style={{ alignItems: "center", paddingTop: scaleHeight(32) }}>
      <Image source={images.loa} style={styles.loa} />
      <Text style={styles.emptyText}>
        You have not created any campaigns yet.
      </Text>
      <Text style={styles.emptyText}>
        Touch the button below to create a new
      </Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  flatList: {
    flex: 1
  },

  emptyText: {
    fontSize: scaleFont(16),
    color: "#404040",
    fontFamily: fonts.REGULAR
  },

  loa: {
    width: scaleWidth(70),
    height: scaleWidth(70),
    marginBottom: scaleHeight(20)
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
