import React, { ReactElement } from "react";
import { withTheme } from "@material-ui/core/styles";
import styled from "styled-components";

interface ILogo {
  width?: string;
}
const LogoContainer = withTheme(styled("div")`
  & svg path.changeable {
    fill: ${(props) => props.theme.palette.textPrimary.main};
  }
`);

export const Logo = ({ width }: ILogo): ReactElement => (
  <LogoContainer>
    <svg
      width={width || 100}
      height="49"
      viewBox="0 0 125 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.183 1.34772V24.8471C29.183 28.7514 27.8755 31.8389 25.2605 34.1096C22.663 36.3803 19.1066 37.5156 14.5915 37.5156C10.146 37.5156 6.61585 36.4129 4.00089 34.2076C1.38593 32.0022 0.0522992 28.9719 0 25.1166V1.34772H7.84488V24.8961C7.84488 27.2321 8.43761 28.9392 9.62305 30.0174C10.8259 31.0792 12.4821 31.6102 14.5915 31.6102C19.002 31.6102 21.2422 29.4375 21.3119 25.0921V1.34772H29.183Z"
        fill="#FCA311"
      />
      <path
        d="M42.4685 10.5122L42.7038 13.5752C44.7261 11.2065 47.4369 10.0221 50.8364 10.0221C53.8349 10.0221 56.0663 10.8471 57.5307 12.497C58.995 14.147 59.7447 16.6137 59.7795 19.8972V37.0255H52.2223V20.0688C52.2223 18.5659 51.8736 17.4795 51.1763 16.8097C50.479 16.1236 49.3197 15.7806 47.6984 15.7806C45.5716 15.7806 43.9765 16.63 42.913 18.329V37.0255H35.3558V10.5122H42.4685Z"
        fill="#FCA311"
      />
      <path
        d="M73.9019 37.0255H66.3185V10.5122H73.9019V37.0255ZM65.8739 3.6511C65.8739 2.58926 66.2487 1.71528 66.9984 1.02917C67.7654 0.343056 68.8027 0 70.1102 0C71.4002 0 72.4288 0.343056 73.1958 1.02917C73.9629 1.71528 74.3464 2.58926 74.3464 3.6511C74.3464 4.72927 73.9542 5.61142 73.1697 6.29753C72.4026 6.98364 71.3828 7.3267 70.1102 7.3267C68.8376 7.3267 67.809 6.98364 67.0245 6.29753C66.2575 5.61142 65.8739 4.72927 65.8739 3.6511Z"
        fill="#FCA311"
      />
      <path
        className="changeable"
        d="M78.5047 41.7634C78.3324 44.0084 77.4506 45.7758 75.8592 47.0655C74.278 48.3552 72.19 49 69.5952 49C66.7571 49 64.5221 48.102 62.8902 46.306C61.2684 44.5004 60.4575 42.0261 60.4575 38.8831V37.6077C60.4575 35.6016 60.8326 33.8342 61.5826 32.3057C62.3327 30.7772 63.402 29.6069 64.7907 28.7949C66.1895 27.9733 67.8112 27.5625 69.656 27.5625C72.2103 27.5625 74.2679 28.2073 75.8288 29.497C77.3898 30.7867 78.2919 32.5971 78.5352 34.9281H73.9739C73.8624 33.581 73.4621 32.6066 72.7728 32.0048C72.0937 31.3934 71.0548 31.0877 69.656 31.0877C68.1356 31.0877 66.9953 31.6035 66.2351 32.6353C65.485 33.6575 65.0998 35.2481 65.0796 37.4071V38.9834C65.0796 41.238 65.4394 42.8859 66.159 43.9272C66.8888 44.9685 68.0342 45.4892 69.5952 45.4892C71.0041 45.4892 72.0532 45.1883 72.7424 44.5864C73.4418 43.975 73.8422 43.034 73.9435 41.7634H78.5047Z"
        fill="white"
      />
      <path
        className="changeable"
        d="M80.7604 40.8176C80.7604 39.2796 81.0746 37.9087 81.7031 36.705C82.3315 35.5013 83.2336 34.5698 84.4094 33.9106C85.5953 33.2515 86.9688 32.9219 88.5297 32.9219C90.7495 32.9219 92.5588 33.5619 93.9576 34.8421C95.3665 36.1222 96.152 37.8609 96.3142 40.0582L96.3446 41.1186C96.3446 43.4973 95.6401 45.408 94.2312 46.8505C92.8223 48.2835 90.9319 49 88.5601 49C86.1883 49 84.2928 48.2835 82.8738 46.8505C81.4649 45.4175 80.7604 43.4687 80.7604 41.0039V40.8176ZM85.1544 41.1186C85.1544 42.5898 85.4483 43.7171 86.0362 44.5004C86.6241 45.2742 87.4654 45.6611 88.5601 45.6611C89.6244 45.6611 90.4556 45.279 91.0536 44.5147C91.6516 43.7409 91.9506 42.5086 91.9506 40.8176C91.9506 39.3751 91.6516 38.2574 91.0536 37.4644C90.4556 36.6715 89.6143 36.2751 88.5297 36.2751C87.4553 36.2751 86.6241 36.6715 86.0362 37.4644C85.4483 38.2478 85.1544 39.4659 85.1544 41.1186Z"
        fill="white"
      />
      <path
        className="changeable"
        d="M108.529 37.0919C107.93 37.0154 107.403 36.9772 106.947 36.9772C105.285 36.9772 104.195 37.5074 103.678 38.5678V48.7134H99.2845V33.2085H103.435L103.557 35.057C104.439 33.6336 105.66 32.9219 107.221 32.9219C107.708 32.9219 108.164 32.984 108.589 33.1082L108.529 37.0919Z"
        fill="white"
      />
      <path
        className="changeable"
        d="M114.935 33.2085L115.072 34.9997C116.248 33.6145 117.824 32.9219 119.8 32.9219C121.544 32.9219 122.841 33.4043 123.692 34.3692C124.544 35.3341 124.98 36.7766 125 38.6968V48.7134H120.606V38.7971C120.606 37.9182 120.403 37.2829 119.998 36.8913C119.592 36.49 118.918 36.2894 117.976 36.2894C116.739 36.2894 115.812 36.7862 115.193 37.7797V48.7134H110.799V33.2085H114.935Z"
        fill="white"
      />
    </svg>
  </LogoContainer>
);
