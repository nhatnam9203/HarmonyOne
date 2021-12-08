import React from 'react'
import { useSelector, useDispatch } from "react-redux";

export const useProps = (_params) => {

    const dispatch = useDispatch();

    const categoryRef = React.useRef();
    const sectionListRef = React.useRef();

    const {
        category: { category = [] },
        service: { services = [], servicesByStaff = [] },
        bookAppointment: { servicesBooking = [] },
        auth: { staff }
    } = useSelector(state => state);

    const roleName = staff?.roleName?.toString()?.toLowerCase();

    const [categorySelected, setCategorySelected] = React.useState("");

    let categoryList = category.filter(ct => ct?.categoryType?.toString()?.toLowerCase() == "service" && ct.isDisabled == 0);

    const getDataList = () => {
        if (roleName == "staff") {
            let tempCategory = [...categoryList];
            let tempArr = [];
            for (let i = 0; i < tempCategory.length; i++) {
                if (filterCategoryByServiceOfStaff(tempCategory[i].categoryId)) {
                    tempArr.push(tempCategory[i]);
                }
            }
            return tempArr.map((cate) => ({
                category: cate,
                data: services.filter((sv) => (sv.categoryId == cate.categoryId && sv.isDisabled == 0)),
            }))
        } else {
            return categoryList.map((cate) => ({
                category: cate,
                data: services.filter((sv) => (sv.categoryId == cate.categoryId && sv.isDisabled == 0)),
            }))
        }
    }

    const getCategoryList = () => {
        if (roleName == "staff") {
            let tempCategory = [...categoryList];
            let tempArr = [];
            for (let i = 0; i < tempCategory.length; i++) {
                if (filterCategoryByServiceOfStaff(tempCategory[i].categoryId)) {
                    tempArr.push(tempCategory[i]);
                }
            }
            return tempArr;
        } else {
            return categoryList;
        }
    }

    const filterCategoryByServiceOfStaff = (categoryId) => {
        const tempService = servicesByStaff?.find(service => service?.categoryId == categoryId);
        if (tempService) return true;
        return false;
    }

    const data = getDataList();

    const sectionListData = getCategoryList();

    return {
        categoryRef,
        sectionListRef,
        categorySelected,
        servicesBooking,
        data,
        sectionListData,

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
