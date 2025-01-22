import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo odit mollitia ratione quaerat eaque et eligendi enim ipsa reprehenderit fuga repudiandae dicta non incidunt, inventore voluptates iste cupiditate vero suscipit!</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="facebook-icon" />
                <img src={assets.linkedin_icon} alt="linkedin-icon" />
                <img src={assets.twitter_icon} alt="twitter-icon" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-rihgt">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>011 250 85 31</li>
                <li>contact@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2025 @ nishan.com - All rights reserved
      </p>
    </div>
  )
}

export default Footer
