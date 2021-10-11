import React from 'react'
import { useSelector, useDispatch } from "react-redux";

export const useProps = (_params) => {

    const dispatch = useDispatch();

    const categoryRef = React.useRef();
    const sectionListRef = React.useRef();

    const {
        category: { category = [] },
        service: { services = [] },
        bookAppointment : { servicesBooking = [] },
    } = useSelector(state => state);

    const [categorySelected, setCategorySelected] = React.useState("");

    let categoryList = category.filter(ct => ct?.categoryType?.toString()?.toLowerCase() == "service" && ct.isDisabled == 0);

    const getDataList = () => {
        return categoryList.map((cate) => ({
            category: cate,
            data: services.filter((sv) => (sv.categoryId == cate.categoryId && sv.isDisabled == 0)),
        }))
    }

    const data = getDataList();

    return {
        categoryRef,
        sectionListRef,
        categorySelected,
        categoryList,
        servicesBooking,
        data,

        selectCategory : (categoryId) =>{
            setCategorySelected(categoryId);
            const index = categoryList.findIndex(ct => ct?.categoryId == categoryId);
            if (index !== -1) {
                categoryRef?.current?.scrollToIndex({ index, animated: true });
                sectionListRef?.current?.scrollToLocation({ sectionIndex: index, animated: true, itemIndex: 0, viewPosition: 0 });
            }
        }
    };
};
