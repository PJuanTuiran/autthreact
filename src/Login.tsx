import { Box, Button, Typography } from "@mui/material";
import { useAuth } from "./context/AuthContext";

import { TfiMicrosoftAlt } from "react-icons/tfi";
import { IoLogoGoogle } from "react-icons/io";

const Header: React.FC = () => {
  const {  loginWithGoogle, loginWithMicrosoft  } = useAuth();

  

     return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "radial-gradient(circle,rgb(90, 6, 174) 0%, #100017 100%)",
      }}
    >
         <Box
          
           sx={{
             display: "flex",
              flexDirection: "column",
          textAlign: "center",
          p: 4,
          borderRadius: 3,
          bgcolor: "#2c0a4d",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "white", mb: 3, fontWeight: "bold" }}
        >
          Ingreso
        </Typography>
        <Button
             variant="contained"
              onClick={loginWithGoogle}
          startIcon={<IoLogoGoogle size={20} />}
          sx={{
            bgcolor: "#c084f8",
            color: "#fff",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "16px",
            mb: 2,
            "&:hover": { bgcolor: "#b072e1" },
          }}
        
        >
          Login With Google
        </Button>
           <Button
             onClick={loginWithMicrosoft}
          variant="contained"
          startIcon={<TfiMicrosoftAlt size={20} style={{ color: "#ffffff" }} />}
          sx={{
            bgcolor: "#c084f8",
            color: "#fff",
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "16px",
            "&:hover": { bgcolor: "#b072e1" },
          }}
          
        >
          Login With Microsoft
        </Button>
      </Box>
    </Box>
  );
  
};
export default Header;