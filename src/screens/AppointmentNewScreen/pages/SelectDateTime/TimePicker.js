import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { colors, fonts } from "@shared/themes";
import AntDesign from "react-native-vector-icons/AntDesign";
import moment from "moment";

export const TimePicker = ({
    title = "Morning",
    data = []
}) => {
     return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        data.map((item) => (
                            <TouchableOpacity key={item?.id?.toString()+"itemTime"} style={styles.item}>
                                <Text style={styles.txtItem}>{item?.time}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    title: {
        fontFamily: fonts.MEDIUM,
        fontSize: scaleFont(15),
        marginBottom : scaleWidth(22),
        textAlign: 'center'
    },
    item: {
        width : scaleWidth(100),
        height: scaleHeight(37),
        justifyContent : 'center',
        alignItems:'center',
        borderWidth : 1,
        borderColor : "#dddddd",
        borderRadius: 3,
        marginBottom : scaleWidth(13)
    },
    txtItem: {

    }
});


