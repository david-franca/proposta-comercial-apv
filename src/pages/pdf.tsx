import dynamic from "next/dynamic";

/* eslint-disable jsx-a11y/alt-text */

const PDFViewer = dynamic(() => import("../components/PDF"), {
  ssr: false,
});

// Create Document Component
const PDFWithNoSSR = () => <PDFViewer />;

export default PDFWithNoSSR;
