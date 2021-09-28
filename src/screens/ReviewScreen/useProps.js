import React from "react";
import { useTranslation } from "react-i18next";
import {
  getSummaryReview,
  getListReview,
  useAxiosQuery,
  useAxiosMutation,
  showRating,
  hideRating,
} from "@src/apis";
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
  const [status, setStatus] = React.useState("all");
  const [reviewType, setReviewType] = React.useState("all");
  const [ratingItem, setRatingItem] = React.useState(null);

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
      if (response.codeNumber == 200) {
        dispatch(review.setListReview({
          ...response,
          currentPage
        }));
      }
    }
  });

  const [{ data }, submitShowRating] = useAxiosMutation({
    ...showRating(),
    onSuccess: (dt, response) => {
      if (response.codeNumber == 200) {
        dispatch(review.updateStatusReview(ratingItem));
      }
    }
  });

  const [, submitHideRating] = useAxiosMutation({
    ...hideRating(),
    onSuccess: (data, response) => {
      if (response.codeNumber == 200) {
        dispatch(review.updateStatusReview(ratingItem));
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

    getActionSheetReview: (item) => [
      {
        id: 'show-review',
        label: t('Show'),
        func: async () => {
          setRatingItem({ ...item, status: "show" });
          const body = await showRating(item?.staffRatingId);
          submitShowRating(body.params);
        },
      },
      {
        id: 'delete-review',
        label: t('Delete'),
        textColor: "red",
        func: async () => {
          setRatingItem({ ...item, status: "hidden" });
          const body = await hideRating(item?.staffRatingId);
          submitHideRating(body.params);
        },
      },
    ],

    getActionSheetReply: (staffRatingId) => [
      {
        id: 'edit-reply',
        label: t('Edit'),
        func: (staffRatingId) => { },
      },
      {
        id: 'delete-reply',
        label: t('Delete'),
        textColor: "red",
        func: (staffRatingId) => { },
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
