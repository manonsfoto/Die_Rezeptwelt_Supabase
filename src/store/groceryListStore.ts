import { create } from 'zustand';
import { supabase } from '../lib/supabase/supabaseClient';
import { GroceryList } from '../lib/supabase/types';
import { useAuthStore } from './authStore';

type GroceryListState = {
  groceryList: GroceryList[] | null;
  isLoading: boolean;
  

  fetchGroceryList: () => Promise<void>;
  refreshGroceryList: () => Promise<void>;
};

export const useGroceryListStore = create<GroceryListState>((set, get) => ({
  groceryList: [],
  isLoading: false,
  
  fetchGroceryList: async () => {
    const { user } = useAuthStore.getState();
    if (!user) return;
    
    set({ isLoading: true });
    
    try {
      const { data, error } = await supabase
        .from("grocerylist_ingredients")
        .select(`*,ingredients(name, unit)`)
        .order("created_at", { ascending: true });
        
      if (error) {
        console.error(error);
        return;
      }
      
      set({ groceryList: data, isLoading: false });
    } catch (error) {
      console.error("Error fetching grocery list:", error);
      set({ isLoading: false });
    }
  },
  
  refreshGroceryList: async () => {
    await get().fetchGroceryList();
  }
}));