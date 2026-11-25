
// import { useEffect } from "react";
import About from "../components/about";
import Hero from "../components/hero";
import Products from "../components/products/products";
import Testimonials from "../components/testimonials";
import LenisProvider from "../providers/lenis-provider";
import Navbar from "../components/navbar";
import FAQ from "../components/faq";
import { products, } from "@/data";



export default async function Home() { 

  return (
     <LenisProvider>
          <Navbar />
          <Hero />
          <Products />
           <About />
          <Testimonials />
          <FAQ />
     </LenisProvider>
  );
}

