//
//  MOTOECommerce.h
//  POSLinkDemo
//
//  Created by Billie Ji on 2021/3/1.
//  Copyright © 2021 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface MOTOECommerce : NSObject
/**
 * Current installment number.
 */
@property (nonatomic, copy) NSString *CurrentInstallment;
/**
 * Total installments number.
 */
@property (nonatomic, copy) NSString *Installments;
/**
 * The value of MOTO/e-Commerce mode:
 */
@property (nonatomic, copy) NSString *MOTOECommerceMode;
/**
 * Order number for MOTO/e-Commerce.
 */
@property (nonatomic, copy) NSString *OrderNumber;
/**
 * e-Commerce secure type.
 */
@property (nonatomic, copy) NSString *SecureType;
/**
 * MOTO/e-Commerce transaction type.
 */
@property (nonatomic, copy) NSString *TransactionType;
@end

NS_ASSUME_NONNULL_END
