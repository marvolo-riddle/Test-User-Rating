import {configureStore} from "@reduxjs/toolkit";
import reviewsReducer from "./slices/reviewsSlice.js";
import userReducer from "./slices/usersSlice.js";
import dialogReducer from "./slices/dialogSlice.js";


export const store = configureStore({
  reducer: {
    reviews: reviewsReducer,
    users: userReducer,
    dialog: dialogReducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(),
});