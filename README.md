# SekolahKarir — Role Explorer

Aplikasi web **Role Explorer** responsif untuk **Mini Assignment — Frontend Engineer (SekolahKarir Batch 2)**. Proyek ini dirancang untuk mempermudah pengguna menjelajahi posisi karir berdasarkan departemen dengan pengelolaan *state* berbasis URL (*Single Source of Truth*), transisi *skeleton loading* bebas pergeseran tata letak (*Zero Cumulative Layout Shift*), halaman detail peran interaktif, serta *empty state* dan halaman *404 Not Found* yang terintegrasi.

---

## 1. Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Library UI**: React 19 (JavaScript / JSX)
- **Styling**: Tailwind CSS v4
- **Typography**: `Urbanist` (`400`, `500`, `600`, `700`, `800`) via `next/font/google`
- **Icons & Media**: Inline SVG (tanpa dependensi paket ikon eksternal) & `next/image` teroptimasi

---

## 2. Arsitektur & Struktur Frontend (`Frontend Structure`)

Struktur direktori menerapkan pemisahan tanggung jawab (*modular separation of concerns*) yang rapi dan proporsional untuk skala fitur eksplorasi karir:

```text
public/
└── logo.png                         # Aset logo resmi SekolahKarir
src/
├── app/
│   ├── globals.css                  # Konfigurasi tema, variabel warna, dan font Urbanist
│   ├── layout.jsx                   # Root layout (lang="id", font Urbanist, metadata)
│   ├── loading.jsx                  # Fallback skeleton halaman utama untuk Suspense boundary
│   ├── not-found.jsx                # Halaman 404 kustom dengan tombol "Kembali ke Karir"
│   ├── page.jsx                     # Halaman utama Role Explorer
│   └── roles/
│       └── [id]/
│           ├── loading.jsx          # Skeleton loading khusus halaman detail peran
│           └── page.jsx             # Halaman detail posisi karir (SSG via generateStaticParams)
├── components/
│   ├── ui/                          # Komponen primitif reusable
│   │   ├── badge.jsx                # Mendukung varian solid, outline, dan glassmorphism
│   │   ├── button.jsx               # Tombol kapsul aksesibel dengan fokus ring jelas
│   │   └── skeleton.jsx             # Primitif skeleton dengan dukungan reduced-motion
│   ├── layout/
│   │   └── header.jsx               # Floating pill navbar dinamis + mobile slide-over drawer
│   ├── shared/
│   │   └── empty-state.jsx          # Komponen Empty State interaktif dengan tombol reset
│   └── features/
│       └── role-explorer/           # Komponen domain Role Explorer
│           ├── department-filter.jsx
│           ├── role-card.jsx
│           ├── role-card-skeleton.jsx
│           ├── role-detail-view.jsx
│           ├── role-explorer.jsx
│           └── role-grid.jsx
├── config/
│   └── site.js                      # Metadata dan konfigurasi informasi situs
├── data/
│   └── roles.json                   # Mock data 10 posisi karir lengkap dengan galeri & detail
├── hooks/
│   └── use-role-filter.js           # Custom hook pengelolaan state filter & URL query
├── lib/
│   ├── constants.js                 # Konstanta departemen & durasi simulasi loading (300ms)
│   └── utils.js                     # Utilitas penggabung class ringan (cn)
└── services/
    └── role.service.js              # Abstraksi query data peran, detail peran, & kalkulasi jumlah
```

**Alasan Pemilihan Struktur**:
- **Pemisahan Layer**: Memisahkan lapisan data (`src/data/`, `src/services/`), logika *state* (`src/hooks/`), komponen primitif (`src/components/ui/`), dan komponen fitur (`src/components/features/role-explorer/`) membuat setiap file tetap ringkas, deklaratif, dan mudah dipelihara.
- **Tanpa Dependensi Berlebihan**: Menggunakan *custom hook* berbasis React & Next.js Navigation API tanpa *library global state* tambahan yang tidak diperlukan.

---

## 3. Keputusan Penanganan State (`State Handling`)

1. **Single Source of Truth melalui URL Search Parameters (`?dept=...`)**:
   - Status departemen yang aktif disimpan pada URL query parameter menggunakan `useSearchParams()` dan diperbarui secara mulus menggunakan `router.replace(..., { scroll: false })`.
   - **Manfaat Produk**: URL hasil filter dapat dibagikan langsung (*shareable link*), tetap bertahan saat halaman di-*refresh*, dan mendukung navigasi *Back/Forward* peramban. Jika pengguna memasukkan parameter `?dept=` yang tidak valid di URL, sistem otomatis melakukan *fallback* ke state *default* (`Semua Departemen`).
2. **Derived State (`useMemo`)**:
   - Daftar peran yang terfilter (`filteredRoles`), jumlah posisi per departemen (`departmentCounts`), dan label departemen aktif dihitung secara *derived* menggunakan `useMemo` langsung dari data sumber dan parameter URL, sehingga bebas dari *bug* sinkronisasi antar-`useState`.
