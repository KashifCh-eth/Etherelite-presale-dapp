import styled from "styled-components";

import BannerBgImg from "../../../assets/images/banner/banner4-bg.png";

const BannerWrapper = styled.div`
  padding: 200px 0 100px 0;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  z-index: 0;
  background-image: url(${BannerBgImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  .banner-title {
    color: ${({ theme }) => theme.colors.white};
    text-align: center;
    text-shadow: 4px 6px 0px #fcd930;
    -webkit-text-stroke-width: 1;
    -webkit-text-stroke-color: #000;
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: 90px;
    font-weight: 700;
    line-height: 90px;
  }

  @media screen and (max-width: 767px) {
    .banner-title {
      font-size: 60px;
      line-height: 60px;
    }
  }

  @media screen and (max-width: 575px) {
    .banner-title {
      font-size: 50px;
      line-height: 50px;
    }
  }
`;

export default BannerWrapper;
