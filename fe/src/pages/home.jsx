import { Typography, Stack, Paper, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [name, setName] = useState("");
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
      }}
    >
      <Paper
        sx={{
          paddingY: 2,
          paddingX: 4,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h5">
            Halo,
            <br /> Selamat datang di Dr.Consul !
          </Typography>
          <TextField
            label="Masukkan nama kamu"
            variant="outlined"
            size="small"
            onChange={(e) => setName(e.target.value)}
          />
          <Button variant="contained" onClick={handleClick}>
            Mulai Konsultasi
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
