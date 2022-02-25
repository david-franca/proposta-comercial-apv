import { ChakraProvider, Portal, useDisclosure } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

import theme from "../../theme/theme";
import route from "../../utils/routes";
import Configuration from "../Configuration/Configuration";
import Footer from "../Footer/Footer";
import MainPanel from "../Layout/MainPanel";
import PanelContainer from "../Layout/PanelContainer";
import PanelContent from "../Layout/PanelContent";
import AdminNavbar from "../Navbars/AdminNavbar";
import { Sidebar } from "../Sidebar/Sidebar";

type ContainerProps = PropsWithChildren<{
  name: string;
  select: string;
}>;

const Container = ({ name, children, select }: ContainerProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider theme={theme} resetCSS={false}>
      <Sidebar routes={route} selected={select} />
      <MainPanel
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}
      >
        <Portal>
          <AdminNavbar
            onOpen={onOpen}
            logoText={"PURITY UI DASHBOARD"}
            brandText={name}
            secondary={false}
            fixed={true}
            selected={select}
          />
        </Portal>
        <PanelContent>
          <PanelContainer>{children}</PanelContainer>
        </PanelContent>
        <Footer />
        <Configuration isOpen={isOpen} onClose={onClose} />
      </MainPanel>
    </ChakraProvider>
  );
};

export default Container;
