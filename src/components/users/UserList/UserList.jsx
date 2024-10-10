import UserItem from '../UserItem';
import {Box} from '@mui/material';
import {styles} from './styles.js';

const UserList = ({users, reviews}) => {
  return (
      <Box sx={styles.container}>

        {users && users.length > 0 ? (
            users
                .filter(user => user.role !== 'admin')
                .map(user => (
                    <UserItem
                        key={user.uid}
                        username={user.username}
                        rating={user.rating}
                        uid={user.uid}
                        reviews={reviews}
                    />
                ))
        ) : (
            <p>No users found.</p>
        )}


      </Box>
  );
}

export default UserList;
