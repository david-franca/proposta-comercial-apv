import { useEffect, useState } from "react";
import { Document, useCollection } from "swr-firestore-v9";

import { Flex, Grid } from "@chakra-ui/react";

import { Withdrawals } from "../../@types/interfaces";
import BillingInformation from "./components/BillingInformation";
import Transactions from "./components/Transactions";

const Billing = () => {
  const { data: withdrawals } = useCollection<Withdrawals>("Withdrawals", {
    parseDates: ["createdAt"],
    listen: true,
    orderBy: ["createdAt", "asc"],
  });

  const [billingData, setBillingData] = useState<Document<Withdrawals>[]>([]);

  useEffect(() => {
    if (withdrawals) {
      setBillingData(withdrawals);
    }
  }, [withdrawals]);
  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Grid templateColumns={{ sm: "1fr", lg: "1.6fr 1.4fr" }}>
        <BillingInformation title={"Solicitações de Saque"} data={billingData} />
        <Transactions title={"Saídas"} date={"23 - 30 Março"} transactions={billingData} />
      </Grid>
    </Flex>
  );
};

export default Billing;
