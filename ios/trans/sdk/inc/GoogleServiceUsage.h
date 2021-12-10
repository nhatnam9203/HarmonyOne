//
//  GoogleServiceUsage.h
//  POSLink
//
//  Created by jim.J on 2020/3/30.
//  Copyright © 2020 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface GoogleServiceUsage : NSObject

/**
 Service usage ID
 */
@property(nonatomic,copy)NSString *UsageID;

/**
 Service state
 0:Unspecified
 1:Success
 2:Invalid format
 3: Invalid value
 */
@property(nonatomic,copy)NSString *State;

/**
 A short description of valuables. Detailed product information which is not displayed and can be accessed from the URI.
 */
@property(nonatomic,copy)NSString *Title;

/**
 Intended to be used to provide more context on how the valuable was used.
 */
@property(nonatomic,copy)NSString *Describe;

@end

NS_ASSUME_NONNULL_END

