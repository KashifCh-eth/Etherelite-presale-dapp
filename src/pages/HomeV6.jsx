import React from "react";
import Layout from "../Layout";
import Header from "../components/header/v1/Header";
import Banner from "../sections/banner/v6/Banner";

const HomeV6 = () => {
  return (
    <Layout pageTitle="Ethere Elite">
      <Header variant="v5" />
      <Banner />
    </Layout>
  );
};

export default HomeV6;
