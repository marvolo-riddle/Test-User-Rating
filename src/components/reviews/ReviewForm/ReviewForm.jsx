import {useFormik} from "formik";
import {TextField, Box, Button, Typography, Rating} from "@mui/material";
import * as Yup from 'yup';
import {styles} from './styles.js';
import Cookies from "js-cookie";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";


const validationSchema = Yup.object({
  reviewerContent: Yup.string().required("Text is required"),
  rating: Yup.number().required("Rating is required").min(1).max(5),
})


const ReviewForm = ({onSubmit}) => {

  const {uid} = useParams();
  const reviewerUid = Cookies.get('uid');
  const user = useSelector(state => state.users.users.find(e => e.uid === reviewerUid));
  const username = user ? user.username : '';

  const formik = useFormik({
    initialValues: {
      reviewerContent: '',
      rating: null,
      receiverUid: uid,
      reviewerUid: reviewerUid,
      reviewerUsername: username
    },
    validationSchema,
    onSubmit: (values, {resetForm}) => {
      onSubmit(values)
      resetForm()
    }
  })

  return (
      <Box sx={styles.container}>

        <Typography sx={styles.text}>Leave your review</Typography>

        <form style={styles.form} onSubmit={formik.handleSubmit}>

          <TextField
              label="Review..."
              value={formik.values.reviewerContent}
              onChange={formik.handleChange}
              name="reviewerContent"
          />

          <Rating
              sx={styles.rating}
              name="rating"
              value={formik.values.rating}
              onChange={(event, newValue) => {
                formik.setFieldValue("rating", newValue);
              }}
              precision={1}
              size="large"
          />

          <Button type='submit' sx={styles.btn}>Send</Button>
        </form>

      </Box>
  )

}
export default ReviewForm;