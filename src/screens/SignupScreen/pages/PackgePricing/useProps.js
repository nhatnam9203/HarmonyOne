import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useAxiosQuery, getPackageAndPricing } from "@src/apis";
import { signup } from "@redux/slices";
import { useDispatch, useSelector } from "react-redux";
import NavigationService from "@navigation/NavigationService";

export const useProps = (props) => {
    const dispatch = useDispatch();


    const { packages = [] } = useSelector(state => state.signup);

    const [numberOfStaff, setNumberOfStaff] = React.useState(1);
    const [isMonthly, setIsMonthly] = React.useState(true);


    const [, fetchPackageAndPricing] = useAxiosQuery({
        ...getPackageAndPricing(),
        enabled: false,
        onSuccess: (data, response) => {
            if (response?.codeNumber == 200) {
                dispatch(signup.setPackages(data))
            }
        },
    });

    React.useEffect(() => {
        fetchPackageAndPricing();
    }, []);

    return {

        numberOfStaff,
        setNumberOfStaff,
        isMonthly,
        setIsMonthly,
        onResponseImagePicker: () => {

        },

        onSubmit: (values) => {
            NavigationService.navigate(screenNames.ApplicationSubmit)
        }
    };
};
