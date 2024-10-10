import ReviewItem from "../ReviewItem";
import {Box, Typography} from "@mui/material";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {useState} from "react";
import {styles} from './styles.js';

const ReviewsCarousel = ({reviews}) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  if (!reviews || reviews.length === 0) {
    return <Typography sx={styles.text}>No reviews available.</Typography>;
  }

  const {reviewerContent, rating, reviewerUsername} = reviews[currentIndex];


  return (

      <Box sx={styles.container}>

        <Box sx={styles.link}>
          <IoIosArrowBack style={styles.icons} onClick={handlePrev}/>
        </Box>

        <ReviewItem
            reviewerContent={reviewerContent}
            rating={rating}
            reviewerUsername={reviewerUsername}
        />

        <Box sx={styles.link}>
          <IoIosArrowForward style={styles.icons} onClick={handleNext}/>
        </Box>

      </Box>

  );
};

export default ReviewsCarousel;
