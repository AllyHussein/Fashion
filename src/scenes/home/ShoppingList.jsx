import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";
import axios from "axios";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const breakPoint = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

const options = {
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

function getItems() {
  axios.request(options).then(function (response) {
    dispatch(setItems(response.data.results));
  })
  .catch(function (error) {
    console.error(error);
  });

}
useEffect(() => {
  getItems();
}, []); // eslint-disable-line react-hooks/exhaustive-deps


  const Blazers = items.filter(
    (item) => item.mainCategoryCode.includes("blazers")
  );
  const Trousers = items.filter(
    (item) => item.mainCategoryCode.includes("trousers")
  );
  const Shirts = items.filter(
    (item) => item.mainCategoryCode.includes("shirt") || item.mainCategoryCode.includes("shirts")
  );

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        <Tab label="Blazers" value="blazers" />
        <Tab label="Trousers" value="trousers" />
        <Tab label="Shirts" value="shirts" />
      </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >

        {value === "all" && items.map((item) => (
          <Item item={item} key={item.code} />
        ))}
        {value === "blazers" && Blazers.map((item) => (
          <Item item={item} key={item.code} />
        ))}
        {value === "trousers" && Trousers.map((item) => (
          <Item item={item} key={item.code} />
        ))}
        {value === "shirts" && Shirts.map((item) => (
          <Item item={item} key={item.code} />
        ))}
        
        
        
      </Box>
    </Box>
  );
};

export default ShoppingList;