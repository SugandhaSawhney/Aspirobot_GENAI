
import Hero from "./Hero";
import Features from "./features"; 
import Footer from "./Footer";
import WhyAspirobot from "./WhyAspirobot";
const LandingPage = () => {
  return (
    <div>
      <Hero />
      <WhyAspirobot />  
      <div id="features">
        <Features />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
