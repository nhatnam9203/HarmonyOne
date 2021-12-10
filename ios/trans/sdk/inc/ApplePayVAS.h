//
//  ApplePayVAS.h
//  POSLink
//
//  Created by jim.J on 2020/4/3.
//  Copyright © 2020 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface ApplePayVAS : NSObject

/**
 Max 3 merchant ID connect by ‘#’,
 Each merchant ID (0, 36]
 */
@property(nonatomic,copy)NSString *MerchantID;

/**
 0 --- Full VAS Mode
 1 --- URL mode
 */
@property(nonatomic,copy)NSString *URLMode;

/**
 Merchant URL,
 Eg. www.apple.com
 */
@property(nonatomic,copy)NSString *URL;
@end

NS_ASSUME_NONNULL_END
