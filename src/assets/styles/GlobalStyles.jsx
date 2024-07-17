import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle` 
::-moz-selection {
    background: ${({ theme }) => theme.colors.primary};
    text-shadow: none;
    color: ${({ theme }) => theme.colors.white};
}

::selection {
    background: ${({ theme }) => theme.colors.primary};
    text-shadow: none;
    color: ${({ theme }) => theme.colors.white};
} 

html,
body {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 15px; 
    font-weight: 500;
    line-height: 1.6;
}

img {
    max-width: 100%;
    height: auto;
}

p {
    margin: 0px;
    line-height: 1.8;  
}


h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 0px;
    line-height: 1.35;
    font-family: ${({ theme }) => theme.fonts.primary};
}

h2{
    font-size: 60px;
    font-weight: 700;
}

h5{
    font-family: ${({ theme }) => theme.fonts.body};
    font-weight: 500;
    font-size: 18px;
    line-height: 36px;
}

a {
    text-decoration: none !important;
    outline: none;
    transition: all .4s;
}


ul, ol {
    list-style: outside none none;
    margin: 0px;
    padding: 0px;
}

html,
body, p, a{
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 16px;
    color: ${({ theme }) => theme.colors.white}cc;
} 


input[type='number']{
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
}

.ju367v4t {
    margin-top: 40px;
}

.ju367v48 {
    margin-right: 40px;
}

.ju367v3n {
    margin-left: 40px;
}

.ju367v32 {
    margin-bottom: 40px;
}

.iekbcc0{
    font-family: ${({ theme }) => theme.fonts.primary};
    font-weight: 700;
}

.ju367v1d,
.ju367v1c,
.ju367v1b{
    font-weight: 700 !important;
}

#rk_connect_title{
    font-family: ${({ theme }) => theme.fonts.primary};
    font-weight: 700;
    text-transform: uppercase;
    font-size: 22px;
    line-height: 24px;
}

.ju367v11{
    font-family: ${({ theme }) => theme.fonts.primary};
}

._1vwt0cg2{
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar{
      display: none;
    }
}

@media (min-width: 1400px){
    .container{
        max-width: 1200px;
        padding: 0px 20px;
    }
} 

/*-- custom bootstrap style start --*/
@media (min-width: 1400px) {
  .container,
  .container-lg,
  .container-md,
  .container-sm,
  .container-xl,
  .container-xxl {
    max-width: 1170px;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}

@media (max-width: 575px) {
  .container,
  .container-lg,
  .container-md,
  .container-sm,
  .container-xl,
  .container-xxl {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
}
/*-- custom bootstrap style end --*/

/*-- custom css start --*/

/*-- font-family style start --*/
.ff-outfit{font-family: ${({ theme }) => theme.fonts.primary};}
.ff-orbitron{font-family: ${({ theme }) => theme.fonts.secondary};}
.ff-title{font-family: ${({ theme }) => theme.fonts.title};}
.ff-title2{font-family: ${({ theme }) => theme.fonts.title2};}
/*-- font-family style end --*/

/*-- font-size style start --*/
.fs-15{font-size: 15px;}
.fs-70{
    font-size: 70px;
    line-height: 90px;
}
/*-- font-size style end --*/

/*-- font-weight style start --*/
.fw-300{font-weight: 300;}
.fw-400{font-weight: 400;}
.fw-500{font-weight: 500;}
.fw-600{font-weight: 600;}
.fw-700{font-weight: 700;}
/*-- font-weight style end --*/

/*-- margin-top style start --*/
.mt-15{margin-top: 15px;}
.mt-3{margin-top: 3px;}
.mt-30{margin-top: 30px;}
.mt-40{margin-top: 40px;}
/*-- margin-top style end --*/

/*-- margin-bottom style start --*/
.mb-10{margin-bottom: 10px;}
.mb-15{margin-bottom: 15px;}
.mb-17{margin-bottom: 17px;}
.mb-20{margin-bottom: 20px;}
.mb-25{margin-bottom: 25px;}
.mb-30{margin-bottom: 30px;}
.mb-35{margin-bottom: 35px;}
.mb-37{margin-bottom: 37px;}
.mb-40{margin-bottom: 40px;}
.mb-45{margin-bottom: 45px;}
.mb-50{margin-bottom: 50px;}
.mb-74{margin-bottom: 74px;}
/*-- margin-bottom style end --*/

/** Used to define container behavior: width, position: fixed etc... **/
.Toastify__toast-container {
}

/** Used to define the position of the ToastContainer **/
.Toastify__toast-container--top-left {
}
.Toastify__toast-container--top-center {
}
.Toastify__toast-container--top-right {
}
.Toastify__toast-container--bottom-left {
}
.Toastify__toast-container--bottom-center {
}
.Toastify__toast-container--bottom-right {
}

/** Classes for the displayed toast **/
.Toastify__toast {
}
.Toastify__toast--rtl {
}
.Toastify__toast-body {
}

/** Used to position the icon **/
.Toastify__toast-icon {
}

/** handle the notification color and the text color based on the theme **/
.Toastify__toast-theme--dark {
}
.Toastify__toast-theme--light {
}
.Toastify__toast-theme--colored.Toastify__toast--default {
}
.Toastify__toast-theme--colored.Toastify__toast--info {
}
.Toastify__toast-theme--colored.Toastify__toast--success {
}
.Toastify__toast-theme--colored.Toastify__toast--warning {
}
.Toastify__toast-theme--colored.Toastify__toast--error {
}

.Toastify__progress-bar {
}
.Toastify__progress-bar--rtl {
}
.Toastify__progress-bar-theme--light {
}
.Toastify__progress-bar-theme--dark {
}
.Toastify__progress-bar--info {
}
.Toastify__progress-bar--success {
}
.Toastify__progress-bar--warning {
}
.Toastify__progress-bar--error {
}
/** colored notifications share the same progress bar color **/
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,
.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error {
}

/** Classes for the close button. Better use your own closeButton **/
.Toastify__close-button {
}
.Toastify__close-button--default {
}
.Toastify__close-button > svg {
}
.Toastify__close-button:hover,
.Toastify__close-button:focus {
}
/*-- custom css end --*/
`;

export default GlobalStyles;
