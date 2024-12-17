import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
type Props = {};

const LeftAuthCard = (props: Props) => {
  return (
    <div className="left">
      <div className="overlay">
        <h1>Welocome To ShopTank</h1>
        <p className="text-white">
          Discover the ultimate shopping experience at ShopperStop! Trendy
          collections, unbeatable deals, and seamless shopping—everything you
          love, all in one place.
          <br />
          <br />
          <div className="link--arrowed bg-light btn">
            <section className="centered-">
              <a
                className="link link--arrowed text-black text-decoration-none"
                href="/"
              >
                Back To Site{" "}
                <svg
                  className="arrow-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  <g
                    fill="none"
                    stroke="#2175FF"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                    stroke-miterlimit="10"
                  >
                    <circle
                      className="arrow-icon--circle"
                      cx="16"
                      cy="16"
                      r="15.12"
                    ></circle>
                    <path
                      className="arrow-icon--arrow"
                      d="M16.14 9.93L22.21 16l-6.07 6.07M8.23 16h13.98"
                    ></path>
                  </g>
                </svg>
              </a>
            </section>
          </div>
        </p>
      </div>
    </div>
  );
};

export default LeftAuthCard;
