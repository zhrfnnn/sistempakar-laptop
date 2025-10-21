import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axios";

export default function App() {
  const [data, setData] = useState([]);
  const [kebutuhan, setKebutuhan] = useState(null);
  const [anggaran, setAnggaran] = useState(null);
  const [preferensi, setPreferensi] = useState([]);
  const [detailLaptop, setDetailLaptop] = useState(null);
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const name = location.state?.name || "Guest";

  const listKebutuhan = [
    "Desain Grafis",
    "Coding",
    "Gaming",
    "Kantor",
    "Kuliah",
  ];
  const listAnggaran = [
    { label: "Rp5.000.000 - Rp6.000.000", min: 5000000, max: 6000000 },
    { label: "Rp6.000.000 - Rp9.000.000", min: 6000000, max: 9000000 },
    { label: "Rp9.000.000 - Rp11.000.000", min: 9000000, max: 11000000 },
    { label: "Rp11.000.000 - Rp13.000.000", min: 11000000, max: 13000000 },
    { label: "Rp13.000.000 - Rp15.000.000", min: 13000000, max: 15000000 },
  ];
  const listPreferensi = ["Ringan", "Kokoh", "Baterai", "Tipis", "Game"];

  const handleSubmit = () => {
    if (!kebutuhan || !anggaran) {
      alert("Silakan pilih kebutuhan dan anggaran terlebih dahulu!");
      return;
    }
    const reason = [...preferensi].join(", ");
    const min = anggaran?.min ?? 0;
    const max = anggaran?.max ?? 99999999;
    getRecommendation(min, max, reason);
  };

  const getImageUrl = (name) => {
    const basePath = "http://localhost:8000/image/";
    return `${basePath}${encodeURIComponent(name)}`;
  };

  const getRecommendation = async (minPrice, maxPrice, reason) => {
    try {
      const res = await api.post("/recommendation", {
        min_harga: minPrice,
        max_harga: maxPrice,
        alasan: reason,
      });
      setData(res.data);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  const handleDetail = async (id) => {
    try {
      const res = await api.get(`/laptops/${id}`);
      setDetailLaptop(res.data);
      setOpen(true);
    } catch (err) {
      console.error("Fetch detail failed:", err);
    }
  };

  return (
    <Stack p={2} alignItems="center">
      <Typography variant="h4">Sistem Pakar Rekomendasi Laptop</Typography>
      <Typography width="50%" variant="h5" align="center">
        Halo {name}! Aku akan bantu kamu untuk mencari laptop yang sedang kamu
        butuhkan, pilih jenis dan kategorinya yaa...
      </Typography>

      <Stack
        direction="row"
        sx={{
          width: "100%",
          height: "80vh",
          marginTop: 3,
          gap: 2,
        }}
      >
        <Stack sx={{ width: "50%", alignItems: "flex-end" }}>
          <Paper
            sx={{ width: "80%", height: "fit-content", p: 2, overflow: "auto" }}
          >
            <Stack spacing={3}>
              <Stack>
                <Typography fontWeight="bold">Kebutuhan</Typography>
                <Autocomplete
                  disablePortal
                  options={listKebutuhan}
                  value={kebutuhan}
                  onChange={(e, val) => setKebutuhan(val)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="Pilih kebutuhan"
                    />
                  )}
                />
              </Stack>
              <Stack>
                <Typography fontWeight="bold">Anggaran</Typography>
                <Autocomplete
                  disablePortal
                  options={listAnggaran}
                  getOptionLabel={(opt) => opt.label}
                  value={anggaran}
                  onChange={(e, val) => setAnggaran(val)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="Pilih anggaran"
                    />
                  )}
                />
              </Stack>
              <Stack>
                <Typography fontWeight="bold">Preferensi Tambahan</Typography>
                <Autocomplete
                  disablePortal
                  multiple
                  options={listPreferensi}
                  value={preferensi}
                  onChange={(e, val) => setPreferensi(val)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="Pilih preferensi"
                    />
                  )}
                />
              </Stack>
              <Button variant="contained" onClick={handleSubmit}>
                Lihat Rekomendasi
              </Button>
            </Stack>
          </Paper>
        </Stack>

        <Stack
          sx={{
            width: "50%",
            flex: 1,
            overflow: "auto",
            paddingLeft: 2,
            boxSizing: "border-box",
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Hasil Rekomendasi
          </Typography>

          {data.length === 0 ? (
            <Typography color="text.secondary">Belum ada hasil.</Typography>
          ) : (
            data.map((item, idx) => (
              <Paper key={idx} sx={{ width: "80%", p: 1.5, mb: 2 }}>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2}>
                    <img
                      src={getImageUrl(item.nama)}
                      alt={item.nama}
                      style={{
                        width: "150px",
                        objectFit: "contain",
                      }}
                    />
                    <Stack>
                      <Typography fontWeight="bold">{item.nama}</Typography>
                      <Typography>{item.spesifikasi}</Typography>
                      <Typography fontSize="20px" fontWeight="bold">
                        Rp{item.harga.toLocaleString()}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Button
                    variant="contained"
                    onClick={() => handleDetail(item.id)}
                  >
                    Detail
                  </Button>
                </Stack>
              </Paper>
            ))
          )}
        </Stack>
      </Stack>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle align="center">{detailLaptop?.nama}</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <img
                src={getImageUrl(detailLaptop?.nama)}
                alt={detailLaptop?.nama}
                style={{
                  width: "200px",
                  objectFit: "contain",
                }}
              />
              <Typography>Spesifikasi: {detailLaptop?.spesifikasi}</Typography>
            </Stack>
            <Typography>Alasan: {detailLaptop?.alasan}</Typography>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#3FC03F",
                  "&:hover": { backgroundColor: "#2E8B2E" },
                  flex: 1,
                }}
                onClick={() =>
                  window.open(
                    `https://www.tokopedia.com/search?st=product&q=${detailLaptop?.nama}`,
                    "_blank"
                  )
                }
              >
                Beli di Tokopedia
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#FF5722",
                  "&:hover": { backgroundColor: "#E64A19" },
                  flex: 1,
                }}
                onClick={() =>
                  window.open(
                    `https://shopee.co.id/search?keyword=${detailLaptop?.nama}`,
                    "_blank"
                  )
                }
              >
                Beli di Shopee
              </Button>
            </Stack>
            <Button mt={2} variant="outlined" onClick={() => setOpen(false)}>
              Kembali
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Stack>
  );
}
