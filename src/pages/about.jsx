import React, {Component} from 'react';
import './css/pages.css'

class About extends Component {
    state = {  }

    render() { 
        return ( 
            <div className='abt-container satu'>
                <div className='abt-container header'>
                    <h2>About Cosmopolitan Co.</h2>
                        <img className='img' src='https://cdn.shopify.com/s/files/1/0250/8895/0306/files/about-1_large.jpg?v=1561964176' alt='foto anjing ini'></img>
                        <p className='abt-text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum eius nam repellendus, laudantium aperiam minus incidunt alias aspernatur debitis temporibus quaerat vel id reprehenderit, ullam, soluta tempore cupiditate dolore! Nostrum a quas eius error laboriosam iusto porro dignissimos quaerat! Aliquid quaerat repellat minus in modi, quod autem expedita error sit quasi iusto facilis voluptates! Soluta, aut officiis commodi vel impedit at nesciunt quia. Odio magni quas odit excepturi atque culpa iste dolorum, porro debitis magnam temporibus nisi, possimus dolore! Similique fugiat et nesciunt laborum. Vel culpa obcaecati fugiat ut iusto. Animi provident quibusdam voluptatum officia, impedit accusantium qui dicta magni.</p>
                </div> 
            </div>
         );
    }
}


export default About;