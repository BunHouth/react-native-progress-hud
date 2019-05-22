import {NativeModules} from "react-native";

const ProgressHUDMaskType = {
  None: 1,
  Clear: 2,
  Black: 3
};

const {RNProgressHub} = NativeModules;
module.exports = {
  ProgressHUDMaskType,
  show(progressHUDMaskType) {
    if (!progressHUDMaskType) {
      return RNProgressHub.show();
    }
    return RNProgressHub.showWithMaskType(progressHUDMaskType);
  },
  showWithStatus(status, progressHUDMaskType) {
    if (!progressHUDMaskType) {
      return RNProgressHub.showWithStatus(status);
    }
    return RNProgressHub.showWithStatusAndMaskType(status, progressHUDMaskType);
  },
  showInfoWithStatus(status, progressHUDMaskType) {
    if (!progressHUDMaskType) {
      return RNProgressHub.showInfoWithStatus(status);
    }
    return RNProgressHub.showInfoWithStatusAndMaskType(
      status,
      progressHUDMaskType
    );
  },
  showSuccessWithStatus(status, progressHUDMaskType) {
    if (!progressHUDMaskType) {
      return RNProgressHub.showSuccessWithStatus(status);
    }
    return RNProgressHub.showSuccessWithStatusAndMaskType(
      status,
      progressHUDMaskType
    );
  },
  showErrorWithStatus(status, progressHUDMaskType) {
    if (!progressHUDMaskType) {
      return RNProgressHub.showErrorWithStatus(status);
    }
    return RNProgressHub.showErrorWithStatusAndMaskType(
      status,
      progressHUDMaskType
    );
  },
  showProgressWithStatus(progress, status, progressHUDMaskType) {
    if (!progressHUDMaskType) {
      return RNProgressHub.showProgressWithStatus(progress, status);
    }
    return RNProgressHub.showProgressWithStatusAndMaskType(
      progress,
      status,
      progressHUDMaskType
    );
  },
  dismiss() {
    RNProgressHub.dismiss();
  },
  dismissWithDelay(delayInSeconds) {
    RNProgressHub.dismissWithDelay(delayInSeconds);
  }
};
