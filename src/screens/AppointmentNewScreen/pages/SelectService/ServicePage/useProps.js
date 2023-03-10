import React from 'react'
import { useSelector, useDispatch } from "react-redux";

export const useProps = (_params) => {

    const dispatch = useDispatch();

    const categoryRef = React.useRef();
    const sectionListRef = React.useRef();

    const {
        category: { category = [] },
        service: { services = [], servicesByStaff = [] },
        bookAppointment: { servicesBooking = [], isAddMore, },
        appointment: { staffSelected },
        auth: { staff }
    } = useSelector(state => state);

    const roleName = staff?.roleName?.toString()?.toLowerCase();

    const [categorySelected, setCategorySelected] = React.useState("");

    let categoryList = category.filter(ct => ct?.categoryType?.toString()?.toLowerCase() == "service" && ct.isDisabled == 0);

    const dataStaffSelected = () => {
        let tempCategory = [...categoryList];
        let tempArr = [];
        for (let i = 0; i < tempCategory.length; i++) {
            if (filterCategoryByServiceOfStaff(tempCategory[i].categoryId)) {
                tempArr.push(tempCategory[i]);
            }
        }
        return tempArr.map((cate) => ({
            category: cate,
            data: servicesByStaff.filter((sv) => (sv.categoryId == cate.categoryId && sv.isDisabled == 0)),
        }))
    }

    const getDataList = () => {
        if (roleName == "staff") {
            return dataStaffSelected();
        } else {
            if (staffSelected && !isAddMore && staffSelected !== -1) {
                return dataStaffSelected();
            } else {
                return categoryList.map((cate) => ({
                    category: cate,
                    data: services.filter((sv) => (sv.categoryId == cate.categoryId && sv.isDisabled == 0)),
                }))
            }
        }
    }

    const categoryRoleStaff = () => {
        let tempCategory = [...categoryList];
        let tempArr = [];
        for (let i = 0; i < tempCategory.length; i++) {
            if (filterCategoryByServiceOfStaff(tempCategory[i].categoryId)) {
                tempArr.push(tempCategory[i]);
            }
        }
        return tempArr;
    }

    const getCategoryList = () => {
        if (roleName == "staff") {
            return categoryRoleStaff();
        } else {
            if (staffSelected && !isAddMore && staffSelected !== -1) {
                return categoryRoleStaff();
            } else {
                return categoryList;
            }
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
            const index = sectionListData.findIndex(ct => ct?.categoryId == categoryId);
            if (index !== -1) {
                categoryRef?.current?.scrollToIndex({ index, animated: true });
                sectionListRef?.current?.scrollToLocation({        
                    animated: true,
                    itemIndex: 0,
                    sectionIndex: index,
                    viewPosition:  0
                });
            }
        }
    };
};
