//
//  AVSInformation.h
//  POSLinkDemo
//
//  Created by Billie Ji on 2021/3/1.
//  Copyright © 2021 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface AVSInformation : NSObject
/**
 * Card holder address 1
 */
@property (nonatomic, copy) NSString *Address;
/**
 * Card holder address 2
 */
@property (nonatomic, copy) NSString *Address2;
/**
 * Please see the host specification for the details;if host returned the value, this is mandatory.
 */
@property (nonatomic, copy) NSString *AVSApprovalCode;
/**
 * The AVS response message, if host returned AVS message, this field is mandatory.
 */
@property (nonatomic, copy) NSString *AVSMessage;
/**
 * Card holder zip code.
 */
@property (nonatomic, copy) NSString *ZipCode;
@end

NS_ASSUME_NONNULL_END
