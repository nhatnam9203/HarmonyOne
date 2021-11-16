import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import NavigationService from '@navigation/NavigationService';

export const useProps = (_params) => {

    const dispatch = useDispatch();

    const categoryRef = React.useRef();
    const sectionListRef = React.useRef();
    const dialogActiveGiftCard = React.useRef();

    const {
        category: { category = [] },
        product: { products = [] },
        bookAppointment: { productsBooking = [] }
    } = useSelector(state => state);

    const categoryList = category.filter(ct => ct?.categoryType?.toString()?.toLowerCase() == "product" && ct.isDisabled == 0);

    const [categorySelected, setCategorySelected] = React.useState("");

    const getDataList = () => {
        return categoryList.map((cate) => ({
            category: cate,
            data: products.filter((p) => (p.categoryId == cate.categoryId && p.isDisabled == 0)),
        }))
    }

    const data = getDataList();

    return {
        data,
        dialogActiveGiftCard,


        showDialogGiftCard: () => {
            dialogActiveGiftCard?.current?.show();
        },

        hideDialogGiftCard: () => {
        },

        onCheckGiftCardSucces: (data, serialNumber) => {
            dialogActiveGiftCard?.current?.hide();
            NavigationService.navigate(
                screenNames.EnterGiftCardAmount, {
                    giftCardInfo: {
                        ...data,
                        name: "Gift card - " + serialNumber?.toString()?.substring(serialNumber?.toString()?.length - 4)
                    }
            }
            );
        },
    };
};
