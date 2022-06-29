import { NextPage } from "next";
import React from "react";

import { Container } from "../components";
import { Staff } from "../views/Staff";

const StaffPage: NextPage = () => {
  return (
    <Container name="Apoio" select="staff">
      <Staff />
    </Container>
  );
};

export default StaffPage;
