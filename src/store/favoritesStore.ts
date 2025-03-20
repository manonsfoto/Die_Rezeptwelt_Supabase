import { create } from 'zustand';
import { Recipe } from '../lib/supabase/types';
import { supabase } from '../lib/supabase/supabaseClient';
import { useAuthStore } from './authStore';

type FavoritesState = {
  favorites: Recipe[];
  isLoading: boolean;
  
  // Actions
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (recipe: Recipe) => Promise<void>;
  isFavorite: (recipeId: string) => boolean;
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: [],
  isLoading: false,
  
  fetchFavorites: async () => {
    const { user } = useAuthStore.getState();
    if (!user) return;
    
    set({ isLoading: true });
    
    try {
      const { data, error } = await supabase
        .from('recipe_favorites')
        .select('*, recipes(*)')
        .eq('user_id', user.id);
        
      if (error) {
        console.error('Error fetching favorites:', error);
        return;
      }
      
      // Extract recipe data from the joined query
      const favorites = data.map(item => item.recipes);
      set({ favorites, isLoading: false });
    } catch (error) {
      console.error('Error in fetchFavorites:', error);
      set({ isLoading: false });
    }
  },
  
  toggleFavorite: async (recipe: Recipe) => {
    const { user } = useAuthStore.getState();
    if (!user) return;
    
    const isFav = get().isFavorite(recipe.id);
    
    if (isFav) {
      // Remove from favorites
      const { error } = await supabase
        .from('recipe_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('recipe_id', recipe.id);
        
      if (error) {
        console.error('Error removing favorite:', error);
        return;
      }
      
      // Update local state
      set(state => ({
        favorites: state.favorites.filter(fav => fav.id !== recipe.id)
      }));
    } else {
      // Add to favorites
      const { error } = await supabase
        .from('recipe_favorites')
        .insert({
          user_id: user.id,
          recipe_id: recipe.id
        });
        
      if (error) {
        console.error('Error adding favorite:', error);
        return;
      }
      
      // Update local state
      set(state => ({
        favorites: [...state.favorites, recipe]
      }));
    }
  },
  
  isFavorite: (recipeId: string) => {
    return get().favorites.some(recipe => recipe.id === recipeId);
  }
}));

// Initialize favorites when the store is first used
if (typeof window !== 'undefined') {
  const { user } = useAuthStore.getState();
  if (user) {
    useFavoritesStore.getState().fetchFavorites();
  }
}