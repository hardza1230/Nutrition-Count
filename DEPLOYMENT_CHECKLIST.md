# Deployment Checklist

## Pre-Deployment (1 week before)

- [ ] Code review complete
- [ ] All tests passing
- [ ] No console errors/warnings
- [ ] Performance optimized
- [ ] Dependencies up to date
- [ ] Security audit passed

## App Store Setup (1-2 weeks)

### iOS
- [ ] Apple Developer account created
- [ ] App Store Connect project created
- [ ] App name finalized
- [ ] Category selected
- [ ] Privacy policy URL ready
- [ ] Support email configured
- [ ] Screenshots taken (5-8 per orientation)
- [ ] App description written (3-30 chars)
- [ ] Keywords added
- [ ] Demo video optional

### Android
- [ ] Google Play Developer account created
- [ ] Google Play Console project created
- [ ] App name & slug configured
- [ ] Privacy policy URL ready
- [ ] Contact email set
- [ ] Screenshots (2-8 per type)
- [ ] Feature graphic (1024x500)
- [ ] Store listing description
- [ ] Pricing & countries selected

## Technical Preparation

### Build Configuration
- [ ] Version bumped (v1.0.0)
- [ ] Changelog written
- [ ] Environment configs verified
- [ ] API keys configured
- [ ] Supabase production ready
- [ ] Anthropic quota sufficient

### Testing
- [ ] Camera permissions work (iOS/Android)
- [ ] Photo upload tested
- [ ] Claude Vision API working
- [ ] Database persistence verified
- [ ] Offline scenario tested
- [ ] Memory leaks checked
- [ ] Battery usage monitored
- [ ] Network failure handled

### Device Testing
- [ ] iOS 14+ devices tested
- [ ] Android 8+ devices tested
- [ ] Various screen sizes tested
- [ ] Tablet layout works
- [ ] Dark mode verified

## Build Execution

```bash
# 1. Setup
eas build:configure

# 2. Build iOS
eas build --platform ios --release

# 3. Build Android
eas build --platform android --release

# 4. Wait for builds to complete
# Check status: eas build:list

# 5. Download artifacts
# .ipa for iOS
# .aab for Android
```

## Store Submission

### iOS Submission
```bash
# Option 1: EAS (easiest)
eas submit --platform ios

# Option 2: Manual (Transporter)
# Download .ipa → Use Transporter app
```

Steps:
- [ ] Upload .ipa file
- [ ] Select build
- [ ] Add release notes
- [ ] Select TestFlight beta (optional)
- [ ] Submit for review
- [ ] Monitor review status

### Android Submission
```bash
eas submit --platform android
```

Steps:
- [ ] Upload .aab file
- [ ] Set pricing & free countries
- [ ] Add release notes
- [ ] Set content rating
- [ ] Submit for review
- [ ] Monitor review status

## Post-Submission

- [ ] Monitor approval status
- [ ] Respond to reviewer feedback if rejected
- [ ] If approved: celebrate! 🎉
- [ ] Monitor crash logs
- [ ] Check user ratings
- [ ] Set up feedback channel

## After Launch

- [ ] Monitor reviews daily (1 week)
- [ ] Respond to user feedback
- [ ] Track crash analytics
- [ ] Monitor API usage
- [ ] Plan first patch update
- [ ] Plan feature updates

## Emergency Procedures

**If Critical Bug Found:**
1. Deploy hotfix to branch
2. Build new version
3. Increment patch version
4. Resubmit to stores (express review available)

**If API Key Leaked:**
1. Immediately regenerate Supabase keys
2. Rotate Anthropic API key
3. Rebuild with new keys
4. Resubmit to stores

## Timeline

| Phase | Duration | Notes |
|-------|----------|-------|
| Setup | 3-5 days | Create accounts, gather assets |
| Build | 1 day | EAS handles compilation |
| Submission | 1 day | Upload & submit |
| iOS Review | 1-3 days | Apple typically faster |
| Android Review | Few hours | Google usually quicker |
| **Total** | **~7-10 days** | From start to live |

## Resources

- App Store Connect: https://appstoreconnect.apple.com
- Google Play Console: https://play.google.com/console
- Expo Docs: https://docs.expo.dev
- EAS Docs: https://docs.expo.dev/build/setup
