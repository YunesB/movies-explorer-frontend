import React from 'react'
import './Preloader.css'

const Preloader = (props) => {
    return (
        <div className={`popup ${props.isPageLoading ? 'popup_opened' : ''}`}>
            <div className="preloader">
                <div className="preloader__container">
                    <span className="preloader__round"></span>
                </div>
            </div>
        </div>
    )
};

export default Preloader
