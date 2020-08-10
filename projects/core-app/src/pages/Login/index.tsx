import React from "react";
import Button from "@kit/core/src/Button";
import { useHistory } from "react-router-dom";
export default () => {
  const { push } = useHistory();
  return (
    <div>
      Login Page
      <Button onClick={() => push("/dashboard")}>Signin</Button>
    </div>
  );
};
