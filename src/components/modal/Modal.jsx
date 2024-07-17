import { useState, useEffect } from "react";
import Button from "../button/Button";
import Dropdown from "../dropdown/Dropdown";
import ModalWrapper from "./Modal.style";
import { CgClose } from "react-icons/cg";
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  useNetwork,
} from "wagmi";
import { formatEther, parseEther } from "viem";
import * as configModule1 from "../../contracts/config";
import * as configModule2 from "../../contracts/configBnb";
import Data from "../../assets/data/networkInfo";
import StatusIcon from "../../assets/images/icons/status.png";
import SuccessIcon from "../../assets/images/icons/successful.svg";

const Modal = ({
  setIsModalOpen,
  modalCloseHandle,
  setIsActiveNotification,
  setNotificatioDone,
  setNotificationMsg,
  ...props
}) => {
  const [configModule, setConfigModule] = useState(configModule1);
  const bnbChainId = Data[1]?.chainId;
  const ethChainId = Data[0]?.chainId;
  const [userChainId, setUserChainId] = useState(null);

  const [usdExRate, setUsdExRate] = useState(0);
  const [paymentUsd, setPaymentUsd] = useState(0);
  const [userBalance, setUserBalance] = useState("28.25ETH");
  const [tokenSymbol, setTokenSymbol] = useState("ELT");
  const [currentStage, setCurrentStage] = useState(0);
  const [currentBonus, setCurrentBonus] = useState("0");
  const [currentPrice, setCurrentPrice] = useState("0.001");
  const [paymentPrice, setPaymentPrice] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [buyAmount, setBuyAmount] = useState(0);
  const [bonusAmount, setBonusAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
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

      if (currentStageIdData) {
        setCurrentStage(currentStageIdData.toString());
      }

      if (currentStageInfoData) {
        setCurrentBonus(currentStageInfoData[1].toString());
        const tmp = formatEther(currentStageInfoData[2]);
        setCurrentPrice(tmp.toString());
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
      }

      if (buyTokenIsSuccess) {
        setIsModalOpen(false);
        setIsActiveNotification(false);
        setNotificatioDone(false);
        setNotificationMsg("");
      }
    }
  }, [
    isConnected,
    chain,
    configModule,
    balanceData,
    tokenSymbolData,
    tokenDecimalsData,
    currentStageIdData,
    currentStageInfoData,
    usdExRate,
    paymentPrice,
    buyTokenError,
    buyTokenIsSuccess,
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
    <ModalWrapper className="modal" {...props}>
      <div className="modal-dialog modal-dialog-centered gittu-modal-dialog">
        <div className="modal-content gittu-modal-content">
          <div className="gittu-modal-header">
            <h4 className="ff-orbitron fw-700 text-white text-uppercase">
              Be an early investor
            </h4>
            <button onClick={modalCloseHandle}>
              <CgClose />
            </button>
          </div>

          <div className="gittu-modal-body">
            <div className="mb-20">
              <h5 className="ff-outfit fw-600 text-white text-uppercase">
                Balance : {userBalance}
              </h5>
            </div>

            <div className="presale-item mb-25">
              <h6>Amount</h6>
              <div className="input-group">
                <input
                  type="number"
                  min={currentPrice}
                  step={currentPrice}
                  placeholder="0.5"
                  value={paymentAmount}
                  onChange={handlePaymentInput}
                />

                <div className="input-group-dropdown">
                  <Dropdown
                    userChainId={userChainId}
                    ethChainId={ethChainId}
                    bnbChainId={bnbChainId}
                  />
                </div>
              </div>
            </div>
            <div className="presale-item mb-25">
              <h6>Get Amount ( {tokenSymbol} )</h6>
              <input
                type="text"
                name="usd-amount"
                id="usd-amount"
                placeholder="569633"
                value={buyAmount}
                disabled
              />
            </div>

            <ul className="token-info-list mb-35">
              <li>
                <p>$ Price</p>
                <p>{paymentUsd}</p>
              </li>
              <li>
                <p>Bonus {currentBonus}%</p>
                <p>{bonusAmount}</p>
              </li>
              <li>
                <p>Total Amount</p>
                <p>{totalAmount}</p>
              </li>
            </ul>

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
            </div>

            <Button
              size="large"
              variant={props.variant === "v2" ? "gadient2" : "gradient"}
              onClick={buyToken}
              className="btn-approve"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default Modal;
