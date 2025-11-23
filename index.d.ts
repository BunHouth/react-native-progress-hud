declare module 'progress-hud' {
  export type MaskType = 1 | 2 | 3;

  export interface ProgressHUDMaskTypeEnum {
    None: 1;
    Clear: 2;
    Black: 3;
  }

  export interface ProgressHUD {
    ProgressHUDMaskType: ProgressHUDMaskTypeEnum;
    show: (maskType?: MaskType) => void;
    dismiss: () => void;
    dismissWithDelay: (delayInSeconds: number) => void;
    showWithStatus: (status: string, maskType?: MaskType) => void;
    showInfoWithStatus: (status: string, maskType?: MaskType) => void;
    showSuccessWithStatus: (status: string, maskType?: MaskType) => void;
    showErrorWithStatus: (status: string, maskType?: MaskType) => void;
    showProgressWithStatus: (progress: number, status: string, maskType?: MaskType) => void;
  }

  const progressHUD: ProgressHUD;
  export default progressHUD;
  export const ProgressHUDMaskType: ProgressHUDMaskTypeEnum;
}
