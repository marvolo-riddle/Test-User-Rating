import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {addReview as apiAddReview, deleteReview as apiDeleteReview} from "../../api/database.js";
import {updateUserReviews} from "./usersSlice.js";
import {createSelector} from '@reduxjs/toolkit';

export const selectReviewsByUser = (state, receiverUid) => {
  return state.reviews.reviews.filter(review => review.receiverUid === receiverUid);
};

export const selectAverageRatingByUser = createSelector(
    [selectReviewsByUser],
    (reviews) => {
      if (reviews.length === 0) return null;

      const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
      return totalRating / reviews.length;
    }
);

export const deleteReview = createAsyncThunk('reviews/deleteReview', async ({reviewId, receiverUid}, {dispatch}) => {
  await apiDeleteReview(reviewId);
  dispatch(updateUserReviews(receiverUid));
  return reviewId;
});


const saveReview = (newReview) => {

  const existingReviews = JSON.parse(localStorage.getItem('reviews')) || [];
  existingReviews.push(newReview);

  localStorage.setItem('reviews', JSON.stringify(existingReviews));
};

const getReviewsFromStorage = () => {
  const reviews = JSON.parse(localStorage.getItem('reviews'));
  return reviews ? reviews : [];
};

const initializeReviews = () => {
  const existingReviews = getReviewsFromStorage();
  if (existingReviews.length > 0) return;
  const testReviews = [];
  localStorage.setItem('reviews', JSON.stringify(testReviews));
};

export const addReview = createAsyncThunk('reviews/addReview', async ({
                                                                        receiverUid,
                                                                        reviewerUid,
                                                                        reviewerContent,
                                                                        rating,
                                                                        reviewerUsername
                                                                      }, {dispatch}) => {
  const newReview = await apiAddReview({
    receiverUid,
    reviewerUid,
    reviewerContent,
    rating,
    reviewerUsername
  });
  console.log('proba');

  dispatch(updateUserReviews(receiverUid));

  return newReview;
});




const reviewsSlice = createSlice({

  name: 'reviews',

  initialState: {
    reviews: (() => {
      initializeReviews();
      return getReviewsFromStorage();
    })(),
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers:
      builder => {
        builder

            .addCase(addReview.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(addReview.fulfilled, (state, action) => {
              state.loading = false;
              state.error = null;
              state.reviews.push(action.payload);
              saveReview(action.payload);
            })
            .addCase(addReview.rejected, (state, action) => {
              state.loading = false;
              state.error = action.error.message || "Error";
            })

            .addCase(deleteReview.fulfilled, (state, action) => {

              state.reviews = state.reviews.filter(review => review.id !== action.payload);

              const existingReviews = getReviewsFromStorage();
              const updatedReviews = existingReviews.filter(review => review.id !== action.payload);

              localStorage.setItem('reviews', JSON.stringify(updatedReviews));
            });

      }

})

export default reviewsSlice.reducer