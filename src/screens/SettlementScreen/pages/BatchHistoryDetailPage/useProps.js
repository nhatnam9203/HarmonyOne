
import NavigationService from '@navigation/NavigationService';
import { useSelector } from "react-redux";

export const useProps = (props) => {

  const batchDetail = props?.route?.params?.batchDetail;

  const {
    settlement: { staffSales = [], giftCardSales = [] }
  } = useSelector(state => state);

  return {
    staffSales,
    giftCardSales,
    batchDetail,


    viewGiftCardSold: () => {
      if (giftCardSales?.length > 0) {
        NavigationService.navigate(screenNames.GiftCardSoldPage, { listGiftCardSales: giftCardSales });
      }
    }
  };
};
