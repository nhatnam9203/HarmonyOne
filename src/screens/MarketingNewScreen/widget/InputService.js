import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, SectionList } from 'react-native';
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { CustomInput, InputSelect, CustomActionSheet, IconButton, Button, SearchInput } from "@shared/components";
import { useForm, useController } from "react-hook-form";
import { useSelector } from "react-redux";
import { slop, guid } from "@shared/utils";
import { SingleScreenLayout } from '@shared/layouts';
import Collapsible from "react-native-collapsible";
import Accordion from "react-native-collapsible/Accordion";
import CheckBox from "@react-native-community/checkbox"
import AntDesign from "react-native-vector-icons/AntDesign";

const InputService = ({
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
    const [activeSections, setActiveSections] = React.useState([]);

    const serviceRef = React.useRef();

    // const getDataList = () => {
    //     return category.filter(cate => {
    //         return services.filter((sv) => (sv.categoryId == cate.categoryId)).length > 0
    //     }).map((cate) => ({
    //         category: cate,
    //         data: services.filter((sv) =>
    //             (sv.categoryId == cate.categoryId)).map(sv => ({
    //                 ...sv,
    //                 checked: checkSerice(sv) ? true : false
    //             })),
    //     }))
    // };

    const getDataList = () => {
        return category.filter(obj => obj.categoryType.toString().toLowerCase() === "service").map((cate) => ({
            selected: false,
            categoryId: cate.categoryId,
            name: cate.name,
            staffServices:
                services
                    .filter(sv => sv.categoryId === cate.categoryId)
                    .map((sv) => ({
                        selected: false,
                        name: sv.name,
                        serviceId: sv.serviceId,
                        categoryId: sv.categoryId
                    }))
        }));
    };


    const selectCategories = (section) => {
        let tempServiceList = [...dataServices];
        const { selected, categoryId } = section;
        tempServiceList = tempServiceList.map((cate) => ({
            ...cate,
            selected: cate.categoryId === categoryId ? !selected : cate.selected,
            staffServices:
                cate.staffServices
                    .filter(sv => sv.categoryId === cate.categoryId)
                    .map((sv) => ({
                        ...sv,
                        selected: sv.categoryId === categoryId ? !selected : sv.selected
                    }))
        }));
        if (selected === true) {
            //   this.setState({ isSelectAllCategories: false })
        }
        setDataServices(tempServiceList);
    }

    const selectServiceOfCategories = (service) => {
        let tempServiceList = [...dataServices];
        const { selected, categoryId, serviceId } = service;

        tempServiceList = tempServiceList.map(cate => {
            let { staffServices } = cate;
            return ({
                ...cate,
                selected: checkStatuCategory(staffServices, selected, categoryId, cate),
                staffServices:
                    cate.staffServices
                        .filter(sv => sv.categoryId === cate.categoryId)
                        .map((sv) => ({
                            ...sv,
                            selected: sv.serviceId === serviceId ? !selected : sv.selected
                        }))
            })
        });
        setDataServices(tempServiceList)
    }

    const checkStatuCategory = (staffServices = [], selected, categoryId, cate) => {
        if (cate.categoryId === categoryId) {
            let status = !selected;
            if (status) {
                return true
            } else {
                const arrTrue = staffServices.filter(sv => sv.selected === true);
                if (arrTrue.length === 1) {
                    return false
                }
            }
        }
        return cate.selected;
    }


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


    const onChangeSection = (section) => {
        setActiveSections(section)
    }


    const renderHeader = (section, _, isActive) => {
        return (
            <View style={[styles.rowHeader, {
                borderBottomWidth: isActive ? 1 : 0,
                paddingVertical: scaleHeight(12),
                borderBottomColor: "#eeeeee",
            }]}>
                <TouchableOpacity onPress={() => selectCategories(section)}>
                    <CheckBox
                        disabled={false}
                        value={section?.selected}
                        onValueChange={() => { }}
                        boxType='square'
                        onFillColor={colors.ocean_blue}
                        onCheckColor={colors.white}
                        onTintColor="transparent"
                        onAnimationType='one-stroke'
                        offAnimationType='one-stroke'
                        lineWidth={1}
                        animationDuration={0.3}
                        style={{ width: 24, height: 24, marginRight: scaleWidth(15) }}
                    />
                </TouchableOpacity>

                <View style={styles.rowHeaderRight}>
                    <Text style={styles.categoryName}>
                        {`${section?.name?.toString()} (${section?.staffServices?.length})`}
                    </Text>
                    {
                        isActive && <Image
                            source={images.dropdown}
                            style={{
                                height: scaleWidth(8),
                                height: scaleWidth(8),
                                tintColor: colors.ocean_blue,
                            }}
                            resizeMode='contain'
                        />
                    }
                </View>
            </View>
        );
    };

    const renderContent = (section) => {
        return section?.staffServices?.map(service => (
            <TouchableOpacity
                onPress={() => selectServiceOfCategories(service)}
                key={"service" + service.categoryId + guid()}
                style={[styles.rowSection, { marginVertical: scaleHeight(14), marginLeft: scaleWidth(32) }]}
                activeOpacity={1}
            >
                <CheckBox
                    disabled={false}
                    value={service.selected}
                    onValueChange={() => { }}
                    boxType='square'
                    onFillColor={colors.ocean_blue}
                    onCheckColor={colors.white}
                    onTintColor="transparent"
                    onAnimationType='one-stroke'
                    offAnimationType='one-stroke'
                    lineWidth={1}
                    animationDuration={0.3}
                    style={{ width: 24, height: 24, }}
                />
                <Text
                    style={[styles.serviceName, { flexWrap: 'wrap', width: scaleWidth(280) }]}
                >
                    {service?.name}
                </Text>
            </TouchableOpacity>
        ))
    };

    const dataList = getDataList();

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

                            <SingleScreenLayout
                                pageTitle={"Select service"}
                                isLeft={true}
                                isRight={false}
                                isScrollLayout={false}
                                onPressLeft={()=>actionSheetRef?.current?.hide()}
                                containerStyle={{ paddingVertical: 0, paddingTop: scaleHeight(20) }}
                            >
                                <SearchInput
                                    placeholder="Search by service name"
                                    value={""}
                                    onChangeText={() => { }}
                                    removeText={() => { }}
                                />

                                <ScrollView style={{ paddingTop: scaleHeight(16) }}>
                                    <Accordion
                                        sections={dataServices}
                                        activeSections={activeSections}
                                        touchableComponent={TouchableOpacity}
                                        expandMultiple={true}
                                        renderHeader={renderHeader}
                                        renderContent={renderContent}
                                        onChange={onChangeSection}
                                        duration={300}
                                    />
                                    <View style={{ height: scaleHeight(100) }} />
                                </ScrollView>

                            </SingleScreenLayout>

                            {/* <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: '#dddddd', paddingBottom: scaleHeight(12) }]}>
                                <Text style={styles.title}>
                                    {'Select service'}
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
                                            key={it?.category?.categoryId + "categoryItem" + guid()}
                                            onPress={(serviceItem) => {
                                                selectService(serviceItem)
                                            }}
                                        />)
                                }
                                <View style={{ height: scaleHeight(100) }} />
                            </ScrollView> */}

                            <View style={styles.bottomStyle}>
                                <Button
                                    onPress={onApply}
                                    highlight={true}
                                    height={scaleHeight(48)}
                                    width={"100%"}
                                    label="Apply"
                                    styleText={{ fontFamily: fonts.MEDIUM }}
                                />
                            </View>

                        </View>
                    </CustomActionSheet>
                </View>
            </TouchableOpacity>
        </>
    );
};
export default InputService;


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
        width: scaleWidth(300),
        marginLeft : scaleWidth(16)
    },

    categoryName: {
        fontSize: scaleFont(18),
        color: colors.ocean_blue,
        fontFamily: fonts.BOLD,
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

    txtAssign: {
        fontSize: scaleFont(16),
        color: '#404040',
        marginBottom: scaleHeight(16),
        fontFamily: fonts.LIGHT
    },
    rowSection: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
        paddingHorizontal: scaleWidth(16)
    },
    rowHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        width: scaleWidth(375),
        paddingHorizontal: scaleWidth(16),
    },
    rowHeaderRight: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: scaleWidth(305),
    }

});
