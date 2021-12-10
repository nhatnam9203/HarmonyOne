//
//  PayloadResponse.h
//  POSLinkDemo
//
//  Created by Billie Ji on 2021/6/3.
//  Copyright © 2021 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface PayloadResponse : NSObject
/**
 * Result code of transaction.
 * <p>Used to determine results of transaction.<br>
 */
@property (nonatomic) NSString*ResultCode;
/**
 * Result Txt of transaction.
 */
@property (nonatomic) NSString*ResultTxt;
/**
 * The response packet returned by the terminal. This is returned by the terminal in base64 format.
 */
@property (nonatomic) NSString*Payload;

-(int)unpack:(NSArray*)dataRespArry;

@end

NS_ASSUME_NONNULL_END
