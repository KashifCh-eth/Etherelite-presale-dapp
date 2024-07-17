import React, { useEffect, useState } from "react";
import BannerWrapper from "./Banner.style";
import Progressbar from "../../../components/progressbar/Progressbar";
import Countdown from "../../../components/countdown/Countdown";
import Button from "../../../components/button/Button";
import TokenInfo from "../../../components/tokenInfo/TokenInfo";
import PayWith from "../../../components/payWith/PayWith";
import ConnectWalletButton from "../../../components/connectWalletButton/ConnectWalletButton";
import Whitepaper from "../../../assets/pdf/whitepaper.pdf";
import DropdownDemo from "../../../components/header/dropdownDemo/DropdownDemo";
import { useAccount, useContractRead, useNetwork } from "wagmi";
import { formatEther } from "viem";
import * as configModule1 from "../../../contracts/config";
import * as configModule2 from "../../../contracts/configBnb";
import Data from "../../../assets/data/networkInfo";
import { FaPlus } from "react-icons/fa6";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";

import SolidProofImg from "../../../assets/images/solidproof.png";
import LogoImg from "../../../assets/images/logo-3.png";
import IconImg1 from "../../../assets/images/icons/wallet.svg";
import IconImg2 from "../../../assets/images/icons/telegram.svg";
import IconImg3 from "../../../assets/images/icons/twitter.svg";
import IconImg4 from "../../../assets/images/icons/discord.svg";
import IconImg5 from "../../../assets/images/icons/medium.svg";
import IconImg6 from "../../../assets/images/icons/reddit.svg";
import IconImg7 from "../../../assets/images/icons/file.svg";
import Notification from "../../../components/notification/Notification";

