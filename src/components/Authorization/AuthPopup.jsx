import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';
import {Button, Dialog, DialogContent} from "@mui/material";
import {styles} from "./styles.js";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import routeNames from "../../router/routeNames.js";
import {toggleOpen} from '../../redux/slices/dialogSlice.js';
import {useState} from "react";
import {register, login} from "../../redux/slices/usersSlice.js";
import Cookies from 'js-cookie';


const AuthPopup = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector(state => state.dialog.isOpen);
  const [open, setOpen] = useState(true);

  const click = () => {
    setOpen(false)
  }

  const handleLogin = async (values) => {
    try {
      const {email, password} = values;
      const action = await dispatch(login({email, password}));

      if (login.rejected.match(action)) {
        alert('You are not registered.')
        return;
      }

      dispatch(toggleOpen());
      navigate(routeNames.profilePage.replace(':uid', Cookies.get('uid')));

    } catch (e) {
      console.error('An unexpected error occurred:', e);
    }
  };

  const handleRegister = async (values) => {

    try {
      const {username, email, password} = values;
      await dispatch(register({email, password, username}));
      await dispatch(login({email, password}));

      dispatch(toggleOpen());
      navigate(routeNames.profilePage.replace(':uid', Cookies.get('uid')));

    } catch (e) {
      console.error(e);
    }

  };


  return (
      <Dialog fullWidth open={isOpen}>
        <DialogContent sx={styles.content}>

          {open ?
              <>
                <LoginForm onSubmit={handleLogin}/>
                <Button type='button' sx={styles.btn2} onClick={click}>Register</Button>
              </>
              :
              <RegisterForm onSubmit={handleRegister}/>}


        </DialogContent>
      </Dialog>
  )
}

export default AuthPopup;