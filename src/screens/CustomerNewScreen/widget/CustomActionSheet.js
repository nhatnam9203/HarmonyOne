import React from 'react';
import { CustomModal } from '@shared/components';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { colors, fonts } from '@shared/themes';
import { images } from "@shared/themes/resources";
import { IconButton } from "@shared/components";
import { slop } from "@shared/utils";
import { isEmpty } from "lodash";

export const CustomActionSheet = React.forwardRef((
    { title = "title", items = [], onChangeItem = () => { }, defaultActiveKey = '' }, ref) => {

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    const onModalHide = () => {
        setOpen(false);
    };

    const onSelectItem = (item) => {
        setValue(item.value);
        onChangeItem(item);
        onModalHide();
    }

    React.useImperativeHandle(ref, () => ({
        show: () => {
            setOpen(true);
        },
        getOpenValue: () => open,
        getItemValue: () => value,
    }));

    React.useEffect(() => {
        if (!isEmpty(defaultActiveKey)) {
            const item = items.find(i => i.value == defaultActiveKey);
            if (item) {
                setValue(item.value);
                onChangeItem(item);
            }
        }
    }, []);

    return (
        <CustomModal
            isVisible={open}
            onRequestClose={onModalHide}
            onBackdropPress={() => {
                onModalHide();
                onChangeItem(null);
            }}
            style={styles.modal}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={[styles.itemContent, , { paddingTop: scaleHeight(15) }]}>
                        <Text style={styles.title}>{title}</Text>
                        <IconButton
                            icon={images.iconClose}
                            iconStyle={styles.iconClose}
                            onPress={() => {
                                onModalHide();
                                onChangeItem(null);
                            }}
                        />
                    </View>

                    <View style={styles.line} />

                    {
                        items.map((item) => (
                            <TouchableOpacity
                                key={item.value}
                                style={styles.itemContent}
                                onPress={() => onSelectItem(item)}
                            >
                                <Text
                                    style={[
                                        styles.textItem,
                                        item.value == value ? styles.textItemSelected : {}
                                    ]}
                                >
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        </CustomModal>
    );
});


const styles = StyleSheet.create({
    modal: {
        margin: 0,
        justifyContent: 'flex-end',
    },

    container: {
        flex: 0,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    content: {
        borderRadius: scaleHeight(5),
        backgroundColor: colors.white,
        marginVertical: scaleHeight(8),
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingBottom: scaleHeight(20)
    },

    itemContent: {
        height: scaleHeight(44),
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: fonts.MEDIUM,
        paddingHorizontal: scaleWidth(16),
    },

    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#eeeeee',
        marginTop: scaleHeight(12)
    },

    title: {
        fontSize: scaleFont(21),
        fontFamily: fonts.MEDIUM,
        color: colors.greyish_brown_40,
    },

    textItem: {
        fontSize: scaleFont(18),
        fontFamily: fonts.REGULAR,
        color: colors.greyish_brown_40,
    },

    textItemSelected: {
        color: colors.ocean_blue,
        fontFamily: fonts.MEDIUM,
    },

    iconClose: {
        width: scaleWidth(30),
        height: scaleWidth(30),
        resizeMode: 'contain',
        tintColor: '#404040',
    }
});

