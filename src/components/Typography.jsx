// Typography.js
import React from "react";
import styled from "styled-components";

const getFontSize = (variant) => {
  switch (variant) {
    case "h1":
      return 2;
    case "h2":
      return 1.8;
    case "h3":
      return 1.3;
    case "h4":
      return 1.2;
    case "h5":
      return 1;
    case "body":
      return 0.8;
    case "smbody":
      return 0.7;
    case "card":
      return 0.6;
    default:
      return 0.8;
  }
};
const getFontFamily = (fontface) => {
  switch (fontface) {
    case "goth":
      return `'Grenze Gotisch', serif`;
    case "cursive":
      return `'Dancing Script', cursive`;
    case "typewritter":
      return `'Courier Prime', monospace`;
    default:
      return `'Courier Prime', monospace`;
  }
};
const Typography = styled.div`
  width: fit-content;
  ${({
    variant,
    underline,
    gutterbottom,
    fontface,
    color,
    fontWeight,
    align,
  }) => `
    font-size: ${getFontSize(variant)}rem;
    color:${color};
    font-weight:${fontWeight};
    margin-bottom: ${gutterbottom ? "12px" : 0};
    border-bottom: ${underline ? "2px solid #FFDB58" : "none"};
     font-family:${getFontFamily(fontface)};
    text-align:${align};
    /* Extra Small Devices (Mobile Phones) */
    @media only screen and (max-width: 400px) {
      /* Styles for extra small devices (mobile phones) */
      
      font-size: ${getFontSize(variant) * 0.9}rem
    }
    
    /* Small Devices (Tablets) */
    @media only screen and (min-width: 401px) and (max-width: 767px) {
      /* Styles for small devices (tablets) */
      
      font-size: ${getFontSize(variant) * 1}rem
    }
    
    /* Medium Devices (Laptops, Small Desktops) */
    @media only screen and (min-width: 768px) and (max-width: 991px) {
      /* Styles for medium devices (laptops, small desktops) */
      
      font-size: ${getFontSize(variant) * 1.1}rem
    }
    
    /* Large Devices (Desktops) */
    @media only screen and (min-width: 992px) and (max-width: 1199px) {
      /* Styles for large devices (desktops) */
      
      font-size: ${getFontSize(variant) * 1.2}rem

    }
    
    /* Extra Large Devices (Large Desktops) */
    @media only screen and (min-width: 1200px) {
      /* Styles for extra large devices (large desktops) */
      font-size: ${getFontSize(variant) * 1.3}rem

    }
  //   overflow: hidden;
  // white-space: nowrap;
  // text-overflow: ellipsis;
  `}
`;

export default Typography;
