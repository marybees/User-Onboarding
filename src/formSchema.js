import * as yup from 'yup'

const formSchema = yup.object().shape({
  email: yup
    .string()
    .email('Valid email required')
    .required('Email required'),
  name: yup
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .required('Name required'),
  password: yup
    .string()
    .required('Password required'),
})

export default formSchema
