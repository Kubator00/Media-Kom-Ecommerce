import React, { useState, useEffect } from 'react'
import "./Footer.css";

function Footer() {


    return (
        <div class="footer-container">
            <div class="footer">
                <div class='footer-socials'>
                    <h3>Znajdziesz nas na</h3>
                    <div class='footer-socials-icon-container'>
                        <img src="./icons/facebook.svg" class="footer-social-icons" />
                        <img src="./icons/linkedin.svg" class="footer-social-icons" />
                    </div>
                </div>
                <div class='footer-contact'>
                    <h3>Kontakt</h3>
                    <span>  <img src="./icons/phone.svg" class="footer-contact-icons" /> 34 472 21 00 </span>
                    <span>  <img src="./icons/location.svg" class="footer-contact-icons" />
                        ul. Politechniczna 22a, Łódź
                    </span>
                    <span>  <img src="./icons/email.svg" class="footer-contact-icons" /> media-kom@media-kom.pl </span>
                </div>
            </div>
            <div class="footer-author">
                <label>&#xA9; Media-Kom 2022</label>
                <label>Uicons by <a href="https://www.flaticon.com/uicons">Flaticon</a></label>
                <label>Jakub Więcek</label>
            </div>
        </div>
    )
}

export default Footer;