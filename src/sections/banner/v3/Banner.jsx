import React, { useEffect, useState } from "react";
import BannerWrapper from "./Banner.style";
import Countdown from "../../../components/countdown/Countdown";
import Progressbar from "../../../components/progressbar/Progressbar";
import PayWith from "../../../components/payWith/PayWith";
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
          <div className="row">
            <div className="col-md-12">
              <div className="mb-40 text-center">
                <h5 className="ff-outfit fw-600 text-white text-uppercase">
                  Pre-Sale Ends in
                </h5>

                <div className="mb-20 d-flex justify-content-center">
                  <Countdown endDate={stageEnd} font="title" />
                </div>
                <h1 className="banner-title">
                  BUILD <span>WEB3.0</span> EARTH
                </h1>
                <h5 className="ff-outfit text-white">
                  Buy tokens now and reap the benefits of the blockchain
                  revolution!
                </h5>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="mb-20 d-flex align-items-center justify-content-between gap-1 flex-wrap">
                <h5 className="ff-outfit fs-15 fw-600 text-white text-uppercase">
                  Stage {currentStage} : {currentBonus}% Bonus !
                </h5>
                <h5 className="ff-outfit fs-15 fw-600 text-white text-uppercase">
                  {tokenSold} / {presaleToken}
                </h5>
              </div>

              <div className="mb-50">
                <Progressbar done={tokenPercent} variant="dashed3" />
              </div>

              <PayWith
                variant="v1"
                setIsActiveNotification={setIsActiveNotification}
                setNotificatioDone={setNotificatioDone}
                setNotificationMsg={setNotificationMsg}
              />
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
