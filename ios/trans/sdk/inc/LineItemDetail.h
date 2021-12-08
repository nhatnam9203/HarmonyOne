//
//  LineItemDetail.h
//  POSLink
//
//  Created by jim.J on 2019/7/15.
//  Copyright © 2019 pax. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "TaxDetail.h"
NS_ASSUME_NONNULL_BEGIN

@interface LineItemDetail : NSObject
/**
 Line item sequence number. The value must be incremented sequentially. Mandatory when any of below fields present.
 */
@property (nonatomic,copy) NSString* ItemSequenceNumber;
/**
 Line item product code. e.g. the Universal Product Code (UPC)
 */
@property (nonatomic,copy) NSString* ProductCode;
/**
 Line item commodity code. The international description code used to classify the item purchased.  Required for Visa level 3 transactions and optional for MasterCard level 3 transactions.
 */
@property (nonatomic,copy) NSString* ItemCommodityCode;
/**
 Specific description of the item purchased and related to the commodity code. This field should be included
 to receive the best possible interchange rate.
 */
@property (nonatomic,copy) NSString* ItemDescription;
/**
 This field represents the number of units of the item purchased. Mandatory for Visa and MasterCard purchase card level 3 transactions. The last four digits are implied decimal places.
 */
@property (nonatomic,copy) NSString* ItemQuantity;
/**
 The unit of measure code, refer to unit of measure sheet.
 */
@property (nonatomic,copy) NSString* ItemMeasurementUnit;
/**
 The unit price of the item purchased.  This field is required for Visa level 3 transactions and optional for MasterCard level 3 transactions. Includes 3 implied decimals.
 */
@property (nonatomic,copy) NSString* ItemUnitPrice;
/**
 Discount amount applied to the item purchased.
 Includes 2 implied decimals.
 */
@property (nonatomic,copy) NSString* ItemDiscountAmount;
/**
 The rate at which the item is
 discounted. Includes 3 implied decimals.
 */
@property (nonatomic,copy) NSString* ItemDiscountRate;
/**
 See Tax Detail
 */
@property (nonatomic,copy) NSArray<TaxDetail*>* TaxDetail;

/**
 Unit cost multiplied by the quantity and less the discount per line item. [Unit Price * Quantity]-Discount Per Line Item = Line Item Total.
 Includes 2 implied decimal. 
 */
@property (nonatomic,copy) NSString* LineItemTotal;
@end

NS_ASSUME_NONNULL_END
