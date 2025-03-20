import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase/supabaseClient';

type AuthState = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
   
  fetchAuthStatus: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  
  fetchAuthStatus: async () => {
    set({ isLoading: true });
    const { data: { session } } = await supabase.auth.getSession();
    set({
      user: session?.user || null,
      isLoading: false,
      isAuthenticated: !!session,
    });
  },
  
  signOut: async () => {
    await supabase.auth.signOut();
    set({
      user: null,
      isAuthenticated: false,
    });
  },
}));


supabase.auth.onAuthStateChange((_event, session) => {
  useAuthStore.setState({
    user: session?.user || null,
    isLoading: false,
    isAuthenticated: !!session,
  });
});