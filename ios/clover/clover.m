//
//  clover.m
//  Hpmerchant
//
//  Created by Duyen Hang on 13/08/2021.
//  Copyright © 2021 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "clover.h"
//#import "HarmonyOne-Swift.h"
#import "Staging-Swift.h"

static NSString* paymentSuccess               = @"paymentSuccess";
static NSString* paymentFail               = @"paymentFail";
static NSString* pairingCode               = @"pairingCode";
static NSString* pairingSuccess               = @"pairingSuccess";
//static NSString* deviceReady              = @"deviceReady";
static NSString* confirmPayment              = @"confirmPayment";
static NSString* printInProcess         = @"printInProcess";
//static NSString* printDone              = @"printDone";
static NSString* deviceDisconnected     = @"deviceDisconnected";
static NSString* voidPaymentSuccess     = @"voidPaymentSuccess";
static NSString* voidPaymentFail     = @"voidPaymentFail";
static NSString* refundPaymentSuccess     = @"refundPaymentSuccess";
static NSString* refundPaymentFail     = @"refundPaymentFail";
static NSString* closeoutSuccess       = @"closeoutSuccess";
static NSString* closeoutFail       = @"closeoutFail";

@interface clover () <CloverManagerDelegate>
@property (nonatomic) BOOL listening;
@property (nonatomic) BOOL isPaymentProcessing;
@property (nonatomic) BOOL isVoidProcessing;
@property (nonatomic) BOOL isRefundProcessing;
@property (nonatomic) BOOL isPrintWithConnectProcessing;
@property (nonatomic) BOOL isOpenCashierProcessing;
@property (nonatomic) BOOL isCloseoutProcessing;
@property (nonatomic, strong) CloverManager *cloverManager;
@property (nonatomic, strong) NSDictionary *paymentInfo;
@property (nonatomic, strong) NSDictionary *voidInfo;
@property (nonatomic, strong) NSDictionary *refundInfo;
@property (nonatomic, strong) NSString *imageUri;
@end

@implementation clover

//- (instancetype)init
//{
//  self = [super init];
//  if (self) {
//  }
//  return self;
//}

+ (id)allocWithZone:(NSZone *)zone {
    static clover *sharedInstance = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        sharedInstance = [super allocWithZone:zone];
    });
    return sharedInstance;
}

- (NSString*) convertObjectToJson:(NSObject*) object
{
  NSError *writeError = nil;
  
  NSData *jsonData = [NSJSONSerialization dataWithJSONObject:object options:NSJSONWritingPrettyPrinted error:&writeError];
  NSString *result = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
  
  return result;
}

RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
  return @[
    paymentSuccess,
    paymentFail,
    pairingCode,
    pairingSuccess,
//    deviceReady,
    confirmPayment,
    printInProcess,
//    printDone,
    deviceDisconnected,
    voidPaymentSuccess,
    voidPaymentFail,
    refundPaymentSuccess,
    refundPaymentFail,
    closeoutSuccess,
    closeoutFail
  ];
}

RCT_EXPORT_METHOD(changeListenerStatus:(BOOL)value) {
    self.listening = value;
}

- (void) connectClover:(NSDictionary *)info {
  self.cloverManager = [CloverManager alloc];
  self.cloverManager.cloverDelegate = self;
  NSString *url = info[@"url"];
  NSString *remoteAppId = info[@"remoteAppId"];
  NSString *appName = info[@"appName"];
  NSString *posSerial = info[@"posSerial"];
  NSString *token = info[@"token"];
  
  [self.cloverManager connect:url appId: remoteAppId appName: appName posSerial: posSerial token: token];
}

RCT_EXPORT_METHOD(sendTransaction:(NSDictionary *)paymentInfo)
{
  NSString *url = paymentInfo[@"url"];
  if(self.cloverManager && [self.cloverManager.urlSetting isEqual:url]) {
    [self.cloverManager doSaleWithPaymentInfo:paymentInfo];
  }else{
    self.isPaymentProcessing = true;
    self.paymentInfo = paymentInfo;
    [self connectClover:paymentInfo];
  }
}

