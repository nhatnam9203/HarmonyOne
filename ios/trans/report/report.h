//
//  report.h
//  Hpmerchant
//
//  Created by Nguyễn Hoàng Nhật Phi on 19/01/2021.
//  Copyright © 2021 Facebook. All rights reserved.
//

#ifndef report_h
#define report_h

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface report : NSObject <RCTBridgeModule>

@property(nonatomic, strong)NSString *tempIdAddrBluetooth;

@end

#endif /* report_h */
