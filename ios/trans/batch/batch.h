//
//  batch.h
//  Hpmerchant
//
//  Created by Nguyễn Hoàng Nhật Phi on 19/01/2021.
//  Copyright © 2021 Facebook. All rights reserved.
//

#ifndef batch_h
#define batch_h

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface batch : NSObject <RCTBridgeModule>

@property(nonatomic, strong)NSString *tempIdAddrBluetooth;

@end

#endif /* batch_h */
