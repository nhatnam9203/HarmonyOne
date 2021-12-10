//
//  TORResponseInfo.h
//  POSLink
//
//  Created by jim.J on 2020/4/1.
//  Copyright © 2020 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface TORResponseInfo : NSObject

/**
 0 – Reversal record
 1 – EMV 2nd GAC Reversal
 */
@property (nonatomic,copy) NSString* RecordType;

/**
 Reversal Transaction timestamp “YYMMDDHHMMSS”
 */
@property (nonatomic,copy) NSString* ReversalTimeStamp;

/**
 Host/gateway response code
 */
@property (nonatomic,copy) NSString* HostResponseCode;

/**
 Host/gateway response Message
 */
@property (nonatomic,copy) NSString* HostResponseMessage;

/**
 The transaction reference number is returned from a host. The host can be a processor(terminalgateway processor) or another gateway(terminalgateway another gateway…processor).
 */
@property (nonatomic,copy) NSString* HostReferenceNumber;

/**
 The transaction reference number is returned from a gateway directly.
 */
@property (nonatomic,copy) NSString* GatewayTransactionID;

/**
 Original total amount
 */
@property (nonatomic,copy) NSString* OrigAmount;

/**
 First 6 and last 4
 Example: 5454545****5454
 */
@property (nonatomic,copy) NSString* MaskedPAN;

/**
 Batch number
 */
@property (nonatomic,copy) NSString* BatchNo;

/**
 Reversal authorization code
 */
@property (nonatomic,copy) NSString* ReversalAuthCode;

/**
 Original Transaction Type, i.e. Sale, Auth etc…
 */
@property (nonatomic,copy) NSString* OrigTransType;

/**
 Original transaction date and time
 “YYMMDDHHMMSS”
 */
@property (nonatomic,copy) NSString* OrigTransDateTime;

/**
 Original transaction auth code
 */
@property (nonatomic,copy) NSString* OrigTransAuthCode;
@end

NS_ASSUME_NONNULL_END
