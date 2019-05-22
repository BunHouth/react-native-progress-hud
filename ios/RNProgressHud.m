#import "RNProgressHud.h"
#if __has_include("SVProgressHUD.h")
#import "SVProgressHUD.h"
#else
#import <SVProgressHUD/SVProgressHUD.h>
#endif

@implementation RNProgressHud

#pragma mark - RCTBridgeModule

RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(show) {
  [self showWithMaskType:@(3)];
}

RCT_EXPORT_METHOD(showWithMaskType:(NSNumber * _Nonnull)maskTypeNumber) {
  [RNProgressHud setMaskTypeForNumber:maskTypeNumber];
  [SVProgressHUD show];
}

RCT_EXPORT_METHOD(showWithStatus:(NSString * _Nullable)status) {
  [self showWithStatusAndMaskType:status :@(3)];
}

RCT_EXPORT_METHOD(showWithStatusAndMaskType:(NSString * _Nullable)status :(NSNumber * _Nonnull)maskTypeNumber) {
  [RNProgressHud setMaskTypeForNumber:maskTypeNumber];
  [SVProgressHUD showWithStatus:status];
}

RCT_EXPORT_METHOD(showInfoWithStatus:(NSString * _Nullable)status) {
  [self showInfoWithStatusAndMaskType:status :@(3)];
}

RCT_EXPORT_METHOD(showInfoWithStatusAndMaskType:(NSString * _Nullable)status :(NSNumber * _Nonnull)maskTypeNumber) {
  [RNProgressHud setMaskTypeForNumber:maskTypeNumber];
  [SVProgressHUD showInfoWithStatus:status];
}

RCT_EXPORT_METHOD(showSuccessWithStatus:(NSString * _Nullable)status) {
  [self showSuccessWithStatusAndMaskType:status :@(3)];
}

RCT_EXPORT_METHOD(showSuccessWithStatusAndMaskType:(NSString * _Nullable)status :(NSNumber * _Nonnull)maskTypeNumber) {
  [RNProgressHud setMaskTypeForNumber:maskTypeNumber];
  [SVProgressHUD showSuccessWithStatus:status];
}

RCT_EXPORT_METHOD(showErrorWithStatus:(NSString * _Nullable)status) {
  [self showErrorWithStatusAndMaskType:status :@(3)];
}

RCT_EXPORT_METHOD(showErrorWithStatusAndMaskType:(NSString * _Nullable)status :(NSNumber * _Nonnull)maskTypeNumber) {
  [RNProgressHud setMaskTypeForNumber:maskTypeNumber];
  [SVProgressHUD showErrorWithStatus:status];
}

RCT_EXPORT_METHOD(showProgressWithStatus:(CGFloat)progress :(NSString * _Nullable)status) {
  [self showProgressWithStatusAndMaskType:progress :status :@(3)];
}

RCT_EXPORT_METHOD(showProgressWithStatusAndMaskType:(CGFloat)progress :(NSString * _Nullable)status :(NSNumber * _Nonnull)maskTypeNumber) {
  [RNProgressHud setMaskTypeForNumber:maskTypeNumber];
  [SVProgressHUD showProgress:progress status:status];
  if (progress >= 1.0) {
    [SVProgressHUD dismissWithDelay:0.5f];
  }
}

RCT_EXPORT_METHOD(dismiss) {
  [SVProgressHUD dismiss];
}

RCT_EXPORT_METHOD(dismissWithDelay:(CGFloat)delay) {
  [SVProgressHUD dismissWithDelay:delay];
}

#pragma mark - Private

+ (SVProgressHUDMaskType)getMaskTypeForInteger:(NSInteger)integer {
  SVProgressHUDMaskType type = SVProgressHUDMaskTypeBlack;
  switch (integer) {
    case 1:
      type = SVProgressHUDMaskTypeNone;
      break;
    case 2:
      type = SVProgressHUDMaskTypeClear;
      break;
    case 3:
      type = SVProgressHUDMaskTypeBlack;
      break;
      break;
  }
  return type;
}

+ (void)setMaskTypeForNumber:(NSNumber * _Nonnull)number {
  if (!number) {
    [SVProgressHUD setDefaultMaskType:SVProgressHUDMaskTypeBlack];
    return;
  }
  SVProgressHUDMaskType type = [RNProgressHud getMaskTypeForInteger:[number integerValue]];
  [SVProgressHUD setDefaultMaskType:type];
}

@end
