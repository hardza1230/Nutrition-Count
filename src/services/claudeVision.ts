import Anthropic from '@anthropic-ai/sdk';
import type { NutritionData, Macros, Micronutrients } from '@/types/nutrition';
import type { FoodItem } from '@/types/meal';

const client = new Anthropic({
  apiKey: process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY || '',
});

export interface MealAnalysisResult {
  foodItems: FoodItem[];
  nutritionData: NutritionData;
}

export const analyzeMealImage = async (
  imageData: string,
  mediaType: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp' = 'image/jpeg'
): Promise<MealAnalysisResult> => {
  try {
    const message = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: imageData,
              },
            },
            {
              type: 'text',
              text: `Analyze this food image and provide nutritional information in JSON format.

Please return ONLY valid JSON with this exact structure (no markdown, no explanation):
{
  "foods": [
    {
      "name": "food item name",
      "portion": "estimated portion size (e.g., '200g' or '1 cup')",
      "calories": estimated calorie number
    }
  ],
  "nutritionData": {
    "calories": total estimated calories,
    "macros": {
      "protein": grams of protein,
      "carbs": grams of carbohydrates,
      "fat": grams of fat
    },
    "micronutrients": {
      "calcium": mg,
      "iron": mg,
      "vitamin_d": mcg,
      "vitamin_c": mg,
      "potassium": mg,
      "magnesium": mg
    },
    "fiber": grams of dietary fiber,
    "sodium": mg of sodium,
    "sugar": grams of sugar
  }
}

If you cannot identify the food clearly, provide your best estimates based on reasonable assumptions.`,
            },
          ],
        },
      ],
    });

    const responseText =
      message.content[0].type === 'text' ? message.content[0].text : '';

    // Parse JSON response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format from Claude Vision API');
    }

    const parsedResponse = JSON.parse(jsonMatch[0]);

    return {
      foodItems: parsedResponse.foods || [],
      nutritionData: parsedResponse.nutritionData || {
        calories: 0,
        macros: { protein: 0, carbs: 0, fat: 0 },
        micronutrients: {},
        fiber: 0,
        sodium: 0,
        sugar: 0,
      },
    };
  } catch (error) {
    console.error('Error analyzing meal image:', error);
    throw error;
  }
};
