import {NativeModules} from "react-native";

type ProgressType = {
  None: 1
  Clear: 2
  Black: 3
}
type ProgressHUD = {
  ProgressHUDMaskType: ProgressType
  show: (type?: ProgressType) => void
  dismiss: () => void
  dismissWithDelay: (delay: number) => void
  showWithStatus: (status: string, type: ProgressType) => void
  showInfoWithStatus: (status: string, type: ProgressType) => void
  showSuccessWithStatus: (status: string, type: ProgressType) => void
  showErrorWithStatus: (status: string, type: ProgressType) => void
  showProgressWithStatus: (progress: number, status: string, type: ProgressType) => void
}
const ProgressHUDMaskType: ProgressType = {
  None: 1,
  Clear: 2,
  Black: 3
};

const {RNProgressHud} = NativeModules;

const progressHUD: ProgressHUD = {
  ProgressHUDMaskType,
  show(progressHUDMaskType: ProgressType) {
    if (!progressHUDMaskType) {
      return RNProgressHud.show();
    }
    return RNProgressHud.showWithMaskType(progressHUDMaskType);
  },
  showWithStatus(status: string, progressHUDMaskType: ProgressType) {
    if (!progressHUDMaskType) {
      return RNProgressHud.showWithStatus(status);
    }
    return RNProgressHud.showWithStatusAndMaskType(status, progressHUDMaskType);
  },
  showInfoWithStatus(status: string, progressHUDMaskType: ProgressType) {
    if (!progressHUDMaskType) {
      return RNProgressHud.showInfoWithStatus(status);
    }
    return RNProgressHud.showInfoWithStatusAndMaskType(
      status,
      progressHUDMaskType
    );
  },
  showSuccessWithStatus(status: string, progressHUDMaskType: ProgressType) {
    if (!progressHUDMaskType) {
      return RNProgressHud.showSuccessWithStatus(status);
    }
    return RNProgressHud.showSuccessWithStatusAndMaskType(
      status,
      progressHUDMaskType
    );
  },
  showErrorWithStatus(status: string, progressHUDMaskType: ProgressType) {
    if (!progressHUDMaskType) {
      return RNProgressHud.showErrorWithStatus(status);
    }
    return RNProgressHud.showErrorWithStatusAndMaskType(
      status,
      progressHUDMaskType
    );
  },
  showProgressWithStatus(progress: number, status: string, progressHUDMaskType: ProgressType) {
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
  dismissWithDelay(delayInSeconds: number) {
    RNProgressHud.dismissWithDelay(delayInSeconds);
  }
};

export default progressHUD;
