import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, SectionList, Platform } from 'react-native';
import { fonts, colors } from "@shared/themes";
import { images } from "@shared/themes/resources";
import { CustomInput, InputSelect, CustomActionSheet, IconButton, Button, SearchInput, ListEmptyComponent, CustomImage } from "@shared/components";
import { useForm, useController } from "react-hook-form";
import { useSelector } from "react-redux";
import { slop, guid } from "@shared/utils";
import { SingleScreenLayout } from '@shared/layouts';
import Collapsible from "react-native-collapsible";
import Accordion from "react-native-collapsible/Accordion";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';


const InputService = ({
    apply = () => { },
    cancel = () => { },
    serviceSelected,
    productSelected = [],
}) => {
    const {
        service: { services },
        category: { category },
        product: { products }
    } = useSelector(state => state);

    const [condition, setCondition] = React.useState("No condition");
    const [activeSections, setActiveSections] = React.useState([]);
    const [activeSectionsProduct, setActiveSectionsProduct] = React.useState([]);

    const [dataServices, setDataServices] = React.useState([]);

    const [dataProducts, setDataProducts] = React.useState([]);

    const [isEdit, setIsEdit] = React.useState(false);
    const [categoriesEdit, setCategoriesEdit] = React.useState([]);

    const [valueSearch, setValueSearch] = React.useState("");

    const serviceRef = React.useRef();

    // const getDataListService = () => {
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

    const getDataListService = () => {
        return category.filter(obj => obj.categoryType.toString().toLowerCase() === "service").map((cate) => ({
            selected: false,
            categoryId: cate.categoryId,
            name: cate.name,
            categoryType: cate?.categoryType,
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


    const getDataListProduct = () => {
        return category.filter(obj => obj.categoryType.toString().toLowerCase() === "product").map((cate) => ({
            selected: false,
            categoryId: cate.categoryId,
            name: cate.name,
            categoryType: cate?.categoryType,
            staffServices:
                products
                    .filter(sv => sv.categoryId === cate.categoryId)
                    .map((pro) => ({
                        selected: false,
                        name: pro.name,
                        productId: pro.productId,
                        categoryId: pro.categoryId
                    }))
        }));
    };



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


    // const checkSerice = (service) => {
    //     let check = false;
    //     for (let i = 0; i < serviceSelected.length; i++) {
    //         if (service.serviceId == serviceSelected[i].serviceId) {
    //             check = true;
    //             break;
    //         }
    //     }

    //     return check;
    // }


    const form = useForm();
    const [isFocus, setFocus] = React.useState(false);
    const actionSheetRef = React.useRef();

    const { field } = useController({
        control: form.control,
        defaultValue: "",
        name: "inputService"
    })

    const openActionSheet = () => {
        let data = getDataListService();

        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].staffServices.length; j++) {
                const item = data[i].staffServices[j];
                if (checkServiceExisted(item)) {
                    data[i].staffServices[j].selected = true;
                    data[i].selected = true;
                }
            }
        }

        let productData = getDataListProduct();

        for (let i = 0; i < productData.length; i++) {
            for (let j = 0; j < productData[i].staffServices.length; j++) {
                const item = productData[i].staffServices[j];
                if (checkProductExisted(item)) {
                    productData[i].staffServices[j].selected = true;
                    productData[i].selected = true;
                }
            }
        }

        setDataServices(data);
        setDataProducts(productData);
        setValueSearch("");
        actionSheetRef?.current?.show();
    }

    const checkServiceExisted = (service) => {
        const item = serviceSelected.find(obj => obj?.serviceId == service?.serviceId);
        return item;
    }

    const checkProductExisted = (pro) => {
        const item = productSelected.find(obj => obj?.productId == pro?.productId);
        return item;
    }

    const closeActionSheet = () => {
        actionSheetRef?.current?.hide();
    }

    const selectValue = (it) => {
        field.onChange(it);
        closeActionSheet();
    }

    // const selectService = (service) => {
    //     let tempData = [...dataServices];
    //     for (let i = 0; i < tempData.length; i++) {
    //         if (tempData[i].category.categoryId == service.categoryId) {
    //             let datas = tempData[i].data;
    //             for (let j = 0; j < tempData[i].data.length; j++) {
    //                 if (tempData[i].data[j].serviceId == service.serviceId) {
    //                     tempData[i].data[j].checked = !tempData[i].data[j].checked;
    //                 }
    //             }
    //         }
    //     }
    //     setDataServices(tempData);
    // }


    const filterItem = (arrFilter = []) => {
        const arrSaved = [];
        for (let i = 0; i < arrFilter.length; i++) {
            for (let j = 0; j < arrFilter[i].staffServices.length; j++) {
                const el = arrFilter[i].staffServices[j];
                if (arrFilter[i].staffServices[j].selected) {
                    arrSaved.push(arrFilter[i].staffServices[j]);
                }
            }
        }
        return arrSaved;
    }

    const onApply = () => {
        let services = [];
        let products = [];
        services = filterItem(dataServices);
        products = filterItem(dataProducts);

        apply(services, products);
        closeActionSheet();
    }


    const onChangeSection = (section) => {
        setActiveSections(section)
    }

    const onChangeSectionProduct = (section) => {
        setActiveSectionsProduct(section)
    }

    const tickCategories = (section) => {
        let tempServiceList = [...dataServices];
        let tempProductList = [...dataProducts];

        const { selected, categoryId } = section;
        let tempList = section.categoryType == "Service" ? tempServiceList : tempProductList;

        tempList = tempList.map((cate) => ({
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
        if (section.categoryType == "Service") {
            setDataServices(tempList);
        } else {
            setDataProducts(tempList);
        }
    }

    const tickService = (service) => {
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

    const tickProduct = (service) => {
        let tempProductList = [...dataProducts];
        const { selected, categoryId, productId } = service;

        tempProductList = tempProductList.map(cate => {
            let { staffServices } = cate;
            return ({
                ...cate,
                selected: checkStatuCategory(staffServices, selected, categoryId, cate),
                staffServices:
                    cate.staffServices
                        .filter(sv => sv.categoryId === cate.categoryId)
                        .map((sv) => ({
                            ...sv,
                            selected: sv.productId === productId ? !selected : sv.selected
                        }))
            })
        });
        setDataProducts(tempProductList)
    }



    const renderHeader = (section, _, isActive) => {
        return (
            <View style={[styles.rowHeader, {
                borderBottomWidth: isActive ? 1 : 0,
                paddingVertical: scaleHeight(12),
                borderBottomColor: "#eeeeee",
            }]}>
                <TouchableOpacity onPress={() => tickCategories(section)}>
                    {
                        Platform.OS == "ios" ?
                            <CustomImage
                                source={section?.selected ? images.checkBox : images.checkBoxEmpty}
                                style={{ width: scaleWidth(27), height: scaleWidth(27), marginRight: scaleWidth(15) }}
                            />
                            :
                            <Image
                                source={section?.selected ? images.checkBox : images.checkBoxEmpty}
                                style={{ width: scaleWidth(27), height: scaleWidth(27), resizeMode: 'contain', marginRight: scaleWidth(16) }}
                                resizeMode='contain'
                            />
                    }
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
                onPress={() => section?.categoryType == "Service" ? tickService(service) : tickProduct(service)}
                key={"service" + service.categoryId + guid()}
                style={[styles.rowSection, { marginVertical: scaleHeight(14), marginLeft: scaleWidth(32) }]}
                activeOpacity={1}
            >
                {
                    Platform.OS == "ios" ?
                        <CustomImage
                            source={service?.selected ? images.checkBox : images.checkBoxEmpty}
                            style={{ width: scaleWidth(27), height: scaleWidth(27) }}
                        />
                        :
                        <Image
                            source={service?.selected ? images.checkBox : images.checkBoxEmpty}
                            style={{ width: scaleWidth(27), height: scaleWidth(27), resizeMode: 'contain', marginRight: scaleWidth(8) }}
                            resizeMode='contain'
                        />

                }
                <Text
                    style={[styles.serviceName, { flexWrap: 'wrap', width: scaleWidth(280) }]}
                >
                    {service?.name}
                </Text>
            </TouchableOpacity>
        ))
    };

    const getDataFilter = () => {
        let serviceList = dataServices;
        let productList = dataProducts;
        if (valueSearch) {
            serviceList = serviceList.filter((e) => {
                if (e !== null) {
                    return (
                        e.name
                            .trim()
                            .toLowerCase()
                            .indexOf(valueSearch.toLowerCase()) !== -1
                    );
                }
                return null;
            });

            productList = productList.filter((e) => {
                if (e !== null) {
                    return (
                        e.name
                            .trim()
                            .toLowerCase()
                            .indexOf(valueSearch.toLowerCase()) !== -1
                    );
                }
                return null;
            });
        }

        return {
            serviceList,
            productList,
        }
    }

    return (
        <>
            <Text style={styles.titleService}>Select service</Text>
            <TouchableOpacity onPress={openActionSheet} style={[styles.containerInput]}>
                <View style={styles.wrapInput}>
                    <Text style={[styles.value, { fontSize: scaleFont(15) }]}>
                        {`${serviceSelected.length + productSelected?.length} items picked`}
                    </Text>
                    <Image
                        style={[styles.icon]}
                        source={images.dropdown}
                        resizeMode='contain'
                    />
                    <CustomActionSheet ref={actionSheetRef}>
                        <View style={styles.contentActionSheet}>

                            <SingleScreenLayout
                                pageTitle={"Service / Product"}
                                isLeft={true}
                                isRight={false}
                                isScrollLayout={false}
                                onPressLeft={() => actionSheetRef?.current?.hide()}
                                containerStyle={{ paddingVertical: 0, paddingTop: scaleHeight(20) }}
                            >
                                <SearchInput
                                    placeholder="Search by name"
                                    value={valueSearch}
                                    onChangeText={(text) => { setValueSearch(text) }}
                                    removeText={() => { setValueSearch("") }}
                                />

                                <ScrollView style={{ paddingTop: scaleHeight(16) }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", paddingLeft: scaleWidth(16) }}>
                                        <Text style={styles.txtSubTitle}>Service</Text>
                                    </View>
                                    <Accordion
                                        sections={getDataFilter().serviceList}
                                        activeSections={activeSections}
                                        touchableComponent={TouchableOpacity}
                                        expandMultiple={true}
                                        renderHeader={renderHeader}
                                        renderContent={renderContent}
                                        onChange={onChangeSection}
                                        duration={300}
                                    />

                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: scaleHeight(16), paddingLeft: scaleWidth(16) }}>
                                        <Text style={styles.txtSubTitle}>Product</Text>
                                    </View>

                                    {
                                        dataProducts?.length > 0 ? <Accordion
                                            sections={getDataFilter().productList}
                                            activeSections={activeSectionsProduct}
                                            touchableComponent={TouchableOpacity}
                                            expandMultiple={true}
                                            renderHeader={renderHeader}
                                            renderContent={renderContent}
                                            onChange={onChangeSectionProduct}
                                            duration={300}
                                        />
                                            :
                                            <View style={{ alignItems: "center", justifyContent: "center", marginVertical: scaleHeight(20) }}>
                                                <Image style={styles.imageStyle} source={images.EmptyList} resizeMode='contain' />
                                                <Text style={styles.txtNoProduct}>No Products</Text>
                                            </View>
                                    }



                                </ScrollView>

                            </SingleScreenLayout>


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
    txtNoProduct: {
        fontSize: scaleFont(16),
        fontFamily: fonts.REGULAR,
        marginTop: scaleHeight(16),
        marginBottom: scaleHeight(40)
    },
    imageStyle: {
        width: scaleWidth(60),
        height: scaleWidth(60)

    },
    txtSubTitle: {
        fontSize: scaleFont(19),
        fontFamily: fonts.BOLD,
        color: "#404040",
        marginBottom: scaleHeight(12)
    },
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
        marginLeft: scaleWidth(16)
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
        padding: scaleWidth(16)
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