RCT_EXPORT_METHOD(confirmPayment){
  [self.cloverManager confirmPayment];
}

RCT_EXPORT_METHOD(rejectPayment){
  self.isPaymentProcessing = false;
  [self.cloverManager rejectPayment];
}

RCT_EXPORT_METHOD(cancelTransaction){
  self.isPaymentProcessing = false;
  [self.cloverManager cancelTransaction];
}

RCT_EXPORT_METHOD(doPrint:(NSString *)image){
  [self.cloverManager doPrintWithImage:image];
  
}

- (UIImage*) getImageFromPath:(NSString*)imageURI {
  NSError *error = nil;
  NSURL *imageURL = [NSURL URLWithString:imageURI];
  NSData *imageData = [NSData dataWithContentsOfURL:imageURL options:NSDataReadingUncached error:&error];

  if (error != nil) {
      NSURL *fileImageURL = [NSURL fileURLWithPath:imageURI];
      [fileImageURL startAccessingSecurityScopedResource];
      imageData = [NSData dataWithContentsOfURL:fileImageURL];
    [fileImageURL stopAccessingSecurityScopedResource];
  }

  UIImage *image = [UIImage imageWithData:imageData];
  return image;
}

RCT_EXPORT_METHOD(closeout:(NSDictionary *)info){
  
  NSString *url = info[@"url"];
  if(self.cloverManager && [self.cloverManager.urlSetting isEqual:url]) {
    [self.cloverManager closeout];
  }else{
    self.isCloseoutProcessing = true;
    [self connectClover:info];
  }
}


RCT_EXPORT_METHOD(doPrintWithConnect:(NSDictionary *)printInfo){
  
  NSString *imageURI = printInfo[@"imageUri"];
  NSString *url = printInfo[@"url"];
  if(self.cloverManager && [self.cloverManager.urlSetting isEqual:url]) {
    [self.cloverManager doPrintWithImage: imageURI];
  }else{
    self.isPrintWithConnectProcessing = true;
    self.imageUri = imageURI;
    [self connectClover:printInfo];
  }
}

RCT_EXPORT_METHOD(voidPayment:(NSDictionary*) voidInfo) {
  NSString *url = voidInfo[@"url"];
  if(self.cloverManager && [self.cloverManager.urlSetting isEqual:url]) {
    [self.cloverManager voidPaymentWithPaymentInfo: voidInfo];
  }else{
    self.isVoidProcessing = true;
    self.voidInfo = voidInfo;
    [self connectClover:voidInfo];
  }
}

RCT_EXPORT_METHOD(openCashDrawer:(NSDictionary*) info) {
  NSString *url = info[@"url"];
  if(self.cloverManager && [self.cloverManager.urlSetting isEqual:url]) {
    [self.cloverManager openCashDrawer];
  }else{
    self.isOpenCashierProcessing = true;
    [self connectClover:info];
  }
}

RCT_EXPORT_METHOD(refundPayment:(NSDictionary*) refundInfo) {
  NSString *url = refundInfo[@"url"];
  if(self.cloverManager && [self.cloverManager.urlSetting isEqual:url]) {
    [self.cloverManager refundPaymentWithPaymentInfo: refundInfo];
  }else{
    self.isRefundProcessing = true;
    self.refundInfo = refundInfo;
    [self connectClover: refundInfo];
  }
  
}

/*---------Functions-----------*/


/*----- DELEGATE FROM CloverManager ------*/

- (void)paymentFailWithErrorMessage:(NSString * _Nonnull)errorMessage {
  
  [self sendEventWithName:paymentFail body:@{@"errorMessage": errorMessage}];
}

- (void)paymentSuccessWithResponse:(NSDictionary * _Nonnull)response {
  
   if (self.listening) {
        [self sendEventWithName:paymentSuccess body:response];
    }
}

