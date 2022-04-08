import moment from "moment";
import { useEffect, useState } from "react";
import { Document } from "swr-firestore-v9";

import { Accordion, Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";

import { Withdrawals } from "../../../@types/interfaces";
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import CardHeader from "../../../components/Card/CardHeader";
import Empty from "../../../components/Empty";
import BillingRow from "../../../components/Tables/BillingRow";

interface BillingInformationProps {
  title: string;
  data: Document<Withdrawals>[];
}

const BillingInformation = ({ title, data }: BillingInformationProps) => {
  const textColor = useColorModeValue("gray.700", "white");
  const [empty, setEmpty] = useState(true);
  const [row, setRow] = useState<Document<Withdrawals>[]>([]);

  useEffect(() => {
    const array: Document<Withdrawals>[] = [];
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
