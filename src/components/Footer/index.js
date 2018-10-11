import {Pane, Text} from "evergreen-ui";
import React from "react";

export default function Footer() {
  return (
    <Pane
      className={`header`}
      padding={10}
    >
      <Text size={300}>Made by Daniel Batěk for CaspiaTech</Text>
    </Pane>
  );
}