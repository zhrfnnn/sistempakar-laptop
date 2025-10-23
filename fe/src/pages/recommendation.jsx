import {
  Autocomplete,
  Button,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axios";

export default function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState([]);
  const [kebutuhan, setKebutuhan] = useState(null);
  const [anggaran, setAnggaran] = useState(null);
  const [preferensi, setPreferensi] = useState([]);
  const [detailLaptop, setDetailLaptop] = useState(null);
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const name = location.state?.name || "Guest";

  const steps = ["Pilih Kebutuhan", "Pilih Anggaran", "Pilih Preferensi"];

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

  const listPreferensi = ["Ringan", "Kokoh", "Baterai", "Tipis", "Gaming"];

  const getImageUrl = (name) => {
    const basePath = "http://localhost:8000/image/";
    return `${basePath}${encodeURIComponent(name)}`;
  };

  const getRecommendation = async () => {
    const reason = [...preferensi].join(", ");
    const min = anggaran?.min ?? 0;
    const max = anggaran?.max ?? 99999999;
    try {
      const res = await api.post("/recommendation", {
        min_harga: min,
        max_harga: max,
        alasan: reason,
      });
      setData(res.data);
      setActiveStep((prev) => prev + 1);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  const handleNext = () => {
    if (activeStep === 0 && !kebutuhan)
      return alert("Silakan pilih kebutuhan!");
    if (activeStep === 1 && !anggaran) return alert("Silakan pilih anggaran!");

    if (activeStep === steps.length - 1) {
      getRecommendation();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
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

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Autocomplete
            disablePortal
            options={listKebutuhan}
            value={kebutuhan}
            onChange={(e, val) => setKebutuhan(val)}
            renderInput={(params) => (
              <TextField {...params} placeholder="Pilih kebutuhan" />
            )}
          />
        );
      case 1:
        return (
          <Autocomplete
            disablePortal
            options={listAnggaran}
            getOptionLabel={(opt) => opt.label}
            value={anggaran}
            onChange={(e, val) => setAnggaran(val)}
            renderInput={(params) => (
              <TextField {...params} placeholder="Pilih anggaran" />
            )}
          />
        );
      case 2:
        return (
          <Autocomplete
            disablePortal
            multiple
            options={listPreferensi}
            value={preferensi}
            onChange={(e, val) => setPreferensi(val)}
            renderInput={(params) => (
              <TextField {...params} placeholder="Pilih preferensi tambahan" />
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Stack p={3} alignItems="center">
      <Stack sx={{ width: "100%", px: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel sx={{ textTransform: "none", fontWeight: "bold" }}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Stack spacing={3} mt={4} alignItems="center">
          {activeStep < steps.length ? (
            <>
              <Typography variant="h6" fontWeight="bold">
                Langkah {activeStep + 1}. {steps[activeStep]}
              </Typography>
              <Stack sx={{ width: "60%" }}>
                {renderStepContent(activeStep)}
              </Stack>
              <Stack direction="row" spacing={2} mt={2}>
                {activeStep > 0 && (
                  <Button variant="outlined" onClick={handleBack}>
                    Kembali
                  </Button>
                )}
                <Button variant="contained" onClick={handleNext}>
                  {activeStep === steps.length - 1
                    ? "Lihat Rekomendasi"
                    : "Lanjut"}
                </Button>
              </Stack>
            </>
          ) : null}
        </Stack>
      </Stack>

      {activeStep === steps.length && (
        <Stack
          sx={{
            width: "100%",
            maxHeight: "75vh",
            overflow: "auto",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Hasil Rekomendasi
          </Typography>
          {data.length === 0 ? (
            <Typography color="text.secondary">
              Tidak ditemukan hasil.
            </Typography>
          ) : (
            <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
              {data.map((item, idx) => (
                <Paper
                  key={idx}
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="start">
                      <img
                        src={getImageUrl(item.nama)}
                        alt={item.nama}
                        style={{ width: "150px", objectFit: "contain" }}
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
              ))}
            </Masonry>
          )}
          <Button
            variant="outlined"
            sx={{ mt: 3 }}
            onClick={() => {
              setActiveStep(0);
              setData([]);
              setKebutuhan(null);
              setAnggaran(null);
              setPreferensi([]);
            }}
          >
            Retry
          </Button>
        </Stack>
      )}

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
                Tokopedia
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
                Shopee
              </Button>
            </Stack>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Kembali
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Stack>
  );
}
