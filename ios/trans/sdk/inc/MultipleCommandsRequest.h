//
//  MultipleCommandsRequest.h
//  POSLink
//
//  Created by jim.J on 2020/6/10.
//  Copyright © 2020 pax. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "PaymentRequest.h"
#import "ManageRequest.h"
#import "BatchRequest.h"
#import "ReportRequest.h"
NS_ASSUME_NONNULL_BEGIN

@interface MultipleCommandsRequest : NSObject
@property(nonatomic,strong)NSMutableArray *multipleCommandsRequestList;
@property(nonatomic,strong)NSMutableArray   *multipleCommandsStringList;

- (BOOL)addPaymentRequest:(PaymentRequest *)request;
- (BOOL)addManageRequest:(ManageRequest *)request;
- (BOOL)addBatchRequest:(BatchRequest *)request;
- (BOOL)addReportRequest:(ReportRequest *)request;

@end

NS_ASSUME_NONNULL_END
