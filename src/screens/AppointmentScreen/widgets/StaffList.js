
import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { images, colors, fonts } from '@shared/themes';
import { IconButton, CustomImage } from "@shared/components";

const StaffList = ({
    staffsByDate,
    staffSelected,
    selectStaff = () => { }
}) => {
    return (
        <View style={styles.container}>
            <ScrollView
                pagingEnabled={true}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {
                    staffsByDate.map(staff => (
                        <TouchableOpacity
                            onPress={() => selectStaff(staff?.staffId)}
                            key={staff?.staffId + 'staffList'}
                            style={styles.staff}
                        >
                            <CustomImage
                                style={styles.avatar}
                                source={{ uri: staff?.imageUrl }}
                            />
                            <Text style={[styles.staffName,{ 
                                fontFamily : staffSelected == staff?.staffId ? fonts.BOLD : fonts.REGULAR,
                                color : staffSelected == staff?.staffId ? colors.ocean_blue : "#404040",
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
    },
    staffName: {
        fontSize: scaleFont(13),
        fontFamily: fonts.REGULAR,
        marginTop: 5
    },
    staff: {
        justifyContent: 'center',
        alignItems: 'center',
        width : scaleWidth((375 - 32) / 5),

    }
});
