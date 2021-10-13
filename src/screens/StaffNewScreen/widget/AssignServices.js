import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, SectionList } from 'react-native';
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { CustomInput, InputSelect, CustomActionSheet, IconButton, Button } from "@shared/components";
import { useForm, useController } from "react-hook-form";
import { useSelector } from "react-redux";
import { slop, guid } from "@shared/utils";
import { SingleScreenLayout } from '@shared/layouts';
import Title from "./Title";
import Collapsible from "react-native-collapsible";
import CheckBox from "@react-native-community/checkbox"

const AssignServices = ({
    apply = () => { },
    cancel = () => { },
    serviceSelected = [],
}) => {
    const {
        service: { services },
        category: { category },
    } = useSelector(state => state);

    const [condition, setCondition] = React.useState("No condition");
    const [dataServices, setDataServices] = React.useState([]);
    const serviceRef = React.useRef();

    const getDataList = () => {
        return category.filter(cate => {
            return services.filter((sv) => (sv.categoryId == cate.categoryId)).length > 0
        }).map((cate) => ({
            category: cate,
            data: services.filter((sv) =>
                (sv.categoryId == cate.categoryId)).map(sv => ({
                    ...sv,
                    checked: checkSerice(sv) ? true : false
                })),
        }))
    };

    const checkSerice = (service) => {
        let check = false;
        for (let i = 0; i < serviceSelected.length; i++) {
            if (service.serviceId == serviceSelected[i].serviceId) {
                check = true;
                break;
            }
        }

        return check;
    }


    const actionSheetRef = React.useRef();

    const openActionSheet = () => {
        const data = getDataList();
        setDataServices(data);
        actionSheetRef?.current?.show();
    }

    const closeActionSheet = () => {
        actionSheetRef?.current?.hide();
    }

    const selectValue = (it) => {
        closeActionSheet();
    }

    const selectService = (service) => {
        let tempData = [...dataServices];
        for (let i = 0; i < tempData.length; i++) {
            if (tempData[i].category.categoryId == service.categoryId) {
                let datas = tempData[i].data;
                for (let j = 0; j < tempData[i].data.length; j++) {
                    if (tempData[i].data[j].serviceId == service.serviceId) {
                        tempData[i].data[j].checked = !tempData[i].data[j].checked;
                    }
                }
            }
        }
        setDataServices(tempData);
    }

    const onApply = () => {
        const services = [];
        for (let i = 0; i < dataServices.length; i++) {
            for (let j = 0; j < dataServices[i].data.length; j++) {
                if (dataServices[i].data[j].checked) {
                    services.push(dataServices[i].data[j]);
                }
            }
        }
        apply(services);
        closeActionSheet();
    }

    return (
        <>
            <Title text="Services" />
            <Text style={styles.txtAssign}>Assign services this staff can perform</Text>
            <TouchableOpacity onPress={openActionSheet} style={[styles.containerInput]}>
                <View style={styles.wrapInput}>
                    <Text style={[styles.value, { fontSize: scaleFont(16) }]}>
                        {`All services(20)`}
                    </Text>
                    <Image
                        style={[styles.icon]}
                        source={images.iconEditPencil}
                        resizeMode='contain'
                    />
                    <CustomActionSheet ref={actionSheetRef}>
                        <View style={styles.contentActionSheet}>
                            <SingleScreenLayout
                                pageTitle={"Assign services"}
                                isLeft={false}
                                isRight={true}
                                isScrollLayout={false}
                                containerStyle={{ paddingVertical: 0 }}
                                headerRightComponent={() =>
                                    <TouchableOpacity onPress={closeActionSheet} style={styles.buttonClose}>
                                        <Image source={images.iconClose} style={styles.iconClose} />
                                    </TouchableOpacity>
                                }
                            >

                                <ScrollView style={styles.scrollView}>
                                    {
                                        dataServices.map((it) =>
                                            <ItemService
                                                item={it}
                                                key={it?.category?.categoryId + "categoryItem" + guid()}
                                                onPress={(serviceItem) => {
                                                    selectService(serviceItem)
                                                }}
                                            />)
                                    }
                                    <View style={{ height: scaleHeight(100) }} />
                                </ScrollView>

                                <View style={styles.bottomStyle}>
                                    <Button
                                        onPress={closeActionSheet}
                                        highlight={true}
                                        height={scaleHeight(48)}
                                        width={"100%"}
                                        label="Save"
                                    />
                                </View>
                            </SingleScreenLayout>
                        </View>
                    </CustomActionSheet>
                </View>
            </TouchableOpacity>
        </>
    );
};

