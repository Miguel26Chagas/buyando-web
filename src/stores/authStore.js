import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            login: (userData, token) => set({
                user: userData,
                token: token,
                isAuthenticated: true,
            }),

            updateUser: (newData) => set((state) => ({user: {...state.user, ...newData}})),

            logout: () => set({
                user: null,
                token: null,
                isAuthenticated: false,
            })
        }),
        {name: 'auth-storage'}
    )
)