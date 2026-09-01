# Nutrition Meal Tracking App - Project Documentation

## Overview

A mobile application (iOS/Android) for tracking daily nutrition intake through photo-based food recognition. Users take photos of meals, the app analyzes nutritional content using Claude Vision API, and displays progress with gamified RPG-style status bars.

**Repository:** https://github.com/hardza1230/Nutrition-Count
**Tech Stack:** React Native + Expo, Supabase, Claude Vision API, TypeScript

## Architecture

### Tech Stack
- **Frontend:** React Native + Expo (iOS/Android)
- **Backend:** Supabase (PostgreSQL)
- **AI Analysis:** Claude Vision API (Anthropic)
- **State Management:** Zustand
- **Animation:** React Native Reanimated
- **UI Graphics:** React Native SVG

### Project Structure
```
nutrition-count/
├── src/
│   ├── components/        # UI components (NutritionBar, MealCard, etc.)
│   ├── screens/           # Navigation screens (Dashboard, Camera, History, Settings)
│   ├── hooks/             # Custom React hooks (useNutrition, useMealAnalysis)
│   ├── services/          # External service integration (Supabase, Claude Vision)
│   ├── store/             # Zustand state stores (nutritionStore, authStore)
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions (calculations, formatting)
│   └── App.tsx            # Main app entry
├── supabase/
│   └── migrations/        # Database migration files
├── assets/                # Images, fonts, etc.
├── app.json               # Expo configuration
├── package.json           # Dependencies
└── tsconfig.json          # TypeScript configuration
```

## Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Anthropic API key

### Environment Setup
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your credentials:
   - `EXPO_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
   - `EXPO_PUBLIC_ANTHROPIC_API_KEY` - Your Anthropic API key

### Installation
```bash
npm install
```

### Database Setup
1. Create a Supabase project
2. Run migrations from `supabase/migrations/001_init.sql` in Supabase SQL editor
3. Enable RLS policies as defined in migration

### Running the App
```bash
# Web
npm run web

# iOS (requires macOS)
npm run ios

# Android
npm run android

# Start Expo development server
npm start
```

## Key Features & Components

### 1. Photo-to-Nutrition Pipeline
- **CameraScreen:** User takes meal photo
- **claudeVision.ts:** Sends image to Claude Vision API
- **Meal Analysis:** Extracts:
  - Food items identified
  - Calorie count
  - Macronutrients (protein, carbs, fat)
  - Micronutrients (calcium, iron, vitamins, etc.)
  - Fiber, sodium, sugar

### 2. Gamified Dashboard
- **DashboardScreen:** Main nutrition view with RPG-style bars
- **NutritionBar Component:** Progress bars for each nutrient
- **Color Coding:**
  - Green: Good progress (< 80% of target)
  - Yellow: Warning (80-100%)
  - Red: Exceeded (> 100%)
- **Animations:** Smooth bar filling, level-up effects

### 3. Nutrition Targets
- **Default Targets:** 2000 cal, 75g protein, 300g carbs, 65g fat
- **Customizable:** Users can adjust targets in SettingsScreen
- **Stored in:** `nutrition_targets` table in Supabase

### 4. Data Management
- **useNutrition Hook:** Handles nutrition state and calculations
- **aggregateMealsNutrition:** Sums daily nutrition from all meals
- **calculateNutritionProgress:** Computes percentage vs. targets

## Database Schema

### users
- `id` (UUID, PK)
- `email` (unique)
- `created_at`
- `daily_calorie_target` (default: 2000)
- `daily_protein_target` (default: 75g)
- `daily_carbs_target` (default: 300g)
- `daily_fat_target` (default: 65g)
- `daily_fiber_target` (default: 25g)
- `daily_sodium_limit` (default: 2300mg)

### meals
- `id` (UUID, PK)
- `user_id` (FK → users)
- `photo_url` (Supabase Storage)
- `created_at`
- `meal_type` (breakfast/lunch/dinner/snack)
- `nutritional_data` (JSON)
- `food_items_identified` (JSON array)

### nutrition_targets
- `id` (UUID, PK)
- `user_id` (FK)
- `date`
- `calorie_target`
- `macro_targets` (JSON)

## API Integration

### Supabase
- Authentication (email signup/login)
- CRUD operations for meals
- Photo storage (Supabase Storage)
- Real-time updates via subscriptions

### Claude Vision API
- Endpoint: `claude-3-5-sonnet-20241022`
- Input: Base64 encoded meal image
- Output: JSON with nutrition breakdown

## Development Workflow

### Adding a Component
1. Create component in `src/components/`
2. Add TypeScript types in `src/types/`
3. Use Zustand store for state if needed
4. Test with real phone or Expo Go

### Adding a Feature
1. Define types in `src/types/`
2. Create service layer in `src/services/` (if external API)
3. Create custom hook in `src/hooks/` for business logic
4. Create screen in `src/screens/` for UI
5. Wire up navigation in App.tsx

### Testing
- Manual testing via Expo simulator
- Test with real food images
- Verify Supabase data storage
- Check Claude API response parsing

## Common Tasks

### To add a new screen:
1. Create file in `src/screens/`
2. Import in `app/` (Expo Router)
3. Add to navigation stack

### To add a new utility:
1. Create in `src/utils/`
2. Add TypeScript types
3. Write unit tests (optional)

### To modify database:
1. Create new migration in `supabase/migrations/`
2. Number it sequentially (002_*, 003_*, etc.)
3. Run in Supabase SQL editor
4. Test with app

## Deployment

### Build for Production
```bash
# iOS
eas build --platform ios --release

# Android
eas build --platform android --release
```

### Submit to App Stores
```bash
# App Store (iOS)
eas submit --platform ios

# Google Play (Android)
eas submit --platform android
```

## Environment Variables

Required for development:
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- `EXPO_PUBLIC_ANTHROPIC_API_KEY`

## Troubleshooting

### Issue: "Supabase credentials not found"
- Check `.env.local` file exists
- Verify credentials are correct
- Restart Expo development server

### Issue: "Claude Vision API error"
- Verify API key is correct
- Check image is valid format (jpeg, png, gif, webp)
- Check API usage limits

### Issue: "Database connection failed"
- Verify Supabase project is running
- Check internet connectivity
- Verify RLS policies are enabled

## Future Enhancements

- Daily streaks and achievements
- Weekly/monthly nutrition reports
- Social sharing of progress
- Meal planning recommendations
- Barcode scanning for quick entry
- Offline mode with sync
- Custom meal templates
