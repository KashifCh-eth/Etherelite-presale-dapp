import React from "react";
import Layout from "../Layout";
import Header from "../components/header/v1/Header";
import Banner from "../sections/banner/v3/Banner";

const HomeV3 = () => {
  return (
    <Layout pageTitle="Ethere Elite">
      <Header variant="v2" />
      <Banner />
    </Layout>
  );
};

export default HomeV3;
