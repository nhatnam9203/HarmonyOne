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
    categorySelected = []
}) => {
    const {
        service: { services },
        category: { category },
    } = useSelector(state => state);

    const [condition, setCondition] = React.useState("No condition");
    const [dataCategory, setDataCategory] = React.useState([]);

    const getDataList = () => {
        return category.map(obj => ({
            ...obj,
            checked: checkCategory(obj)
        }));
    };

    const checkCategory = (category) => {
        let check = false;
        for (let i = 0; i < categorySelected.length; i++) {
            if (category.categoryId == categorySelected[i].categoryId) {
                check = true;
                break;
            }
        }

        return check;
    }

    const form = useForm();
    const [isFocus, setFocus] = React.useState(false);
    const actionSheetRef = React.useRef();

    const { field } = useController({
        control: form.control,
        defaultValue: "",
        name,
    })

    const openActionSheet = () => {
        const data = getDataList();
        setDataCategory(data);
        actionSheetRef?.current?.show();
    }

    const closeActionSheet = () => {
        actionSheetRef?.current?.hide();
    }

    const selectValue = (it) => {
        field.onChange(it);
        closeActionSheet();
    }

    const selectCategory = (category) => {
        let tempData = [...dataCategory];
        for (let i = 0; i < tempData.length; i++) {
            if (tempData[i].categoryId == category.categoryId) {
                tempData[i].checked = !tempData[i].checked;
            }
        }
        setDataCategory(tempData);
    }

    const onApply = () => {
        const categories = [];
        for (let i = 0; i < dataCategory.length; i++) {
            if (dataCategory[i].checked) {
                categories.push(dataCategory[i])
            }
        }
        apply(categories);
        closeActionSheet();
    }

    return (
        <>
            <Text style={styles.titleService}>Select category</Text>
            <TouchableOpacity onPress={openActionSheet} style={[styles.containerInput]}>
                <View style={styles.wrapInput}>
                    <Text style={[styles.value, { fontSize: scaleFont(15) }]}>
                        {`${categorySelected?.length} items picked`}
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
                                    dataCategory.map((it) =>
                                        <ItemCategory
                                            item={it}
                                            key={it?.categoryId + "categoryInputItem"}
                                            onPress={() => { selectCategory(it) }}
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

const ItemCategory = ({ item, onPress }) => {

    return (
        <TouchableOpacity
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
            onPress={onPress}
        >
            <Text style={styles.serviceName}>
                {item?.name}
            </Text>
            {
                item.checked &&
                <AntDesign
                    name="check"
                    color={colors.ocean_blue}
                    style={{ marginTop: -10 }}
                    size={scaleWidth(18)}
                />
            }
        </TouchableOpacity>
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
