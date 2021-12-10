//
//  CommercialInformation.h
//  POSLink
//
//  Created by jim.J on 2019/7/15.
//  Copyright © 2019 pax. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "TaxDetail.h"
#import "LineItemDetail.h"
NS_ASSUME_NONNULL_BEGIN

@interface CommercialInformation : NSObject

/**
 The purchase order number, the value used by the customer to identify an order. Issued by the buyer to the seller.
 */
@property (nonatomic,copy) NSString* PONumber;

/**
 The reference identifier supplied by the Commercial Card cardholder.
 */
@property (nonatomic,copy) NSString* CustomerCode;

/**
 The indicator of tax exempt.
 value: 0: not exempt, 1:exempt
 */
@property (nonatomic,copy) NSString* TaxExempt;

/**
 The tax exempt id.
 */
@property (nonatomic,copy) NSString* TaxExemptID;

/**
 The merchant tax id.
 */
@property (nonatomic,copy) NSString* MerchantTaxID;

/**
 The destination zip code.
 */
@property (nonatomic,copy) NSString* DestinationZipCode;

/**
 The description of the purchase. The value of the Transaction Advice Addendum field, displays descriptive information about a transaction on a customer's AMEX card statement.
 */
@property (nonatomic,copy) NSString* ProductDescription;

/**
 The ship from zip code. Valid for Visa and MasterCard
 */
@property (nonatomic,copy) NSString* ShipFromZipCode;

/**
 Destination country code of the goods being shipped. U.S. should utilize 840
 */
@property (nonatomic,copy) NSString* DestinationCountryCode;

/**
 See Tax Detail
 */
@property (nonatomic,copy) NSArray<TaxDetail *>*TaxDetail;

/**
 An international description code of the overall goods or services being supplied. The acquirer bank or processor should provide the merchant an updated listing of currently defined codes. Valid for Visa.
 */
@property (nonatomic,copy) NSString* SummaryCommodityCode;

/**
 Amount of any discount applied by the merchant, valid for Visa.
 */
@property (nonatomic,copy) NSString* DiscountAmount;

/**
 Freight or shipping portion of the total transaction amount. , valid for Visa and MasterCard
 */
@property (nonatomic,copy) NSString* FreightAmount;

/**
 Fee amount associated with the import of the purchased goods. , valid for Visa and MasterCard.
 */
@property (nonatomic,copy) NSString* DutyAmount;

/**
 Purchase order date and must be supplied in YYMMDD format, valid for Visa.
 */
@property (nonatomic,copy) NSString* OrderDate;

/**
 See  Line Item Detail
 */
@property (nonatomic,copy) NSArray<LineItemDetail *>* LineItemDetail;

/**
 The shipping company name or ID.
 */
@property (nonatomic,copy) NSString* ShippingCompany;


/**
 The shipment’s tracking number.
 */
@property (nonatomic,copy) NSString* ShippingTrackingNumber;

/**
 Additional fees.
 */
@property (nonatomic,copy) NSString* AdditionalFees;
@end

NS_ASSUME_NONNULL_END
