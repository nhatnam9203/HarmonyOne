import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from "react-redux";
import { signup } from "@redux/slices";
import NavigationService from "@navigation/NavigationService";

export const useProps = (props) => {
    const dispatch = useDispatch();

    const form = useForm({
        // resolver: yupResolver(customerSchema)
    });

    const { setValue } = form;
    const errors = form.formState.errors;

    const question1Ref = React.useRef();
    const question2Ref = React.useRef();
    const question3Ref = React.useRef();
    const question4Ref = React.useRef();
    const question5Ref = React.useRef();


    return {
        form,
        errors,

        question1Ref,
        question2Ref,
        question3Ref,
        question4Ref,
        question5Ref,

        onSubmit: (values) => {
            const businesssInfo = {
                question1: {
                    isAccept: question1Ref.current?.getStatus(),
                    desc: form.getValues("question1"),
                    question:
                      "Has Merchant been previously identified by Visa/Mastercard Risk Programs?",
                  },
                  question2: {
                    isAccept: question2Ref.current?.getStatus(),
                    desc: form.getValues("question2"),
                    question:
                      "Has Merchant or any associated principal and/or owners disclosed below filed bankruptcy or been subject to any involuntary bankruptcy?",
                  },
                  question3: {
                    isAccept: question3Ref.current?.getStatus(),
                    desc: form.getValues("question3"),
                    question: "Will product(s) or service(s) be sold outside of US?",
                  },
                  question4: {
                    isAccept: question4Ref.current?.getStatus(),
                    desc: form.getValues("question4"),
                    question: "Has a processor ever terminated your Merchant account?",
                  },
                  question5: {
                    isAccept: question5Ref.current?.getStatus(),
                    desc: form.getValues("question5"),
                    question: "Have you ever accepted Credit/Debit cards before?",
                  },
            };

            dispatch(signup.updateBusinessInformation(businesssInfo));

            NavigationService.navigate(screenNames.BankInformation);
        }
    };
};
