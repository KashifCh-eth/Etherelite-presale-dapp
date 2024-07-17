import React from "react";
import Layout from "../Layout";
import Header from "../components/header/v1/Header";
import Banner from "../sections/banner/v5/Banner";

const HomeV5 = () => {
  return (
    <Layout pageTitle="Ethere Elite">
      <Header variant="v4" />
      <Banner />
    </Layout>
  );
};

export default HomeV5;
