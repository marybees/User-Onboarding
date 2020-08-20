import React from 'react'

function User({ details }) {
  if (!details) {
    return <h3>Onboarded Users</h3>
  }

  return (
    <div className='user container'>
      <h2>{details.name}</h2>
      <p>Email: {details.email}</p>
      <p>Password: {details.password}</p>
      <p>Terms: {details.terms == true ? 'agreed' : 'not agreed' }</p>
    </div>
  )
}

export default User
