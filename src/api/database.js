import firebaseApp from "./firebaseConfig.js";
import {getDatabase, set, ref, get, push, update} from 'firebase/database'


const database = getDatabase(firebaseApp)


//users

export const saveUserData = async (user) => {

  try {
    await set(ref(database, 'users/' + user.uid), {
      email: user.email,
      username: user.username,
      role: user.role,
    });
    console.log('User data saved successfully');

  } catch (error) {
    throw new Error(error.message);
  }

};


//reviews
export const addReview = async ({receiverUid, reviewerUid, reviewerContent,reviewerUsername, rating}) => {

  try {

    const newReviewRef = push(ref(database, 'reviews'))

    const newReview = {
      id: newReviewRef.key,
      receiverUid: receiverUid,
      reviewerUsername: reviewerUsername,
      reviewerUid: reviewerUid,
      reviewerContent: reviewerContent,
      rating: rating,
      createdAt: new Date().toISOString(),
    }

    await set(newReviewRef, newReview)

    const existingReviewsKeys = await getReviews(receiverUid);

    const updatedReviewsKeys = existingReviewsKeys.includes(newReviewRef.key)
        ? existingReviewsKeys
        : [...existingReviewsKeys, newReviewRef.key];

    await update(ref(database, 'users/' + receiverUid), {
      reviews: updatedReviewsKeys,
    });

    return newReview
  }

  catch (error) {
    throw new Error(error.message)
  }
}

export const getReviews = async (uid) => {

  try {
    const snapshots = await get(ref(database, 'reviews'))
    const reviewsKeys = []

    if (snapshots.exists()) {
      const data = snapshots.val();
      for (let key in data) {
        if (data[key].receiverUid === uid) {
          reviewsKeys.push(key)
        }
      }
    }

    return reviewsKeys
  }
  catch (error) {
    throw new Error(error.message)
  }
}

export const deleteReview = async (reviewId) => {

  try {
    await set(ref(database, 'reviews/' + reviewId), null);
    console.log('Review deleted successfully');
  } catch (error) {
    throw new Error(error.message);
  }

};





