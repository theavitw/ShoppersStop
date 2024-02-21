import "./Banner.css";
import img2 from "../assets/1024px-Zara_Logo 2.png";
import img from "../assets/1024px-Zara_Logo 1.png";
import Box from "@mui/material/Box";
function Banner() {
  return (
    <div className="banner">
      <Box className="banner_container" sx={{ width : "50%" , position : "relative"}}>
        <img src={img} alt="img" className="banner_img" />
        <h1>
          <img src={img2} alt="img2" />
        </h1>
        <p>
          Lustrous yet understated. The new evening wear collection exclusively
          offered at the reopened Giorgio Armani boutique in Los Angeles.
        </p>
        <button className="banner_button">See Collection</button>
      </Box>
    </div>
  );
}

export default Banner;
