import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { colors, fonts } from "@shared/themes";
import { Button } from "@shared/components";
import { HeaderBooking } from "../../widgets";
import { StaffItem } from "./StaffItem";
import CheckBox from "@react-native-community/checkbox"

export const Layout = ({
  staffsOfService,
  goToDateTime,
}) => {
  return (
    <View style={styles.container}>
      <HeaderBooking
        step={2}
        title={'Select Staff'}
      />
      <View style={styles.content}>
        <FlatList
          data={staffsOfService}
          keyExtractor={(item) => item?.staffId?.toString() + "staffAvailable "}
          renderItem={({ item }) => <StaffItem item={item} />}
        />
        <View style={styles.bottom}>
          <Button
            label="Next"
            onPress={goToDateTime}
            highlight={true}
            width={'100%'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: scaleWidth(8)
  },
  bottom: {
    padding: scaleWidth(16),
    width: scaleWidth(375),
    backgroundColor: "white"
  },
});
