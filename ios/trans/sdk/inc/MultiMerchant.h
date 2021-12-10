//
//  MultiMerchant.h
//  POSLink
//
//  Created by Billie Ji on 2021/2/22.
//  Copyright © 2021 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface MultiMerchant : NSObject
/**
 * Used to indicate the specific merchant id, valid between [0, 24].
 */
@property (nonatomic, copy) NSString *Id;
/**
 * Used indicate the specific merchant name.
 */
@property (nonatomic, copy) NSString *Name;
@end

NS_ASSUME_NONNULL_END
