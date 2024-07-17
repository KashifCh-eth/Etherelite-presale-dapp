import BannerWrapper from "./Banner.style";
import DocumentIcon from "../../../assets/images/icons/document-text.svg";
import PresaleLiveTextIcon from "../../../assets/images/icons/presale-live-text.svg";
import Abstrac1 from "../../../assets/images/banner/abstrac-1.png";
import Abstrac2 from "../../../assets/images/banner/abstrac-2.png";
import { FiArrowDownRight } from "react-icons/fi";
import { HiArrowLeft } from "react-icons/hi2";
import Whitepaper from "../../../assets/pdf/whitepaper.pdf";
import Button from "../../../components/button/Button";
import SmoothSlider from "../../../components/smooth-slider/SmoothSlider";
import Progressbar from "../../../components/progressbar/Progressbar";
import Countdown from "../../../components/countdown/Countdown";
import Dropdown from "../../../components/dropdown/Dropdown";
import { useState, useEffect } from "react";
import BannerData from "../../../assets/data/bannarV1";
import TokenInfo from "../../../components/tokenInfo/TokenInfo";
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  useNetwork,
} from "wagmi";
import { formatEther, parseEther } from "viem";
import * as configModule1 from "../../../contracts/config";
import * as configModule2 from "../../../contracts/configBnb";
import Data from "../../../assets/data/networkInfo";
import StatusIcon from "../../../assets/images/icons/status.png";
import Notification from "../../../components/notification/Notification";
import ProcessingIcon from "../../../assets/images/icons/processing.png";
import SuccessIcon from "../../../assets/images/icons/successful.svg";

