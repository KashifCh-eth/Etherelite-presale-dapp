import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import HeaderWrapper from "./Header.style";
import ConnectWalletButton from "../../connectWalletButton/ConnectWalletButton";

import MobileMenu from "../mobileMenu/MobileMenu";

import Logo from "../../../assets/images/logo-3.png";
import Logo4 from "../../../assets/images/logo-4.png";
import Logo5 from "../../../assets/images/logo-5.png";
import Telegram from "../../../assets/images/icons/telegram.svg";
import Discord from "../../../assets/images/icons/discord.svg";
import Twitter from "../../../assets/images/icons/twitter.svg";
import { HiMenuAlt3 } from "react-icons/hi";
import Whitepaper from "../../../assets/pdf/whitepaper.pdf";

const Header = ({ variant }) => {
  const [logoImg, setLogoImg] = useState(Logo);
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  const handleMobileMenu = () => {
    setIsMobileMenu(!isMobileMenu);
  };

  useEffect(() => {
    if (variant === "v4" || variant === "v5") {
      setLogoImg(Logo4);
    }
    if (variant === "v6") {
      setLogoImg(Logo5);
    }
  }, [variant]);

  return (
    <>
      <HeaderWrapper className="header-section">
        <div className="container">
          <div className="gittu-header-content">
            <div className="gittu-header-left">
              <NavLink className="gittu-header-logo" to="/" end>
                <img src={logoImg} alt="Logo" />
              </NavLink>
            </div>
            <div className="gittu-header-right">
              <div className="gittu-header-menu-toggle">
                <button className="menu-toggler" onClick={handleMobileMenu}>
                  <HiMenuAlt3 />
                </button>
              </div>
              <div className="gittu-header-right-menu">
                {variant === "v1" && (
                  <ul className="gittu-header-menu">
                    <li>
                      <a href={Whitepaper} target="_blank" rel="noreferrer">
                        Whitepaper
                      </a>
                    </li>
                  </ul>
                )}

                {(variant === "v2" ||
                  variant === "v3" ||
                  variant === "v5" ||
                  variant === "v6" ||
                  variant === "v7") && (
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
                )}

                {variant === "v1" && <ConnectWalletButton />}
                {variant === "v2" && <ConnectWalletButton variant="v2" />}
                {variant === "v3" && <ConnectWalletButton variant="yellow" />}
                {variant === "v4" && <ConnectWalletButton variant="gradient" />}
                {variant === "v5" && <ConnectWalletButton variant="v5" />}
                {variant === "v6" && <ConnectWalletButton variant="v6" />}
                {variant === "v7" && <ConnectWalletButton />}

          
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
