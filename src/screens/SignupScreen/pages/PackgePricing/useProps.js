import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useAxiosQuery, getPackageAndPricing, useAxiosMutation, signUpMerchant } from "@src/apis";
import { signup } from "@redux/slices";
import { useDispatch, useSelector } from "react-redux";
import NavigationService from "@navigation/NavigationService";

export const useProps = (props) => {
    const dispatch = useDispatch();


    const {
        generalInfor = {},
        businessInformation = {},
        bankInfor = {},
        principalInfo = {},
        packages = [],
        type = "",
        sameAsBusiness,
    } = useSelector(state => state.signup);

    const [numberOfStaff, setNumberOfStaff] = React.useState(1);
    const [isMonthly, setIsMonthly] = React.useState(true);


    const [, fetchPackageAndPricing] = useAxiosQuery({
        ...getPackageAndPricing(),
        enabled: false,
        onSuccess: (data, response) => {
            if (response?.codeNumber == 200) {
                dispatch(signup.setPackages(data));
            }
        },
    });

    const [, submitSignupMerchant] = useAxiosMutation({
        ...signUpMerchant(),
        onSuccess: (data, response) => {
            if (response?.codeNumber == 200) {
                NavigationService.navigate(screenNames.ApplicationSubmit)
            }
        },
    });

    // React.useEffect(() => {
    //     fetchPackageAndPricing();
    // }, []);

    return {

        numberOfStaff,
        setNumberOfStaff,
        isMonthly,
        setIsMonthly,

        onSubmit: async() => {
            const packagePricing = numberOfStaff == 1 ? 4 : 5;
            dispatch(signup.updatePackagePricing(packagePricing));
            const data = {
                generalInfo : generalInfor,
                businessInfo: businessInformation,
                bankInfo : bankInfor,
                principalInfo,
                packagePricing,
                type,
                sameAsBusiness
            }
            const body = await signUpMerchant(data);
            submitSignupMerchant(body.params);    
        }
    };
};
