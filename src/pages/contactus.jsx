import React, {Component} from 'react';

class ContactUs extends Component {
    state = {  }
    render() { 
        return ( 
            <div className='abt-container satu'>
                <div className='abt-container header'>
                    <h2>Contact Us</h2>
                    <h4 >Operation Hours</h4>
                        <p>Operational Hours: Monday - Sunday: 9:00 - 17:00  (GMT + 7)</p>
                        <p>Sunday Slow Response</p>
                        <p className='abt-text'>For delivery time, please see "Shipping & Returns"</p>
                    <h4 >Telephone / Whatsapp</h4>
                        <p>Phone/Whatsapp: +62 8123 6046 472</p>
                        <p className='abt-text'>Office: +6281 14045</p>
                </div>
            </div>
         );
    }
}
 
export default ContactUs;