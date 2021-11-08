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
  const [t] = useTranslation();
  const dispatch = useDispatch();

  const {
    auth: { staff },
    review: { pages = 0, count = 0, summary }
  } = useSelector(state => state);

  const reviewTypeRef = React.useRef();
  const statusRef = React.useRef();

  const [currentPage, setCurrentPage] = React.useState(1);
  const [isRefresh, setRefresh] = React.useState(false);
  const [status, setStatus] = React.useState("all");
  const [reviewType, setReviewType] = React.useState("all");
  const [ratingItem, setRatingItem] = React.useState(null);


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
    ...getListReview(status, reviewType, currentPage),
    enabled: true,
    isLoadingDefault: currentPage == 1,
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
        fetchSummaryReview();
      }
    }
  });

  const [, submitHideRating] = useAxiosMutation({
    ...hideRating(),
    onSuccess: (data, response) => {
      if (response.codeNumber == 200) {
        dispatch(review.updateStatusReview(ratingItem));
        fetchSummaryReview();
      }
    }
  });

  console.log({ ratingItem })

  React.useEffect(() => {
    if (isRefresh) {
      fetchListReview();
      fetchListReview();
    }
    setRefresh(false);
  }, [isRefresh, currentPage]);

  React.useEffect(() => {
    fetchSummaryReview();
  }, []);

  return {
    reviewTypeRef,
    statusRef,
    isLoading,
    currentPage,
    status,
    reviewType,
    summary,
    isRefresh,

    showReview: async(item) => {
      console.log({ item })
      setRatingItem({ ...item, status: "show" });
      const body = await showRating(item?.staffRatingId);
      submitShowRating(body.params);
    },

    hideReview: async(item) => {
      console.log({ item })
      setRatingItem({ ...item, status: "hidden" });
      const body = await hideRating(item?.staffRatingId);
      submitHideRating(body.params);
    },

    getActionSheetReview: (item) => [
      {
        id: 'show-review',
        label: t('Show'),
        func: () => {
          setTimeout(async () => {
            setRatingItem({ ...item, status: "show" });
            const body = await showRating(item?.staffRatingId);
            submitShowRating(body.params);
          }, 30);
        },
      },
      // {
      //   id: 'delete-review',
      //   label: t('Delete'),
      //   textColor: "red",
      //   func: () => {
      //     setTimeout(async () => {
      //       setRatingItem({ ...item, status: "hidden" });
      //       const body = await hideRating(item?.staffRatingId);
      //       submitHideRating(body.params);
      //     }, 30);
      //   },
      // },
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
      if (currentPage < pages) {
        setCurrentPage(currentPage + 1);
      }
    },

    onChangeFilter: (filterStatus, filterType) => {
      setCurrentPage(1);
      setStatus(filterStatus);
      setReviewType(filterType);
    },

    onRefresh: () => {
      setRefresh(true);
      setCurrentPage(1);
    }
  };
};
