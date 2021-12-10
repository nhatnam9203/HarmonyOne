//
//  Original.h
//  POSLinkDemo
//
//  Created by Billie Ji on 2021/2/25.
//  Copyright © 2021 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Original : NSObject
/**
 * The Original Amount, $$$$$$$CC.
 */
@property (nonatomic, copy) NSString *Amount;
/**
 * The original batch number.
 */
@property (nonatomic, copy) NSString *BatchNumber;
/**
 * Expiry date in MMYY of account number for original transaction.
 * Conditional for matching card on terminal in subsequent transactions after SALE, i.e.
 */
@property (nonatomic, copy) NSString *ExpiryDate;
/**
 * Last 4 digits of account number for original transaction.
 * Conditional for matching card on terminal in subsequent transactions after SALE, i.e.
 */
@property (nonatomic, copy) NSString *Pan;
/**
 * Original transaction settlement date, the format is YYYYMMDD.
 */
@property (nonatomic, copy) NSString *SettlementDate;
/**
 * Original Transaction Date in YYYYMMDD format.
 * Conditional for some hosts for subsequent transactions after SALE, i.e.
 */
@property (nonatomic, copy) NSString *TransDate;

/**
 * The original host trace number.
 */
@property (nonatomic, copy) NSString *TransId;
/**
 * Original Transaction Time in HHMMSS format.
 * Conditional for some hosts for subsequent transactions after SALE, i.e.
 */
@property (nonatomic, copy) NSString *TransTime;
/**
 * Original transaction type.
 */
@property (nonatomic, copy) NSString *TransType;
/**
 * Original Payment Service 2000
 * Data returned as part of the original authorization response from the issuer, used in follow up transactions (token/card-on-file, reversals, incremental). Format varies by card scheme.
 */
@property (nonatomic, copy) NSString* PaymentService2000;
/**
 * Original authorization data used in follow up transactions.
 */
@property (nonatomic, copy) NSString* AuthorizationResponse;
/**
 * Original trace number which is returned in response host information.
 */
@property (nonatomic, copy) NSString* TraceNumber;
@end

NS_ASSUME_NONNULL_END
