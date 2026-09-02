# Nutrition Count - Setup Guide

## Quick Start

### 1. Environment Setup
```bash
cp .env.example .env.local
```

Fill in:
- `EXPO_PUBLIC_SUPABASE_URL` - Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `EXPO_PUBLIC_ANTHROPIC_API_KEY` - Claude API key

### 2. Supabase Setup

Run SQL from `supabase/migrations/001_init.sql`:
- Creates users, meals, nutrition_targets tables
- Enables RLS policies
- Sets up indexes

Create storage bucket:
```sql
-- In Supabase dashboard
INSERT INTO storage.buckets (id, name, public) 
VALUES ('meal-photos', 'meal-photos', true);
```

### 3. Install & Run

```bash
npm install
npm start
```

Web: `npm run web`
iOS: `npm run ios` 
Android: `npm run android`

## Features Implemented

✅ Phase 1: Project Setup
- TypeScript, Zustand, Supabase client
- Type definitions, utilities, stores

✅ Phase 2: Core UI & Navigation
- Dashboard, Camera, Settings screens
- NutritionBar & MealCard components
- Bottom tab navigation

✅ Phase 3: Camera & Photo Input
- Photo capture via camera/library
- Claude Vision meal analysis
- Supabase storage integration
- Photo upload & meal persistence

## API Keys Needed

1. **Anthropic API** (Claude Vision)
   - https://console.anthropic.com
   - Get: sk-ant-...

2. **Supabase** (Backend)
   - https://supabase.com
   - Create project, get URL & anon key

## Troubleshooting

**"Permissions missing"**
- Grant camera/photo permissions in OS settings

**"Supabase credentials not found"**
- Check .env.local exists with correct keys
- Restart dev server

**"Claude API error"**
- Verify API key is valid
- Check quota/usage limits

## Next: Phase 4

- Nutrition display with animations
- Meal history & editing
- User settings persistence
