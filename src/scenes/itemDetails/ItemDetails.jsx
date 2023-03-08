import { Box, Button, IconButton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Item from "../../components/Item";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useDispatch } from "react-redux";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';


const ItemDetails = () => {
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [gallery , setGallery] = useState([])
  const [items, setItems] = useState([]);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const options = {
    method: 'GET',
    url: 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail',
    params: {lang: 'en', country: 'us', productcode: `${itemId}`},
    headers: {
      'X-RapidAPI-Key': '1787a87ddamsh8a7e69be8257ec3p1c164djsn35407014f629',
      'X-RapidAPI-Host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com'
    }
  };
  const options2 = {
    method: 'GET',
    url: 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list',
    params: {
      country: 'us',
      lang: 'en',
      currentpage: '0',
      pagesize: '30',
      categories: 'men_all',
      concepts: 'H&M MAN'
    },
    headers: {
      'X-RapidAPI-Key': '1787a87ddamsh8a7e69be8257ec3p1c164djsn35407014f629',
      'X-RapidAPI-Host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com'
    }
  };

  function getItem() {
    axios.request(options).then(function (response) {
      setItem(response.data.product);
      setGallery(response.data.product.articlesList[0].galleryDetails)
    })
    .catch(function (error) {
      console.error(error);
    });


  }

  async function getItems() {
    axios.request(options2).then(function (response) {
      setItems(response.data.results);
    }).catch(function (error) {
      console.error(error);
    });
    
  }

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  const relatedProducts = items.filter((product) => product?.mainCategoryCode !== item?.mainCategory?.code)


  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 20%" mb="40px">
        <Carousel>
          {gallery.map((image , i) => (
            <Carousel.Item interval={1500} key={i}>
            <img
              className="d-block w-100"
              src={image.baseUrl}
              alt="Product One"
            />
          </Carousel.Item>
        ))}
      </Carousel>
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>

          <Box m="65px 0 25px 0">
            <Typography variant="h3">{item?.name}</Typography>
            <Typography>${item?.whitePrice?.price}</Typography>
            <Typography sx={{ mt: "20px" }}>
              {item?.description}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              ADD TO CART
            </Button>
          </Box>
          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>CATEGORIES: {item?.mainCategory?.name}</Typography>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && (
          <div>{item?.description}</div>
        )}
        {value === "reviews" && <div>reviews</div>}
      </Box>

      {/* RELATED ITEMS */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {relatedProducts && relatedProducts?.slice(0, 3).map((item) => (
            <Item key={item.code} item={item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;