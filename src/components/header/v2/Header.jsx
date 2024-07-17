import { useState } from "react";
import { NavLink } from "react-router-dom";
import HeaderWrapper from "./Header.style";
import ConnectWalletButton from "../../connectWalletButton/ConnectWalletButton";
import DropdownDemo from "../dropdownDemo/DropdownDemo";
import MobileMenu from "../mobileMenu/MobileMenu";

import Logo from "../../../assets/images/logo-3.png";
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
        <div className="gittu-container">
          <div className="gittu-header-content">
            <div className="gittu-header-left">
              <NavLink className="gittu-header-logo" to="/" end>
                <img src={Logo} alt="Logo" />
              </NavLink>
            </div>
            <div className="gittu-header-right">
              <div className="gittu-header-menu-toggle">
                <button className="menu-toggler" onClick={handleMobileMenu}>
                  <HiMenuAlt3 />
                </button>
              </div>
              <div className="gittu-header-right-menu">
                <ul className="gittu-header-menu">
                  <li>
                    <a href={Whitepaper} target="_blank" rel="noreferrer">
                      Whitepaper
                    </a>
                  </li>
                </ul>

                <ConnectWalletButton />

                <DropdownDemo />
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
