import HeaderPublic from "@/components/layout/HeaderPublic";
import Footer from "@/components/layout/Footer";

export default function ExploreLayout({children}){
    return(
        <>
            <HeaderPublic/>
            <main className="min-h-screen pt-16">{children}</main>
            <Footer/>
        </>
    );
}