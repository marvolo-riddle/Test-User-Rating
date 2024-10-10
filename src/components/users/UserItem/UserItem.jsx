import {Box, Typography, Rating} from "@mui/material";
import {styles} from './styles.js'
import {Link} from "react-router-dom";
import routeNames from "../../../router/routeNames.js";
import ReviewsCarousel from "../../reviews/ReviewsCarousel";


const UserItem = ({rating, username, uid, reviews}) => {

  const userReviews = reviews.filter(review => review.receiverUid === uid);

  return (
      <Box sx={styles.container}>

        <Box sx={styles.userBox}>

          <Typography sx={styles.link}>
            <Link style={styles.username} to={routeNames.userDetailPage.replace(':uid', uid)}> {username}
            </Link>
          </Typography>


          <Box>
            <Rating sx={styles.rating} value={rating} readOnly/>
          </Box>

        </Box>

        <Box sx={styles.carouselBox}>
          <ReviewsCarousel reviews={userReviews}/>
        </Box>
      </Box>
  )
}
export default UserItem