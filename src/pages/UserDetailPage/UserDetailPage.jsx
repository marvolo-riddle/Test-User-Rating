import UserDetail from "../../components/users/UserDetail";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import ReviewForm from "../../components/reviews/ReviewForm";
import Header from "../../components/Headers";
import AuthPopup from "../../components/Authorization/AuthPopup.jsx";
import ReviewsList from "../../components/reviews/ReviewsList";
import {useDispatch} from "react-redux";
import {addReview} from '../../redux/slices/reviewsSlice.js'
import {Typography} from "@mui/material";
import Cookies from "js-cookie";
import {styles} from './styles.js'
import {deleteReview} from '../../redux/slices/reviewsSlice.js';


const UserDetailPage = () => {

  const users = useSelector(state => state.users.users);
  const reviews = useSelector(state => state.reviews.reviews);
  const dispatch = useDispatch();
  const {uid} = useParams();
  const currentUser = users.find(u => u.uid === uid);
  const currentReviews = reviews.filter(r => r.receiverUid === uid);
  const currentActiveUser = users.find(u => u.uid === Cookies.get('uid'));
  const currentActiveUserRole = currentActiveUser ? currentActiveUser.role : null;

  const sendHandle = async (values) => {

    try {
      const {receiverUid, reviewerUid, reviewerContent, rating, reviewerUsername} = values;
      await dispatch(addReview({receiverUid, reviewerUid, reviewerContent, rating, reviewerUsername}));

    } catch (error) {
      console.log("Error sending review:", error);
    }
  }

  const deleteHandle = async (id, uid) => {

    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (confirmDelete) {
      try {
        await dispatch(deleteReview({reviewId: id, receiverUid: uid}));
      } catch (error) {
        console.log("Error deleting review:", error);
      }
    } else {
      console.log("Review deletion cancelled");
    }
  };


  return (
      <>
        <Header/>
        <AuthPopup/>
        <UserDetail user={currentUser}/>
        {Cookies.get('uid') ? <ReviewForm onSubmit={sendHandle}/> :
            <Typography sx={styles.text}>Login or register to leave a review</Typography>}

        <ReviewsList reviews={currentReviews} currentActiveUserRole={currentActiveUserRole}
            handleDelete={deleteHandle}/>
      </>

  )
}
export default UserDetailPage;