import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { BasicInformation } from "./BasicInformation";
import { Location } from "./Location";
import { OpeningHour } from "./OpeningHour";
import { Banners } from "./Banners";

export const Layout = ({
  merchantDetail
}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t("Business Information")}
        isLeft={true}
        isRight={false}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
      >
        <ScrollView style={styles.content}>
          <BasicInformation
            webLink={merchantDetail?.webLink || ""}
            businessName={merchantDetail?.businessName || ""}
            cellphone={merchantDetail?.cellPhone || ""}
            email={merchantDetail?.email || ""}
          />
          <Location
            addressFull={merchantDetail?.addressFull}
            longitude={merchantDetail?.longitude}
            latitude={merchantDetail?.latitude}
          />
          <OpeningHour
            addressFull={merchantDetail?.addressFull}
            longitude={merchantDetail?.longitude}
            latitude={merchantDetail?.latitude}
            businessHour={merchantDetail?.businessHour}
          />
          <Banners
            banners = {merchantDetail?.banners}
          />
          <View style={{ height: scaleHeight(100) }} />
        </ScrollView>
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
    padding: scaleWidth(16)
  },

});
