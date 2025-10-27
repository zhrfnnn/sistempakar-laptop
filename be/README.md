# Sistem Pakar Laptop (Laravel)

Project ini dibuat menggunakan **Laravel**, salah satu framework PHP yang umum dipakai untuk mengembangkan aplikasi web.  
Tujuan dari project ini adalah untuk membantu pengguna menentukan laptop yang sesuai kebutuhan berdasarkan kriteria tertentu.

---

## Tentang Laravel

Laravel adalah framework PHP dengan konsep **MVC (Model-View-Controller)** yang membuat struktur kode jadi lebih rapi dan mudah dipelihara.

- **Model** → mengatur data dan koneksi ke database.  
- **View** → menampilkan tampilan yang dilihat oleh pengguna.  
- **Controller** → tempat logika utama dijalankan dan jadi penghubung antara Model dan View.

---

## Struktur Project

Struktur utamanya kurang lebih seperti ini:

```
app/
├── Http/
│ ├── Controllers/
│ │ └── LaptopController.php
├── Models/
│ └── Laptop.php
database/
└── migrations/
resources/
└── views/
└── laptop/
routes/
└── web.php
```


### Penjelasan Tiap Bagian

- **LaptopController.php**  
  Berisi logika utama aplikasi, seperti mengambil data laptop dari database, menampilkan halaman, atau memproses hasil konsultasi pengguna.

- **Laptop.php (Model)**  
  Mewakili tabel `laptop` di database `sistempakar_laptop`. Semua proses baca dan tulis data laptop dilakukan lewat model ini.

- **View (resources/views/laptop/...)**  
  Bagian tampilan (HTML + Blade) yang akan muncul di browser.

- **web.php (Routes)**  
  Mengatur rute URL aplikasi, misalnya:
  - `/` → halaman utama  
  - `/laptop` → daftar laptop  
  - `/recommend` → halaman sistem pakar

---

## Database

Nama database yang digunakan: **`sistempakar_laptop`**

Tabel utama: **`laptops`**

Kolom yang digunakan umumnya meliputi:
- `nama`  
- `harga`  
- `spesifikasi`  
- `alasan`

Data di tabel ini digunakan oleh sistem untuk memberikan rekomendasi laptop kepada pengguna.

---

## Cara Menjalankan Project

1. Pastikan sudah menginstal:
   - PHP (minimal versi 8)
   - Composer
   - Database (MySQL atau MariaDB)
2. Clone project ini:
   ```bash
   git clone <url-project-ini>
   cd nama-folder-project
3. Install dependensi Laravel:
   ```bash
   composer install
4. Salin file environment:
   ```bash
   cp .env.example .env
5. Generate app key:
   ```bash
   php artisan key:generate
6. Atur koneksi database di file .env:
   ```
   DB_DATABASE=sistempakar_laptop
   DB_USERNAME=root
   DB_PASSWORD=
7. Buat database sistempakar_laptop di MySQL atau MariaDB.
Jika ada file migrasi, jalankan:
   ```bash
   php artisan migrate
8. Jalankan server lokal:
   ```bash
   php artisan serve
9. Buka browser dan akses:
   ```bash
   http://localhost:8000
   ```

## Cara Kerja Singkat

Aplikasi ini bekerja dengan menanyakan kebutuhan pengguna — misalnya untuk gaming, kerja, atau kuliah.
Sistem kemudian mencocokkan jawaban tersebut dengan data laptop di database, lalu menampilkan rekomendasi laptop yang paling sesuai.

## Catatan

Project ini dibuat untuk tujuan pembelajaran dan demonstrasi konsep sistem pakar sederhana.
Struktur dan logika dapat dikembangkan lebih lanjut, misalnya dengan menambah kriteria, metode perhitungan, atau tampilan yang lebih interaktif.
