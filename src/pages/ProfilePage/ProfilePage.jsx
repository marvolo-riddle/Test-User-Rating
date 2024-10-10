import ProfileHeader from "../../components/Headers/ProfileHeader.jsx";
import UserDetail from '../../components/users/UserDetail';
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {Typography} from "@mui/material";
import ReviewsList from "../../components/reviews/ReviewsList";
import {styles} from './styles.js'

const ProfilePage = () => {

  const users = useSelector(state => state.users.users);
  const reviews = useSelector(state => state.reviews.reviews);
  const {uid} = useParams();
  const currentUser = users.find(u => u.uid === uid);
  const currentReviews = reviews.filter(r => r.receiverUid === uid);

  return (
      <>
        <ProfileHeader/>
        <Typography sx={styles.text}>Your profile</Typography>
        <UserDetail user={currentUser}/>
        <ReviewsList reviews={currentReviews}/>
      </>

  )
}

export default ProfilePage