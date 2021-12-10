import React from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native'
import { fonts, colors } from '@shared/themes';
import { slop } from "@shared/utils";
import { images } from "@shared/themes/resources";
import { IconButton } from "@shared/components";
import { CustomActionSheet, TimePicker, CustomImage } from "@shared/components";
import { isEmpty } from "lodash";
import moment from "moment";



let InputTime = React.forwardRef(({
    style,
    renderInput = null,
    items = [],
    title = "Select staff",
    itemSelected,
    onSelect = () => {},
}, ref) => {

    const actionSheetRef = React.useRef();
    const [open, setOpen] = React.useState(false);

    React.useImperativeHandle(ref, () => ({
        getValue: () => {
            return date;
        },
        changeValue: (vl) => setDate(vl),
    }));

    const openActionSheet = () => {
        actionSheetRef?.current?.show();
    }

    const closeActionSheet = () => {
        actionSheetRef?.current?.hide();
    }

    const selectValue = (it) => {
        onSelect(it?.staffId);
        closeActionSheet();
    }

    return (
        <>
            {
                renderInput ?
                    <TouchableOpacity onPress={openActionSheet}>
                        {renderInput()}
                    </TouchableOpacity>
                    :
                    <View style={[styles.containerInput]}>
                        <TouchableOpacity onPress={openActionSheet} style={[styles.wrapInput, style]}>
                            <Text style={styles.txtDate}>{time}</Text>
                            <Image
                                source={images.dropdown}
                                style={styles.icon}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    </View>
            }
            <CustomActionSheet ref={actionSheetRef}>
                <View style={styles.contentActionSheet}>
                    <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: '#dddddd', paddingBottom: scaleHeight(12), justifyContent : "space-between" }]}>
                        <Text style={styles.title}>
                            {title}
                        </Text>
                        <IconButton
                            iconStyle={styles.iconClose}
                            icon={images.iconClose}
                            onPress={closeActionSheet}
                        />
                    </View>
                    <ScrollView style={styles.scrollView}>
                        {
                            items.map((it) => (
                                <TouchableOpacity
                                    key={it?.staffId + "select staff"}
                                    onPress={() => selectValue(it)}
                                    style={[
                                        styles.row, 
                                        { 
                                            backgroundColor : itemSelected === it?.staffId ? colors.ocean_blue : "transparent",
                                            padding : scaleWidth(16),
                                            marginHorizontal : 0
                                        }
                                    ]}
                                >
                                    {
                                        isEmpty(it?.imageUrl) ?
                                            <CustomImage
                                                style={styles.avatar}
                                                source={images.staff_default}
                                                resizeMode="cover"
                                            /> :
                                            <CustomImage
                                                style={styles.avatar}
                                                source={{
                                                    uri: it?.imageUrl,
                                                    priority: 'normal',
                                                }}
                                                resizeMode="cover"
                                            />
                                    }

                                    <Text style={[
                                        styles.itemText, {
                                            color: itemSelected === it?.staffId ? "white" : "#333",
                                            fontFamily: itemSelected === it?.staffId ? fonts.BOLD : fonts.REGULAR,
                                        }
                                    ]}>
                                        {it?.displayName}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                </View>
            </CustomActionSheet>
        </>
    )
});

export const InputSelectStaff = React.memo(InputTime);

const styles = StyleSheet.create({
    containerInput: {
    },
    label: {
        fontSize: scaleFont(16),
        color: '#7A98BB',
        marginBottom: scaleHeight(10),
        fontFamily: fonts.REGULAR
    },
    wrapInput: {
        width: scaleWidth(165),
        height: scaleWidth(42),
        borderWidth: 1,
        borderColor: '#cccccc',
        flexDirection: 'row',
        borderRadius: 3,
        paddingHorizontal: scaleWidth(10),
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        flex: 1,
        fontSize: scaleFont(16),
        fontFamily: fonts.REGULAR,
        color: colors.greyish_brown_40
    },
    icon: {
        width: scaleWidth(13),
        height: scaleWidth(13),
    },
    txtDate: {
        fontSize: scaleFont(16),
        fontFamily: fonts.REGULAR,
        color: colors.black
    },
    contentActionSheet: {
        width: '100%',
        backgroundColor: colors.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingTop: scaleWidth(16),
        paddingBottom: scaleHeight(32)

    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: scaleWidth(16),
    },
    title: {
        fontSize: scaleFont(18),
        fontFamily: fonts.MEDIUM,
        color: "#404040"
    },
    itemText: {
        fontSize: scaleFont(16),
        fontFamily: fonts.REGULAR,
        marginTop: scaleHeight(16)
    },
    value: {
        fontSize: scaleFont(16),
        fontFamily: fonts.REGULAR,
    },
    scrollView: {
        maxHeight: scaleHeight(600)
    },
    iconClose: {
        width: scaleWidth(24),
        height: scaleWidth(24),
        tintColor: '#333'
    },
    avatar: {
        width: scaleWidth(50),
        height: scaleWidth(50),
        borderRadius: 3000,
        marginRight: scaleWidth(16)
    }
});

