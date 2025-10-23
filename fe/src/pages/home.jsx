import { Typography, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LaptopImage from "../assets/laptop.png";
import { useUser } from "../context/context";

export default function App() {
  const { name } = useUser();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/recommendation", { state: { name } });
  };

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100vh",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: (theme) => theme.palette.primary.main,
        color: (theme) => theme.palette.white.main,
        p: 2,
      }}
    >
      <Stack
        spacing={5}
        sx={{
          p: 2,
        }}
      >
        <Stack spacing={0.5}>
          <Typography variant="h3" sx={{ fontWeight: 600, color: "white" }}>
            Hi {name}!
            <br />
            Temukan Laptop Ideal Anda
            <br />
            dalam Hitungan Detik
          </Typography>
          <Typography sx={{ color: "white" }}>
            Sistem Pakar berbasis kecerdasan untuk merekomendasikan
            <br />
            laptop terbaik sesuai kebutuhan dan anggaran Anda.
          </Typography>
        </Stack>
        <Button
          variant="contained"
          color="tertiary"
          onClick={handleClick}
          sx={{
            width: "fit-content",
            alignSelf: "flex-start",
            textTransform: "none",
          }}
        >
          Mulai Rekomendasi
        </Button>
      </Stack>
      <img src={LaptopImage} width={"400px"} style={{ objectFit: "contain" }} />
    </Stack>
  );
}
