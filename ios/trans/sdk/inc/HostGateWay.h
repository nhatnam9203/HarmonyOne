//
//  HostGateWay.h
//  POSLinkDemo
//
//  Created by Billie Ji on 2021/2/24.
//  Copyright © 2021 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface HostGateWay : NSObject
/**
 * The card type, refer to the Card Type Definition Required for Multi Token Pay trans for some hosts.
 */
@property (nonatomic, copy) NSString *CardType;
/**
 * The customized data can be used to generate customized billing or reports etc … for the merchant.
 */
@property (nonatomic, copy) NSString *CustomizeData1;
/**
 * The customized data can be used to generate customized billing or reports etc … for the merchant.
 */
@property (nonatomic, copy) NSString *CustomizeData2;
/**
 * The customized data can be used to generate customized billing or reports etc … for the merchant.
 */
@property (nonatomic, copy) NSString *CustomizeData3;
/**
 * This is only applicable when a transaction is a eWIC type.
 */
@property (nonatomic, copy) NSString *EwicDiscountAmount;
/**
 * Gateway ID.
 */
@property (nonatomic, copy) NSString *GatewayId;
/**
 * An unique ID for each transaction.
 */
@property (nonatomic, copy) NSString *GlobalUid;
/**
 * Host reference number (Transaction UID).
 */
@property (nonatomic, copy) NSString *HRef;
/**
 * Passthru data.
 */
@property (nonatomic, copy) NSString *PassThruData;
/**
 * Reason For RETURN.
 */
@property (nonatomic, copy) NSString *ReturnReason;
/**
 * Station number/LaneID, StationID, RegisterID
 */
@property (nonatomic, copy) NSString *StationId;
/**
 * Token value.
 */
@property (nonatomic, copy) NSString *Token;
/**
 * Send token request indicator to host to request token
 */
@property (nonatomic, copy) NSString *TokenRequestFlag;
/**
 * It is used to specify the serial number for the account where the card token is stored.
 */
@property (nonatomic, copy) NSString *TokenSerialNum;
@end

NS_ASSUME_NONNULL_END
