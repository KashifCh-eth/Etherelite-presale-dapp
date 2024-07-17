import styled from "styled-components";

import BannerBgImg from "../../../assets/images/banner/banner5-bg.png";
import IconImg from "../../../assets/images/icons/star-square.svg";

const BannerWrapper = styled.section`
  background-image: url(${BannerBgImg});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  min-height: 100vh;
  padding: 223px 0 0px 0;
  position: relative;
  z-index: 0;

  .banner-title {
    margin-bottom: 23px;
    font-family: ${({ theme }) => theme.fonts.title2};
    font-size: 90px;
    font-weight: 400;
    line-height: 90px;
    color: ${({ theme }) => theme.colors.white};
  }

  .banner-subtitle {
    margin-bottom: 32px;
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: 18px;
    font-weight: 500;
    line-height: 30px;
    color: ${({ theme }) => theme.colors.white};
  }

  .scroll-slider-wrapper {
    padding: 70px 0;
    overflow: hidden;
    position: relative;
    z-index: 0;

    &::before {
      position: absolute;
      z-index: -1;
      content: "";
      top: 70px;
      left: 0;
      width: 100%;
      height: 80px;
      background: rgba(255, 255, 255, 0.15);
      transform: rotate(4deg);
    }
  }

  .scroll-slider-content {
    width: 100%;
    height: 80px;
    background: linear-gradient(90deg, #1dff96 0%, #bcff7b 100%);
    backdrop-filter: blur(10px);
    transform: rotate(-4deg);
  }

  .gittu-slider {
    background: linear-gradient(90deg, #1dff96 0%, #bcff7b 100%);
    backdrop-filter: blur(10px);

    .slider-item {
      margin: 0 30px;
      height: 80px;
      display: flex !important;
      align-items: center;
      justify-content: center;
      gap: 30px;
      position: relative;
      padding-left: 30px;

      &::before {
        position: absolute;
        content: url(${IconImg});
        top: 50%;
        left: -5px;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
      }

      a {
        display: inline-block;
        img {
          width: 40px;
          height: 40px;
        }
      }

      p {
        color: ${({ theme }) => theme.colors.black};
        font-family: ${({ theme }) => theme.fonts.title2};
        font-size: 60px;
        font-weight: 400;
        line-height: 40px;
      }
    }
  }

  @media screen and (max-width: 991px) {
    .banner-title {
      font-size: 80px;
      line-height: 80px;
    }
  }

  @media screen and (max-width: 767px) {
    .banner-title {
      font-size: 55px;
      line-height: 55px;
    }
  }

  @media screen and (max-width: 575px) {
    .banner-title {
      margin-bottom: 10px;
      font-size: 50px;
      line-height: 50px;
    }
  }

  @media screen and (max-width: 480px) {
    padding: 150px 0 0px 0;

    .banner-title {
      margin-bottom: 10px;
      font-size: 40px;
      line-height: 40px;
    }
  }
`;

export default BannerWrapper;
