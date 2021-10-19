import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { colors, fonts, layouts } from '@shared/themes';
import {
    dateToFormat,
    formatPhoneNumber,
    getColorForStatus,
    TIME_APPOINTMENT_FORMAT,
    guid,
} from '@shared/utils';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export const AppointmentItem = ({ item, onChangeAppointmentId }) => {

    const navigation = useNavigation();

    const getColors = () => {
        const background = getColorForStatus(item?.status);
        let textColor = "#333";
        switch (`${item?.status}`.toLowerCase()) {
            case 'confirm':
            case 'unconfirm':
            case 'no show':
                textColor = colors.greyish_brown_40;
                break;
            case 'refund':
            case 'void':
            case 'checkin':
            case 'paid':
                textColor = colors.white;
                break;
            default:
                textColor = colors.black;
                break;
        }
        return {
            background,
            textColor,
        }
    }

    const onPress = (pressEvt) => {
        onChangeAppointmentId(item?.appointmentId);
    };

    const notesServices = (notes = []) => {
        let noteServices = [];

        for (let i = 0; i < notes.length; i++) {
            if (i > 1) {
                if (notes[i].includes("- ")) {
                    noteServices.push(notes[i])
                } else if (notes[i].toString().trim() !== "") {
                    noteServices.push(`- ${notes[i]}`)
                }
            }
        }
        return noteServices;
    }

    const splitNotes = (note) => {
        let tempNote = note.toString().replace("</br>", "<br>");
        tempNote = tempNote.split("<br>");
        return {
            blockName: tempNote[0],
            blockPhone: tempNote[1],
            blockService: notesServices(tempNote)
        }
    }

    const {
        blockName,
        blockPhone,
        blockService,
    } = splitNotes(item?.note);

    return (
        <View style={styles.container}>
            <Pressable
                onPress={onPress}
                style={[
                    styles.content,
                    { backgroundColor: getColors().background },
                    styles.contentShadow,
                ]}>

                <View style={styles.rowContent}>
                    <Text style={[styles.textTime, { color: getColors().textColor }]}>
                        {`${item?.blockTimeStart} - ${item?.appointmentId}`}
                    </Text>
                </View>

                <View style={styles.marginVertical} />
                <View style={styles.rowContent}>
                    <Text style={[styles.textName, { color: getColors().textColor }]}>
                        {`${blockName}`}
                    </Text>
                    <View style={styles.marginVertical} />
                    <Text style={[styles.textPhone, { color: getColors().textColor }]}>
                        {`${blockPhone}`}
                    </Text>
                </View>

                <View style={layouts.marginVertical} />
                <View style={styles.rowContent}>
                    {
                        blockService.map((x) => (
                            <Text
                                key={x + guid()?.toString()}
                                style={[styles.textPhone, styles.textService, { color: getColors().textColor, }]}>
                                {x?.toString().replace("- ", "")}
                            </Text>
                        ))
                    }
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 0,
        paddingHorizontal: scaleWidth(16),
        paddingVertical: scaleHeight(5),
    },

    content: {
        flex: 0,
        padding: scaleWidth(16),
        borderRadius: scaleWidth(5),
    },

    contentShadow: {
        shadowColor: '#40404040',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 2.6,
        shadowOpacity: 0.7,
    },

    rowContent: {
        flex: 0,
    },

    marginVertical: { height: scaleHeight(5) },

    textTime: {
        fontFamily: fonts.BOLD,
        fontSize: scaleFont(20),
        fontWeight: 'bold',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
        marginBottom: scaleHeight(8)
    },

    textName: {
        fontFamily: fonts.MEDIUM,
        fontSize: scaleFont(20),
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0,
        textAlign: 'left',
    },

    textPhone: {
        fontFamily: fonts.MEDIUM,
        fontSize: scaleFont(13),
        letterSpacing: 0,
        textAlign: 'left',
    },

    textService: {
        fontFamily: fonts.LIGHT,
        marginBottom: scaleHeight(8)
    }
});
