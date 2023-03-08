import { Box , Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useNavigate } from "react-router-dom";


const Confirmation = () => {
  const navigate = useNavigate()
  return (
    <Box >
        <Box m="60px auto" width="50%" height="50vh" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            You have successfully made an Order —{" "}
            <strong>Order Out For Delivery</strong>
          </Alert>
          <Button sx={{mt : "20px" , backgroundColor : "rgb(237, 247, 237);" }} onClick={() => navigate("/")}>Continue Shopping</Button>
        </Box>

    </Box>
  );
};

export default Confirmation;