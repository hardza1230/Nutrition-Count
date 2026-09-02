# GitHub Actions Setup Guide

## Workflows Configured

### 1. **CI Pipeline** (`ci.yml`)
Runs on every push and PR:
- ✅ TypeScript type checking
- ✅ Code linting
- ✅ JSON config validation
- ✅ Security audit
- ✅ Secret scanning
- ✅ Project structure verification

**Triggers:**
- Push to `main` or feature branch
- Pull requests

**Status:** Check Actions tab for results

---

### 2. **Build Android APK** (`build-apk.yml`)
Builds release APK using EAS:
- 📱 Compiles React Native for Android
- 📦 Generates APK file
- 🔢 Auto-increments patch version
- 📝 Creates GitHub release
- 📤 Commits version update

**Triggers:**
- Push to `main` (auto-increment patch)
- Manual trigger with specific version
- File changes in src/, app.json, package.json

**Manual Trigger:**
```bash
# Via GitHub UI:
1. Actions → Build APK → Run workflow
2. Enter patch version (optional): e.g., 1.0.5
3. Monitor progress

# Via CLI:
gh workflow run build-apk.yml \
  -f patch_version=1.0.5 \
  -r main
```

**Output:**
- APK available in EAS dashboard
- GitHub release created with build info
- Version bumped in app.json
- Auto-commit pushed

---

### 3. **Build iOS IPA** (`build-ios.yml`)
Builds release IPA using EAS:
- 🍎 Compiles React Native for iOS
- 📦 Generates IPA file
- 🔢 Auto-increments patch version
- 📝 Creates GitHub release
- 📤 Commits version update

**Triggers:**
- Push to `main`
- Manual trigger with specific version

**Manual Trigger:**
```bash
gh workflow run build-ios.yml \
  -f patch_version=1.0.5 \
  -r main
```

**Output:**
- IPA available in EAS dashboard
- Ready for TestFlight or App Store

---

## Setup Instructions

### 1. Add Secrets to GitHub

Go to: **Settings → Secrets and variables → Actions**

Add these secrets:

```
EXPO_TOKEN
  → Get from: https://expo.dev/settings/access-tokens
  → Create personal access token

SUPABASE_URL
  → Your Supabase project URL

SUPABASE_ANON_KEY
  → Supabase anonymous key

ANTHROPIC_API_KEY
  → Your Claude API key from Anthropic console
```

### 2. Configure EAS (One-time)

```bash
# Login to Expo
npx expo login

# Initialize EAS
eas build:configure

# Select platforms: Android & iOS
# Follow prompts to create certificates

# Verify setup
eas build:list
```

### 3. Grant Actions Permissions

Go to: **Settings → Actions → General**

- ✅ Read repository contents
- ✅ Write to repository (for auto-commits)
- ✅ Create releases

---

## How to Use

### Automatic Builds (on push)

Every push to `main` triggers:
1. CI pipeline (lint, type-check, audit)
2. Android APK build (if CI passes)
3. iOS IPA build (if CI passes)

Version auto-increments: `1.0.0` → `1.0.1` → `1.0.2`

### Manual Patch Version

Specify exact version:

```bash
# Via GitHub UI:
1. Actions tab
2. Select workflow (Build APK or Build iOS)
3. Run workflow
4. Enter patch version: 1.0.5

# Via CLI:
gh workflow run build-apk.yml \
  -f patch_version=1.0.5 \
  -r main
```

### Monitor Builds

1. Go to **Actions** tab
2. Click workflow run
3. View logs in real-time
4. Download artifacts when complete

---

## What Gets Built

### APK (Android)
- File: `app-release.apk`
- Size: ~50-80 MB
- Location: EAS dashboard
- Install: `adb install app-release.apk`

### IPA (iOS)
- File: `app-release.ipa`
- Size: ~100-150 MB
- Location: EAS dashboard
- Deploy: TestFlight or App Store

---

## Versioning Strategy

Current version in `app.json`:
```json
{
  "expo": {
    "version": "1.0.0",
    "runtimeVersion": "1.0.0"
  }
}
```

**Auto-increment:**
- Patch: 1.0.0 → 1.0.1 (bugfixes)
- Minor: 1.0.0 → 1.1.0 (features) - manual
- Major: 1.0.0 → 2.0.0 (breaking) - manual

**Manual version:**
```bash
# Edit app.json and push
# Or use workflow_dispatch with version input
```

---

## Release Notes

Each build creates a GitHub Release with:
- Version number
- Build date
- Commit info
- Download instructions
- Installation steps

View releases: **Releases** tab in GitHub

---

## Troubleshooting

### Build Fails - "EXPO_TOKEN missing"
- Add `EXPO_TOKEN` to GitHub Secrets
- Restart workflow

### Build Fails - "Credentials not found"
- Run `eas build:configure` locally
- Commit eas.json to repo
- Re-run workflow

### EAS Build Queue
- EAS has limited concurrent builds
- Wait in queue (usually 5-15 min)
- Check status: https://status.expo.io

### APK Won't Install
- Different signature than previous build
- Uninstall old version first
- Or use `adb install -r app.apk` (force replace)

---

## CI Pipeline Details

### Lint & Type Check
- Runs `npm run lint` (if configured)
- TypeScript `--noEmit` check
- Continues on error (warnings only)

### Build Verification
- Validates JSON configs
- Checks app.json, tsconfig.json, package.json
- Verifies src/ directory structure

### Security Audit
- `npm audit --audit-level=moderate`
- TruffleHog secret scanning
- Continues on error (informational only)

### Code Quality
- Checks for large files (>1MB)
- Reviews dependency tree
- Verifies project structure

---

## GitHub Actions Costs

**Free tier includes:**
- ✅ Unlimited free public repos
- ✅ 2,000 minutes/month private repos
- ✅ Storage: 500 MB artifacts

**Our usage:**
- CI pipeline: ~2 min
- APK build: ~10-15 min
- iOS build: ~15-20 min
- **Total per build: ~30 min**

With 2 builds/week = ~240 min/month (plenty of room)

---

## Best Practices

1. **Always pass CI before build**
   - Fix linting errors first
   - Resolve type errors

2. **Use meaningful commits**
   - CI runs on every push
   - Bad commits = wasted build time

3. **Test locally before push**
   - Run `npm run lint`
   - Run `tsc --noEmit`
   - Manual test with Expo

4. **Version bumps**
   - Patch (1.0.0 → 1.0.1): Bugfixes
   - Minor (1.0.0 → 1.1.0): Features
   - Major (1.0.0 → 2.0.0): Breaking changes

5. **Store releases**
   - Download APK/IPA from GitHub Releases
   - Keep historical versions
   - Easy rollback if needed

---

## Resources

- [Expo EAS Docs](https://docs.expo.dev/build/setup)
- [GitHub Actions Docs](https://docs.github.com/actions)
- [EAS CLI Reference](https://docs.expo.dev/build/eas-cli)
- [Expo Status](https://status.expo.io)
