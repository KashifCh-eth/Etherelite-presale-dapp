import { useState } from "react";
import { NavLink } from "react-router-dom";
import HeaderWrapper from "./Header.style";
import ConnectWalletButton from "../../connectWalletButton/ConnectWalletButton";

import MobileMenu from "../mobileMenu/MobileMenu";

import Logo from "../../../assets/images/logo-2.png";
import Telegram from "../../../assets/images/icons/telegram.svg";
import Discord from "../../../assets/images/icons/discord.svg";
import Twitter from "../../../assets/images/icons/twitter.svg";
import { HiMenuAlt3 } from "react-icons/hi";
import Whitepaper from "../../../assets/pdf/whitepaper.pdf";

const Header = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  const handleMobileMenu = () => {
    setIsMobileMenu(!isMobileMenu);
  };

  return (
    <>
      <HeaderWrapper className="header-section">
        <div className="container">
          <div className="gittu-header-content">
            <div className="gittu-header-left">
              <ul className="social-links">
                <li>
                  <a
                    href="https://web.telegram.org/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Telegram} alt="icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Discord} alt="icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Twitter} alt="icon" />
                  </a>
                </li>
              </ul>
              <ul className="gittu-header-left-menu">
                <li>
                  <a href={Whitepaper} target="_blank" rel="noreferrer">
                    Whitepaper
                  </a>
                </li>
              </ul>
            </div>
            <div className="gittu-header-center">
              <NavLink className="gittu-header-logo" to="/" end>
                <img src={Logo} alt="Logo" />
              </NavLink>
            </div>
            <div className="gittu-header-right">
         
              <div className="gittu-header-right-menu">
                <ConnectWalletButton />

             
              </div>
            </div>
          </div>
        </div>
      </HeaderWrapper>
      {isMobileMenu && <MobileMenu mobileMenuHandle={handleMobileMenu} />}
    </>
  );
};

export default Header;
