import { getSupabase } from './supabase';
import * as FileSystem from 'expo-file-system';

export const uploadMealPhoto = async (
  base64: string,
  userId: string
): Promise<string> => {
  try {
    const supabase = getSupabase();
    const fileName = `meal-${userId}-${Date.now()}.jpg`;
    const filePath = `${userId}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('meal-photos')
      .upload(filePath, Buffer.from(base64, 'base64'), {
        contentType: 'image/jpeg',
      });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('meal-photos')
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Photo upload error:', error);
    throw error;
  }
};

export const deleteMealPhoto = async (photoUrl: string) => {
  try {
    const supabase = getSupabase();
    const filePath = photoUrl.split('/').slice(-2).join('/');

    const { error } = await supabase.storage
      .from('meal-photos')
      .remove([filePath]);

    if (error) throw error;
  } catch (error) {
    console.error('Photo deletion error:', error);
    throw error;
  }
};
