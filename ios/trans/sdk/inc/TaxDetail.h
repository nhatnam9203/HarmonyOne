//
//  TaxDetail.h
//  POSLink
//
//  Created by jim.J on 2019/7/15.
//  Copyright © 2019 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface TaxDetail : NSObject

/**
 The type of the tax.
 00 - Unknown
 01 - Federal/National Sales Tax (total and sub)
 02 - State Sales Tax
 03 - City Sales Tax
 04 - Local Sales Tax (total and sub)
 05 - Municipal Sales Tax
 06 - Duty Tax
 07 - Value Added Tax (VAT) / Alternate Tax
 08 - Goods and Services Tax (GST)
 09 - Provincial Sales Tax (PST)
 10 - Room Tax
 11 - Occupancy Tax
 12 - Energy Tax
 */
@property (nonatomic,copy) NSString* TaxType;

/**
 Tax Amount. The portion of the amount that represents the tax of field 1. Includes 3 implied decimals.
 */
@property (nonatomic,copy) NSString* TaxAmount;

/**
 The rate of tax of field 1. Includes 3 implied decimals.
 */
@property (nonatomic,copy) NSString* TaxRate;

/**
 When Tax Type is 00 Unknown or
 01- Federal/National Sales Tax
 , this field is merchant’s federal tax ID.
 When Tax Type is 07 - Value Added Tax (VAT), this field is merchant’s VAT registration number.
 */
@property (nonatomic,copy) NSString* MerchantTaxID;

/**
 When Tax Type is 00 Unknown or
 01 - Federal/National Sales Tax
 , this field is customer’s federal tax ID.
 When Tax Type is 07 - Value Added Tax (VAT), this field is customer’s VAT registration number.
 */
@property (nonatomic,copy) NSString* CustomerTaxID;

/**
 Valid when Tax Type = 07 - Value Added Tax (VAT).
 */
@property (nonatomic,copy) NSString* VATInvoiceNumber;

/**
 The alternate tax identifier description for the line item.
 */
@property (nonatomic,copy) NSString* AlternateTaxID;
@end

NS_ASSUME_NONNULL_END
