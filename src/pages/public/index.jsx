import About from "../../components/about";
import ClassOptions from "../../components/classoption";
import FAQ from "../../components/faq";
import Features from "../../components/features";
import Hero from "../../components/hero";
import Program from "../../components/program";


export default function Home() {
    return (
      <>
        <Hero />
        <About />
        <Program />
        <Features />
        <ClassOptions />
        <FAQ />
      </>
    );
}