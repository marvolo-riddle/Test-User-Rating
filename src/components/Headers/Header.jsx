import {FaUserLarge} from "react-icons/fa6";
import {Box} from '@mui/material'
import {styles} from './styles.js'
import {useDispatch} from "react-redux";
import {toggleOpen} from '../../redux/slices/dialogSlice.js';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
import routeNames from "../../router/routeNames.js";
import { AiFillHome } from "react-icons/ai";


const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const uid = Cookies.get('uid');

  const openForm = () => {
    if (uid) {
      navigate(routeNames.profilePage.replace(':uid', uid));
    } else {
      dispatch(toggleOpen())
    }
  }

  const handleHome = () => {
    navigate(routeNames.homePage)
  }

  return (
      <Box sx={styles.profileHeader}>
        <Box sx={styles.user}><AiFillHome onClick={handleHome}/></Box>
        <Box sx={styles.user}><FaUserLarge onClick={openForm}/> </Box>

      </Box>


  )
}


export default Header;