import React, { useState, useEffect } from 'react'
import User from './User'
import UserForm from './UserForm'
// 🔥 STEP 1- CHECK THE ENDPOINTS USING POSTMAN OR HTTPIE
// 🔥 STEP 2- FLESH OUT UserForm.js
// 🔥 STEP 3- FLESH THE SCHEMA IN ITS OWN FILE
// 🔥 STEP 4- IMPORT THE SCHEMA, AXIOS AND YUP
import formSchema from './formSchema'
import axios from 'axios'
import * as yup from 'yup'

//////////////// INITIAL STATES ////////////////
const initialFormValues = {
  name: '',
  email: '',
  password: '',
  terms: false,
}
const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  terms: false,
}

const initialUsers = []
const initialDisabled = true


export default function App() {
  //////////////// STATES ////////////////
  const [users, setUsers] = useState(initialUsers)                // array of user objects
  const [formValues, setFormValues] = useState(initialFormValues) // object
  const [formErrors, setFormErrors] = useState(initialFormErrors) // object
  const [disabled, setDisabled] = useState(initialDisabled)       // boolean

  console.log(users)

  //////////////// NETWORKING HELPERS ////////////////
  // const getUsers = () => {
  //   // 🔥 STEP 5- IMPLEMENT! ON SUCCESS PUT USERS IN STATE
  //   axios.get('https://reqres.in/api/users')
  //     .then(res => {
  //       console.log(res.data)
  //       // setUsers(res.data)
  //     })
  //     .catch(err => {
  //       return err
  //     })
  // }

  const postNewUser = newUser => {
    // 🔥 STEP 6- IMPLEMENT! ON SUCCESS ADD NEWLY CREATED USER TO STATE
    //    helper to [POST] `newUser` to `https://reqres.in/api/users`
    //    and regardless of success or failure, the form should reset
    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        // setUsers(users.concat(res.data))
        setUsers([...users, res.data])
      })
      .catch(err => {
        return err
      })
      .finally(() => {
        setFormValues(initialFormValues)
      })
  }

  //////////////// FORM ACTIONS ////////////////
  const inputChange = (name, value) => {
    // 🔥 STEP 11- RUN VALIDATION WITH YUP
    yup
      .reach(formSchema, name)
      //we can then run validate using the value
      .validate(value)
      // if the validation is successful, we can clear the error message
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        })
      })
      /* if the validation is unsuccessful, we can set the error message to the message 
        returned from yup (that we created in our schema) */
      .catch(err => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        })
      })

    setFormValues({
      ...formValues,
      [name]: value // NOT AN ARRAY
    })
  }

  const checkboxChange = (name, isChecked) => {
    // 🔥 STEP 7- IMPLEMENT!
    //  set a new state for the whole form
    setFormValues({
      ...formValues,
      terms: {
        ...formValues.terms,
        [name]: isChecked,
      }
    })
  }

  const submit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: Object.keys(formValues.terms).filter(ter => formValues.terms[ter]),
    }
    // 🔥 STEP 9- POST NEW FRIEND USING HELPER
    postNewUser(newUser)
  }

  //////////////// SIDE EFFECTS ////////////////
  useEffect(() => {
    // getUsers()
  }, [])

  useEffect(() => {
    // 🔥 STEP 10- ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
    formSchema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid);
      })
  }, [formValues])

  return (
    <div className='container'>
      <header><h1>User Onboarding App</h1></header>
      <UserForm
        values={formValues}
        inputChange={inputChange}
        checkboxChange={checkboxChange}
        submit={submit}
        disabled={disabled}
        errors={formErrors}
      />

    <User/>

      {
        users.map(user => {
          return (
            <User key={user.id} details={user} />
          )
        })
      }
    </div>
  )
}