const Banner = () => {
  const [isActiveNotification, setIsActiveNotification] = useState(false);
  const [notificationDone, setNotificatioDone] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");

  const [configModule, setConfigModule] = useState(configModule1);
  const bnbChainId = Data[1]?.chainId;
  const ethChainId = Data[0]?.chainId;
  const [userChainId, setUserChainId] = useState(null);

  const [currentStage, setCurrentStage] = useState(1);
  const [currentBonus, setCurrentBonus] = useState("20");
  const [stageEnd, setStageEnd] = useState(1733996440);
  const [presaleToken, setPresaleToken] = useState(100000);
  const [tokenSold, setTokenSold] = useState(20000);
  const [tokenPercent, setTokenPercent] = useState(20);
  const [tokenDecimals, setTokenDecimals] = useState(18);
  const [tokenSubDecimals, setTokenSubDecimals] = useState(0);

  const { address: addressData, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { data: tokenDecimalsData } = useContractRead({
    ...configModule.tokenDecimalsCall,
  });
  const { data: presaleTokenAmountData } = useContractRead({
    ...configModule.presaleTokenAmountCall,
  });
  const { data: totalSoldData } = useContractRead({
    ...configModule.totalSoldCall,
  });
  const { data: currentStageIdData } = useContractRead({
    ...configModule.currentStageIdCall,
  });
  const { data: currentStageInfoData } = useContractRead({
    ...configModule.currentStageInfoCall,
    args: [currentStageIdData],
  });

  useEffect(() => {
    if (isConnected) {
      if (chain) {
        const tmp = chain?.id;
        if (tmp == ethChainId) {
          setConfigModule((prev) => configModule1);
        }
        if (tmp == bnbChainId) {
          setConfigModule((prev) => configModule2);
        }
      }

      if (tokenDecimalsData) {
        let _subDecimal = 18 - tokenDecimalsData;
        setTokenDecimals(tokenDecimalsData);
        setTokenSubDecimals(_subDecimal);
      }

      if (presaleTokenAmountData) {
        let tmp = formatEther(presaleTokenAmountData);
        setPresaleToken(tmp / 10 ** tokenSubDecimals);
      }

      if (totalSoldData) {
        let tmp = formatEther(totalSoldData);
        setTokenSold(tmp / 10 ** tokenSubDecimals);
      }

      if (currentStageIdData) {
        setCurrentStage(currentStageIdData.toString());
      }

      if (currentStageInfoData) {
        setCurrentBonus(currentStageInfoData[1].toString());

        setStageEnd(currentStageInfoData[4].toString());
      }

      let _tokenPercent = parseInt((tokenSold * 100) / presaleToken);
      setTokenPercent(_tokenPercent);
      if (_tokenPercent > 100) {
        setTokenPercent(100);
      }
    }

    if (isActiveNotification) {
      const timeoutId = setTimeout(() => {
        setIsActiveNotification(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [
    isConnected,
    chain,
    configModule,
    tokenDecimalsData,
    presaleTokenAmountData,
    totalSoldData,
    currentStageIdData,
    currentStageInfoData,
    tokenSold,
    presaleToken,
    isActiveNotification,
  ]);

  return (
    <>
      <BannerWrapper>
        <div className="container">
          <div className="row">
            <div className="col-lg-7 banner-col-left">
              <div className="banner-header">
                <div className="banner-header-left">
                  <img src={LogoImg} alt="Logo" />
                </div>
                <div className="banner-header-right">
                  <DropdownDemo variant="v2" />
                </div>
              </div>

              <h1 className="banner-title">
                BUILD <span>WEB3.0</span>
                <br />
                EARTH
              </h1>
              <h4 className="banner-subtitle">
                Buy tokens now and reap the benefits of the blockchain
                revolution. Benefit and influence the development of a project
                made for a massive profitable audience
              </h4>
            </div>
            <div className="col-lg-5 banner-col-right">
              <ul className="banner-list">
                <li>
                  <ConnectWalletButton variant="v7" />
                </li>
                <li>
                  <a href="https://t.me/" target="_blank" rel="noreferrer">
                    <img src={IconImg2} alt="icon" className="icon" />
                    <span className="name">Telegram</span>
                    <span className="icon-text">
                      <GoArrowUpRight />
                    </span>
                    <span className="url">@</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={IconImg3} alt="icon" className="icon" />
                    <span className="name">Twiiter</span>
                    <span className="icon-text">
                      <GoArrowUpRight />
                    </span>
                    <span className="url">@</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={IconImg4} alt="icon" className="icon" />
                    <span className="name">Discord</span>
                    <span className="icon-text">
                      <GoArrowUpRight />
                    </span>
                    <span className="url">@dis_ui-gigs</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://medium.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={IconImg5} alt="icon" className="icon" />
                    <span className="name">Medium</span>
                    <span className="icon-text">
                      <GoArrowUpRight />
                    </span>
                    <span className="url">@me_uigigs_co</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.reddit.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={IconImg6} alt="icon" className="icon" />
                    <span className="name">Reddit</span>
                    <span className="icon-text">
                      <GoArrowUpRight />
                    </span>
                    <span className="url">@uigigs</span>
                  </a>
                </li>
                <li>
                  <a href={Whitepaper} target="_blank" rel="noreferrer">
                    <img src={IconImg7} alt="icon" className="icon" />
                    <span className="name">Whitepaper</span>
                    <span className="icon-text">
                      <GoArrowUpRight />
                    </span>
                    <span className="url">Whitepaper</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="row banner-row align-items-center">
            <div className="col-lg-7 banner-col-left">
              <div className="mb-10 d-flex align-items-center justify-content-between gap-1 flex-wrap">
                <h6 className="ff-outfit fw-600 text-white text-uppercase">
                  Stage {currentStage} : {currentBonus}% Bonus !
                </h6>
                <h6 className="ff-outfit fw-600 text-white text-uppercase">
                  {tokenSold} / {presaleToken}
                </h6>
              </div>

              <Progressbar done={tokenPercent} variant="v2" />
            </div>
            <div className="col-lg-5 banner-col-right">
              <div className="banner-col">
                <h5 className="ff-outfit fw-600 text-white text-uppercase">
                  Pre-Sale Ends in
                </h5>
                <Countdown endDate={stageEnd} font="title2" variant="v2" />
              </div>
            </div>
          </div>

          <div className="row banner-row">
            <div className="col-lg-7 banner-col-left">
              <PayWith
                variant="v5"
                setIsActiveNotification={setIsActiveNotification}
                setNotificatioDone={setNotificatioDone}
                setNotificationMsg={setNotificationMsg}
              />
            </div>
            <div className="col-lg-5 banner-col-right">
              <div className="banner-col">
                <TokenInfo variant="v3" />
              </div>
            </div>
          </div>

          <div className="row banner-row">
            <div className="col-lg-7 banner-col-left">
              <div className="audit-item">
                <p>
                  Audit & KYC Certificate
                  <br />
                  100% Secure and Verified
                </p>
                <img src={SolidProofImg} alt="Solid Proof" />
              </div>
            </div>
            <div className="col-lg-5 banner-col-right">
              <div className="bottom-info">
                <h5>Total Supply: {presaleToken}</h5>
                <h5>Soft Cap: 50000</h5>
              </div>
            </div>
          </div>
        </div>
      </BannerWrapper>

      {/* notification modal */}
      {isActiveNotification && (
        <Notification
          notificationDone={notificationDone}
          textMessage={notificationMsg}
        />
      )}
    </>
  );
};

export default Banner;
