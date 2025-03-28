import Navbar from "@/Components/Navbar/Navbar";
import Navigation from "@/Components/Navigation/Navigation";
import Banner from "@/Components/Banner/Banner";
import SampleProduct from "@/Components/SampleProduct/SampleProduct";
import About from "@/Components/About/About";
import { Head } from "@inertiajs/react";
import Footer from "@/Components/Footer/Footer";

const Index = () => {
    return (
        <div className="rounded- container mx-auto max-w-7xl px-4">
            <Head title="Landing"/>
            <Navbar />
            <Banner />  
            {/* <About /> */}
            <Footer />
        </div>
    );
} 
export default Index;