import {useFormik} from "formik";
import {TextField, Box, Button, Typography} from "@mui/material";
import * as Yup from 'yup';
import {styles} from './styles.js';


const validationSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
})

const LoginForm = ({onSubmit}) => {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values)
    }
  })

  return (

      <Box sx={styles.container}>
        <Typography sx={styles.text}>Please log in to your account</Typography>

        <form style={styles.form} onSubmit={formik.handleSubmit}>
          <TextField
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              name="email"
          />
          <TextField
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              type="password"
              name="password"
          />
          <Button type='submit' sx={styles.btn}>Log In</Button>
        </form>

      </Box>

  )
}
export default LoginForm;