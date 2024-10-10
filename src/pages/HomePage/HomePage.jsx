import Header from "../../components/Headers";
import UserList from "../../components/users/UserList";
import {useSelector} from "react-redux";
import AuthPopup from "../../components/Authorization/AuthPopup.jsx";


const HomePage = () => {

  const users = useSelector((state) => state.users.users);
  const reviews = useSelector(state => state.reviews.reviews);

  return (

      <>
        <Header/>
        <AuthPopup/>
        <UserList users={users} reviews={reviews}/>
      </>

  )
}

export default HomePage;