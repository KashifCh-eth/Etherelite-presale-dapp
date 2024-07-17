import React, { useEffect, useState } from "react";
import PayWithStyleWrapper from "./PayWith.style";
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";
import { formatEther, parseEther } from "viem";
import Data from "../../assets/data/networkInfo";
import * as configModule1 from "../../contracts/config";
import * as configModule2 from "../../contracts/configBnb";
import EthIcon from "../../assets/images/token/eth.png";
import BnbIcon from "../../assets/images/token/bnb.png";
import StatusIcon from "../../assets/images/icons/status.png";
import Dropdown from "./Dropdown/Dropdown";
import SuccessIcon from "../../assets/images/icons/successful.svg";

const PayWith = ({
  variant,
  setIsActiveNotification,
  setNotificatioDone,
  setNotificationMsg,
}) => {
  const [configModule, setConfigModule] = useState(configModule1);
  const bnbChainId = Data[1]?.chainId;
  const ethChainId = Data[0]?.chainId;
  const [userChainId, setUserChainId] = useState(null);
  const [IsActiveBuyOnEth, setIsActiveBuyOnEth] = useState(false);
  const [IsActiveBuyOnBnb, setIsActiveBuyOnBnb] = useState(true);

  const [buyOnItem, setBuyOnItem] = useState(2);
  const [buyOnText, setBuyOnText] = useState("BUY ON BNB");
  const [buyOnIcon, setBuyOnIcon] = useState(BnbIcon);
  const [selectedImg, setSelectedImg] = useState(EthIcon);

  const makeEmptyInputs = () => {
    setPaymentAmount(0);
    setBuyAmount(0);
    setBonusAmount(0);
    setTotalAmount(0);
    setPaymentPrice(0);
  };

  const handleBuyOn = (itemId) => {
    if (itemId == 1) {
      setIsActiveBuyOnBnb(false);
      setIsActiveBuyOnEth(true);
      switchNetwork?.(ethChainId);
      setConfigModule((prev) => configModule1);
      makeEmptyInputs();
    }

    if (itemId == 2) {
      setIsActiveBuyOnEth(false);
      setIsActiveBuyOnBnb(true);
      switchNetwork?.(bnbChainId);
      setConfigModule((prev) => configModule2);
      makeEmptyInputs();
    }
  };

  const [userBalance, setUserBalance] = useState("0");
  const [usdExRate, setUsdExRate] = useState(0);
  const [tokenSymbol, setTokenSymbol] = useState("ELT");
  const [currentStage, setCurrentStage] = useState(1);
  const [currentPrice, setCurrentPrice] = useState("0.1");
  const [currentBonus, setCurrentBonus] = useState("20");
  const [stageEnd, setStageEnd] = useState(1733996440);
  const [presaleToken, setPresaleToken] = useState(10000);
  const [tokenSold, setTokenSold] = useState(0);
  const [bonusAmount, setBonusAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [tokenPercent, setTokenPercent] = useState(20);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentPrice, setPaymentPrice] = useState(0.00038);
  const [buyAmount, setBuyAmount] = useState(0);
  const [tokenDecimals, setTokenDecimals] = useState(18);
  const [tokenSubDecimals, setTokenSubDecimals] = useState(0);
  const [presaleStatus, setPresaleStatus] = useState(null);

  const { chain } = useNetwork();
  const { chains, switchNetwork } = useSwitchNetwork();

  const { address: addressData, isConnected } = useAccount();
  const { data: balanceData } = useBalance({
    address: addressData,
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
    if (isConnected) {
      if (chain) {
        const tmp = chain?.id;
        setUserChainId(chain?.id);
        if (tmp == ethChainId) {
          setConfigModule((prev) => configModule1);
          setSelectedImg(EthIcon);
          setBuyOnItem(2);
          setBuyOnText("BUY ON BNB");
          setBuyOnIcon(BnbIcon);
        }
        if (tmp == bnbChainId) {
          setConfigModule((prev) => configModule2);
          setSelectedImg(BnbIcon);
          setBuyOnItem(1);
          setBuyOnText("BUY ON ETH");
          setBuyOnIcon(EthIcon);
        }
      }

      if (balanceData) {
        let tmp = parseFloat(balanceData?.formatted).toFixed(2);
        setUserBalance(tmp.toString());
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
    }

    if (buyTokenIsSuccess) {
      const timeoutId = setTimeout(() => {
        window.location.reload();
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [
    isConnected,
    balanceData,
    chain,
    userChainId,
    tokenDecimalsData,
    configModule,
    tokenSymbolData,
    presaleTokenAmountData,
    totalSoldData,
    currentStageIdData,
    currentStageInfoData,
    tokenSold,
    presaleToken,
    buyTokenError,
    buyTokenIsSuccess,
    presaleStatus,
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

  const buyTokenLoadingMsg = (textMsg) => {
    setIsActiveNotification(true);
    setNotificationMsg(textMsg);
  };

  const buyTokenSuccessMsg = () => {
    setIsActiveNotification(true);
    setNotificatioDone(true);
    setNotificationMsg("Your transaction has been successfully complete");
  };

  return (
    <PayWithStyleWrapper variant={variant}>
      {variant === "v1" && (
        <div className="mb-20 text-center">
          <h4 className="ff-title fw-600 text-white text-uppercase">
            1 {tokenSymbol} = {currentPrice} USD
          </h4>
        </div>
      )}

      <div className="pay-with-content">
        <div className="pay-with-content-left">
          {(variant === "v1" || variant === "v2" || variant === "v3") && (
            <ul className="pay-with-list">
              <li>
                <button className="active">
                  <img src={selectedImg} alt="icon" />
                </button>
              </li>
            </ul>
          )}

          {variant === "v4" && (
            <Dropdown
              userChainId={userChainId}
              setIsActiveBuyOnEth={setIsActiveBuyOnEth}
              setIsActiveBuyOnBnb={setIsActiveBuyOnBnb}
              switchNetwork={switchNetwork}
              makeEmptyInputs={makeEmptyInputs}
              ethChainId={ethChainId}
              bnbChainId={bnbChainId}
              variant="v2"
            />
          )}
          {variant === "v5" && (
            <Dropdown
              userChainId={userChainId}
              setIsActiveBuyOnEth={setIsActiveBuyOnEth}
              setIsActiveBuyOnBnb={setIsActiveBuyOnBnb}
              switchNetwork={switchNetwork}
              makeEmptyInputs={makeEmptyInputs}
              ethChainId={ethChainId}
              bnbChainId={bnbChainId}
              variant="v3"
            />
          )}
          {variant === "v6" && (
            <Dropdown
              userChainId={userChainId}
              setIsActiveBuyOnEth={setIsActiveBuyOnEth}
              setIsActiveBuyOnBnb={setIsActiveBuyOnBnb}
              switchNetwork={switchNetwork}
              makeEmptyInputs={makeEmptyInputs}
              ethChainId={ethChainId}
              bnbChainId={bnbChainId}
              variant="v4"
            />
          )}
        </div>

        {variant === "v2" && (
          <div className="pay-with-content-middle">
            <h4 className="ff-title fw-600 text-white text-uppercase">
              1 {tokenSymbol} = {currentPrice} USD
            </h4>
          </div>
        )}

        {variant === "v3" && (
          <div className="pay-with-content-middle">
            <h4 className="ff-title2 fw-400 text-white text-uppercase">
              1 {tokenSymbol} = {currentPrice} USD
            </h4>
          </div>
        )}

        <div className="pay-with-content-right">
          {(variant === "v1" || variant === "v2" || variant === "v3") && (
            <button
              className="pay-with-button"
              onClick={() => handleBuyOn(buyOnItem)}
            >
              {buyOnText}
              <img src={buyOnIcon} alt="icon" />
            </button>
          )}

          {(variant === "v4" || variant === "v5" || variant === "v6") && (
            <ul className="pay-with-list">
              <li>
                <button className="active">
                  <img src={selectedImg} alt="icon" />
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>

      <form action="/" method="post">
        <div className="presale-item mb-30">
          <div className="presale-item-inner">
            <label>Pay token ({configModule.payWith})</label>
            <input
              type="number"
              placeholder="0"
              value={paymentAmount}
              onChange={handlePaymentInput}
            />
          </div>
          <div className="presale-item-inner">
            <label>Get Token ({tokenSymbol})</label>
            <input type="number" placeholder="0" value={totalAmount} disabled />
          </div>
        </div>
      </form>

      <div className="presale-item-msg">
        {presaleStatus && (
          <div className="presale-item-msg__content">
            <img src={StatusIcon} alt="icon" />
            <p>{presaleStatus}</p>
          </div>
        )}

        {buyTokenIsLoading &&
          buyTokenLoadingMsg("Transaction Processing. Click “Confirm”.")}

        {buyTokenIsSuccess && buyTokenSuccessMsg()}

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

      <button className="presale-item-btn" onClick={buyToken}>
     xxxxxxx
      </button>
    </PayWithStyleWrapper>
  );
};

export default PayWith;
