import React from 'react';
import {Pane,} from "evergreen-ui";
import LightsContainer from "Containers/LightsContainer";
import Header from "Components/Header";

export default function LightsPage() {
  return (
    <Pane
      className={`lights-page`}
      appearance="tint2"
      width={1110}
      padding={15}
      margin={'auto'}
    >
      <Header/>
      <LightsContainer/>
    </Pane>
  )
}