- (void)voidFailWithErrorMessage:(NSString * _Nonnull)errorMessage {
  
  [self sendEventWithName:voidPaymentFail body:@{@"errorMessage": errorMessage}];
}

- (void)voidSuccessWithResponse:(NSDictionary * _Nonnull)response {
  
   if (self.listening) {
        [self sendEventWithName:voidPaymentSuccess body:response];
    }
}

- (void)refundFailWithErrorMessage:(NSString * _Nonnull)errorMessage {
  
  [self sendEventWithName:refundPaymentFail body:@{@"errorMessage": errorMessage}];
}

- (void)refundSuccessWithResponse:(NSDictionary * _Nonnull)response {
  
   if (self.listening) {
        [self sendEventWithName:refundPaymentSuccess body:response];
    }
}

- (void)closeoutSuccessWithResponse:(NSDictionary * _Nonnull)response {
  
  if (self.listening) {
       [self sendEventWithName:closeoutSuccess body:response];
   }
}

- (void)closeoutFailWithErrorMessage:(NSString * _Nonnull)errorMessage {
  
  [self sendEventWithName:closeoutFail body:@{@"errorMessage": errorMessage}];
}

- (void)pairingCodeWithString:(NSString * _Nonnull)string {
  if (self.listening) {
    [self sendEventWithName:pairingCode body:@{@"pairingCode": string}];
  }
}

- (void)pairingSuccessWithToken:(NSString * _Nonnull)token {
  if (self.listening) {
    [self sendEventWithName:pairingSuccess body:@{@"token": token}];
  }
  
}

- (void)onDeviceReady {
//  if (self.listening) {
//    [self sendEventWithName:deviceReady body:nil];
//  }
  if (self.isPaymentProcessing) {
    
    self.isPaymentProcessing = false;
    [self.cloverManager doSaleWithPaymentInfo: self.paymentInfo];
    
  } else if(self.isPrintWithConnectProcessing){
    
    self.isPrintWithConnectProcessing = false;
    [self.cloverManager doPrintWithImage: self.imageUri];
    
  } else if (self.isVoidProcessing) {
    
    self.isVoidProcessing = false;
    [self.cloverManager voidPaymentWithPaymentInfo:self.voidInfo];
    
  } else if(self.isRefundProcessing) {
    
    self.isRefundProcessing = false;
    [self.cloverManager refundPaymentWithPaymentInfo:self.refundInfo];
    
  } else if(self.isOpenCashierProcessing) {
    
    self.isOpenCashierProcessing = false;
    [self.cloverManager openCashDrawer];
    
  } else if (self.isCloseoutProcessing) {
    
    self.isCloseoutProcessing = false;
    [self.cloverManager closeout];
    
  }
 
}

- (void)deviceDisconnected {
  if (self.listening) {
    [self sendEventWithName:deviceDisconnected body:@{}];
  }
  if (self.isPaymentProcessing
      || self.isPrintWithConnectProcessing
      || self.isVoidProcessing
      || self.isRefundProcessing
      || self.isOpenCashierProcessing
      || self.isCloseoutProcessing){
    
    self.isPaymentProcessing = false;
    self.isVoidProcessing = false;
    self.isRefundProcessing = false;
    self.isPrintWithConnectProcessing = false;
    self.isOpenCashierProcessing = false;
    self.isCloseoutProcessing = false;
    
    [self cancelTransaction];
  }
 
}

- (void)onConfirmPayment {
    if (self.listening) {
      [self sendEventWithName:confirmPayment body:@{}];
    }
}

- (void)printInProcess {
  if (self.listening) {
    [self sendEventWithName:printInProcess body:@{}];
  }
}



//- (void)printDoneWithMessage:(NSString * _Nonnull)message {
//  self.isPrintWithConnectProcessing = false;
//  if (self.listening) {
//    [self sendEventWithName:printDone body:message];
//  }
//}

@end



