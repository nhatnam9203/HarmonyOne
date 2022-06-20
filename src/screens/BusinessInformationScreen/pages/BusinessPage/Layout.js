import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { LoadingAnimation } from "@shared/components";
import { BasicInformation } from "./BasicInformation";
import { Location } from "./Location";
import { OpeningHour } from "./OpeningHour";
import { Banners } from "./Banners";
import { translate } from "@localize";

export const Layout = ({
  merchantDetail,
  bannersMerchant,
  isReady
}) => {

  const [t] = useTranslation();

  if (!isReady) {
    return (
      <LoadingAnimation />
    )
  }

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={translate("Business Information")}
        isLeft={true}
        isRight={false}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
      >
        <ScrollView style={styles.content}>
          <BasicInformation
            webLink={merchantDetail?.webLink || ""}
            businessName={merchantDetail?.businessName || ""}
            phone={merchantDetail?.phone || ""}
            email={merchantDetail?.email || ""}
            translate={translate}
          />
          <Location
            addressFull={merchantDetail?.addressFull}
            longitude={merchantDetail?.longitude}
            latitude={merchantDetail?.latitude}
            merchantDetail={merchantDetail}
            translate={translate}
          />
          <OpeningHour
            businessHour={merchantDetail?.businessHour}
            translate={translate}
          />
          <Banners
            banners={bannersMerchant}
            translate={translate}
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
    padding: scaleWidth(16),
    backgroundColor : "#fafafa"
  },

});
