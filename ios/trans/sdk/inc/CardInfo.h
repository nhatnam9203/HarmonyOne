//
//  CardInfo.h
//  POSLinkDemo
//
//  Created by Billie Ji on 2021/2/26.
//  Copyright © 2021 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface CardInfo : NSObject
/**
 * The card BIN as the first 6 digits of account number.
 */
@property (nonatomic, copy) NSString *CardBin;
/**
 * The card BIN as the first 6 digits of new card number.
 */
@property (nonatomic, copy) NSString *NewCardBin;
/**
 * Card Program Type, specified for CREDIT trans.
 */
@property (nonatomic, copy) NSString *ProgramType;
@end

NS_ASSUME_NONNULL_END
