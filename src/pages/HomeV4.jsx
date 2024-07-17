import React from "react";
import Layout from "../Layout";
import Header from "../components/header/v1/Header";
import Banner from "../sections/banner/v4/Banner";

const HomeV4 = () => {
  return (
    <Layout pageTitle="Ethere Elite">
      <Header variant="v3" />
      <Banner />
    </Layout>
  );
};

export default HomeV4;
