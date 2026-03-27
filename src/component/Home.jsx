import  Navbar  from './Navbar/Navbar'
import Header from './header/Header'
import OutstationSection from './OutstationSection/OutstationSection'
import WhyTravel from './whyTravel/WhyTravel'

//  import TaxiServices from './TaxiServices/TaxiServices'
//  import TaxiServices2 from './TaxiServices2/TaxiServices2' 
//  import  PopularRoutes from './PopularRoutes/PopularRoutes'
//  import BusinessPage from './BusinessPage/BusinessPage'
 import Testimonials from './Testimonials/Testimonials'
//  import PartnerPage from './PartnerPage/PartnerPage'
// import MediaSection from './MediaSection/MediaSection'
import ContactSection from './ContactSection/ContactSection'
import Whybook from './Whybook/Whybook'
import Popularcity from './Popularcity/Popularcity'
import Feature from './Feature/Feature'
// import Journey from './Journey/Journey'
// import Faq from './Faq/Faq'
import Map from './Map/Map'
import Footer from './Footer/Footer'

  
function HeroSection() {
  return (
    <>
<Navbar/>
     <Header/>
 
   <WhyTravel/>
   {/* <Feature/> */}
   <Whybook/>
   
   <OutstationSection/>
   <Popularcity/>
   {/* <TaxiServices/> */}
   {/* <TaxiServices2/> */}
   {/* <PopularRoutes/> */}
   {/* <BusinessPage/> */}
   
   {/* <PartnerPage/> */}
   {/* <MediaSection/> */}
  
  <Map/>
  
   <ContactSection/>
   <Testimonials/>
   {/* <Journey/> */}
  
   
    {/* <Faq/> */}
   <Footer/>
   

    
  

    </>
  )
}


export default HeroSection