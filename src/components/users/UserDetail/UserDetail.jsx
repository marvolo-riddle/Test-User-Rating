import {styles} from './styles.js';
import {Box, Typography, Rating} from "@mui/material";


const UserDetail = ({user}) => {

  return (
      <Box sx={styles.wrapper}>

        <Box sx={styles.container}>
          <Typography sx={styles.roleTxt}>{user.role}</Typography>

          <Typography sx={styles.usernameTxt}>{user.username}</Typography>

          <Typography sx={styles.emailTxt}>{user.email}</Typography>

          <Box>
            <Rating sx={styles.rating} value={user.rating} readOnly/>
          </Box>

          <Typography sx={styles.reviewsTxt}>
            Reviews: {Array.isArray(user.reviewsKeys) ? user.reviewsKeys.length : 0}
          </Typography>

        </Box>

      </Box>

  )
}
export default UserDetail