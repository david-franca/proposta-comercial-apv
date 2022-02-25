import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Container from "../../../components/Container/Container";
import HandlingView from "../../../views/Handling";

const Handling = () => {
  const router = useRouter();
  const id = router.query.id as string;

  return (
    <Container name="Atendimento" select="handling">
      <HandlingView id={id} />
    </Container>
  );
};

export default Handling;
