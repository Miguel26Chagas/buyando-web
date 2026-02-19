import { create } from "zustand";

const useBear = create((set) => ({
    bears: 0,
    increadePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({bears: 0}),
    updateBears: (newBears) => set({ bears: newBears }),
}))

function BearCounter() {
    const bears = useBear((state) => state.bears)
    return <h1>{bears} bears around here...</h1>
  }

  function Controls() {
    const increasePopulation = useBear((state) => state.increasePopulation)
    return <button onClick={increasePopulation}>one up</button>
  }