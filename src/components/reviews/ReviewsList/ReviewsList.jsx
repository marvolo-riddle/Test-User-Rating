import ReviewItem from "../ReviewItem";
import {styles} from "./styles.js";
import {Box, Typography} from "@mui/material";


const ReviewsList = ({reviews, currentActiveUserRole, handleDelete}) => {

  return (

      <Box sx={styles.container}>

        {reviews && reviews.length > 0 ? (
            reviews
                .slice()
                .reverse()
                .map((rev) => (

                    <ReviewItem
                        key={rev.id}
                        rating={rev.rating}
                        reviewerContent={rev.reviewerContent}
                        reviewerUid={rev.reviewerUid}
                        reviewerUsername={rev.reviewerUsername}
                        createdAt={rev.createdAt}
                        userRole={currentActiveUserRole}
                        handleDelete={() => handleDelete(rev.id, rev.receiverUid)}
                    />

                ))
        ) : (
            <Typography sx={styles.text}>No reviews available.</Typography>
        )}

      </Box>
  )
}
export default ReviewsList;