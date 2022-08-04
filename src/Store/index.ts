import { configureStore } from "@reduxjs/toolkit";

import myData from './reducer' 

export default configureStore({
  reducer:{
    myData
  }
})
