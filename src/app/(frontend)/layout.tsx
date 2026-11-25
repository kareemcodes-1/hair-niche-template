import Navbar from "../components/navbar";
import CTA from "../components/cta";
import Footer from "../components/footer";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <CTA />
      <Footer />
    </>
  );
}