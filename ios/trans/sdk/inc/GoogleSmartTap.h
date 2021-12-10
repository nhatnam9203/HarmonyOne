//
//  GoogleSmartTap.h
//  POSLink
//
//  Created by jim.J on 2020/4/3.
//  Copyright © 2020 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface GoogleSmartTap : NSObject

/**
 Bitmaps for the various capabilities that the ECR supports.
 Please see Google Smart Tap Capabilities Bitmap Definition
 Default value is “00000000000000000000000000000000”
 */
@property(nonatomic,copy)NSString *GoogleSmartTapCAP;

/**
 Predefined number specific to the merchant.
 */
@property(nonatomic,copy)NSString *CollectID;

/**
 Merchant address code
 */
@property(nonatomic,copy)NSString *StoreLocalID;

/**
 Merchant terminal code
 */
@property(nonatomic,copy)NSString *TerminalID;

/**
 Merchant name
 */
@property(nonatomic,copy)NSString *MerchantName;

/**
 Digit merchant code referring to the category of the merchant as defined by the networks.
 */
@property(nonatomic,copy)NSString *MerchantCategory;

/**
 Please refer to Google Service Type Bitmap Definition
 Default value is “1000000000000000”
 */
@property(nonatomic,copy)NSString *ServiceType;

/**
 0 --- Normal
 1 --- Securely
 2 --- Pre_signature
 3 --- Need not a right auth.
 */
@property(nonatomic,copy)NSString *Security;

/**
 0 --- Normal flow (default)
 1 --- Stop tap session
 */
@property(nonatomic,copy)NSString *EndTap;

/**
 0 --- Normal flow (default)
 1--- Stop VAS and do payment directly
 */
@property(nonatomic,copy)NSString *OseToPPSE;
@end

NS_ASSUME_NONNULL_END
