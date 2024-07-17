import React, { useEffect, useState } from "react";
import BannerWrapper from "./Banner.style";
import Countdown from "../../../components/countdown/Countdown";
import DocumentIcon from "../../../assets/images/icons/document-text.svg";
import Whitepaper from "../../../assets/pdf/whitepaper.pdf";
import TokenInfo from "../../../components/tokenInfo/TokenInfo";
import PayWith from "../../../components/payWith/PayWith";
import CircleProgressbar from "../../../components/progressbar/circleProgress/CircleProgressbar";
import { useAccount, useContractRead, useNetwork } from "wagmi";
import { formatEther } from "viem";
import * as configModule1 from "../../../contracts/config";
import * as configModule2 from "../../../contracts/configBnb";
import Data from "../../../assets/data/networkInfo";
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
          <div className="row justify-content-between">
            <div className="col-lg-6">
              <div className="banner-badge">
                <h4>New</h4>
                <p>New roadmap added for Phase 4 - 2024</p>
              </div>
              <h1 className="banner-title">
                Unified Web
                <br />
                3.0 Trade
              </h1>
              <h4 className="banner-subtitle">
                Buy tokens now and reap the benefits of the blockchain
                revolution. Benefit and influence the development of a project
              </h4>

              <a
                className="whitepaper-btn"
                href={Whitepaper}
                target="_blank"
                rel="noreferrer"
              >
                <img src={DocumentIcon} alt="icon" />
                Whitepaper
              </a>
            </div>
            <div className="col-lg-5">
              <div className="progress-card">
                <div className="d-flex justify-content-center">
                  <CircleProgressbar percentage={tokenPercent} />
                </div>

                <div className="d-flex justify-content-between">
                  <div className="progress-info">
                    <h5>Raised</h5>
                    <h5>{tokenSold}</h5>
                  </div>
                  <div className="progress-info right">
                    <h5>Goal</h5>
                    <h5>{presaleToken}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="presale-card-wrapper">
                <div className="presale-card">
                  <div className="presale-card-left">
                    <div className="presale-card-title">
                      <p>Presale stage {currentStage}</p>
                    </div>

                    <div className="presale-card-counter">
                      <Countdown endDate={stageEnd} variant="v2" />
                    </div>

                    <TokenInfo variant="v2" />
                  </div>
                  <div className="presale-card-right">
                    <PayWith
                      variant="v4"
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