const ItemService = ({ item, onPress }) => {

    const [visible, setVisible] = React.useState(false);

    return (
        <>
            <TouchableOpacity key={item.categoryId + "category"}>
                <IconButton
                    style={styles.rowReverse}
                    icon={images.dropdown}
                    slop={slop(5)}
                    iconStyle={[
                        styles.iconDropdown, {
                            transform: [{ rotate: visible ? "180deg" : "0deg" }]
                        }]}
                    renderText={() =>
                        <Text style={styles.categoryName}>
                            {item?.category?.name?.toString()?.toUpperCase()}
                        </Text>
                    }
                    onPress={() => setVisible(!visible)}
                />
            </TouchableOpacity>

            <Collapsible collapsed={visible} duration={200}>
                {
                    item.data.map(service => (
                        <TouchableOpacity
                            key={"service" + service.serviceId + guid()}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                            onPress={() => onPress(service)}
                            activeOpacity={1}
                        >
                            <CheckBox
                                disabled={false}
                                value={service.checked}
                                onValueChange={() => { }}
                                boxType='square'
                                onFillColor={colors.ocean_blue}
                                onCheckColor={colors.white}
                                onTintColor="transparent"
                                onAnimationType='one-stroke'
                                offAnimationType='one-stroke'
                                style={{ width: 24, height: 24, marginRight: scaleWidth(6), marginTop: -15 }}
                            />
                            <Text
                                style={styles.serviceName}
                            >
                                {service?.name}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </Collapsible>
        </>
    )
}

export default AssignServices;


const styles = StyleSheet.create({
    containerInput: {
        marginBottom: scaleHeight(16)
    },
    label: {
        fontSize: scaleFont(16),
        color: '#7A98BB',
        marginBottom: scaleHeight(10),
        fontFamily: fonts.REGULAR
    },
    wrapInput: {
        width: '100%',
        height: scaleWidth(42),
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 3,
        paddingHorizontal: scaleWidth(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    scrollView: {
        padding: scaleWidth(16)
    },
    input: {
        flex: 1,
        fontSize: scaleFont(17),
        fontFamily: fonts.REGULAR,
        color: colors.black,
    },
    iconClose: {
        width: scaleWidth(24),
        height: scaleWidth(24),
        tintColor: '#333'
    },
    icon: {
        width: scaleWidth(25),
        height: scaleWidth(25),
        resizeMode: 'contain'
    },
    contentActionSheet: {
        height: scaleHeight(835),
        width: scaleWidth(375),
        backgroundColor: "white",
        paddingTop: scaleHeight(25)

    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: scaleWidth(16),
    },
    title: {
        fontSize: scaleFont(20),
        fontFamily: fonts.MEDIUM
    },
    itemText: {
        fontSize: scaleFont(17),
        fontFamily: fonts.REGULAR,
        marginTop: scaleHeight(16)
    },
    value: {
        fontSize: scaleFont(16),
        fontFamily: fonts.REGULAR,
    },

    titleService: {
        fontSize: scaleFont(17),
        color: '#7A98BB',
        marginBottom: scaleHeight(10),
        fontFamily: fonts.REGULAR
    },

    serviceName: {
        fontSize: scaleFont(17),
        color: '#404040',
        fontFamily: fonts.REGULAR,
        marginBottom: scaleHeight(16),
        width: scaleWidth(300)
    },

    categoryName: {
        fontSize: scaleFont(18),
        color: colors.ocean_blue,
        fontFamily: fonts.BOLD,
        marginBottom: scaleHeight(24),
        marginTop: scaleHeight(8)
    },

    iconDropdown: {
        width: scaleWidth(12),
        height: scaleWidth(12),
        tintColor: colors.ocean_blue,
        marginTop: -7
    },

    bottomStyle: {
        width: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#dddddd",
        padding : scaleWidth(16)
    },

    line: {
        height: scaleHeight(48),
        width: 1,
        backgroundColor: "#eeeeee"
    },

    rowReverse: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: 'center'
    },

    iconClose: {
        width: scaleWidth(30),
        height: scaleWidth(30),
        tintColor: "#404040"
    },

    buttonClose: {
        width: scaleWidth(35),
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    txtAssign: {
        fontSize: scaleFont(16),
        color: '#404040',
        marginBottom: scaleHeight(16),
        fontFamily: fonts.LIGHT   
    }

});
