import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {registerUser, loginUser, logoutUser} from "../../api/auth.js";
import {saveUserData, getReviews} from "../../api/database.js";
import {testUsers} from "../../data/testUsers.js";
import Cookies from "js-cookie";
import {selectAverageRatingByUser} from "./reviewsSlice.js";


const saveUser = (newUser) => {

  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  const existingUserIndex = existingUsers.findIndex(user => user.uid === newUser.uid);

  if (existingUserIndex >= 0) {
    existingUsers[existingUserIndex] = newUser;

  } else {
    existingUsers.push(newUser);
  }

  localStorage.setItem('users', JSON.stringify(existingUsers));
};

const getUsers = () => {
  const users = JSON.parse(localStorage.getItem('users'));
  return users ? users : []
}

const initializeTestUsers = () => {
  const existingUsers = getUsers()

  if (existingUsers.length > 0) return;

  localStorage.setItem('users', JSON.stringify(testUsers));

}


export const register = createAsyncThunk('users/register', async ({email, password, username}) => {
  try {

    const user = await registerUser(email, password);
    const userData = {
      isAuthenticated: true,
      uid: user.uid,
      email: user.email,
      role: 'user',
      username: username,
      rating: null,
      reviewsKeys: []
    };

    await saveUserData(userData);

    return userData;
  } catch (e) {
    throw new Error(e.message);
  }
});


export const login = createAsyncThunk('users/login', async ({email, password}) => {
  try {
    const user = await loginUser(email, password);
    Cookies.set('uid', user.uid);
    return {uid: user.uid, email: user.email};

  } catch (e) {
    throw new Error(e.message);
  }
})


export const logout = createAsyncThunk('users/logout', async () => {

  try {
    await logoutUser()

  } catch (e) {
    throw new Error(e.message);
  }
})


export const updateUserReviews = createAsyncThunk('users/updateUserReviews', async (receiverUid, {getState}) => {

  const reviewsKeys = await getReviews(receiverUid);
  const state = getState();
  const averageRating = selectAverageRatingByUser(state, receiverUid);

  return {receiverUid, reviewsKeys, averageRating};
});



const usersSlice = createSlice({

  name: "users",

  initialState: {
    users: (() => {
      initializeTestUsers();
      return getUsers() || [];
    })(),
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: builder => {
    builder

        .addCase(register.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(register.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.users.push(action.payload);
          saveUser(action.payload)
        })
        .addCase(register.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Error";
        })

        .addCase(login.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          const currentUser = state.users.find(user => user.uid === action.payload.uid);

          if (currentUser) {
            currentUser.isAuthenticated = true;
            saveUser(currentUser)
          }
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Error";
        })

        .addCase(logout.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(logout.fulfilled, (state) => {
          state.loading = false;
          state.error = null;
          const uid = Cookies.get('uid');
          const currentUser = state.users.find(user => user.uid === uid);

          if (currentUser) {
            currentUser.isAuthenticated = false;
            saveUser(currentUser);
          }

          Cookies.remove('uid');
        })
        .addCase(logout.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Error";
        })

        .addCase(updateUserReviews.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateUserReviews.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          const user = state.users.find(user => user.uid === action.payload.receiverUid);

          if (user) {
            user.reviewsKeys = action.payload.reviewsKeys;
            user.rating = action.payload.averageRating;
            saveUser(user)
          }
        })
        .addCase(updateUserReviews.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Error";

        })


  },
})


export default usersSlice.reducer;