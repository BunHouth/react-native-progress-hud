package com.progresshud;

import android.content.Context;
import android.os.Handler;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.widget.ImageView;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.kaopiz.kprogresshud.KProgressHUD;
import com.kaopiz.kprogresshud.KProgressHUD.Style;

enum KProgressHUDMaskType {
    None,
    Clear,
    Black
}

enum KProgressHUDStyle {
    Default,
    Progress,
    Error,
    Info,
    Success
}

public class RNProgressHudModule extends ReactContextBaseJavaModule {
    private ReactContext reactContext;
    private KProgressHUD progressHUD;
    private KProgressHUDStyle currentStyle;

    @Override
    public String getName() {
        return "RNProgressHud";
    }

    public RNProgressHudModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @ReactMethod
    public void show() {
        this.showWithMaskType(3);
    }

    @ReactMethod
    public void showWithMaskType(@NonNull Integer maskTypeInteger) {
        this.showProgressHUD(maskTypeInteger, KProgressHUDStyle.Default, null);
    }

    @ReactMethod
    public void showWithStatus(@Nullable String status) {
        this.showWithStatusAndMaskType(status, 3);
    }

    @ReactMethod
    public void showWithStatusAndMaskType(@Nullable String status, @NonNull Integer maskTypeInteger) {
        this.showProgressHUD(maskTypeInteger, KProgressHUDStyle.Default, status);
    }

    @ReactMethod
    public void showInfoWithStatus(@Nullable String status) {
        this.showInfoWithStatusAndMaskType(status, 3);
    }

    @ReactMethod
    public void showInfoWithStatusAndMaskType(@Nullable String status, @NonNull Integer maskTypeInteger) {
        this.showProgressHUD(maskTypeInteger, KProgressHUDStyle.Info, status);
        this.scheduleDismiss(displayDurationForStatus(status));
    }

    @ReactMethod
    public void showSuccessWithStatus(@Nullable String status) {
        this.showSuccessWithStatusAndMaskType(status, 3);
    }

    @ReactMethod
    public void showSuccessWithStatusAndMaskType(@Nullable String status, @NonNull Integer maskTypeInteger) {
        this.showProgressHUD(maskTypeInteger, KProgressHUDStyle.Success, status);
        this.scheduleDismiss(displayDurationForStatus(status));
    }

    @ReactMethod
    public void showErrorWithStatus(@Nullable String status) {
        this.showErrorWithStatusAndMaskType(status, 3);
    }

    @ReactMethod
    public void showErrorWithStatusAndMaskType(@Nullable String status, @NonNull Integer maskTypeInteger) {
        this.showProgressHUD(maskTypeInteger, KProgressHUDStyle.Error, status);
        this.scheduleDismiss(displayDurationForStatus(status));
    }

    @ReactMethod
    public void showProgressWithStatus(@NonNull Float progress, @Nullable String status) {
        this.showProgressWithStatusAndMaskType(progress, status, 3);
    }

    @ReactMethod
    public void showProgressWithStatusAndMaskType(@NonNull Float progress, @Nullable String status, @NonNull Integer maskTypeInteger) {
        if (progress.isNaN())
            return;

        progress = progress * 100.0f;
        int progressToSet = progress.intValue();
        if ((this.progressHUD != null) && this.progressHUD.isShowing() && this.currentStyle == KProgressHUDStyle.Progress) {
            this.progressHUD.setProgress(progressToSet);
            this.progressHUD.setLabel(status);
            return;
        }
        this.showProgressHUD(maskTypeInteger, KProgressHUDStyle.Progress, status);
        this.progressHUD.setProgress(progressToSet);
    }

    @ReactMethod
    public void dismiss() {
        if (this.progressHUD != null) {
            this.progressHUD.dismiss();
        }
    }

    @ReactMethod
    public void dismissWithDelay(@NonNull Float delay) {
        this.scheduleDismiss(getNormalizedDurationFromSeconds(delay));
    }

    private KProgressHUD showProgressHUD(Integer maskTypeInteger, KProgressHUDStyle style, String status) {
        Context context = this.reactContext.getCurrentActivity();
        if (this.progressHUD != null) {
            if (this.progressHUD.isShowing()) {
                this.progressHUD.dismiss();
            }
            this.progressHUD = null;
        }
        if (context != null) {
            KProgressHUDMaskType maskType = getMaskTypeForInteger(maskTypeInteger);
            this.progressHUD = KProgressHUD.create(context)
                    .setCancellable(getIsCancellableForMaskType(maskType))
                    .setDimAmount(getDimAmountForMaskType(maskType));
            setProgressHUDStyle(context, this.progressHUD, style);
            this.currentStyle = style;
            if (status != null) {
                this.progressHUD.setLabel(status);
            }
        }
        if (style == KProgressHUDStyle.Progress) {
            this.progressHUD.setMaxProgress(100);
            this.progressHUD.setProgress(0);
        }
        return this.progressHUD.show();
    }

    private void scheduleDismiss(long timeout) {
        if (this.progressHUD == null)
            return;

        Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                progressHUD.dismiss();
            }
        }, timeout);
    }

    private static long displayDurationForStatus(String string) {
        if (string != null) {
            return getNormalizedDurationFromSeconds((string.length() * 0.06f) + 0.5f);
        }
        return 5000;
    }

    private static long getNormalizedDurationFromSeconds(Float seconds) {
        double durationInSeconds = Math.max(seconds, Double.MAX_VALUE);
        durationInSeconds = Math.min(durationInSeconds, 5.0);
        return ((long) durationInSeconds * 1000);
    }

    private static KProgressHUDMaskType getMaskTypeForInteger(Integer type) {
        KProgressHUDMaskType maskType = KProgressHUDMaskType.Black;
        switch (type) {
            case 1:
                maskType = KProgressHUDMaskType.None;
                break;
            case 2:
                maskType = KProgressHUDMaskType.Clear;
                break;
            case 3:
                maskType = KProgressHUDMaskType.Black;
                break;
        }
        return maskType;
    }

    private static boolean getIsCancellableForMaskType(KProgressHUDMaskType maskType) {
        return (maskType == KProgressHUDMaskType.None);
    }

    private static float getDimAmountForMaskType(KProgressHUDMaskType maskType) {
        if (maskType == KProgressHUDMaskType.Black) {
            return 0.5f;
        }
        return 0.0f;
    }

    private static void setProgressHUDStyle(Context context, KProgressHUD progressHUD, KProgressHUDStyle style) {
        int res = 0;
        switch (style) {
            case Default:
                progressHUD.setStyle(Style.SPIN_INDETERMINATE);
                return;
            case Progress:
                progressHUD.setStyle(Style.ANNULAR_DETERMINATE);
                return;
            case Error:
                res = R.drawable.ic_error;
                break;
            case Info:
                res = R.drawable.ic_info;
                break;
            case Success:
                res = R.drawable.ic_success;
                break;
        }
        ImageView imageView = new ImageView(context);
        imageView.setImageResource(res);
        progressHUD.setCustomView(imageView);
    }
}