const Banner = () => {
  const [isActiveNotification, setIsActiveNotification] = useState(false);
  const [notificationDone, setNotificatioDone] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState("");

  const [configModule, setConfigModule] = useState(configModule1);
  const bnbChainId = Data[1]?.chainId;
  const ethChainId = Data[0]?.chainId;
  const [userChainId, setUserChainId] = useState(null);

  const [userBalance, setUserBalance] = useState("28.25 ETH");
  const [isBuyNow, setIsBuyNow] = useState(false);

  const buyNowHandle = () => {
    setIsBuyNow(!isBuyNow);
  };

  const makeEmptyInputs = () => {
    setPaymentAmount(0);
    setBuyAmount(0);
    setBonusAmount(0);
    setTotalAmount(0);
    setPaymentPrice(0);
  };

  const [usdExRate, setUsdExRate] = useState(0);
  const [paymentUsd, setPaymentUsd] = useState(0);
  const [currentStage, setCurrentStage] = useState(1);
  const [currentBonus, setCurrentBonus] = useState("20");
  const [currentPrice, setCurrentPrice] = useState("0.001");
  const [stageEnd, setStageEnd] = useState(1733996440);
  const [presaleToken, setPresaleToken] = useState(100000);
  const [tokenSymbol, setTokenSymbol] = useState("ELT");
  const [softCap, setSoftCap] = useState("10 ETH");
  const [hardCap, setHardCap] = useState("40 ETH");
  const [totalFund, setTotalFund] = useState("20");
  const [paymentPrice, setPaymentPrice] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);
  const [bonusAmount, setBonusAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [tokenSold, setTokenSold] = useState(20000);
  const [tokenPercent, setTokenPercent] = useState(20);
  const [presaleStatus, setPresaleStatus] = useState(null);
  const [tokenDecimals, setTokenDecimals] = useState(18);
  const [tokenSubDecimals, setTokenSubDecimals] = useState(0);

  const { address: addressData, isConnected } = useAccount();
  const { data: balanceData } = useBalance({
    address: addressData,
  });
  const { chain } = useNetwork();
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
  const { data: currentStageIdData } = useContractRead({
    ...configModule.currentStageIdCall,
  });
  const { data: currentStageInfoData } = useContractRead({
    ...configModule.currentStageInfoCall,
    args: [currentStageIdData],
  });

  const {
    data: buyTokenData,
    write,
    isLoading: buyTokenIsLoading,
    isSuccess: buyTokenIsSuccess,
    error: buyTokenError,
  } = useContractWrite({
    ...configModule.buyTokenCall,
  });

  useEffect(() => {
    if (isBuyNow) {
      document.querySelector(".gittu-banner-card").classList.add("flip");
    }

    if (!isBuyNow) {
      document.querySelector(".gittu-banner-card").classList.remove("flip");
    }

    if (isConnected) {
      if (chain) {
        const tmp = chain?.id;
        setUserChainId(tmp);
        if (tmp == ethChainId) {
          setConfigModule((prev) => configModule1);
        }
        if (tmp == bnbChainId) {
          setConfigModule((prev) => configModule2);
        }
      }

      if (balanceData) {
        let tmp = parseFloat(balanceData?.formatted).toFixed(2);
        setUserBalance(`${tmp} ${balanceData?.symbol}`);
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

      if (currentStageIdData) {
        setCurrentStage(currentStageIdData.toString());
      }

      if (currentStageInfoData) {
        setCurrentBonus(currentStageInfoData[1].toString());
        const tmp = formatEther(currentStageInfoData[2]);
        setCurrentPrice(tmp.toString());
        setStageEnd(currentStageInfoData[4].toString());
      }

      let _tokenPercent = parseInt((tokenSold * 100) / presaleToken);
      setTokenPercent(_tokenPercent);
      if (_tokenPercent > 100) {
        setTokenPercent(100);
      }

      configModule.GetUSDExchangeRate().then((res) => {
        setUsdExRate(parseFloat(res));
      });

      let pay = parseFloat(usdExRate * paymentPrice).toFixed(2);
      setPaymentUsd(pay);

      if (
        buyTokenError &&
        buyTokenError?.name === "TransactionExecutionError"
      ) {
        setPresaleStatus("You have rejected the transaction");

        const timeoutId = setTimeout(() => {
          window.location.reload();
        }, 2000);

        return () => {
          clearTimeout(timeoutId);
        };
      }

      if (buyTokenIsLoading) {
        setIsActiveNotification(true);
        setNotificationMsg("Transaction Processing. Click “Confirm”.");
      }

      if (!buyTokenIsLoading) {
        setIsActiveNotification(false);
        setNotificationMsg("");
      }

      if (buyTokenIsSuccess) {
        buyTokenSuccessMsg();

        const timeoutId = setTimeout(() => {
          window.location.reload();
        }, 2000);

        return () => {
          clearTimeout(timeoutId);
        };
      }
    }

    if (isActiveNotification) {
      const timeoutId = setTimeout(() => {
        setIsActiveNotification(false);
      }, 2000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [
    isBuyNow,
    isConnected,
    chain,
    userChainId,
    configModule,
    balanceData,
    tokenSymbolData,
    tokenDecimalsData,
    presaleTokenAmountData,
    totalSoldData,
    currentStageIdData,
    currentStageInfoData,
    tokenSold,
    presaleToken,
    usdExRate,
    paymentPrice,
    buyTokenData,
    buyTokenError,
    buyTokenIsLoading,
    buyTokenIsSuccess,
    presaleStatus,
    isActiveNotification,
  ]);

  // buy token
  const handlePaymentInput = (e) => {
    let _inputValue = e.target.value;
    setPaymentAmount(_inputValue);

    const _ethToUsd = _inputValue * usdExRate;
    const _getToken = parseInt(_ethToUsd / currentPrice);

    setBuyAmount(_getToken);

    const _bonusAmount = parseInt((_getToken * currentBonus) / 100);
    setBonusAmount(_bonusAmount);

    const _totalAmount = _getToken + _bonusAmount;
    setTotalAmount(_totalAmount);

    setPaymentPrice(_inputValue);

    if (_inputValue == "") {
      setPresaleStatus(null);

      setBuyAmount(0);
      setBonusAmount(0);
      setTotalAmount(0);
      setPaymentPrice(0);
    } else if (parseFloat(userBalance) < parseFloat(_inputValue)) {
      setPresaleStatus("Insufficient funds in your wallet");
    } else {
      if (_getToken > 0) {
        setPresaleStatus(null);
      } else {
        setPresaleStatus("Please buy at least 1 token!");

        setBuyAmount(0);
        setBonusAmount(0);
        setTotalAmount(0);
        setPaymentPrice(0);
      }
    }
  };

  const buyToken = () => {
    if (paymentAmount != "") {
      setPresaleStatus(null);

      write?.({
        value: parseEther(paymentPrice.toString()),
        args: [buyAmount],
      });

      makeEmptyInputs();
    } else {
      setPresaleStatus("Please enter pay amount!");
    }
  };

  const buyTokenSuccessMsg = () => {
    setIsActiveNotification(true);
    setNotificatioDone(true);
    setNotificationMsg("Your transaction has been successfully complete");
  };

  return (
    <>
      <BannerWrapper>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="gittu-banner-left">
                <h1 className="banner-title">{BannerData.title}</h1>
                <h2 className="text-white">{BannerData.titleExtra}</h2>
                <h5 className="mt-15">{BannerData.subtitle}</h5>

                <div className="mt-40 mb-40">
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

                <ul className="gittu-banner-list">
                  <li>Total Supply: {presaleToken}</li>
                  <li>Soft Cap: {softCap}</li>
                  <li>Hard Cap: {hardCap}</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="gittu-banner-right">
                <div className="overlay">
                  <a href="#" className="presale-live-btn">
                    <img src={PresaleLiveTextIcon} alt="Presale live" />
                    <span className="icon">
                      <FiArrowDownRight />
                    </span>
                  </a>
                </div>
                <div className="gittu-banner-card">
                  <div className="gittu-banner-card-inner">
                    <div className="bg-shape">
                      <div className="bg-shape-img img-1">
                        <img src={Abstrac1} alt="shape" />
                      </div>
                      <div className="bg-shape-img img-2">
                        <img src={Abstrac2} alt="shape" />
                      </div>
                    </div>

                    {isBuyNow ? (
                      <div className="card-content">
                        <button
                          className="presale-back-btn"
                          onClick={buyNowHandle}
                        >
                          <HiArrowLeft />
                        </button>

                        <div className="presale-item mb-20">
                          <div className="presale-item-inner">
                            <h5 className="fw-600 text-uppercase text-white">
                              Balance: {userBalance}
                            </h5>
                          </div>
                          <div className="presale-item-inner">
                            <h5 className="fw-600 text-uppercase text-white">
                              1 {tokenSymbol} = {currentPrice}
                            </h5>
                          </div>
                        </div>

                        <div className="presale-item mb-25">
                          <div className="presale-item-inner">
                            <h6>Select Token</h6>
                            <Dropdown
                              userChainId={userChainId}
                              ethChainId={ethChainId}
                              bnbChainId={bnbChainId}
                            />
                          </div>
                          <div className="presale-item-inner">
                            <h6>Amount</h6>

                            <input
                              type="number"
                              min={currentPrice}
                              step={currentPrice}
                              placeholder="0.5"
                              value={paymentAmount}
                              onChange={handlePaymentInput}
                            />
                          </div>
                        </div>

                        <div className="presale-item mb-37">
                          <div className="presale-item-inner">
                            <h6>$ Amount</h6>

                            <input
                              type="text"
                              placeholder="0"
                              value={paymentUsd}
                              disabled
                            />
                          </div>
                          <div className="presale-item-inner">
                            <h6>Get Amount ( {tokenSymbol} )</h6>
                            <input
                              type="text"
                              placeholder="0"
                              value={buyAmount}
                              disabled
                            />
                          </div>
                        </div>

                        <ul className="token-info-list mb-35">
                          <li>
                            <p>Bonus</p>
                            <p>{currentBonus}%</p>
                          </li>
                          <li>
                            <p>Total Amount</p>
                            <p>
                              {buyAmount} + {bonusAmount} Bonus
                            </p>
                          </li>
                        </ul>

                        <div className="presale-item-msg">
                          {presaleStatus && (
                            <div className="presale-item-msg__content">
                              <img src={StatusIcon} alt="icon" />
                              <p>{presaleStatus}</p>
                            </div>
                          )}

                          {buyTokenData && (
                            <div className="presale-item-msg__content done">
                              <img src={SuccessIcon} alt="icon" />
                              <h6>
                                Transaction Hash:{" "}
                                <a
                                  href={`${configModule.networkLink}${buyTokenData?.hash}`}
                                  target="_blank"
                                >
                                  {buyTokenData?.hash.slice(0, 5)}
                                  {"....."}
                                  {buyTokenData?.hash.slice(-4)}
                                </a>
                              </h6>
                            </div>
                          )}
                        </div>

                        <Button size="large" onClick={buyToken}>
                          Buy Now
                        </Button>
                      </div>
                    ) : (
                      <div className="card-content">
                        <p className="presale-stage-title text-uppercase">
                          Stage {currentStage}: {currentBonus}% Bonus!
                        </p>
                        <h5 className="fw-600 text-white text-uppercase">
                          Pre-sale ends in
                        </h5>

                        <div className="mt-1 mb-17">
                          <Countdown endDate={stageEnd} />
                        </div>

                        <div className="mb-15">
                          <Progressbar done={tokenPercent} />
                        </div>

                        <div className="presale-raised fw-500 mb-25">
                          <p className="fs-15 text-white">
                            Raised: {tokenSold}
                          </p>
                          <p className="fs-15 text-white">
                            Goal: {presaleToken}
                          </p>
                        </div>

                        <div className="mb-35">
                          <TokenInfo />
                        </div>

                        <Button size="large" onClick={buyNowHandle}>
                          Buy {tokenSymbol} now
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="gittu-banner-slider">
          <SmoothSlider />
        </div>
      </BannerWrapper>

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
