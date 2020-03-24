import React, {Component} from 'react';
import './css/component.css'
import { FaPaw } from "react-icons/fa";

class Footer extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <div className='f-containersatu'>
                    <div className='f-header satu'>
                        <p className='footer-body'><FaPaw /> &nbsp; COSMOPAWLITAN &nbsp; <FaPaw /></p>
                        <p>Pilihan utama anda dalam memenuhi segala macam kebutuhan hewan peliharaan anda, baik itu untuk perseorangan, ataupun lembaga swasta atau negeri.</p>
                    </div>
                    
                    <div className='f-header dua'>
                        <p className='footer-body'>INFORMATION</p>
                        <p><a href='/aboutus' className='clickable'>About Us</a></p>
                        <p><a href='/contactus'className='clickable'>Contact Us</a></p>
                    </div>

                    <div className='f-header tiga'>
                        <p className='footer-body'>POLICIES </p>
                        <p><a href='/terms' className='clickable'>Terms</a></p>
                        <p><a href='/privacypolicy' className='clickable'>Privacy Policy</a></p>
                    </div>

                    <div className='f-header empat'>
                        <p className='footer-body' >FOLLOW US ON</p>
                    <div>

                    <a href='https:twitter.com/anggaawijaya' target="_blank" rel='noopener noreferrer'> <i className="fab fa-twitter" ></i> &nbsp; </a>
                    <a href='https:instagram.com/anggaawijaya' target="_blank" rel='noopener noreferrer'> <i className="fab fa-instagram instagram"></i> &nbsp; </a>
                    <a href='https:facebook.com/anggaawijaya90' target="_blank" rel='noopener noreferrer'> <i className="fab fa-facebook-square"></i> &nbsp; </a>
                    
                    </div>
                </div>
            </div>

                <div className='f-containerdua'>
                    <div>2020 © Cosmopawlitan Co.</div>
                </div>
            
            </div>
         );
    }
}
 
export default Footer;