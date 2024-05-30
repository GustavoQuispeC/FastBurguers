import { AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";
import Container from "@/components/container/Container"
import FooterList from "./FooterList";
import Link from "next/link";
import { MdFacebook } from "react-icons/md";
const Footer: React.FC= (): React.ReactElement=>{
    return (
       <footer className="bg-black text-slate-200 text-sm">
        <Container>
            <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">   
<FooterList>
    <h3 className=" text-base text-orange-500 font-bold mb-2">
        Menu Categories
    </h3>

    <div>Classic Burgers</div>
    <div>Cheeseburgers</div>
    <div>Veggie Burgers</div>
    <div>Speciality Burguers</div>
    
</FooterList>
<FooterList>
    <h3 className=" text-base text-orange-500 font-bold mb-2">
        Customer Service
    </h3>

    <div>Contact Us</div>
    <div>Delivery Policy</div>
    <div>Returns & Exchanges</div>
<div>FAQs</div>
    
</FooterList>

<div className=" w-full md:w-1/3 mb-6 md:mb-0">
<h3 className="text-base font-bold mb-2 text-orange-500">About Us</h3>
<p className="mb-2"> Welcome to Fast Burgers—your spot for quick, delicious burgers and more! We focus on fresh ingredients and speedy service to deliver a top-notch dining experience. Enjoy our range of burgers, sides, and drinks today.

©2024 Fast Burgers. All Rights Reserved.</p>
<p>&copy;{new Date().getFullYear()} E-Shop. All Rights reserved </p>
</div>
<FooterList>
    <h3 className="text-base text-orange-500 font bold mb-2"> Follow Us</h3>
    <div className="flex gap-2">
        <Link href={"https://www.facebook.com/"}><MdFacebook size={24}/></Link>
        <Link href={"https://twitter.com/"}><AiFillTwitterCircle size={24}/></Link>
        <Link href={"https://www.instagram.com/patolucaaaaa/"}><AiFillInstagram size={24}/></Link>
        <Link href={"https://www.youtube.com/"}><AiFillYoutube size={24}/></Link>
    </div>
</FooterList>
</div>
</Container>
</footer>
    )
};

export default Footer;
