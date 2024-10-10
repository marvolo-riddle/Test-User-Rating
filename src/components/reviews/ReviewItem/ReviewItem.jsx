import {styles} from './styles.js';
import {Typography, Box, Rating, Button} from "@mui/material";
import {useParams} from "react-router-dom";
import {RiDeleteBin6Line} from "react-icons/ri";

const ReviewItem = ({
                      reviewerContent,
                      rating,
                      reviewerUsername,
                      createdAt,
                      handleDelete,
                      userRole
                    }) => {

  const {uid} = useParams();
  const isUserPage = !!uid;

  return (
      <Box sx={styles.wrap}>
        <Box sx={styles.item}>
          <Typography sx={styles.username}> {reviewerUsername}</Typography>
          <Typography sx={styles.text}>{reviewerContent}</Typography>
          <Rating sx={styles.rating} value={rating} readOnly/>

          {uid ? <Typography sx={styles.data}>{new Date(createdAt).toLocaleString()}</Typography> : null}

        </Box>


        {isUserPage && userRole === 'admin' && (
            <Button onClick={handleDelete}>
              <RiDeleteBin6Line style={styles.icon}/>
            </Button>
        )}
      </Box>
  );
};

export default ReviewItem;
