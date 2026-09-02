# Nutrition Count - Meal Tracking App

A mobile application (iOS/Android) for tracking daily nutrition intake through photo-based food recognition. Users take photos of meals, the app analyzes nutritional content using Claude Vision API, and displays progress with gamified RPG-style status bars.

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup environment**
   ```bash
   cp .env.example .env.local
   # Fill in your credentials in .env.local
   ```

3. **Start development**
   ```bash
   npm start
   ```

## Documentation

- **[CLAUDE.md](./CLAUDE.md)** - Project architecture and tech stack overview
- **[SETUP.md](./SETUP.md)** - Detailed environment setup instructions
- **[BUILD.md](./BUILD.md)** - Local and production build instructions
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Pre-deployment verification steps
- **[.github/GITHUB_ACTIONS.md](./.github/GITHUB_ACTIONS.md)** - CI/CD pipeline setup and usage

## Tech Stack

- **Frontend:** React Native + Expo (iOS/Android)
- **Backend:** Supabase (PostgreSQL + Storage)
- **AI:** Claude Vision API (Anthropic)
- **State:** Zustand
- **Animation:** React Native Reanimated
- **Language:** TypeScript

## Features

- 📸 Photo-based meal recognition via Claude Vision API
- 📊 RPG-style gamified nutrition progress bars
- 🎯 Daily nutrition tracking (Calories, Macros, Micronutrients, Fiber, Sodium, Sugar)
- 📱 Cross-platform iOS/Android support
- 🗄️ Cloud storage with Supabase
- 🔐 User authentication
- 🤖 CI/CD via GitHub Actions with automated APK/IPA builds

## CI/CD Workflows

GitHub Actions automatically:
- ✅ Runs TypeScript type checking and linting on every push
- ✅ Validates project configuration and structure
- ✅ Builds Android APK with auto-incrementing patch versions
- ✅ Builds iOS IPA with version management
- ✅ Creates GitHub Releases with build artifacts

See [.github/GITHUB_ACTIONS.md](./.github/GITHUB_ACTIONS.md) for setup instructions and manual trigger commands.

## Running the App

**Web:**
```bash
npm run web
```

**Android:**
```bash
npm run android
```

**iOS (macOS only):**
```bash
npm run ios
```

**Expo Development Server:**
```bash
npm start
```

## Database

PostgreSQL database hosted on Supabase with tables for:
- Users (authentication and targets)
- Meals (photos and nutrition data)
- Nutrition Targets (daily goals)

See [supabase/migrations/001_init.sql](./supabase/migrations/001_init.sql) for schema.

## Environment Variables

Required for development:
- `EXPO_PUBLIC_SUPABASE_URL` - Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `EXPO_PUBLIC_ANTHROPIC_API_KEY` - Anthropic API key

See `.env.example` for template.

## Project Structure

```
src/
├── components/        # UI components (NutritionBar, MealCard, etc.)
├── screens/          # Navigation screens
├── hooks/            # Custom React hooks
├── services/         # External API integration
├── store/            # Zustand state management
├── types/            # TypeScript definitions
└── utils/            # Utility functions
```

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [Supabase Docs](https://supabase.com/docs)
- [Anthropic API](https://docs.anthropic.com/)
