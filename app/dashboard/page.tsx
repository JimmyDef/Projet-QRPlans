import { auth } from '@/lib/auth'
// import React from 'react'

const Dashboard = async ({ t, session }) => {
  return (
    <>
      <h1>dashboard</h1>
      <p>Session: {JSON.stringify(session)}</p>
    </>
  )
}

export default Dashboard
