import About from "../../components/about";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";


export default function AboutPage() {
  return (
     <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
       <Navbar />
       <About />
      </main>
    </div>
  );
}
