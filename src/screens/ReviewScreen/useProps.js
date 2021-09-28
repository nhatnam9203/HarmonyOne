import React from "react";
import { useTranslation } from "react-i18next";
import { getSummaryReview, getListReview, useAxiosQuery } from "@src/apis";
import { useDispatch, useSelector } from "react-redux";
import { review } from "@redux/slices";

export const useProps = (_params) => {
  const dispatch = useDispatch();

  const {
    auth: { staff },
    review: { pages = 0, count = 0 }
  } = useSelector(state => state);

  const reviewTypeRef = React.useRef();
  const statusRef = React.useRef();

  const [currentPage, setCurrentPage] = React.useState(1);

  const [t] = useTranslation();

  const [, fetchSummaryReview] = useAxiosQuery({
    ...getSummaryReview(staff?.merchantId),
    isLoadingDefault: true,
    onSuccess: (data, response) => {
      if (response.codeNumber == 200) {
        dispatch(review.setSummaryReview(data));
      }
    }
  });

  const [{ isLoading }, fetchListReview] = useAxiosQuery({
    ...getListReview("all", "all", currentPage),
    enabled: true,
    isLoadingDefault: false,
    onSuccess: (data, response) => {
      console.log({ response });
      if (response.codeNumber == 200) {
        dispatch(review.setListReview({
          ...response,
          currentPage
        }));
      }
    }
  });

  React.useEffect(() => {
    fetchSummaryReview();
  }, []);

  return {
    reviewTypeRef,
    statusRef,
    isLoading,
    currentPage,

    getActionSheetReview: () => [
      {
        id: 'show-review',
        label: t('Show'),
        func: () => { },
      },
      {
        id: 'delete-review',
        label: t('Delete'),
        textColor: "red",
        func: () => { },
      },
    ],

    getActionSheetReply: () => [
      {
        id: 'edit-reply',
        label: t('Edit'),
        func: () => { },
      },
      {
        id: 'delete-reply',
        label: t('Delete'),
        textColor: "red",
        func: () => { },
      },
    ],

    loadMore: () => {
      console.log('load more ', { currentPage, pages })
      if (currentPage < pages) {
        setCurrentPage(currentPage + 1);
      }
    },
  };
};
