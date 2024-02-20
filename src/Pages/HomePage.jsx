import "./HomePage.css";
import tree from "../assets/Frame.png";
import Tabs from "./ProductTabs";
import Banner from "./Banner";
import img from "../assets/image-product.png";
import Footer from "./Footer";
function HomePage() {
  return (
    <div className="main-container">
      <section className="collection-header">
        <article className="collection-intro">
          <h1 className="collection-title">Collections</h1>
          <p className="collection-description">
            you can explore and shop many different collection from various
            brands here.
          </p>
          <a href="#products" className="collection-cta">
            <svg
              width="31"
              height="30"
              viewBox="0 0 31 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.4459 15L10.4459 10C10.4459 7.23858 12.6845 5 15.4459 5V5C18.2073 5 20.4459 7.23858 20.4459 10L20.4459 15"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M5.14027 14.9178C5.28535 13.1769 5.35788 12.3065 5.93197 11.7782C6.50606 11.25 7.37952 11.25 9.12645 11.25H21.7654C23.5123 11.25 24.3858 11.25 24.9599 11.7782C25.534 12.3065 25.6065 13.1769 25.7516 14.9178L26.5154 24.0839C26.5999 25.0974 26.6421 25.6042 26.345 25.9271C26.0479 26.25 25.5394 26.25 24.5223 26.25H6.36952C5.35247 26.25 4.84394 26.25 4.54684 25.9271C4.24974 25.6042 4.29197 25.0974 4.37643 24.0839L5.14027 14.9178Z"
                stroke="white"
                strokeWidth="2"
              />
            </svg>

            <span className="cta-text">shop now</span>
          </a>
        </article>
        <figure className="collection-image">
          <img alt="c_img_1" className="c_img_1" loading="lazy" src={img} />
        </figure>
      </section>
      <div className="tree">
        <img alt="Tree image" loading="lazy" src={tree} className="tree" />
      </div>
      <Tabs />
      <Banner />
      <Footer />
    </div>
  );
}
export default HomePage;
