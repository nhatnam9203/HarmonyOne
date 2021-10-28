import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { Button, CustomInput, InputText, ListEmptyComponent } from "@shared/components";
import { fonts, images } from '@shared/themes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isEmpty } from "lodash";
import { guid, getCredicardIcon } from "@shared/utils";
import NavigationService from '@navigation/NavigationService';

export const Layout = ({
  settlementWaiting
}) => {

  const [t] = useTranslation();

  const paymentTransaction = settlementWaiting?.paymentTransaction || [];

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t('Credit transactions')}
        isRight={false}
        isLeft={true}
        isScrollLayout={false}
      >
        <View style={styles.content}>
          <FlatList
            style={{ flex: 1 }}
            data={paymentTransaction}
            keyExtractor={(item) => item?.transactionId + "transaction"}
            renderItem={({ item }) => <Item item={item} />}
            ListHeaderComponent={() => (
              <View style={styles.row}>
                <Text style={[styles.title, { width: "20%" }]}>Trans ID</Text>
                <Text style={[styles.title, { width: "25%" }]}>Invoice</Text>
                <Text style={[styles.title, { width: "35%" }]}>Payments</Text>
                <Text style={[styles.title, { textAlign: "right", width: "20%" }]}>Amount</Text>
              </View>
            )}
            ListEmptyComponent={() => <ListEmptyComponent description={t('No credit transactions')} image={images.iconNotFound} />}
          />
        </View>
      </SingleScreenLayout>
    </View>
  );
};

const Item = ({ item }) => {
  return (
    <View style={styles.row}>
      <Text style={[styles.txt, { width: "20%" }]}>#{item?.transactionId}</Text>
      <Text style={[styles.txt, { width: "25%" }]}>#{item?.checkoutId}</Text>
      <View style={{ width: "30%", flexDirection: "row", alignItems: "center" }}>
        <Image
          source={getCredicardIcon(item?.paymentData?.card_type)}
          style={styles.iconCard}
          resizeMode='contain'
        />
        <Text style={[styles.txt, { width: "100%" }]}>
          x{item?.paymentData?.card_number}
        </Text>
      </View>
      <Text style={[styles.txt, { textAlign: "right", width: "25%", fontFamily : fonts.MEDIUM }]}>
        $ {item?.amount}
      </Text>
    </View>
  )
}



const styles = StyleSheet.create({
  iconCard: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    marginRight: 5
  },
  row: {
    flexDirection: 'row',
    paddingBottom: scaleHeight(12),
    paddingTop: scaleHeight(12),
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    alignItems: "center"
  },
  title: {
    fontSize: scaleFont(14),
    color: "#404040",
    fontFamily: fonts.MEDIUM,
    width: "25%"
  },
  txt: {
    fontSize: scaleFont(13),
    color: "#404040",
    fontFamily: fonts.REGULAR,
    width: "25%"
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    position: 'relative',
  },
  content: {
    flex: 1,
    paddingHorizontal: scaleWidth(15),
  },
});
