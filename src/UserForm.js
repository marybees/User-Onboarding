import React from 'react'

export default function UserForm(props) {
  const {
    values,
    submit,
    inputChange,
    checkboxChange,
    disabled,
    errors,
  } = props

  const onSubmit = evt => {
    evt.preventDefault()
    submit()
  }

  const onCheckboxChange = evt => {
    const { name, checked } = evt.target
    checkboxChange(name, checked)
  }

  const onInputChange = evt => {
    const { name, value } = evt.target
    inputChange(name, value)
  }

  return (
    <form className='form container' onSubmit={onSubmit}>
    
      <div className='form-group inputs'>
        <h2>Add a User</h2>

        {/* ////////// TEXT INPUTS ////////// */}
        <label>Name:&nbsp;
          <input
            value={values.name}
            onChange={onInputChange}
            name='name'
            placeholder='Name'
            type='text'
          />
        </label>

        <br></br>
        <br></br>

        <label>Email:&nbsp;
          <input
            value={values.email}
            onChange={onInputChange}
            name='email'
            placeholder='Email'
            type='text'
          />
        </label>

        <br></br>
        <br></br>

        <label>Password:&nbsp;
            <input
                value={values.password}
                onChange={onInputChange}
                name='password'
                placeholder='Password'
                type='text'
            />
        </label>

        <br></br>
        <br></br>

        {/* ////////// CHECKBOXES ////////// */}
        <label>Terms of Use:&nbsp;
          <input
            type="checkbox"
            name='terms'
            checked={values.terms}
            onChange={onCheckboxChange}
          />
        </label>

        <br></br>
        <br></br>

      </div>

      <div className='form-group submit'>
        {/* 🔥 DISABLE THE BUTTON */}
        <button disabled={disabled}>Submit</button>
        <div className='errors'>
          {/* 🔥 RENDER THE VALIDATION ERRORS HERE */}
          <div>{errors.name}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
          <div>{errors.terms}</div>
        </div>
      </div>

    </form>
  )
}
