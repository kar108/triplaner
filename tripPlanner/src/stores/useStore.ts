import { create } from "zustand";

import { ModalStore, SnackbarType, Store} from "./types";
import { COLORS } from "../utils/constants";

export  const useStore = create<Store>((set) => ({
  // States
  token: "",
  customerId:'',
  thumbnailurl:'',
  updateKnowHow:true,
  updateMySpace:true,
  videoDetails:{
    knowHowID: "",
    rating: 0,
    uploadDateTime: "",
    views: 0,
    numberOfRatings: 0,
    title: "",
    knowHowDesc: "",
    videoUrl:"",
    thumbnailUrl:""
  },
  searchKeys:[],
  
  // Update functions
  updateSearchKeys: (key: string) => set((state) => ({
    searchKeys: [...state.searchKeys, key]
  })),
  setSearchKeys: (newArray: string[]) => set({ searchKeys: newArray }),
  clearSearchKeys: () => set({ searchKeys: [] }),
  setToken: (token: string) => set({ token }),
  setCustomerId: (customerId: string) => set({ customerId }),
  setThumbnailUrl: (thumbnailurl: string) => set({ thumbnailurl }),
  setVideoDetails: (videoDetails: any) => set({ videoDetails }),
  setUpdateKnowHow: (updateKnowHow: any) => set({ updateKnowHow }),
  setUpdateMySpace: (updateMySpace: any) => set({ updateMySpace }),
  
}));



export const useModal = create<ModalStore>((set) => ({
  // States
  loader: {
    active: false,
    bg: COLORS.dark_overlay,
    color: COLORS.white,
  },
  snackbar: {
    type: SnackbarType.NONE,
    message: "",
  },

  // Update functions
  setLoading: (loader: ModalStore["loader"]) => set({ loader }),
  setSnackbar: (snackbar: ModalStore["snackbar"]) => set({ snackbar }),
}));