3. **Controlled Skeleton Transition & Race-Condition Cleanup**:
   - Saat berpindah filter departemen maupun membuka halaman detail peran (`/roles/[id]`), sistem menampilkan *skeleton loading* terkontrol selama `300ms` (`SIMULATED_LOADING_DELAY_MS`).
   - Pembersihan `clearTimeout(timer)` di dalam `useEffect` memastikan tidak terjadi *race condition* apabila pengguna mengklik beberapa tab departemen secara cepat.

---

## 4. Detail UX & Aksesibilitas (`UX Detail`)

- **Floating Pill Navbar Responsif & Dinamis**:
  - Menampilkan *highlight* menu aktif secara dinamis mengikuti URL saat ini (`usePathname()`).
  - **Auto-Hide on Scroll**: Navbar otomatis bergeser ke atas (`-translate-y-full`) saat pengguna melakukan *scroll* ke bawah agar ruang baca lebih lega, dan muncul kembali saat *scroll* ke atas atau ketika menerima fokus *keyboard* (`onFocusCapture`).
  - **Mobile Slide-Over Drawer**: Pada layar *mobile*, menu navigasi dilengkapi *drawer* geser dengan kartu akun **SekolahKarir**, penguncian *body scroll*, dan dukungan tombol `Escape`.
- **Zero Cumulative Layout Shift (CLS)**:
  - `<RoleCardSkeleton />` dan `<RoleDetailSkeleton />` dirancang mengikuti dimensi, tinggi minimum (`min-h-[296px]`), *padding*, dan struktur baris yang presisi dengan komponen aslinya.
- **Kartu Peran Terstruktur & Sejajar**:
  - Menggunakan *single-line title* (`line-clamp-1`), ringkasan 2 baris dengan tinggi tetap (`min-h-[2.75rem] line-clamp-2`), baris *skill* ringkas dengan indikator `+N` untuk keahlian tambahan, serta *footer* 2 kolom (Lokasi di kiri & tombol kapsul `Lihat Detail →` dengan `whitespace-nowrap` di kanan) agar seluruh kartu dalam satu baris *grid* sejajar sempurna.
- **Uji Empty State dalam 1 Klik**:
  - Setiap tombol filter departemen menampilkan lencana jumlah posisi terbuka. Departemen **`Legal & People (0)`** sengaja disiapkan dengan `0` posisi agar *reviewer* dapat langsung menguji tampilan **Empty State** beserta tombol aksi **`Tampilkan Semua Departemen`** hanya dengan satu klik.
- **Halaman Detail Peran (`/roles/[id]`) & Halaman 404 (`not-found.jsx`)**:
  - Halaman detail peran menampilkan *hero cover photo* dengan **Glassmorphism Badges** (`backdrop-blur-md`), galeri 3 foto suasana kerja tim, tanggung jawab, kualifikasi, benefit, *sticky sidebar* ringkasan kompensasi, profil *Hiring Lead*, serta rekomendasi posisi terkait.
  - Tautan yang belum tersedia di luar cakupan tugas diarahkan ke halaman **404 Not Found** berdesain senada yang dilengkapi tombol **`Kembali ke Karir`**.
- **Aksesibilitas (WCAG & Screen Reader)**:
  - Tombol filter menggunakan `aria-pressed={isActive}`, sedangkan bar status menggunakan `role="status" aria-live="polite" aria-atomic="true"` untuk mengumumkan perubahan jumlah hasil filter secara kontekstual.
  - Mendukung penuh preferensi pengguna dengan `prefers-reduced-motion` (`motion-reduce:transition-none` & `motion-reduce:animate-none`).

---

## 5. Catatan Penggunaan AI (`TOOLS & AI POLICY`)

Sesuai ketentuan pada *brief assignment*, pengerjaan proyek ini menggunakan bantuan *AI tools* berikut:
- **Google Gemini**: Digunakan untuk merancang arsitektur komponen, menyusun struktur direktori modular, dan menyusun *mock data* posisi karir yang kontekstual dengan ekosistem produk **SekolahKarir**.
- **Google Antigravity**: Digunakan untuk *scaffolding* kode komponen JSX, penerapan standar *Next.js Best Practices* (seperti `<Suspense>` boundary pada `useSearchParams()` dan `usePathname()`, serta `generateStaticParams()` pada rute dinamis), dan penyempurnaan antarmuka menggunakan panduan desain *UI/UX Pro Max*.

Seluruh hasil kode, logika *state handling*, keputusan UX, responsivitas *mobile/desktop*, serta struktur komponen dipahami, diperiksa, dan dapat dijelaskan secara menyeluruh oleh kandidat.

---

## 6. Cara Menjalankan Secara Lokal

Pastikan **Node.js** (versi 18.18+ atau 20+) telah terpasang di perangkat Anda, kemudian jalankan perintah berikut di terminal:

```bash
# 1. Pasang seluruh dependensi proyek
npm install

# 2. Jalankan development server
npm run dev
```

Buka `http://localhost:3000` di peramban untuk mencoba aplikasi secara langsung.

Untuk memeriksa kualitas kode (*linting*) dan menguji *production build*:

```bash
# Pemeriksaan ESLint
npm run lint

# Build produksi & jalankan server produksi
npm run build
npm run start
```
