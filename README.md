# progress-hud

![Platform](https://img.shields.io/badge/platform-react--native%20%5Bios%20%26%20android%5D-blue.svg)
![License](https://img.shields.io/npm/l/express.svg)

`progress-hud` is a Native Module for React Native that uses [SVProgressHUD](https://github.com/SVProgressHUD/SVProgressHUD) on iOS and [KProgressHUD](https://github.com/Kaopiz/KProgressHUD) on Android.

## Compatibility

| Version | React Native | iOS | Android |
|---------|-------------|-----|---------|
| 2.x     | >= 0.73     | >= 13.4 | API 23+ |
| 1.x     | < 0.73      | >= 9.0 | API 16+ |

## Installation

```bash
npm install progress-hud --save
# or
yarn add progress-hud
```

### iOS Setup

After installing the package, install the CocoaPods dependencies:

```bash
cd ios && pod install
```

**Note:** This package depends on `SVProgressHUD`. It will be automatically installed via CocoaPods.

### Android Setup

No additional setup required! The library uses auto-linking.

## Usage

```javascript
import RNProgressHud from 'progress-hud';
```

### Show Loading Spinner

```javascript
// Simple spinner
RNProgressHud.show();

// Spinner with message
RNProgressHud.showWithStatus("Loading...");
```

### Show with Mask Type

```javascript
const { ProgressHUDMaskType } = RNProgressHud;

// Clear background (user can see through)
RNProgressHud.showWithStatus("Loading...", ProgressHUDMaskType.Clear);

// Black dimmed background (default)
RNProgressHud.showWithStatus("Loading...", ProgressHUDMaskType.Black);

// No mask (user can interact with UI)
RNProgressHud.showWithStatus("Loading...", ProgressHUDMaskType.None);
```

### Show Success/Error/Info

```javascript
// These will auto-dismiss after a short delay
RNProgressHud.showSuccessWithStatus("Saved!");
RNProgressHud.showErrorWithStatus("Failed to save");
RNProgressHud.showInfoWithStatus("No items found");
```

### Show Progress

```javascript
// Progress value should be between 0.0 and 1.0
RNProgressHud.showProgressWithStatus(0.5, "Downloading...");

// Auto-dismisses when progress reaches 1.0
```

### Dismiss

```javascript
// Dismiss immediately
RNProgressHud.dismiss();

// Dismiss after delay (in seconds)
RNProgressHud.dismissWithDelay(1.5);
```

## API Reference

### Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `show` | `maskType?: MaskType` | Show loading spinner |
| `showWithStatus` | `status: string, maskType?: MaskType` | Show spinner with text |
| `showInfoWithStatus` | `status: string, maskType?: MaskType` | Show info icon (auto-dismiss) |
| `showSuccessWithStatus` | `status: string, maskType?: MaskType` | Show success icon (auto-dismiss) |
| `showErrorWithStatus` | `status: string, maskType?: MaskType` | Show error icon (auto-dismiss) |
| `showProgressWithStatus` | `progress: number, status: string, maskType?: MaskType` | Show progress (0.0-1.0) |
| `dismiss` | - | Dismiss immediately |
| `dismissWithDelay` | `delayInSeconds: number` | Dismiss after delay |

### Mask Types

| Type | Value | Description |
|------|-------|-------------|
| `None` | 1 | Transparent, user can interact |
| `Clear` | 2 | Clear overlay, blocks interaction |
| `Black` | 3 | Semi-transparent black overlay (default) |

## TypeScript Support

This package includes TypeScript definitions. Import types as needed:

```typescript
import RNProgressHud, { ProgressHUDMaskType, MaskType } from 'progress-hud';
```

## Example

```javascript
import RNProgressHud from 'progress-hud';

async function fetchData() {
  const { ProgressHUDMaskType } = RNProgressHud;

  try {
    RNProgressHud.showWithStatus("Loading...", ProgressHUDMaskType.Clear);

    const response = await fetch('https://api.example.com/data');
    const data = await response.json();

    RNProgressHud.showSuccessWithStatus("Loaded!");
    return data;
  } catch (error) {
    RNProgressHud.showErrorWithStatus("Failed to load");
    throw error;
  }
}

// Progress example
function uploadFile() {
  let progress = 0;

  const interval = setInterval(() => {
    progress += 0.1;
    RNProgressHud.showProgressWithStatus(progress, `${Math.round(progress * 100)}%`);

    if (progress >= 1.0) {
      clearInterval(interval);
    }
  }, 200);
}
```

## Legacy Installation (RN < 0.60)

For React Native versions below 0.60, use version 1.x:

```bash
npm install progress-hud@1.1.0 --save
react-native link progress-hud
```

## Credit

[medlmobileenterprises](https://github.com/medlmobileenterprises/react-native-progress-display)

## License

MIT
