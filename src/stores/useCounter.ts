import type { CounterStore } from '@/types';
import { create } from 'zustand'

export const useCounter = create<CounterStore>()((set) => ({
  count: 0,
  increment: () => set((state) => ({
    count: state.count + 1
  })),
  decrement: () => set((state) => ({
    count: state.count - 1
  })),
  reset: () => set({ count: 0 }),
}));

