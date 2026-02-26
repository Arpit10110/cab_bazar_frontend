import React from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">

        {/* Popular Cities */}
        <div className="popular-cities">
          <span className="title">POPULAR CITIES</span>
          <p>
            AGRA | AHMEDABAD | AHMEDNAGAR | AJMER | ALIGARH | ALLAHABAD |
            ALMORA | ALWAR | AMBALA | AMBERNATH | AMRAVATI | AMRITSAR |
            ANAND | ANANTAPUR | ANJUNA
          </p>
          <div className="explore">+ Explore more cities</div>
        </div>

        <hr />

        {/* Services */}
        <div className="services">
          ONE WAY CAB | CAR RENTAL | AIRPORT TAXI | LOCAL SIGHTSEEING |
          INNOVA | TEMPO TRAVELLER | PET FRIENDLY CAB
        </div>

        <hr />

        {/* Routes */}
        <div className="routes">
          <div className="route-col">
            <h4>CAB FROM DELHI</h4>
            <a href="#">Taxi from Delhi to Agra</a>
            <a href="#">Taxi from Delhi to Jaipur</a>
            <a href="#">Taxi from Delhi to Chandigarh</a>
            <a href="#">Taxi from Delhi to Amritsar</a>
          </div>

          <div className="route-col">
            <h4>CAB FROM BANGALORE</h4>
            <a href="#">Taxi from Bangalore to Mysore</a>
            <a href="#">Taxi from Bangalore to Coorg</a>
            <a href="#">Taxi from Bangalore to Ooty</a>
            <a href="#">Taxi from Bangalore to Pondicherry</a>
          </div>

          <div className="route-col">
            <h4>CAB FROM MUMBAI</h4>
            <a href="#">Taxi from Mumbai to Shirdi</a>
            <a href="#">Taxi from Mumbai to Shani Shingnapur</a>
            <a href="#">Taxi from Mumbai to Mahabaleshwar</a>
            <a href="#">Taxi from Mumbai to Nashik</a>
          </div>

          <div className="route-col">
            <h4>CAB FROM CHENNAI</h4>
            <a href="#">Taxi from Chennai to Bangalore</a>
            <a href="#">Taxi from Chennai to Pondicherry</a>
            <a href="#">Taxi from Chennai to Tirupati</a>
            <a href="#">Taxi from Chennai to Mahabalipuram</a>
          </div>
        </div>

        <div className="explore-route">+ Explore more routes</div>

        <hr />

        {/* App + Social */}
        <div className="footer-bottom">
          <div className="app-buttons">
            <img src="https://cabbazar.com/assets/img/icons/playstore-badge.webp" alt="Google Play" />
            <img src="https://cabbazar.com/assets/img/icons/app-store-badge.webp" alt="App Store" />
          </div>

          <div className="social-icons1">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaPinterestP /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        <hr />

        {/* Footer Links */}
        <div className="footer-links">
          Terms of Use | Privacy Policy | Refund Policy |
          Service Level Agreement | Career | Mobile App |
          Media Coverage | Affiliate | Blog | Sitemap
          <br />
          Contact Us : 08068249401
        </div>

        <hr />

        {/* Copyright */}
        <div className="copyright">
          <strong>CBGrowth</strong>
          <p>Copyright © 2021 CB Growth Private Limited</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;