import {NativeModules} from "react-native";

const ProgressHUDMaskType = {
  None: 1,
  Clear: 2,
  Black: 3
};

const {RNProgressHUD} = NativeModules;
module.exports = {
  ProgressHUDMaskType,
  show(progressHUDMaskType) {
    if (!progressHUDMaskType) {
      return RNProgressHUD.show();
    }
    return RNProgressHUD.showWithMaskType(progressHUDMaskType);
  },
  showWithStatus(status, progressHUDMaskType) {
    if (!progressHUDMaskType) {
      return RNProgressHUD.showWithStatus(status);
    }
    return RNProgressHUD.showWithStatusAndMaskType(status, progressHUDMaskType);
  },
  showInfoWithStatus(status, progressHUDMaskType) {
    if (!progressHUDMaskType) {
      return RNProgressHUD.showInfoWithStatus(status);
    }
    return RNProgressHUD.showInfoWithStatusAndMaskType(
      status,
      progressHUDMaskType
    );
  },
  showSuccessWithStatus(status, progressHUDMaskType) {
    if (!progressHUDMaskType) {
      return RNProgressHUD.showSuccessWithStatus(status);
    }
    return RNProgressHUD.showSuccessWithStatusAndMaskType(
      status,
      progressHUDMaskType
    );
  },
  showErrorWithStatus(status, progressHUDMaskType) {
    if (!progressHUDMaskType) {
      return RNProgressHUD.showErrorWithStatus(status);
    }
    return RNProgressHUD.showErrorWithStatusAndMaskType(
      status,
      progressHUDMaskType
    );
  },
  showProgressWithStatus(progress, status, progressHUDMaskType) {
    if (!progressHUDMaskType) {
      return RNProgressHUD.showProgressWithStatus(progress, status);
    }
    return RNProgressHUD.showProgressWithStatusAndMaskType(
      progress,
      status,
      progressHUDMaskType
    );
  },
  dismiss() {
    RNProgressHUD.dismiss();
  },
  dismissWithDelay(delayInSeconds) {
    RNProgressHUD.dismissWithDelay(delayInSeconds);
  }
};
