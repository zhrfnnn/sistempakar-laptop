import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, TextField, Button, Typography, Paper } from "@mui/material";
import { useUser } from "../context/context";

export default function Splash() {
  const [tempName, setTempName] = useState("");
  const { setName } = useUser();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!tempName.trim()) return alert("Nama tidak boleh kosong!");
    setName(tempName.trim());
    navigate("/");
  };

  return (
    <Stack alignItems="center" justifyContent="center" height="100vh">
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5" mb={2} fontWeight={700}>
          Halo, Selamat Datang di <br />
          DT.Consul
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Masukkan nama kamu"
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, alignSelf: "center" }}
          onClick={handleSubmit}
        >
          Mulai Konsultasi
        </Button>
      </Paper>
    </Stack>
  );
}
