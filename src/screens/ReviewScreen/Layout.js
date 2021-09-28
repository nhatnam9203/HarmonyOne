import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTranslation } from "react-i18next";
import { SingleScreenLayout } from '@shared/layouts';
import { reviewTypeGroup, statusGroup } from "@shared/utils";
import { fonts, colors } from "@shared/themes";
import { ButtonFilter, CustomInput, DropdownMenu } from "@shared/components";
import { AggregateRating } from "./AggregateRating";
import { ReviewList } from "./ReviewList";
import { images } from "@shared/themes/resources";

export const Layout = ({
  reviewTypeRef,
  statusRef,
  getActionSheetReview,
  getActionSheetReply,
  loadMore,
  isLoading,
  currentPage,
  onChangeFilter,
  status,
  reviewType,
}) => {

  const [t] = useTranslation();

  return (
    <View style={styles.container}>
      <SingleScreenLayout
        pageTitle={t("Review")}
        isLeft={true}
        isRight={true}
        isScrollLayout={false}
        containerStyle={{ paddingVertical: 0 }}
        headerRightComponent={() =>
          <View style={styles.button}>
            <ButtonFilter
              onApply={() => {
                const status = statusRef?.current?.getValue()?.value;
                const reviewTypeGroup = reviewTypeRef?.current?.getValue()?.value;
                onChangeFilter(status, reviewTypeGroup);
              }}

              onReset={() => {
                statusRef?.current?.changeValue(
                  { label: "All Status", value: "all" },
                );
                reviewTypeRef?.current?.changeValue(
                  { label: "All reviews", value: "all" },
                );
              }}

              onOpen={() => {
                const statusObj = statusGroup.find(obj => obj.value == status);
                const reviewObj = reviewTypeGroup.find(obj => obj.value == reviewType);
                setTimeout(() => {
                  statusObj && statusRef?.current?.changeValue(statusObj);
                  reviewObj && reviewTypeRef?.current?.changeValue(reviewObj);
                }, 200)
              }}
            >
              <CustomInput
                label='Review type'
                name="reviewType"
                labelStyle={{ color: colors.greyish_brown_40 }}
                renderInput={() =>
                  <DropdownMenu
                    ref={reviewTypeRef}
                    items={reviewTypeGroup}
                    onChangeValue={(item) => { console.log({ item }) }}
                    defaultIndex={0}
                    width={scaleWidth(280)}
                    height={scaleWidth(42)}
                    styleDropDown={styles.styleDropDown}
                  />
                }
              />
              <CustomInput
                label='Status'
                name="status"
                labelStyle={{ color: colors.greyish_brown_40 }}
                renderInput={() =>
                  <DropdownMenu
                    ref={statusRef}
                    items={statusGroup}
                    onChangeValue={() => { }}
                    defaultIndex={0}
                    width={scaleWidth(280)}
                    height={scaleWidth(42)}
                    styleDropDown={styles.styleDropDown}
                  />
                }
              />
            </ButtonFilter>
          </View>
        }
      >
        <View style={styles.content}>
          <AggregateRating />
          <ReviewList
            getActionSheetReview={getActionSheetReview}
            getActionSheetReply={getActionSheetReply}
            loadMore={loadMore}
            isLoading={isLoading}
            currentPage={currentPage}
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
  },

  button: {
    height: '100%',
    width: scaleWidth(35),
    justifyContent: 'center',
    alignItems: 'center',
  },

  styleDropDown: {
    backgroundColor: "white",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
});
