# progress-hud

![Platform](https://img.shields.io/badge/platform-react--native%20%5Bios%20%26%20android%5D-blue.svg)
![License](https://img.shields.io/npm/l/express.svg)
![npm version](https://img.shields.io/npm/v/progress-hud.svg)

A React Native native module for displaying progress HUD indicators. Uses [SVProgressHUD](https://github.com/SVProgressHUD/SVProgressHUD) on iOS and [KProgressHUD](https://github.com/Kaopiz/KProgressHUD) on Android.

## Table of Contents

- [Compatibility](#compatibility)
- [Installation](#installation)
  - [iOS Setup](#ios-setup)
  - [Android Setup](#android-setup)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
  - [Mask Types](#mask-types)
  - [Methods](#methods)
- [Usage Examples](#usage-examples)
  - [Basic Loading Spinner](#basic-loading-spinner)
  - [Loading with Custom Mask](#loading-with-custom-mask)
  - [Success, Error, and Info Messages](#success-error-and-info-messages)
  - [Progress Indicator](#progress-indicator)
  - [Dismissing the HUD](#dismissing-the-hud)
- [Common Patterns](#common-patterns)
  - [API Calls](#api-calls)
  - [File Upload with Progress](#file-upload-with-progress)
  - [Form Submission](#form-submission)
  - [Sequential Operations](#sequential-operations)
- [TypeScript Support](#typescript-support)
- [Troubleshooting](#troubleshooting)
- [Legacy Installation](#legacy-installation-rn--060)
- [License](#license)

---

## Compatibility

| Version | React Native | iOS | Android |
|---------|-------------|-----|---------|
| 2.x     | >= 0.73     | >= 13.4 | API 23+ |
| 1.x     | < 0.73      | >= 9.0 | API 16+ |

---

## Installation

### Step 1: Install the Package

```bash
# Using npm
npm install progress-hud --save

# Using yarn
yarn add progress-hud
```

### iOS Setup

After installing the package, install the CocoaPods dependencies:

```bash
cd ios && pod install && cd ..
```

**Note:** The `SVProgressHUD` dependency will be automatically installed via CocoaPods.

### Android Setup

No additional setup required! The library uses auto-linking and will be configured automatically.

---

## Quick Start

```javascript
import RNProgressHud from 'progress-hud';

// Show a loading spinner
RNProgressHud.showWithStatus("Loading...");

// When done, dismiss it
RNProgressHud.dismiss();
```

---

## API Reference

### Mask Types

Mask types control the background overlay appearance when the HUD is displayed.

```javascript
import RNProgressHud from 'progress-hud';

const { ProgressHUDMaskType } = RNProgressHud;

// Available mask types:
ProgressHUDMaskType.None   // Value: 1 - Transparent, user CAN interact with UI
ProgressHUDMaskType.Clear  // Value: 2 - Clear overlay, user CANNOT interact
ProgressHUDMaskType.Black  // Value: 3 - Semi-transparent black overlay (DEFAULT)
```

| Mask Type | Value | Background | User Interaction |
|-----------|-------|------------|------------------|
| `None` | 1 | Transparent | Allowed |
| `Clear` | 2 | Clear overlay | Blocked |
| `Black` | 3 | 50% black overlay | Blocked |

### Methods

#### `show(maskType?)`

Shows a simple loading spinner without any text.

```javascript
// Default black mask
RNProgressHud.show();

// With specific mask type
RNProgressHud.show(ProgressHUDMaskType.Clear);
```

**Parameters:**
- `maskType` (optional): `MaskType` - The mask type to use. Defaults to `Black` (3).

---

#### `showWithStatus(status, maskType?)`

Shows a loading spinner with a status message.

```javascript
// Default black mask
RNProgressHud.showWithStatus("Loading data...");

// With specific mask type
RNProgressHud.showWithStatus("Please wait...", ProgressHUDMaskType.None);
```

**Parameters:**
- `status`: `string` - The message to display below the spinner.
- `maskType` (optional): `MaskType` - The mask type to use. Defaults to `Black` (3).

---

#### `showSuccessWithStatus(status, maskType?)`

Shows a success checkmark icon with a message. **Auto-dismisses** after a short delay.

```javascript
RNProgressHud.showSuccessWithStatus("Saved successfully!");

// With mask type
RNProgressHud.showSuccessWithStatus("Done!", ProgressHUDMaskType.Clear);
```

**Parameters:**
- `status`: `string` - The success message to display.
- `maskType` (optional): `MaskType` - The mask type to use. Defaults to `Black` (3).

**Note:** The HUD will automatically dismiss based on the text length (approximately 0.5-5 seconds).

---

#### `showErrorWithStatus(status, maskType?)`

Shows an error icon with a message. **Auto-dismisses** after a short delay.

```javascript
RNProgressHud.showErrorWithStatus("Failed to save data");

// With mask type
RNProgressHud.showErrorWithStatus("Network error", ProgressHUDMaskType.Black);
```

**Parameters:**
- `status`: `string` - The error message to display.
- `maskType` (optional): `MaskType` - The mask type to use. Defaults to `Black` (3).

---

#### `showInfoWithStatus(status, maskType?)`

Shows an info icon with a message. **Auto-dismisses** after a short delay.

```javascript
RNProgressHud.showInfoWithStatus("No items found");

// With mask type
RNProgressHud.showInfoWithStatus("Tip: Swipe to refresh", ProgressHUDMaskType.None);
```

**Parameters:**
- `status`: `string` - The info message to display.
- `maskType` (optional): `MaskType` - The mask type to use. Defaults to `Black` (3).

---

#### `showProgressWithStatus(progress, status, maskType?)`

Shows a circular progress indicator with percentage.

```javascript
// Progress value: 0.0 to 1.0 (0% to 100%)
RNProgressHud.showProgressWithStatus(0.5, "Downloading...");

// 75% complete
RNProgressHud.showProgressWithStatus(0.75, "75% complete");

// With mask type
RNProgressHud.showProgressWithStatus(0.3, "Uploading...", ProgressHUDMaskType.Clear);
```

**Parameters:**
- `progress`: `number` - Progress value between 0.0 and 1.0.
- `status`: `string` - The status message to display.
- `maskType` (optional): `MaskType` - The mask type to use. Defaults to `Black` (3).

**Note:** The HUD will **auto-dismiss** when progress reaches 1.0 (100%).

---

#### `dismiss()`

Immediately dismisses the HUD.

```javascript
RNProgressHud.dismiss();
```

---

#### `dismissWithDelay(delayInSeconds)`

Dismisses the HUD after a specified delay.

```javascript
// Dismiss after 2 seconds
RNProgressHud.dismissWithDelay(2.0);

// Dismiss after 500ms
RNProgressHud.dismissWithDelay(0.5);
```

**Parameters:**
- `delayInSeconds`: `number` - Delay in seconds before dismissing (0.5 to 5.0).

---

## Usage Examples

### Basic Loading Spinner

```javascript
import RNProgressHud from 'progress-hud';

// Simple spinner (no text)
RNProgressHud.show();

// Spinner with message
RNProgressHud.showWithStatus("Loading...");

// Don't forget to dismiss when done!
RNProgressHud.dismiss();
```

### Loading with Custom Mask

```javascript
import RNProgressHud from 'progress-hud';

const { ProgressHUDMaskType } = RNProgressHud;

// No dimming, user can still interact with UI behind
RNProgressHud.showWithStatus("Syncing in background...", ProgressHUDMaskType.None);

// Clear overlay (blocks interaction but no dimming)
RNProgressHud.showWithStatus("Processing...", ProgressHUDMaskType.Clear);

// Black dimmed overlay (default - blocks interaction)
RNProgressHud.showWithStatus("Please wait...", ProgressHUDMaskType.Black);
```

### Success, Error, and Info Messages

These methods auto-dismiss, so you don't need to call `dismiss()`.

```javascript
import RNProgressHud from 'progress-hud';

// Success message
RNProgressHud.showSuccessWithStatus("Profile updated!");

// Error message
RNProgressHud.showErrorWithStatus("Failed to connect to server");

// Info message
RNProgressHud.showInfoWithStatus("Your session will expire in 5 minutes");
```

### Progress Indicator

```javascript
import RNProgressHud from 'progress-hud';

// Show initial progress
RNProgressHud.showProgressWithStatus(0, "Starting download...");

// Update progress (call this multiple times)
RNProgressHud.showProgressWithStatus(0.25, "25% complete");
RNProgressHud.showProgressWithStatus(0.50, "50% complete");
RNProgressHud.showProgressWithStatus(0.75, "75% complete");

// When reaching 100%, it auto-dismisses
RNProgressHud.showProgressWithStatus(1.0, "Complete!");
```

### Dismissing the HUD

```javascript
import RNProgressHud from 'progress-hud';

// Immediate dismiss
RNProgressHud.dismiss();

// Dismiss after 1.5 seconds
RNProgressHud.dismissWithDelay(1.5);
```

---

## Common Patterns

### API Calls

```javascript
import RNProgressHud from 'progress-hud';

async function fetchUserData(userId) {
  const { ProgressHUDMaskType } = RNProgressHud;

  try {
    // Show loading indicator
    RNProgressHud.showWithStatus("Loading user data...", ProgressHUDMaskType.Clear);

    // Make API call
    const response = await fetch(`https://api.example.com/users/${userId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    const userData = await response.json();

    // Show success (auto-dismisses)
    RNProgressHud.showSuccessWithStatus("User loaded!");

    return userData;

  } catch (error) {
    // Show error (auto-dismisses)
    RNProgressHud.showErrorWithStatus(error.message || "Failed to load user");
    throw error;
  }
}
```

### File Upload with Progress

```javascript
import RNProgressHud from 'progress-hud';

async function uploadFile(file) {
  const { ProgressHUDMaskType } = RNProgressHud;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Track upload progress
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const progress = event.loaded / event.total;
        const percentage = Math.round(progress * 100);

        RNProgressHud.showProgressWithStatus(
          progress,
          `Uploading... ${percentage}%`,
          ProgressHUDMaskType.Clear
        );
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        RNProgressHud.showSuccessWithStatus("Upload complete!");
        resolve(JSON.parse(xhr.responseText));
      } else {
        RNProgressHud.showErrorWithStatus("Upload failed");
        reject(new Error('Upload failed'));
      }
    });

    xhr.addEventListener('error', () => {
      RNProgressHud.showErrorWithStatus("Network error");
      reject(new Error('Network error'));
    });

    // Start upload
    xhr.open('POST', 'https://api.example.com/upload');
    xhr.send(file);
  });
}
```

### Form Submission

```javascript
import RNProgressHud from 'progress-hud';

async function submitForm(formData) {
  try {
    RNProgressHud.showWithStatus("Submitting...");

    const response = await fetch('https://api.example.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Submission failed');
    }

    const result = await response.json();

    RNProgressHud.showSuccessWithStatus("Form submitted successfully!");

    return result;

  } catch (error) {
    RNProgressHud.showErrorWithStatus(error.message);
    throw error;
  }
}

// Usage in a React component
const handleSubmit = async () => {
  try {
    await submitForm({
      name: 'John Doe',
      email: 'john@example.com',
    });
    // Navigate to success screen
  } catch (error) {
    // Form submission failed, error already shown to user
    console.error(error);
  }
};
```

### Sequential Operations

```javascript
import RNProgressHud from 'progress-hud';

async function performSequentialOperations() {
  try {
    // Step 1
    RNProgressHud.showWithStatus("Step 1: Validating...");
    await validateData();

    // Step 2
    RNProgressHud.showWithStatus("Step 2: Processing...");
    await processData();

    // Step 3
    RNProgressHud.showWithStatus("Step 3: Saving...");
    await saveData();

    // All done
    RNProgressHud.showSuccessWithStatus("All operations completed!");

  } catch (error) {
    RNProgressHud.showErrorWithStatus(`Failed: ${error.message}`);
    throw error;
  }
}
```

### With React Hooks

```javascript
import React, { useCallback } from 'react';
import { Button } from 'react-native';
import RNProgressHud from 'progress-hud';

function MyComponent() {
  const handlePress = useCallback(async () => {
    try {
      RNProgressHud.showWithStatus("Loading...");

      const data = await fetchSomeData();

      RNProgressHud.showSuccessWithStatus("Done!");

      // Use the data
      console.log(data);

    } catch (error) {
      RNProgressHud.showErrorWithStatus("Failed to load");
    }
  }, []);

  return (
    <Button title="Load Data" onPress={handlePress} />
  );
}
```

### Custom Wrapper Hook

```javascript
import { useCallback } from 'react';
import RNProgressHud from 'progress-hud';

export function useProgressHud() {
  const showLoading = useCallback((message = "Loading...") => {
    RNProgressHud.showWithStatus(message);
  }, []);

  const showSuccess = useCallback((message = "Success!") => {
    RNProgressHud.showSuccessWithStatus(message);
  }, []);

  const showError = useCallback((message = "An error occurred") => {
    RNProgressHud.showErrorWithStatus(message);
  }, []);

  const dismiss = useCallback(() => {
    RNProgressHud.dismiss();
  }, []);

  const withLoading = useCallback(async (asyncFn, loadingMessage) => {
    try {
      showLoading(loadingMessage);
      const result = await asyncFn();
      dismiss();
      return result;
    } catch (error) {
      showError(error.message);
      throw error;
    }
  }, [showLoading, dismiss, showError]);

  return {
    showLoading,
    showSuccess,
    showError,
    dismiss,
    withLoading,
  };
}

// Usage
function MyComponent() {
  const { withLoading, showSuccess } = useProgressHud();

  const handleFetch = async () => {
    const data = await withLoading(
      () => fetch('https://api.example.com/data').then(r => r.json()),
      "Fetching data..."
    );
    showSuccess("Data loaded!");
    return data;
  };
}
```

---

## TypeScript Support

This package includes full TypeScript definitions.

### Basic Types

```typescript
import RNProgressHud, {
  ProgressHUDMaskType,
  MaskType,
  ProgressHUD
} from 'progress-hud';

// MaskType is: 1 | 2 | 3
const maskType: MaskType = ProgressHUDMaskType.Clear; // 2

// Using the API
RNProgressHud.showWithStatus("Loading...", maskType);
```

### Type-Safe Usage

```typescript
import RNProgressHud, { MaskType } from 'progress-hud';

interface LoadingOptions {
  message: string;
  maskType?: MaskType;
}

async function loadWithProgress(
  asyncFn: () => Promise<void>,
  options: LoadingOptions
): Promise<void> {
  const { message, maskType } = options;

  try {
    RNProgressHud.showWithStatus(message, maskType);
    await asyncFn();
    RNProgressHud.showSuccessWithStatus("Complete!");
  } catch (error) {
    RNProgressHud.showErrorWithStatus("Failed");
    throw error;
  }
}

// Usage
await loadWithProgress(
  () => fetchData(),
  { message: "Loading...", maskType: 2 }
);
```

---

## Troubleshooting

### iOS: SVProgressHUD not found

If you see an error about SVProgressHUD not being found:

```bash
cd ios
pod install --repo-update
cd ..
```

### Android: Build fails with namespace error

Make sure you're using React Native 0.73+ with this version. For older React Native versions, use `progress-hud@1.x`.

### HUD not showing

1. Make sure the component is mounted before calling HUD methods
2. Check that you're not calling `dismiss()` immediately after `show()`
3. On Android, ensure the Activity is available (not in background)

### HUD stuck on screen

Always call `dismiss()` or use methods that auto-dismiss (`showSuccessWithStatus`, `showErrorWithStatus`, `showInfoWithStatus`).

```javascript
// Good practice: Use try/finally
try {
  RNProgressHud.showWithStatus("Loading...");
  await someAsyncOperation();
  RNProgressHud.showSuccessWithStatus("Done!");
} catch (error) {
  RNProgressHud.showErrorWithStatus("Failed");
} finally {
  // Ensure HUD is dismissed even if something goes wrong
  // (Optional since success/error auto-dismiss)
}
```

### Multiple HUDs showing

Only one HUD can be shown at a time. Calling a show method will replace the current HUD.

---

## Legacy Installation (RN < 0.60)

For React Native versions below 0.60, use version 1.x:

```bash
npm install progress-hud@1.1.0 --save
react-native link progress-hud
```

See the [1.x documentation](https://github.com/bunhouth/react-native-progress-hud/tree/v1.1.0) for manual linking instructions.

---

## Credit

Based on work by [medlmobileenterprises](https://github.com/medlmobileenterprises/react-native-progress-display)

## License

MIT
