import { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Menu,
  MenuItem,
  CardActionArea,
} from "@mui/material";
import { useProductContext } from "../Context/DataContext";
import { Link } from "react-router-dom";

import "./ProducTabs.css";

function ProductTabs() {
  const { products } = useProductContext();
  const [value, setValue] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [Hover, setHover] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState(6);
  const productsPerPage = 6; 
  const HandlePop = (id) => {
    setHover(id);
  };

  useEffect(() => {
    const categories = products.reduce((acc, curr) => {
      if (!acc.includes(curr.category)) {
        acc.push(curr.category);
      }
      return acc;
    }, []);
    setCategories(categories);
    setFilteredProducts(products);
  }, [products]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    filterProducts(newValue);
  };

  const filterProducts = (category) => {
    if (category === 0) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === categories[category - 1]
      );
      setFilteredProducts(filtered);
    }
  };

  const handleFilterByPrice = (price) => {
    const filtered = products.filter((product) => product.price < price);
    setFilteredProducts(filtered);
  };

  const handleResetFilters = () => {
    setFilteredProducts(products);
    setAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedProducts((prev) => prev + productsPerPage);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Box id="products">
      <h1
        className="text-center mt-5 bold"
        style={{
          stroke: "#0B0B0B",
          strokeWidth: "2",
          color: "#0B0B0B",
          fontFamily: "Sans-Serif",
          fontWeight: "700",
          textShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        New Products
      </h1>
      <Grid container>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile

        >
          <Tab label="All" />
          {categories.map((category, index) => (
            <Tab key={index + 1} label={category} />
          ))}
          <Button
            onClick={handleMenuOpen}
            variant="outlined"
            size="small"
            sx={{
              backgroundColor: "#1E2832",
              color: "#fff",
              borderColor: "#1E2832",
              "&:hover": { backgroundColor: "#1E2832" },
            }}
            startIcon={
              <svg
                width="17"
                height="14"
                viewBox="0 0 17 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.7554 1H1.4053C0.745927 1 0.413209 1.60623 0.880413 1.96026L6.60074 6.29549V11.125C6.60074 11.3085 6.71893 11.4805 6.91738 11.5858L9.39181 12.8979C9.87998 13.1568 10.5598 12.8944 10.5598 12.437V6.29549L16.2803 1.96026C16.7466 1.60694 16.4161 1 15.7554 1Z"
                  stroke="white"
                />
              </svg>
            }
          >
            Filter
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleResetFilters}>Show All</MenuItem>
            <MenuItem onClick={() => handleFilterByPrice(50)}>
              Filter by Price (&lt;$50)
            </MenuItem>
            <MenuItem onClick={() => handleFilterByPrice(100)}>
              Filter by Price (&lt;$100)
            </MenuItem>
            <MenuItem onClick={() => handleFilterByPrice(200)}>
              Filter by Price (&lt;$200)
            </MenuItem>
          </Menu>
        </Tabs>
      </Grid>
      <Grid container spacing={3} padding={7}>
        {filteredProducts.slice(0, displayedProducts).map((product, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card
              className="position-relative"
              onMouseEnter={() => HandlePop(product.id)}
              onMouseLeave={() => HandlePop("")}
            >
              <CardActionArea>
                <Link to={`/product/${product.id}`}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={product.image}
                    alt={product.name}
                    style={{ cursor: "pointer" }}
                    backgroundColor="black"
                    sx={{ objectFit: "contain" }}
                  />
                </Link>
                {Hover && product.id - 1 === Hover - 1 && (
                  <CardContent className="product-overlay">
                    <div className="btk_1">
                      <svg
                        width="32"
                        height="24"
                        viewBox="0 0 32 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.30766 14.8471L15.4872 20.6694C15.6546 20.7886 15.7383 20.8482 15.8295 20.8712C15.9096 20.8913 15.9935 20.8913 16.0735 20.8712C16.1648 20.8482 16.2485 20.7886 16.4159 20.6694L24.5954 14.8471C27.6548 12.6693 27.9976 8.25373 25.311 5.6299C22.8716 3.24739 18.8563 3.72163 17.0389 6.60689L16.5899 7.31983C16.294 7.78964 15.6091 7.78964 15.3132 7.31983L14.8641 6.60689C13.0468 3.72163 9.0315 3.24739 6.59204 5.6299C3.90549 8.25373 4.24832 12.6693 7.30766 14.8471Z"
                          stroke="white"
                          strokeWidth="2"
                        />
                      </svg>
                      <svg
                        width="26"
                        height="19"
                        viewBox="0 0 26 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <ellipse
                          cx="10.7542"
                          cy="7.8"
                          rx="8.97394"
                          ry="6.8"
                          stroke="white"
                          strokeWidth="2"
                        />
                        <path
                          d="M24.2151 18L19.7281 14.6"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <Link className="btk_2" to={`/product/${product.id}`}>
                        <svg
                          width="33"
                          height="24"
                          viewBox="0 0 33 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.4227 12L11.4227 9.27879C11.4227 6.36339 13.7861 4 16.7015 4V4C19.6169 4 21.9803 6.3634 21.9803 9.27879L21.9803 12"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <path
                            d="M5.75217 12.5627C5.93852 10.8682 6.03169 10.021 6.60141 9.51049C7.17112 9 8.02348 9 9.72819 9H23.6749C25.3796 9 26.232 9 26.8017 9.51049C27.3714 10.021 27.4646 10.8682 27.6509 12.5627L28.3348 18.7814C28.4487 19.8169 28.5057 20.3347 28.2076 20.6673C27.9095 21 27.3886 21 26.3468 21H7.05629C6.0145 21 5.49361 21 5.19553 20.6673C4.89745 20.3347 4.95439 19.8169 5.06827 18.7814L5.75217 12.5627Z"
                            stroke="white"
                            strokeWidth="2"
                          />
                        </svg>
                        Shop Now
                      </Link>
                    </div>
                  </CardContent>
                )}
              </CardActionArea>
            </Card>

            <Typography variant="h6" component="div">
              {product.title}
            </Typography>
            <div className="d-flex justify-content-between mt-2">
              <Typography variant="body2" color="text.secondary">
                {product.category}
              </Typography>
              <Typography variant="body2" textAlign={"right"}>
                Price: ${product.price}
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
      {isLoading && <p>Loading...</p>}
      {!isLoading && displayedProducts < filteredProducts.length && (
        <Button onClick={loadMore} size="large" className="mb-3 btn ">
          Load More
        </Button>
      )}
    </Box>
  );
}

export default ProductTabs;
