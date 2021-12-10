//
//  MasterSessionKeyInfo.h
//  POSLinkDemo
//
//  Created by paxhz on 2021/3/16.
//  Copyright © 2021 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface MasterSessionKeyInfo : NSObject
/// Key slot with key injected PED.
@property (nonatomic,copy)NSString *KeySlot;
/// KCV(Key Check Value) in terminal PED, corresponding to values returned in Key Slot.
@property (nonatomic,copy)NSString *KCV;
@end

NS_ASSUME_NONNULL_END
