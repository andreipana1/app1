import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

interface LoginSlice {
  isLoginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
}

interface RegisterSlice {
  isRegisterOpen: boolean;
  openRegister: () => void;
  closeRegister: () => void;
}

interface HotelSlice {
  isHotelOpen: boolean;
  openHotel: () => void;
  closeHotel: () => void;
  // Backward compatibility for components that still use rent terminology
  isRentOpen: boolean;
  openRent: () => void;
  closeRent: () => void;
}

interface SearchSlice {
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

const createLoginSlice: StateCreator<LoginSlice> = (set) => ({
  isLoginOpen: false,
  openLogin: () => set({ isLoginOpen: true }),
  closeLogin: () => set({ isLoginOpen: false }),
});

const createRegisterSlice: StateCreator<RegisterSlice> = (set) => ({
  isRegisterOpen: false,
  openRegister: () => set({ isRegisterOpen: true }),
  closeRegister: () => set({ isRegisterOpen: false }),
});

const createHotelSlice: StateCreator<HotelSlice> = (set, get) => ({
  isHotelOpen: false,
  openHotel: () => set({ isHotelOpen: true, isRentOpen: true }),
  closeHotel: () => set({ isHotelOpen: false, isRentOpen: false }),
  // Backward compatibility
  get isRentOpen() { return get().isHotelOpen; },
  openRent: () => set({ isHotelOpen: true, isRentOpen: true }),
  closeRent: () => set({ isHotelOpen: false, isRentOpen: false }),
});

const createSearchSlice: StateCreator<SearchSlice> = (set) => ({
  isSearchOpen: false,
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
});

export const useModalStore = create<
  LoginSlice & RegisterSlice & HotelSlice & SearchSlice
>()(
  devtools((...a) => ({
    ...createLoginSlice(...a),
    ...createRegisterSlice(...a),
    ...createHotelSlice(...a),
    ...createSearchSlice(...a),
  })),
);
