import Navbar from "@/Components/Navbar/Navbar2";
import Navigation from "@/Components/Navigation/Navigation";
import Banner from "@/Components/Banner/Banner";
import SampleProduct from "@/Components/SampleProduct/SampleProduct";
import Footer from "@/Components/Footer/Footer";
import {Head} from "@inertiajs/react"

const Index = () => {
    return (
        <div className="pt-44">
            <Head titile="Index-Store" />
            <Navbar />
            <Navigation />
            <SampleProduct />
            <Footer />
        </div>
    );
} 
export default Index;