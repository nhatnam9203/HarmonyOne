//
//  processTransResult.h
//  POSLink
//
//  Created by sunny on 15-7-23.
//  Copyright (c) 2015年 pax. All rights reserved.
//

#import <Foundation/Foundation.h>

@class PaymentResponse;
@class ManageResponse;
@class ReportResponse;
@class BatchResponse;



typedef NS_ENUM(NSUInteger, resultCode){
    OK,
    TIMEOUT,
    ERROR
};

@interface ProcessTransResult : NSObject

@property resultCode code;
@property NSString *msg;



-(void)clear;

@end
