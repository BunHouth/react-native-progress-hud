
# progress-hud
![Platform](https://img.shields.io/badge/platform-react--native%20%5Bios%20%26%20android%5D-blue.svg)
![License](https://img.shields.io/npm/l/express.svg)

`progress-hud` is a Native Module for react-native that uses [SVProgressHUD](https://github.com/SVProgressHUD/SVProgressHUD) on iOS and [KProgressHUD](https://github.com/Kaopiz/KProgressHUD) on Android.

## Getting started
`$ npm install progress-hud --save`

### Mostly automatic installation
`$ react-native link progress-hud`

### Manual installation
#### iOS
1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `progress-hud` and add `RNProgressHud.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNProgressHud.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android
1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.rnprogresshud.RNProgressHudPackage;` to the imports at the top of the file
  - Add `new RNProgressHudPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':progress-hud'
  	project(':progress-hud').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-progress-display/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      implementation project(':progress-hud')
  	```

### iOS Dependency Installation:
***Important: This package depends on SVProgressHUD library. Please make sure you also install SVProgressHUD***
1. Go to <https://github.com/SVProgressHUD/SVProgressHUD>
2. Follow the installation instructions and install before trying to run your project with the progress-hud package installed.

## Usage
```javascript
import RNProgressHud from 'progress-hud';
```

Showing a loading spinner with message:
```javascript
// Where you want to display the spinner
RNProgressHud.showWithStatus("Loading...");
```

Showing a loading spinner with message and mask type:
```javascript
// To use one of the pre-defined styles for background color:
const ProgressHUDMaskType = RNProgressHud.ProgressHUDMaskType;
RNProgressHud.showWithStatus("Loading...", ProgressHUDMaskType.Clear);
```  

Show circular progress view:
```javascript
// Input progress parameter must be a double or float with a range of 0.0 to 1.0 representing 0% and 100%.
// This will not automatically dismiss spinner unless progress reaches 100%. Otherwise, dismiss() must be called explicitly.

RNProgressHud.showProgressWithStatus(0.25, "Downloading data...");
```

Dismiss:
```javascript
RNProgressHud.dismiss();
```

Dismiss with a delay (in seconds):
```javascript
RNProgressHud.dismissWithDelay(1.0); // Dismisses after one second.
```


# Credit
[medlmobileenterprises](https://github.com/medlmobileenterprises/react-native-progress-display)
