import React from 'react';
import IPage from '../interfaces/page';
import '../styles/main.scss';
import '../styles/tables.scss';
import logo from '../img/pineapple.png';
import logoText from '../img/pineapple-text.png';
import FormNewsletter from '../components/FormNewsletter';
import { GrFacebookOption, GrInstagram, GrTwitter, GrYoutube } from 'react-icons/gr';

const HomePage: React.FC<IPage> = props => {

    return (

        <React.Fragment>

            <div className="container">
                <div className="left-side">
                    <div className="navbar">
                        <div className="logo-box">
                            <img src={logo} className="pineapple" alt=""/> <img className="pineapple-text" src={logoText} alt=""/>
                        </div>
                        <div className="navigation">
                            <ul className="nav-items">
                                <li><a href="#">About</a></li>
                                <li><a href="#">How it works</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="content">

                        <FormNewsletter />

                        <hr/>

                        <div className="social-box">
                            <a href="#"><span className="fb-link"><GrFacebookOption /></span></a>
                            <a href="#"><span className="in-link"><GrInstagram /></span></a>
                            <a href="#"><span className="tw-link"><GrTwitter /></span></a>
                            <a href="#"><span className="yt-link"><GrYoutube /></span></a>
                        </div>
                    </div>


                </div>
                <div className="right-side"></div>
            </div>
        </React.Fragment>


    );
}

export default HomePage;