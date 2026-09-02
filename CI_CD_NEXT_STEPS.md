# CI/CD Setup - Next Steps

## Completed ✅

- GitHub Actions workflows created (CI, APK build, iOS build)
- TypeScript errors fixed and passing type check
- Configuration files validated
- Project structure verified
- Documentation updated

## Required Setup Steps

### 1. Configure EAS Build (One-time, Local)

```bash
# Login to your Expo account (or create one at https://expo.dev)
npx expo login

# Configure EAS for this project
eas build:configure

# This creates eas.json and generates certificates
# Select both Android and iOS platforms when prompted
```

After running `eas build:configure`:
- A new `eas.json` file will be created
- Commit it to the repository:
  ```bash
  git add eas.json
  git commit -m "Add EAS build configuration"
  git push origin claude/meal-tracking-app-design-icd2uu
  ```

### 2. Add GitHub Secrets

Go to: **GitHub Repository → Settings → Secrets and variables → Actions**

Add these secrets with your values:

| Secret Name | Value | Where to Get |
|---|---|---|
| `EXPO_TOKEN` | Your Expo personal access token | https://expo.dev/settings/access-tokens |
| `SUPABASE_URL` | Your Supabase project URL | Supabase Project Settings |
| `SUPABASE_ANON_KEY` | Your Supabase anonymous key | Supabase Project Settings → API |
| `ANTHROPIC_API_KEY` | Your Anthropic API key | https://console.anthropic.com |

### 3. Test CI Pipeline

Push a test commit to trigger CI:

```bash
echo "# Test commit" >> TESTING.md
git add TESTING.md
git commit -m "Test CI pipeline"
git push origin claude/meal-tracking-app-design-icd2uu
```

Go to **Actions** tab in GitHub to monitor the workflow.

### 4. Manual Build Trigger (Optional)

Once secrets are configured, manually trigger builds:

```bash
# Build Android APK
gh workflow run build-apk.yml -f patch_version=1.0.1 -r claude/meal-tracking-app-design-icd2uu

# Build iOS IPA
gh workflow run build-ios.yml -f patch_version=1.0.1 -r claude/meal-tracking-app-design-icd2uu
```

## What Happens After Setup

### Automatic on Push
- CI pipeline runs (lint, type-check, audit, structure check)
- If CI passes → APK build starts (10-15 min)
- If CI passes → iOS build starts (15-20 min)
- Version auto-increments in `app.json`
- GitHub Release created with build info

### Manual Trigger
Via GitHub UI or `gh` CLI:
- Specify exact patch version (optional)
- Force build regardless of CI status

## Troubleshooting

**"EXPO_TOKEN missing"**
- Verify token is added to GitHub Secrets
- Check spelling matches exactly

**"Credentials not found"**
- Run `eas build:configure` locally again
- Ensure `eas.json` is committed

**"Build fails with network error"**
- Usually temporary EAS queue issue
- Check https://status.expo.io
- Retry after 5-10 minutes

**"Type check fails in CI"**
- Run `npx tsc --noEmit` locally
- Fix errors and push

## Monitoring Builds

1. Go to GitHub **Actions** tab
2. Click workflow run to see logs
3. Check EAS dashboard: https://expo.dev/builds

## Production Deployment

After successful build:

```bash
# Submit to App Store
eas submit --platform ios

# Submit to Google Play
eas submit --platform android
```

See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for full store submission steps.

---

**Questions?** See [.github/GITHUB_ACTIONS.md](./.github/GITHUB_ACTIONS.md) for detailed workflow documentation.
