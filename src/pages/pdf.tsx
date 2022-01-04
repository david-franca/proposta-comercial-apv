import { Button, Pane, Strong, Text } from "evergreen-ui";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("../components/PDF"), {
  ssr: false,
});

// Create Document Component

export const PDF = () => {
  return (
    <Pane
      display="flex"
      justifyContent="center"
      width="100%"
      height="100vh"
      alignItems="center"
      border={true}
      flexDirection="column"
    >
      <Pane paddingY={10}>
        <Strong>Clique abaixo para baixar o documento!</Strong>
      </Pane>
      <Pane border={true} paddingX={20} paddingY={10} borderRadius={25}>
        <PDFViewer />
      </Pane>
    </Pane>
  );
};

export default PDF;
