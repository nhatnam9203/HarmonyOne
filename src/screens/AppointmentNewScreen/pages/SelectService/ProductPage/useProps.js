import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import NavigationService from '@navigation/NavigationService';

export const useProps = (_params) => {

    const dispatch = useDispatch();

    const categoryRef = React.useRef();
    const sectionListRef = React.useRef();

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
        categoryRef,
        sectionListRef,
        categorySelected,
        categoryList,
        data,
        productsBooking,

        selectProduct: (item) => {
            NavigationService.navigate(screenNames.SelectProductDetail, { item });
        },

        selectCategory: (categoryId) => {
            setCategorySelected(categoryId);
            const index = categoryList.findIndex(ct => ct?.categoryId == categoryId);
            if (index !== -1) {
                categoryRef?.current?.scrollToIndex({ index, animated: true });
                sectionListRef?.current?.scrollToLocation({ sectionIndex: index, animated: true, itemIndex: 0, viewPosition: 0 });
            }
        }
    };
};
