import styled from "styled-components";

import BannerBgImg from "../../../assets/images/banner/banner8-bg.png";
import IconImg from "../../../assets/images/icons/star-square.svg";

const BannerWrapper = styled.section`
  background-image: url(${BannerBgImg});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  min-height: 100vh;
  padding: 223px 0 0 0;
  position: relative;
  z-index: 0;

  .banner-badge {
    margin-bottom: 30px;
    width: fit-content;
    padding: 4px 12px 4px 7px;
    border-radius: 19px;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    gap: 10px;
    h4 {
      padding: 4px 8px;
      border-radius: 12px;
      background: linear-gradient(
        103deg,
        #3c38ff 0%,
        #8c45ff 33.33%,
        #ff36c7 68.23%,
        #ffa336 100%
      );
      backdrop-filter: blur(10px);
      color: ${({ theme }) => theme.colors.white};
      font-family: ${({ theme }) => theme.fonts.primary};
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 1;
    }
    p {
      color: ${({ theme }) => theme.colors.white};
      font-family: ${({ theme }) => theme.fonts.primary};
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 30px;
    }
  }

  .banner-title {
    margin-bottom: 10px;
    color: ${({ theme }) => theme.colors.white};
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: 70px;
    font-weight: 700;
    line-height: 90px;
    text-transform: uppercase;
  }

  .banner-subtitle {
    margin-bottom: 40px;
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: 18px;
    font-weight: 500;
    line-height: 30px;
    color: ${({ theme }) => theme.colors.white};
  }

  .whitepaper-btn {
    width: fit-content;
    border-radius: 30px;
    background: ${({ theme }) => theme.colors.white}26;
    backdrop-filter: blur(7.5px);
    border: 0;
    padding: 17px 46px;
    font-family: ${({ theme }) => theme.fonts.outfit};
    font-weight: 700;
    font-size: 15px;
    line-height: 26px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: 0.3s;

    img {
      filter: brightness(0) invert(1);
    }

    &:hover {
      background: ${({ theme }) => theme.colors.primary}40;
    }
  }

  .progress-card {
    padding: 40px 40px 0 40px;
    border-radius: 40px 40px 0px 0px;
    /* border: 2px solid #ffffff26;
    border-bottom: 0; */
    background: linear-gradient(
      180deg,
      rgba(43, 46, 82, 0.95) 0%,
      rgba(43, 46, 82, 0) 100%
    );

    .progress-info {
      &.right {
        text-align: right;
      }
    }
  }

  .presale-card-wrapper {
    margin-top: 90px;
    position: relative;

    &::before {
      position: absolute;
      content: "";
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 50px);
      height: 100%;
      border-radius: 40px 40px 0px 0px;
      background: linear-gradient(
        90deg,
        rgba(60, 56, 255, 0.4) 0%,
        rgba(140, 69, 255, 0.4) 36.98%,
        rgba(255, 54, 199, 0.4) 68.23%,
        rgba(255, 163, 54, 0.4) 100%
      );
      filter: blur(25px);
    }
  }

  .presale-card {
    border-radius: 40px 40px 0px 0px;
    border: 2px solid ${({ theme }) => theme.colors.white}26;
    background: rgba(43, 46, 82, 0.95);
    backdrop-filter: blur(20px);
    display: flex;
    gap: 82px;
    position: relative;

    &::before {
      position: absolute;
      content: "";
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 2px;
      height: 100%;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0) 100%
      );
    }

    &-left {
      width: 100%;
      padding: 40px 0 0 0;
    }
    &-right {
      width: 100%;
      padding: 40px 40px 40px 0;
    }
  }

  .presale-card-title {
    position: absolute;
    top: -20px;
    left: 40px;
    width: fit-content;
    padding: 5px 14px;
    border-radius: 20px;
    background: linear-gradient(
      103deg,
      #3c38ff 0%,
      #8c45ff 33.33%,
      #ff36c7 68.23%,
      #ffa336 100%
    );
    backdrop-filter: blur(10px);
    p {
      text-transform: capitalize;
      color: ${({ theme }) => theme.colors.white};
      font-family: ${({ theme }) => theme.fonts.primary};
      font-size: 18px;
      font-weight: 600;
      line-height: 30px;
    }
  }

  .presale-card-counter {
    padding: 13px 40px 7px 40px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  @media screen and (max-width: 1199px) {
    .banner-title {
      font-size: 60px;
      line-height: 80px;
    }
  }

  @media screen and (max-width: 991px) {
    .progress-card {
      margin-top: 30px;
    }

    .presale-card-wrapper {
      margin-top: 90px;
      position: relative;
    }

    .presale-card {
      flex-direction: column;
      gap: 40px;

      &::before {
        display: none;
      }

      &-left {
        width: 100%;
        padding: 40px 0 0 0;
      }
      &-right {
        width: 100%;
        padding: 40px;
      }
    }
  }

  @media screen and (max-width: 575px) {
    padding: 150px 0 0 0;

    .banner-title {
      font-size: 50px;
      line-height: 50px;
    }
  }

  @media screen and (max-width: 480px) {
    .banner-title {
      font-size: 40px;
      line-height: 40px;
    }

    .presale-card {
      flex-direction: column;
      gap: 30px;

      &-right {
        width: 100%;
        padding: 20px;
      }
    }

    .presale-card-title {
      left: 20px;
      padding: 3px 12px;

      p {
        font-size: 14px;
      }
    }

    .presale-card-counter {
      padding: 13px 20px 7px 20px;
    }
  }
`;

export default BannerWrapper;
