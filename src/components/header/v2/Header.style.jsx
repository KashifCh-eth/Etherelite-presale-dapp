import styled from "styled-components";

const HeaderWrapper = styled.div`
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  padding: 25px 0;
  transition: 0.3s;

  &.sticky {
    background: ${({ theme }) => theme.colors.bgHeader};
  }

  .gittu-header-content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .gittu-header-left {
    display: flex;
    align-items: center;
    gap: 60px;
  }

  .gittu-header-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .gittu-header-right-menu {
    display: flex;
    align-items: center;
    gap: 40px;
  }

  .gittu-header-menu {
    li a {
      font-family: ${({ theme }) => theme.fonts.primary};
      font-weight: 700;
      font-size: 15px;
      line-height: 26px;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.white};
    }
  }

  .gittu-header-menu-toggle {
    display: none;

    .menu-toggler {
      border: 0;
      padding: 0;
      background: transparent;
      color: ${({ theme }) => theme.colors.white};
      font-size: 30px;
    }
  }

  .gittu-container {
    width: 100%;
    margin: 0 auto;
    max-width: 1680px;
  }

  @media screen and (max-width: 1699px) {
    .gittu-container {
      max-width: 1580px;
    }
  }
  @media screen and (max-width: 1599px) {
    .gittu-container {
      max-width: 1480px;
    }
  }
  @media screen and (max-width: 1499px) {
    .gittu-container {
      max-width: 1380px;
      padding: 0 20px;
    }
  }

  @media screen and (max-width: 1379px) {
    .gittu-container {
      max-width: 100%;
      padding: 0 20px;
    }
  }

  @media screen and (max-width: 991px) {
    .gittu-header-menu-toggle {
      display: block;
    }

    .gittu-header-menu {
      display: none;
    }

    .gittu-header-left {
      gap: 30px;
    }

    .gittu-header-right {
      flex-direction: row-reverse;
    }
  }

  @media screen and (max-width: 480px) {
    .gittu-header-left {
      gap: 15px;
    }

    .gittu-header-logo {
      flex: 0 0 auto;
      max-width: 100px;
    }

    .demo-btn {
      display: none;
    }

    .gittu-header-right {
      gap: 10px;
    }
  }
`;

export default HeaderWrapper;
