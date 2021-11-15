import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View, FlatList, Pressable, Platform } from "react-native";
import { colors, fonts, layouts } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { Button, IconButton, ListEmptyComponent } from "@shared/components";
import CheckBox from "@react-native-community/checkbox";
import Modal from "react-native-modal";

const PopupFilterCustomer = React.forwardRef(
    ({
        onConfirmYes = () => { },
        onApply = () =>{},
    }, ref) => {
        const [t] = useTranslation();

        const [open, setOpen] = React.useState(false);
        const [customerList, setCustomerList] = React.useState([]);

        const hideModal = () => {
            setOpen(false);
            onApply(customerList);
        };

        const onChangeCheckedCustomer = (item) => {
            let tempCustomerList = [...customerList];
            const index = tempCustomerList.findIndex(obj => obj?.customerId == item?.customerId);
            if(index !== -1){
                tempCustomerList[index].checked = !tempCustomerList[index].checked;
            }
            setCustomerList(tempCustomerList);
        }

        React.useImperativeHandle(ref, () => ({
            show: (data) => {
                setOpen(true);
                setCustomerList(data);
            },
        }));

        return (
            <Modal
                style={styles.modal}
                isVisible={open}
                onRequestClose={hideModal}
                backdropTransitionOutTiming={0}
                backdropTransitionInTiming={0}
                animationIn="zoomIn"
                animationOut="zoomOut"
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.txtHeader}>Filter customers</Text>
                    </View>

                    <View style={[styles.header, styles.header2]} >
                        <Text style={[styles.txtHeader, { color: colors.ocean_blue, width: "50%", fontSize: scaleFont(15) }]}>Name</Text>
                        <Text style={[styles.txtHeader, { color: colors.ocean_blue, width: "40%", fontSize: scaleFont(15) }]}>Phone number</Text>
                    </View>
                    <IconButton
                        icon={images.iconClose}
                        style={styles.buttonClose}
                        iconStyle={styles.iconButtonClose}
                        onPress={()=>setOpen(false)}
                    />
                    <View style={styles.content}>
                        <FlatList
                            style={styles.flatList}
                            data={customerList}
                            renderItem={({ item }) =>
                                <ItemCustomer
                                    item={item}
                                    onChangeCheckedCustomer={() => onChangeCheckedCustomer(item)}
                                />
                            }
                            keyExtractor={(item) => item.customerId.toString()}
                            ItemSeparatorComponent={() => <View style={styles.seperateLine} />}
                            ListEmptyComponent={() => <ListEmptyComponent image={images.iconNotFound} description={t('Not found customer')} />}
                            ListFooterComponent={() =>
                                <View style={{ height: scaleHeight(20) }} />
                            }
                        />
                    </View>


                    <View style={styles.bottomStyle}>
                        <Button
                            onPress={hideModal}
                            highlight={true}
                            height={scaleHeight(38)}
                            width={scaleWidth(130)}
                            label="Apply"
                        />
                    </View>
                </View>
            </Modal>
        );
    }
);

const ItemCustomer = ({ item, onChangeCheckedCustomer }) => {
    return (
        <Pressable onPress={onChangeCheckedCustomer} style={styles.itemCustomer}>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                <CheckBox
                    disabled={false}
                    value={item?.checked}
                    onValueChange={onChangeCheckedCustomer}
                    boxType='square'
                    style={{ width: 18, height: 18, marginRight: scaleWidth(12) }}
                />
                <Text style={[styles.txtItem, { width: scaleWidth(120) }]}>{`${item?.firstName} ${item?.lastName}`}</Text>
            </View>
            <Text style={[styles.txtItem]}>{item?.phone}</Text>
        </Pressable>
    )
}

export default PopupFilterCustomer;

const styles = StyleSheet.create({
    itemCustomer: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: scaleWidth(16),
        paddingVertical: scaleHeight(5)
    },
    seperateLine: {
        width: '100%',
        height: 1,
        backgroundColor: "#eeeeee",
        marginVertical: 7
    },
    txtItem: {
        fontFamily: fonts.REGULAR,
        color: "#404040",
        fontSize: scaleFont(14),
        width: "50%",
    },
    txtHeader: {
        color: "white",
        fontSize: scaleFont(18),
        fontFamily: fonts.MEDIUM
    },
    header: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: scaleHeight(50),
        backgroundColor: colors.ocean_blue
    },
    header2: {
        backgroundColor: "#F1F1F1",
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingLeft: Platform.OS == "ios" ? scaleWidth(16) : scaleWidth(32)
    },
    container: {
        backgroundColor: "#fff",
        alignItems: "center",
        alignSelf: "center",
        width: scaleWidth(340),
        borderRadius: scaleHeight(5),
        minHeight: scaleHeight(400),
        maxHeight: scaleHeight(600),
        shadowColor: "#004080bf",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowRadius: 10,
        shadowOpacity: 1,
        position: 'relative',
    },

    content: {
        flex: 1
    },


    modal: {
        margin: 0,
    },

    buttonClose: {
        width: scaleWidth(28),
        height: scaleHeight(28),
        borderRadius: scaleWidth(14),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        marginRight: scaleWidth(10),
        position: 'absolute',
        right: scaleWidth(2),
        top: scaleWidth(12),
    },

    iconButtonClose: {
        width: scaleWidth(28),
        height: scaleHeight(28),
        tintColor: "#404040",
    },

    bottomStyle: {
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        marginTop: scaleHeight(20),
        marginBottom: scaleHeight(16)
    },
    line: {
        height: scaleHeight(48),
        width: scaleWidth(2),
        backgroundColor: "#dddddd"
    }
});
