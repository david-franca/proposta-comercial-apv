import React from "react";

import { Col, Container, Input, Row, Text } from "@nextui-org/react";

const NextUi = () => {
  return (
    <Container lg>
      <Row justify="center">
        <Col>
          <Input label="Nome Completo" width="100%" />
          <Input label="Telefone" width="100%" />
          <Input label="Email" width="100%" />
          <Input label="Placa" width="100%" />
        </Col>
      </Row>
    </Container>
  );
};

export default NextUi;
