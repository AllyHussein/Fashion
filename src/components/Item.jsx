import {Box, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Item = ({ item, width }) => {
  const navigate = useNavigate();

  return (
    <Box width={width}>
      <Box>
        <img
          alt={item?.name}
          width="300px"
          height="400px"
          src={`${item?.images[0]?.baseUrl}`}
          onClick={() => navigate(`/item/${item?.defaultArticle?.code}`)}
          style={{ cursor: "pointer" }}
        />
        
      </Box>

      <Box mt="10px">
        <Typography>{item?.name}</Typography>
        <Typography fontWeight="bold">{item?.price?.formattedValue}</Typography>
      </Box>
    </Box>
  );
};

export default Item;