import About from "../../components/about";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import Programs from "../../components/program";


export default function ProgramPage() {
  return (
     <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
       <Navbar />
       <Programs />
      </main>
      <Footer />
    </div>
  );
}
