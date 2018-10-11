import React from 'react';
import {Card} from "evergreen-ui";
import LoginContainer from "Containers/LoginContainer";
import Header from "Components/Header";


export default function LoginPage() {
  return (
    <Card
      className={`login-page`}
      appearance="tint2"
      width={500}
      padding={15}
      margin={'auto'}
    >
      <Header/>
      <LoginContainer/>
    </Card>
  )
}