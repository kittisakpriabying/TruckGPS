import { create } from 'zustand'
import { Session } from 'next-auth'

export const useAuthStore = create((set) => ({
    userProfile: null,
    setUserProfile: (profile) => set(() => ({ userProfile: profile  })),
    
  }))


