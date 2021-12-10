//
//  GoogleSmartTapData.h
//  POSLink
//
//  Created by jim.J on 2020/3/30.
//  Copyright © 2020 pax. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "GoogleNewService.h"
#import "GoogleServiceUsage.h"
#import "GoogleServiceUpdate.h"
NS_ASSUME_NONNULL_BEGIN

@interface GoogleSmartTapPushService : NSObject
@property(nonatomic,copy)NSString *Security;
@property(nonatomic,copy)NSString *GoogleSmartTapCAP;
@property(nonatomic,copy)NSString *CollectID;
@property(nonatomic,copy)NSArray<GoogleServiceUsage*>*ServiceUsage;
@property(nonatomic,copy)NSArray<GoogleServiceUpdate*> *ServiceUpdate;
@property(nonatomic,copy)NSArray<GoogleNewService*>*NewService;
@property(nonatomic,copy)NSString *EndTap;
@end

NS_ASSUME_NONNULL_END
