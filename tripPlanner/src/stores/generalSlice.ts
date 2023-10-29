import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    userAuth:{
      token:'',
      customerId:''
    }
};
export const generalSlice:any = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAuth: (state, action) => {
      state.userAuth = action.payload;
    }
  },
});



export const {setUserAuth} = generalSlice.actions;
export default generalSlice.reducer;
