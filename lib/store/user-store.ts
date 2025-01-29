import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { User } from '@supabase/supabase-js'

interface UserState {
    user: User | null
    user_id: number | null
    user_role: string | null
    setUser: (user: User | null) => void
    setUserDetails: (userId: number | null, userRole: string | null) => void
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            user_id: null,
            user_role: null,
            setUser: (user) => set({ user }),
            setUserDetails: (userId, userRole) => set({ user_id: userId, user_role: userRole }),
        }),
        {
            name: 'food-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    )
) 