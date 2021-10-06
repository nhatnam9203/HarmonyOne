import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, SectionList } from 'react-native';
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { CustomInput, InputSelect, CustomActionSheet, IconButton, Button } from "@shared/components";
import { useForm, useController } from "react-hook-form";
import { useSelector } from "react-redux";
import { slop } from "@shared/utils";
import Collapsible from "react-native-collapsible";
import AntDesign from "react-native-vector-icons/AntDesign";

const InputCategory = ({
    apply = () => { },
    cancel = () => { },
    serviceSelected,
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

    const form = useForm();
    // const { setValue } = form;
    // const errors = form.formState.errors;

    const [isFocus, setFocus] = React.useState(false);
    const actionSheetRef = React.useRef();

    const { field } = useController({
        control: form.control,
        defaultValue: "",
        name,
    })

    // React.useEffect(() => {
    //     const obj = items.find(item => item.value == defaultValue);
    //     if (obj) {
    //         field.onChange(obj)
    //     }
    // }, []);

    // React.useImperativeHandle(ref, () => ({
    //     changeItem: (value) => {
    //         const obj = items.find(item => item.value == value);
    //         if (obj) {
    //             field.onChange(obj)
    //         }
    //     }
    // }));

    const openActionSheet = () => {
        const data = getDataList();
        setDataServices(data);
        actionSheetRef?.current?.show();
    }

    const closeActionSheet = () => {
        actionSheetRef?.current?.hide();
    }

    const selectValue = (it) => {
        field.onChange(it);
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
            <Text style={styles.titleService}>Select service</Text>
            <TouchableOpacity onPress={openActionSheet} style={[styles.containerInput]}>
                <View style={styles.wrapInput}>
                    <Text style={[styles.value, { fontSize: scaleFont(15) }]}>
                        {`${serviceSelected.length} items picked`}
                    </Text>
                    <Image
                        style={[styles.icon]}
                        source={images.dropdown}
                        resizeMode='contain'
                    />
                    <CustomActionSheet ref={actionSheetRef}>
                        <View style={styles.contentActionSheet}>

                            <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: '#dddddd', paddingBottom: scaleHeight(12) }]}>
                                <Text style={styles.title}>
                                    {'Select category'}
                                </Text>
                                <IconButton
                                    iconStyle={styles.iconClose}
                                    icon={images.iconClose}
                                    onPress={closeActionSheet}
                                />
                            </View>

                            <ScrollView style={styles.scrollView}>
                                {
                                    dataServices.map((it) =>
                                        <ItemService
                                            item={it}
                                            key={it?.category?.categoryId + "categoryItem"}
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
                                    highlight={false}
                                    height={scaleHeight(48)}
                                    width={scaleWidth(169)}
                                    label="Cancel"
                                    styleButton={{
                                        borderWidth: 0,
                                        backgroundColor: "transparent"
                                    }}
                                    styleText={{ color: "#404040" }}
                                />
                                <View style={styles.line} />
                                <Button
                                    onPress={onApply}
                                    highlight={false}
                                    height={scaleHeight(48)}
                                    width={scaleWidth(169)}
                                    label="Apply"
                                    styleText={{ fontFamily: fonts.MEDIUM }}
                                    styleButton={{
                                        borderWidth: 0,
                                        backgroundColor: "transparent"
                                    }}
                                />
                            </View>

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
                            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                            onPress={() => onPress(service)}
                            activeOpacity={1}
                        >
                            <Text
                                key={"service" + service.serviceId}
                                style={styles.serviceName}
                            >
                                {service?.name}
                            </Text>

                            {
                                service.checked &&
                                <AntDesign
                                    name="check"
                                    color={colors.ocean_blue}
                                    style={{ marginTop: -10 }}
                                    size={scaleWidth(22)}
                                />
                            }
                        </TouchableOpacity>
                    ))
                }
            </Collapsible>
        </>
    )
}

export default InputCategory;


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
        maxHeight: scaleHeight(600),
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
        width: scaleWidth(12),
        height: scaleWidth(12),
        resizeMode: 'contain'
    },
    contentActionSheet: {
        width: '100%',
        backgroundColor: colors.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingTop: scaleWidth(16),

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
    }

});
