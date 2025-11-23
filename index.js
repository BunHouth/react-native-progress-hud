import { NativeModules } from 'react-native';

const { RNProgressHud } = NativeModules;

export const ProgressHUDMaskType = {
  None: 1,
  Clear: 2,
  Black: 3,
};

const progressHUD = {
  ProgressHUDMaskType,

  show(maskType) {
    if (maskType == null) {
      return RNProgressHud.show();
    }
    return RNProgressHud.showWithMaskType(maskType);
  },

  showWithStatus(status, maskType) {
    if (maskType == null) {
      return RNProgressHud.showWithStatus(status);
    }
    return RNProgressHud.showWithStatusAndMaskType(status, maskType);
  },

  showInfoWithStatus(status, maskType) {
    if (maskType == null) {
      return RNProgressHud.showInfoWithStatus(status);
    }
    return RNProgressHud.showInfoWithStatusAndMaskType(status, maskType);
  },

  showSuccessWithStatus(status, maskType) {
    if (maskType == null) {
      return RNProgressHud.showSuccessWithStatus(status);
    }
    return RNProgressHud.showSuccessWithStatusAndMaskType(status, maskType);
  },

  showErrorWithStatus(status, maskType) {
    if (maskType == null) {
      return RNProgressHud.showErrorWithStatus(status);
    }
    return RNProgressHud.showErrorWithStatusAndMaskType(status, maskType);
  },

  showProgressWithStatus(progress, status, maskType) {
    if (maskType == null) {
      return RNProgressHud.showProgressWithStatus(progress, status);
    }
    return RNProgressHud.showProgressWithStatusAndMaskType(progress, status, maskType);
  },

  dismiss() {
    RNProgressHud.dismiss();
  },

  dismissWithDelay(delayInSeconds) {
    RNProgressHud.dismissWithDelay(delayInSeconds);
  },
};

export default progressHUD;
