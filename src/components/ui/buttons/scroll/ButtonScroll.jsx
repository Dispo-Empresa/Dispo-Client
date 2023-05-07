import React, { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import styled from "styled-components";

function ScrollButton() {
  const [visible, setVisible] = useState(false);

  const Button = styled.div`
    position: fixed;
    width: 100%;
    left: 90%;
    bottom: 10%;
    height: 20px;
    font-size: 3rem;
    z-index: 999;
    cursor: pointer;
    color: #041a42;
  `;

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <Button>
      <FaArrowCircleUp
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}
      />
    </Button>
  );
}

export default ScrollButton;
