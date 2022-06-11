import React, {useState, useEffect} from 'react'
import "./Footer.css";

function Footer() {


    return (
        <div class='footer content'>
            <div class="footer__info">
                <div class='footer__socials'>
                    <h3>Znajdziesz nas na</h3>
                    <div>
                        <img src="./icons/facebook.svg" class="footer__socialIcon" alt='facebook'/>
                        <img src="./icons/linkedin.svg" class="footer__socialIcon" alt='linkedin'/>
                    </div>
                </div>
                <div class='footer__contact'>
                    <h3>Kontakt</h3>
                    <span>
                        <img src="./icons/address-book.svg" class="footer__contactIcon" alt='telefon'/> 34 123 45 67
                    </span>
                    <span>
                        <img src="./icons/location.svg" class="footer__contactIcon" alt='lokalizacja'/>
                        ul. Politechniczna 999a, Łódź
                    </span>
                    <span>
                        <img src="./icons/envelope.svg" class="footer__contactIcon" alt='mail'/>
                        media-kom@media-kom.pl
                    </span>
                </div>
            </div>
            <div class="footer__author">
                <span>&#xA9; Media-Kom 2022</span>
                <span>Uicons by <a href="https://www.flaticon.com/uicons">Flaticon</a></span>
                <span>Jakub Więcek</span>
            </div>
        </div>
    )
}

export default Footer;