import moment from "moment";
import { useEffect, useState } from "react";
import { Document } from "../../../lib";

import { Accordion, Flex, Text, useColorModeValue } from "@chakra-ui/react";

import { BillingRow, Card, CardBody, CardHeader, Empty } from "../../../components";

interface BillingInformationProps {
  title: string;
  data: Document[];
}

const BillingInformation = ({ title, data }: BillingInformationProps) => {
  const textColor = useColorModeValue("gray.700", "white");
  const [empty, setEmpty] = useState(true);
  const [row, setRow] = useState<Document[]>([]);

  useEffect(() => {
    const array: Document[] = [];
    data.forEach((doc) => {
      if (doc.status === "Pending") {
        array.push(doc);
      }
    });
    if (array.length === 0) {
      setEmpty(true);
    } else {
      setRow(array);
      setEmpty(false);
    }
  }, [data]);
  return (
    <Card my={{ lg: "24px" }} me={{ lg: "24px" }} isLoaded={!!data}>
      <Flex direction="column" h="100%">
        <CardHeader py="12px">
          <Text color={textColor} fontSize="lg" fontWeight="bold">
            {title}
          </Text>
        </CardHeader>
        <CardBody h="100%">
          {!empty ? (
            <Accordion as={Flex} allowToggle flexDir="column" w="100%">
              {data.map((row, index) => {
                return (
                  row.status === "Pending" && (
                    <BillingRow
                      key={index}
                      name={row.name}
                      createdAt={moment(row.createdAt).calendar()}
                      email={row.pix}
                      value={row.request}
                      status={row.status}
                      uid={row.id}
                    />
                  )
                );
              })}
            </Accordion>
          ) : (
            <Empty />
          )}
        </CardBody>
      </Flex>
    </Card>
  );
};

export default BillingInformation;
