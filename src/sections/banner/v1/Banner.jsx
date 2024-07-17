import React, { useEffect, useState } from "react";
import BannerWrapper from "./Banner.style";
import Countdown from "../../../components/countdown/Countdown";
import Progressbar from "../../../components/progressbar/Progressbar";
import Button from "../../../components/button/Button";
import Modal from "../../../components/modal/Modal";
import BannerData from "../../../assets/data/bannarV3";
import { useAccount, useContractRead, useNetwork } from "wagmi";
import { formatEther } from "viem";
import * as configModule1 from "../../../contracts/config";
import * as configModule2 from "../../../contracts/configBnb";
import Data from "../../../assets/data/networkInfo";

import Telegram from "../../../assets/images/icons/telegram.svg";
import Discord from "../../../assets/images/icons/discord.svg";
import Twitter from "../../../assets/images/icons/twitter.svg";
import Medium from "../../../assets/images/icons/medium.svg";
import Reddit from "../../../assets/images/icons/reddit.svg";
import Instagram from "../../../assets/images/icons/instagram.svg";
import Linkedin from "../../../assets/images/icons/linkedin.svg";
import Notification from "../../../components/notification/Notification";

const Banner = () => {
  const [isActiveNotification, setIsActiveNotification] = useState(false);
  const [notificationDone, setNotificatioDone] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");

  const [configModule, setConfigModule] = useState(configModule1);
  const bnbChainId = Data[1]?.chainId;
  const ethChainId = Data[0]?.chainId;
  const [userChainId, setUserChainId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalHandle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [maxStage, setMaxStage] = useState(0);
  const [currentStage, setCurrentStage] = useState(1);
  const [currentBonus, setCurrentBonus] = useState("20");
  const [currentPrice, setCurrentPrice] = useState("0.001");
  const [stageEnd, setStageEnd] = useState(1733996440);
  const [nextStage, setNextStage] = useState(0);
  const [nextPrice, setNextPrice] = useState("0.002");
  const [tokenName, setTokenName] = useState("ETHERE ELITE");
  const [tokenSymbol, setTokenSymbol] = useState("ELT");
  const [presaleToken, setPresaleToken] = useState(100000);
  const [tokenSold, setTokenSold] = useState(20000);
  const [tokenPercent, setTokenPercent] = useState(20);
  const [tokenDecimals, setTokenDecimals] = useState(18);
  const [tokenSubDecimals, setTokenSubDecimals] = useState(0);

  const { isConnected } = useAccount();
  const { chain } = useNetwork();

  const { data: tokenNameData } = useContractRead({
    ...configModule.tokenNameCall,
  });
  const { data: tokenSymbolData } = useContractRead({
    ...configModule.tokenSymbolCall,
  });
  const { data: tokenDecimalsData } = useContractRead({
    ...configModule.tokenDecimalsCall,
  });
  const { data: presaleTokenAmountData } = useContractRead({
    ...configModule.presaleTokenAmountCall,
  });
  const { data: totalSoldData } = useContractRead({
    ...configModule.totalSoldCall,
  });
  const { data: maxStageData } = useContractRead({
    ...configModule.maxStageCall,
  });
  const { data: currentStageIdData } = useContractRead({
    ...configModule.currentStageIdCall,
  });
  const { data: currentStageInfoData } = useContractRead({
    ...configModule.currentStageInfoCall,
    args: [currentStageIdData],
  });

  const { data: nextStageInfoData } = useContractRead({
    ...configModule.currentStageInfoCall,
    args: [nextStage],
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

      if (tokenNameData) {
        setTokenName(tokenNameData);
      }
      if (tokenSymbolData) {
        setTokenSymbol(tokenSymbolData);
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

      if (maxStageData) {
        setMaxStage(maxStageData.toString());
      }

      if (currentStageIdData) {
        setCurrentStage(currentStageIdData.toString());

        let tmp = parseInt(currentStageIdData);
        setNextStage(tmp + 1);

        if (maxStage < tmp + 1) {
          setNextStage(tmp);
        }
      }

      if (currentStageInfoData) {
        setCurrentBonus(currentStageInfoData[1].toString());
        const tmp = formatEther(currentStageInfoData[2]);
        setCurrentPrice(tmp.toString());
        setStageEnd(currentStageInfoData[4].toString());
      }

      if (nextStageInfoData) {
        const tmp = formatEther(nextStageInfoData[2]);
        setNextPrice(tmp.toString());
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
    tokenNameData,
    tokenSymbolData,
    tokenDecimalsData,
    presaleTokenAmountData,
    totalSoldData,
    maxStageData,
    currentStageIdData,
    currentStageInfoData,
    nextStageInfoData,
    tokenSold,
    presaleToken,
    maxStage,
    isActiveNotification,
  ]);

  return (
    <>
      <BannerWrapper>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="mb-40 text-center">
                <div className="mb-20">
                  <h5 className="ff-outfit fw-600 text-white text-uppercase">
                    Pre-Sale Ends in
                  </h5>
                </div>
                <div className="mb-20 d-flex justify-content-center">
                  <Countdown endDate={stageEnd} font="orbitron" />
                </div>
                <div className="mb-20">
                  <h1 className="banner-title">
                    {BannerData.title}
                    <br />
                    {BannerData.titleExtra}
                  </h1>
                </div>
                <h5 className="ff-outfit text-white">{BannerData.subtitle}</h5>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="mb-2 d-flex align-items-center justify-content-between gap-1 flex-wrap">
                <h5 className="ff-orbitron fs-15 fw-600 text-white text-uppercase">
                  Stage {currentStage} : {currentBonus}% Bonus !
                </h5>
                <h5 className="ff-orbitron fs-15 fw-600 text-white text-uppercase">
                  {tokenSold} / {presaleToken}
                </h5>
              </div>

              <div className="mb-30">
                <Progressbar done={tokenPercent} variant="dashed" />
              </div>

              <div className="mb-30 text-center">
                <p className="ff-orbitron fs-15 fw-600 text-white text-uppercase">
                  1 {tokenSymbol} = {currentPrice} USD
                </p>

                <p className="ff-orbitron fs-15 fw-600 text-white text-uppercase">
                  NEXT STAGE = {nextPrice} USD
                </p>
              </div>

              <div className="mb-74 d-flex align-items-center justify-content-center">
                <Button variant="gradient" onClick={modalHandle}>
                  Buy now
                </Button>
              </div>

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
                <li>
                  <a
                    href="https://medium.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Medium} alt="icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.reddit.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Reddit} alt="icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Instagram} alt="icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={Linkedin} alt="icon" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </BannerWrapper>

      {/* buy now modal */}
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          modalCloseHandle={modalHandle}
          setIsActiveNotification={setIsActiveNotification}
          setNotificatioDone={setNotificatioDone}
          setNotificationMsg={setNotificationMsg}
        />
      )}

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
