
import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { images, colors, fonts } from '@shared/themes';
import { IconButton, CustomImage } from "@shared/components";
import { isElement, isEmpty } from "lodash";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const StaffList = ({
    staffsByDate,
    staffSelected,
    selectStaff = () => { },
    isLoading,
}) => {
    if (staffsByDate.length === 0) {
        return <View style={[styles.container, { width: "100%", height: scaleWidth(61) }]} />
    }
    return (
        <View style={styles.container}>
            <ScrollView
                pagingEnabled={true}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {
                    isLoading && new Array(5).fill().map(() => (
                        <SkeletonPlaceholder>
                            <SkeletonPlaceholder.Item marginLeft={20}>
                                <SkeletonPlaceholder.Item
                                    width={scaleWidth(48)}
                                    height={scaleWidth(48)}
                                    borderRadius={300}
                                />
                            </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder>

                    ))
                }

                {
                    !isLoading && staffsByDate.map(staff => (
                        <TouchableOpacity
                            onPress={() => selectStaff(staff?.staffId)}
                            key={staff?.staffId + 'staffList'}
                            style={styles.staff}
                        >
                            {
                                isEmpty(staff?.imageUrl) ?
                                    <CustomImage
                                        style={[
                                            styles.avatar,
                                            {
                                                borderColor: staffSelected == staff?.staffId ? colors.ocean_blue : "white",
                                                borderWidth: staffSelected == staff?.staffId ? 3 : 1,
                                            }

                                        ]}
                                        source={images.staff_default}
                                        resizeMode='cover'
                                    /> :
                                    <CustomImage
                                        style={[
                                            styles.avatar,
                                            {
                                                borderColor: staffSelected == staff?.staffId ? colors.ocean_blue : "white",
                                                borderWidth: staffSelected == staff?.staffId ? 3 : 1,
                                            }
                                        ]}
                                        source={{ uri: staff?.imageUrl }}
                                        resizeMode='cover'
                                    />
                            }
                            <Text
                                numberOfLines={1}
                                ellipsizeMode={'tail'}
                                style={[styles.staffName, {
                                    fontFamily: staffSelected == staff?.staffId ? fonts.BOLD : fonts.REGULAR,
                                    color: staffSelected == staff?.staffId ? colors.ocean_blue : "#404040",
                                }]}>
                                {staff?.displayName}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>
    );
};

export default StaffList;

const styles = StyleSheet.create({
    container: {
        padding: scaleWidth(16),
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: "#cccccc",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.05,
        shadowRadius: 0.84,

        elevation: 3,
    },
    content: {
        flex: 1,
    },
    icon: {
        width: scaleWidth(20),
        height: scaleWidth(20),
        tintColor: "#7B99BA"
    },
    button: {
        height: '100%',
        alignItems: 'center'
    },
    avatar: {
        width: scaleWidth(45),
        height: scaleWidth(45),
        borderRadius: 1000,
        borderWidth: 3,
    },
    staffName: {
        fontSize: scaleFont(13),
        fontFamily: fonts.REGULAR,
        marginTop: 5
    },
    staff: {
        justifyContent: 'center',
        alignItems: 'center',
        width: scaleWidth((375 - 32) / 5),

    }
});
