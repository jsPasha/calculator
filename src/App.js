import React from "react";

import Layout from "./hoc/Layout/Layout";
import Calculator from "./containers/Calculator/Calculator";

const app = () => {
  return (
    <Layout>
      <Calculator />
    </Layout>
  );
};

export default app;
