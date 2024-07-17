import styled from "styled-components";

import BannerBgImg from "../../../assets/images/banner/banner7-bg.png";
import IconImg from "../../../assets/images/icons/star-square.svg";

const BannerWrapper = styled.section`
  background-image: url(${BannerBgImg});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  min-height: 100vh;
  position: relative;
  z-index: 0;

  .banner-header {
    padding: 25px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .banner-title {
    margin-top: 60px;
    color: ${({ theme }) => theme.colors.white};
    font-family: ${({ theme }) => theme.fonts.title};
    font-size: 70px;
    font-weight: 700;
    line-height: 90px;

    span {
      background: linear-gradient(180deg, #fff 0%, #1dff96 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  .banner-subtitle {
    margin-bottom: 32px;
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: 18px;
    font-weight: 500;
    line-height: 30px;
    color: ${({ theme }) => theme.colors.white};
  }

  .banner-row {
    border-top: 1px solid ${({ theme }) => theme.colors.white}1a;
  }

  .banner-col-left {
    padding: 30px 30px 30px 0;
  }

  .banner-col-right {
    padding: 0;
  }

  .banner-col {
    height: 100%;
    padding: 30px 0 30px 30px;
    border-left: 1px solid ${({ theme }) => theme.colors.white}1a;
  }

  .audit-item {
    display: flex;
    align-items: center;
    gap: 60px;
    flex-wrap: wrap;
  }

  .bottom-info {
    padding: 30px 0 30px 30px;
    border-left: 1px solid ${({ theme }) => theme.colors.white}1a;
    h5 {
      font-family: ${({ theme }) => theme.fonts.primary};
      font-size: 18px;
      font-weight: 600;
      line-height: 30px;
    }
  }

  .banner-list {
    border-left: 1px solid ${({ theme }) => theme.colors.white}1a;
    li {
      /*  */
      /* */
    }

    li a {
      padding: 26px 0 26px 30px;
      border-bottom: 1px solid ${({ theme }) => theme.colors.white}1a;
      display: flex;
      align-items: center;
      position: relative;
      transition: 0.3s;

      &:before {
        position: absolute;
        content: "";
        bottom: -1px;
        left: 0;
        width: 0%;
        height: 1px;
        background-color: ${({ theme }) => theme.colors.primary};
        transition: 0.3s;
      }

      &:hover {
        &:before {
          width: 100%;
        }

        span {
          color: ${({ theme }) => theme.colors.white};
        }
      }

      span {
        width: 100%;
        font-family: ${({ theme }) => theme.fonts.primary};
        font-size: 16px;
        font-weight: 500;
        line-height: 26px;
        color: ${({ theme }) => theme.colors.white}cc;
      }

      .icon {
        margin-right: 20px;
        width: 18px;
        height: 18px;
      }

      .name {
        text-align: left;
      }

      .icon-text {
        text-align: center;
      }

      .url {
        text-align: right;
      }
    }
  }

  .banner-list .list-item {
    display: flex;
    align-items: center;
    gap: 10px;

    &-left,
    &-middle,
    &-right {
      width: 100%;
    }

    &-middle {
      text-align: center;
    }

    &-left {
      display: flex;
      align-items: center;
      gap: 20px;

      img {
        width: 18px;
        height: 18px;
      }

      h6 {
        font-family: ${({ theme }) => theme.fonts.primary};
        font-size: 16px;
        font-weight: 600;
        line-height: 26px;
        color: ${({ theme }) => theme.colors.white}cc;
      }
    }

    &-right {
      text-align: right;

      h6 {
        font-family: ${({ theme }) => theme.fonts.primary};
        font-size: 16px;
        font-weight: 500;
        line-height: 26px;
        color: ${({ theme }) => theme.colors.white}cc;
      }
    }
  }

  @media screen and (max-width: 991px) {
    .banner-col {
      padding: 30px 0;
      border-left: 0;
    }

    .banner-col-left {
      padding: 30px 0 30px 0;
    }

    .audit-item {
      padding: 30px 0;
      display: flex;
      align-items: center;
      gap: 60px;
      flex-wrap: wrap;
    }

    .bottom-info {
      padding: 30px 0;
      border-left: 0;
    }

    .banner-list {
      border-left: 0;
      li a{
        padding: 26px 0;
      }
    }
  }
`;

export default BannerWrapper;
