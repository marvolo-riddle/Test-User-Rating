import {IoIosArrowRoundBack} from "react-icons/io";
import {CiLogin} from "react-icons/ci";
import {Box} from '@mui/material'
import {styles} from './styles.js'
import {useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom';
import routeNames from "../../router/routeNames.js";
import {logout} from "../../redux/slices/usersSlice.js";


const ProfileHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleBack = () => {
    navigate(routeNames.homePage)
  }

  const handleLogout = async () => {
    await dispatch(logout());
    navigate(routeNames.homePage);
  }


  return (
      <Box>
        <Box sx={styles.profileHeader}>
          <Box sx={styles.link} onClick={handleBack}>
            <IoIosArrowRoundBack style={styles.icons}/>
          </Box>
          <Box sx={styles.link} onClick={handleLogout}>
            <CiLogin style={styles.icons}/>
          </Box>

        </Box>
      </Box>


  )
}


export default ProfileHeader;