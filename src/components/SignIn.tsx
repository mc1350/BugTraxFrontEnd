import { Card } from '@mui/material'
import React from 'react'
import LoginButton from '../login'

export default function SignIn() {
  return (
    <div className="center" >
      <div style={{paddingTop: '20vh', maxWidth: 300}}>
      <Card className="flex">
      <img src={require('./logo.png')}/>
      {LoginButton()}
      </Card>
      </div>
    </div>
  )
}
