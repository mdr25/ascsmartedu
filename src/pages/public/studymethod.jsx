import About from "../../components/about";
import Features from "../../components/features";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";


export default function MethodPage() {
  return (
     <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
       <Navbar />
       <Features />
      </main>
    </div>
  );
}
