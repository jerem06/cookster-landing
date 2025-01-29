import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { User } from '@supabase/supabase-js'

interface UserState {
    user: User | null
    setUser: (user: User | null) => void
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
        }),
        {
            name: 'food-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    )
) 