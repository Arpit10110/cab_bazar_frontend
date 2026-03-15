import  Navbar  from './Navbar/Navbar'
import Header from './header/Header'
import OutstationSection from './OutstationSection/OutstationSection'
import WhyTravel from './whyTravel/WhyTravel'
 import TaxiServices from './TaxiServices/TaxiServices'
 import TaxiServices2 from './TaxiServices2/TaxiServices2' 
 import  PopularRoutes from './PopularRoutes/PopularRoutes'
 import BusinessPage from './BusinessPage/BusinessPage'
 import Testimonials from './Testimonials/Testimonials'
 import PartnerPage from './PartnerPage/PartnerPage'
// import MediaSection from './MediaSection/MediaSection'
import ContactSection from './ContactSection/ContactSection'
import Footer from './Footer/Footer'

  
function HeroSection() {
  return (
    <>
<Navbar/>
     <Header/>
 
   <WhyTravel/>
   <OutstationSection/>
   <TaxiServices/>
   <TaxiServices2/>
   <PopularRoutes/>
   <BusinessPage/>
   <Testimonials/>
   <PartnerPage/>
   {/* <MediaSection/> */}
   <ContactSection/>
   <Footer/>
   

    
  

    </>
  )
}


export default HeroSection