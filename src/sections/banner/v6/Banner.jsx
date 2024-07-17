import React, { useEffect, useState } from "react";
import BannerWrapper from "./Banner.style";
import Progressbar from "../../../components/progressbar/Progressbar";
import Countdown from "../../../components/countdown/Countdown";
import Button from "../../../components/button/Button";
import SliderData from "../../../assets/data/boxSlider";
import { useAccount, useContractRead, useNetwork } from "wagmi";
import { formatEther } from "viem";
import * as configModule1 from "../../../contracts/config";
import * as configModule2 from "../../../contracts/configBnb";
import Data from "../../../assets/data/networkInfo";

import EthIcon from "../../../assets/images/token/eth.png";
import BnbIcon from "../../../assets/images/token/bnb.png";
import UsdtIcon from "../../../assets/images/token/usdt.png";
import PayWith from "../../../components/payWith/PayWith";
import Slider from "react-slick";
import Notification from "../../../components/notification/Notification";

const Banner = () => {
  const [isActiveNotification, setIsActiveNotification] = useState(false);
  const [notificationDone, setNotificatioDone] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 3000,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    variableWidth: true,
    pauseOnHover: true,
  };

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
        <div className="mb-20 container">
          <div className="row">
            <div className="col-md-12">
              <div className="mb-20 text-center">
                <h1 className="banner-title">
                  Unified Decentralized <br /> Platform
                </h1>
                <p className="banner-subtitle">
                  Buy tokens now and reap the benefits of the blockchain
                  revolution!
                </p>

                <div className="presale-card-wrapper">
                  <div className="presale-card">
                    <div className="presale-card-header">
                      <h5 className="ff-outfit fw-600 text-white text-uppercase">
                        ⚡ BUY IN BEFORE PRICE INCREASES!
                      </h5>
                    </div>

                    <div className="presale-card-counter">
                      <Countdown endDate={stageEnd} font="title2" />
                    </div>

                    <div className="presale-card-body">
                      <div className="mb-1 d-flex align-items-center justify-content-between flex-wrap">
                        <h5 className="fw-600 text-uppercase text-white">
                          Stage {currentStage} : {currentBonus}% Bonus !
                        </h5>
                        <h5 className="fw-600 text-uppercase text-white">
                          {tokenSold} / {presaleToken}
                        </h5>
                      </div>

                      <div className="mb-35">
                        <Progressbar done={tokenPercent} variant="green2" />
                      </div>

                      <PayWith
                        variant="v6"
                        setIsActiveNotification={setIsActiveNotification}
                        setNotificatioDone={setNotificatioDone}
                        setNotificationMsg={setNotificationMsg}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-slider-wrapper">
          <div className="scroll-slider-content">
            <Slider {...settings} className="gittu-slider">
              {SliderData?.map((item, i) => (
                <div key={i} className="slider-item">
                  {item.text && <p>{item.text}</p>}
                  {item.socialLinks?.map((socialLinkItem, sid) => (
                    <a key={sid} href={socialLinkItem.url}>
                      <img src={socialLinkItem.icon} alt="icon" />
                    </a>
                  ))}
                </div>
              ))}
            </Slider>
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
