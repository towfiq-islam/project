import React from "react";
import { Hero } from "./_Components/Hero";
import { NewDrops } from "./_Components/NewDrops";
import { Categories } from "./_Components/Categories";
import { Reviews } from "./_Components/Reviews";
import { PromoBanner } from "./_Components/PromoBanner";

const page = () => {
  return (
    <>
      <Hero />
      <NewDrops />
      <Categories />
      <Reviews />
      <PromoBanner />
    </>
  );
};

export default page;
