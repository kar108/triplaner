// Context types

// import { Role } from "../screens/activity/types";

export interface User {
  data: {
    auth:boolean,
    userId: string,
    fullName: string,
    email:string
  };
  update: (data: User["data"]) => void;
}

export enum SnackbarType {
  NONE,
  SUCCESS,
  ERROR,
  INFO
}
interface videoProps{
  knowHowID:string,
  rating:number,
  uploadDateTime:string,
  views:number,
  numberOfRatings:number,
  title:string,
  knowHowDesc:string,
  thumbnailUrl:string,
  videoUrl:string
}



export interface Store {
  token: string;
  customerId:string;
  thumbnailurl?:string;
  videoDetails: videoProps;
  searchKeys:any; 
  updateKnowHow:boolean;
  updateMySpace:boolean;
  clearSearchKeys: () => void;
  setToken: (token: string) => void;
  setThumbnailUrl: (token: string) => void;
  setCustomerId: (token: string) => void;
  setVideoDetails:(token:videoProps)=>void;
  updateSearchKeys:(newString: string) => void;
  setSearchKeys : (newArray: string[]) => void;
  setUpdateKnowHow:(token:boolean)=>void
  setUpdateMySpace:(token:boolean)=>void
}

export interface ModalStore {
  loader: {
    active: boolean;
    bg: string;
    color: string;
  },
  snackbar: {
    type: SnackbarType;
    message: string;
  },
  setLoading: (loading: ModalStore["loader"]) => void;
  setSnackbar: (snackbar: ModalStore["snackbar"]) => void;
}