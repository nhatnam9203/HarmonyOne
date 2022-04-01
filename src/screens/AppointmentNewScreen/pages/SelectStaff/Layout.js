import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { colors, fonts } from "@shared/themes";
import { Button, ListEmptyComponent } from "@shared/components";
import { HeaderBooking } from "../../widgets";
import { StaffItem } from "./StaffItem";
import CheckBox from "@react-native-community/checkbox";
import LottieView from "lottie-react-native";

export const Layout = ({
  staffList,
  goToDateTime,
  selectStaff,
}) => {

  const checkDisabledButton = () => {
    let check = true;
    for (const el of staffList) {
      if (el?.checked) {
        return false;
      }
    }
    return check
  }

  return (
    <View style={styles.container}>
      <HeaderBooking
        step={2}
        title={'Select Staff'}
      />
      <View style={styles.content}>
        {
          staffList?.length == 0 ?
            <View style={{ flex: 1 }}>
              <ListEmptyComponent
                description={'No staff available for this service'}
                renderLottiewView={() => (
                  <View style={{ width: 180, height: 180 }}>
                    <LottieView
                      source={require('../../../../assets/not_found.json')}
                      autoPlay
                      loop
                    />
                  </View>
                )}
              />
            </View> :
            <FlatList
              data={staffList}
              keyExtractor={(item) => item?.staffId?.toString() + "staffAvailable "}
              renderItem={({ item }) =>
                <StaffItem
                  selectStaff={() => selectStaff(item)}
                  item={item}
                />
              }
            />
        }

        <View style={styles.bottom}>
          <Button
            label="Next"
            disabled={checkDisabledButton()}
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
  },
  bottom: {
    padding: scaleWidth(16),
    width: scaleWidth(375),
    backgroundColor: "white"
  },
});
