import "./Footer.css";
import img from "../assets/icons_payment 1.png";
import React from "react";
const CoralHomePage = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <main className="content-wrapper">
        <section>
          <ul>
            <div className="logo">
              <svg
                width="31"
                height="15"
                style={{ marginRight: "5px" }}
                viewBox="0 0 31 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.353554 7.5L7.5 0.353554L14.6464 7.5L7.5 14.6464L0.353554 7.5Z"
                  stroke="black"
                  strokeWidth="0.5"
                />
                <path
                  d="M8.35355 7.5L15.5 0.353554L22.6464 7.5L15.5 14.6464L8.35355 7.5Z"
                  stroke="black"
                  strokeWidth="0.5"
                />
                <path
                  d="M16.3536 7.5L23.5 0.353554L30.6464 7.5L23.5 14.6464L16.3536 7.5Z"
                  stroke="black"
                  strokeWidth="0.5"
                />
              </svg>
              <div className="menu-text">ShoppersStop</div>
              <svg
                width="31"
                height="15"
                viewBox="0 0 31 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.353554 7.5L7.5 0.353554L14.6464 7.5L7.5 14.6464L0.353554 7.5Z"
                  stroke="black"
                  strokeWidth="0.5"
                />
                <path
                  d="M8.35355 7.5L15.5 0.353554L22.6464 7.5L15.5 14.6464L8.35355 7.5Z"
                  stroke="black"
                  strokeWidth="0.5"
                />
                <path
                  d="M16.3536 7.5L23.5 0.353554L30.6464 7.5L23.5 14.6464L16.3536 7.5Z"
                  stroke="black"
                  strokeWidth="0.5"
                />
              </svg>
            </div>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact</li>
            <li>Products</li>
            <li
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <svg
                width="31"
                height="15"
                style={{ marginLeft: "3px" }}
                viewBox="0 0 31 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.353554 7.5L7.5 0.353554L14.6464 7.5L7.5 14.6464L0.353554 7.5Z"
                  stroke="black"
                  strokeWidth="0.5"
                />
                <path
                  d="M8.35355 7.5L15.5 0.353554L22.6464 7.5L15.5 14.6464L8.35355 7.5Z"
                  stroke="black"
                  strokeWidth="0.5"
                />
                <path
                  d="M16.3536 7.5L23.5 0.353554L30.6464 7.5L23.5 14.6464L16.3536 7.5Z"
                  stroke="black"
                  strokeWidth="0.5"
                />
              </svg>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.60001 16H0.199997V5.3H3.60001V16ZM1.9 3.8C0.800002 3.8 0 3 0 1.9C0 0.8 0.900002 0 1.9 0C3 0 3.8 0.8 3.8 1.9C3.8 3 3 3.8 1.9 3.8ZM16 16H12.6V10.2C12.6 8.5 11.9 8 10.9 8C9.89999 8 8.89999 8.8 8.89999 10.3V16H5.5V5.3H8.7V6.8C9 6.1 10.2 5 11.9 5C13.8 5 15.8 6.1 15.8 9.4V16H16Z"
                  fill="black"
                />
              </svg>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.4 16 16 12.416 16 8C16 3.584 12.4 0 8 0ZM13.28 3.68C14.24 4.848 14.8 6.32 14.832 7.936C14.608 7.888 12.352 7.44 10.08 7.712C10.032 7.6 9.984 7.472 9.936 7.36C9.792 7.024 9.648 6.688 9.488 6.368C11.984 5.36 13.136 3.872 13.28 3.68ZM8 1.184C9.728 1.184 11.328 1.84 12.528 2.896C12.4 3.072 11.376 4.448 8.944 5.36C7.824 3.296 6.576 1.616 6.4 1.36C6.912 1.248 7.44 1.184 8 1.184ZM5.088 1.824C5.264 2.064 6.48 3.76 7.616 5.776C4.416 6.624 1.6 6.608 1.296 6.608C1.76 4.48 3.184 2.72 5.088 1.824ZM1.168 8.016C1.168 7.952 1.168 7.872 1.168 7.808C1.456 7.824 4.784 7.856 8.192 6.832C8.384 7.216 8.576 7.6 8.752 8C8.672 8.032 8.576 8.048 8.48 8.08C4.96 9.216 3.088 12.32 2.928 12.576C1.824 11.36 1.168 9.76 1.168 8.016ZM8 14.832C6.416 14.832 4.96 14.288 3.808 13.392C3.936 13.136 5.312 10.464 9.168 9.12C9.184 9.104 9.2 9.104 9.216 9.104C10.176 11.6 10.576 13.68 10.672 14.288C9.856 14.64 8.944 14.832 8 14.832ZM11.808 13.664C11.744 13.248 11.376 11.248 10.48 8.8C12.624 8.464 14.496 9.024 14.736 9.088C14.432 10.992 13.344 12.64 11.808 13.664Z"
                  fill="black"
                />
              </svg>
            </li>
          </ul>
        </section>
        <div className="links">
          <section>
            <h3>CATALOG</h3>
            <ul>
              <li>Necklaces</li>
              <li>hoodies</li>
              <li>Jewelry Box</li>
              <li>t-shirt</li>
              <li>jacket</li>
            </ul>
          </section>
          <section>
            <h3>ABOUT US</h3>
            <ul>
              <li>Our Producers</li>
              <li>Sitemap</li>
              <li>FAQ</li>
              <li>About Us</li>
              <li>Terms & Conditions</li>
            </ul>
          </section>
          <section>
            <h3>CUSTOMER SERVICES</h3>
            <ul>
              <li>Contact Us</li>
              <li>Track Your Order</li>
              <li>Product Care & Repair</li>
              <li>Book an Appointment</li>
              <li>Shipping & Returns</li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="site-footer">
        <p>© 2022 ShoppersStop, Inc.</p>
        <img src={img} alt="payment" />

        <div className="back-to-top" onClick={scrollToTop}>
          Scroll To Top ⬆
        </div>
      </footer>
    </>
  );
};

export default CoralHomePage;
