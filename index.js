import {NativeModules} from "react-native";

const ProgressHUDMaskType = {
  None: 1,
  Clear: 2,
  Black: 3
};

const {RNProgressHud} = NativeModules;
module.exports = {
  ProgressHUDMaskType,
  show(progressHUDMaskType) {
    if (!progressHUDMaskType) {
      return RNProgressHud.show();
    }
    return RNProgressHud.showWithMaskType(progressHUDMaskType);
  },
  showWithStatus(status, progressHUDMaskType) {
    if (!progressHUDMaskType) {
      return RNProgressHud.showWithStatus(status);
    }
    return RNProgressHud.showWithStatusAndMaskType(status, progressHUDMaskType);
  },
  showInfoWithStatus(status, progressHUDMaskType) {
    if (!progressHUDMaskType) {
      return RNProgressHud.showInfoWithStatus(status);
    }
    return RNProgressHud.showInfoWithStatusAndMaskType(
      status,
      progressHUDMaskType
    );
  },
  showSuccessWithStatus(status, progressHUDMaskType) {
    if (!progressHUDMaskType) {
      return RNProgressHud.showSuccessWithStatus(status);
    }
    return RNProgressHud.showSuccessWithStatusAndMaskType(
      status,
      progressHUDMaskType
    );
  },
  showErrorWithStatus(status, progressHUDMaskType) {
    if (!progressHUDMaskType) {
      return RNProgressHud.showErrorWithStatus(status);
    }
    return RNProgressHud.showErrorWithStatusAndMaskType(
      status,
      progressHUDMaskType
    );
  },
  showProgressWithStatus(progress, status, progressHUDMaskType) {
    if (!progressHUDMaskType) {
      return RNProgressHud.showProgressWithStatus(progress, status);
    }
    return RNProgressHud.showProgressWithStatusAndMaskType(
      progress,
      status,
      progressHUDMaskType
    );
  },
  dismiss() {
    RNProgressHud.dismiss();
  },
  dismissWithDelay(delayInSeconds) {
    RNProgressHud.dismissWithDelay(delayInSeconds);
  }
};
