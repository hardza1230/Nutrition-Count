# Build & Deployment Guide

## Prerequisites

- Expo CLI: `npm install -g expo-cli`
- EAS CLI: `npm install -g eas-cli`
- Xcode (for iOS)
- Android Studio (for Android)

## Local Build

### Web
```bash
npm run web
# Opens http://localhost:19006
```

### Android Emulator
```bash
npm run android
# Requires Android Studio emulator running
```

### iOS Simulator
```bash
npm run ios
# Requires macOS & Xcode
```

## Production Build (EAS)

### Setup
```bash
eas build:configure
# Select platforms (iOS/Android)
```

### iOS Build
```bash
eas build --platform ios --release
# Creates .ipa file for App Store
```

### Android Build
```bash
eas build --platform android --release
# Creates .aab file for Play Store
```

## App Store Submission

### iOS (App Store)
1. Get Apple Developer account ($99/year)
2. Create app listing in App Store Connect
3. Upload .ipa via Xcode or Transporter
4. Fill in screenshots, description, pricing
5. Submit for review (1-3 days)

```bash
eas submit --platform ios --release
```

### Android (Google Play)
1. Create Google Play Developer account ($25 one-time)
2. Create app listing in Google Play Console
3. Upload .aab file
4. Fill in store listing, screenshots, pricing
5. Submit for review (few hours)

```bash
eas submit --platform android --release
```

## Environment for Stores

**.env.production**
```
EXPO_PUBLIC_SUPABASE_URL=<production-url>
EXPO_PUBLIC_SUPABASE_ANON_KEY=<production-key>
EXPO_PUBLIC_ANTHROPIC_API_KEY=<api-key>
```

## Versioning

Update `app.json`:
```json
{
  "expo": {
    "version": "1.1.0",
    "runtimeVersion": "1.1.0"
  }
}
```

Increment on:
- Major: Breaking changes
- Minor: New features
- Patch: Bug fixes

## Testing Before Submission

- [ ] Test on real iOS device
- [ ] Test on real Android device
- [ ] Test camera permissions
- [ ] Test photo upload/Claude API
- [ ] Test offline scenarios
- [ ] Verify nutrition calculations
- [ ] Check all screens accessible
- [ ] Verify delete/edit works
- [ ] Test settings persistence
- [ ] Check memory usage

## Common Issues

**"Signing certificate not found"**
- Run `eas build:configure`
- Follow prompts to create/select cert

**"API Key missing"**
- Check .env file in build directory
- Restart EAS build after env changes

**"App rejected by store"**
- Check privacy policy
- Verify permissions usage
- Test on real device before upload
- Follow App Store/Play Store guidelines

## Troubleshooting

```bash
# Clear build cache
rm -rf node_modules .expo eas.json

# Reinstall deps
npm install

# Run build again
eas build --platform android --release
```

## Post-Launch

1. Monitor crash logs in stores
2. Respond to user reviews
3. Keep Supabase credentials secure
4. Monitor API usage
5. Plan updates based on feedback
