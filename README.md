# SekolahKarir -Role Explorer

Aplikasi web **Role Explorer** responsif untuk **Mini Assignment -Frontend Engineer (SekolahKarir Batch 2)**. Proyek ini dirancang untuk mempermudah pengguna menjelajahi posisi karir berdasarkan departemen dengan pengelolaan _state_ berbasis URL (_Single Source of Truth_), transisi _skeleton loading_ bebas pergeseran tata letak (_Zero Cumulative Layout Shift_), halaman detail peran interaktif, serta _empty state_ dan halaman _404 Not Found_ yang terintegrasi.

---

## 1. Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Library UI**: React 19 (JavaScript / JSX)
- **Styling**: Tailwind CSS v4
- **Typography**: `Urbanist` (`400`, `500`, `600`, `700`, `800`) via `next/font/google`
- **Icons & Media**: Inline SVG (tanpa dependensi paket ikon eksternal) & `next/image` teroptimasi

---

## 2. Arsitektur & Struktur Frontend (`Frontend Structure`)

Struktur direktori menerapkan pemisahan tanggung jawab (_modular separation of concerns_) yang rapi dan proporsional untuk skala fitur eksplorasi karir:

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

- **Pemisahan Layer**: Memisahkan lapisan data (`src/data/`, `src/services/`), logika _state_ (`src/hooks/`), komponen primitif (`src/components/ui/`), dan komponen fitur (`src/components/features/role-explorer/`) membuat setiap file tetap ringkas, deklaratif, dan mudah dipelihara.
- **Tanpa Dependensi Berlebihan**: Menggunakan _custom hook_ berbasis React & Next.js Navigation API tanpa _library global state_ tambahan yang tidak diperlukan.

---

## 3. Keputusan Penanganan State (`State Handling`)

1. **Single Source of Truth melalui URL Search Parameters (`?dept=...`)**:
   - Status departemen yang aktif disimpan pada URL query parameter menggunakan `useSearchParams()` dan diperbarui secara mulus menggunakan `router.replace(..., { scroll: false })`.
   - **Manfaat Produk**: URL hasil filter dapat dibagikan langsung (_shareable link_), tetap bertahan saat halaman di-_refresh_, dan mendukung navigasi _Back/Forward_ peramban. Jika pengguna memasukkan parameter `?dept=` yang tidak valid di URL, sistem otomatis melakukan _fallback_ ke state _default_ (`Semua Departemen`).
2. **Derived State (`useMemo`)**:
   - Daftar peran yang terfilter (`filteredRoles`), jumlah posisi per departemen (`departmentCounts`), dan label departemen aktif dihitung secara _derived_ menggunakan `useMemo` langsung dari data sumber dan parameter URL, sehingga bebas dari _bug_ sinkronisasi antar-`useState`.
3. **Controlled Skeleton Transition & Race-Condition Cleanup**:
   - Saat berpindah filter departemen maupun membuka halaman detail peran (`/roles/[id]`), sistem menampilkan _skeleton loading_ terkontrol selama `300ms` (`SIMULATED_LOADING_DELAY_MS`).
   - Pembersihan `clearTimeout(timer)` di dalam `useEffect` memastikan tidak terjadi _race condition_ apabila pengguna mengklik beberapa tab departemen secara cepat.

---

## 4. Detail UX & Aksesibilitas (`UX Detail`)

- **Floating Pill Navbar Responsif & Dinamis**:
  - Menampilkan _highlight_ menu aktif secara dinamis mengikuti URL saat ini (`usePathname()`).
  - **Auto-Hide on Scroll**: Navbar otomatis bergeser ke atas (`-translate-y-full`) saat pengguna melakukan _scroll_ ke bawah agar ruang baca lebih lega, dan muncul kembali saat _scroll_ ke atas atau ketika menerima fokus _keyboard_ (`onFocusCapture`).
  - **Mobile Slide-Over Drawer**: Pada layar _mobile_, menu navigasi dilengkapi _drawer_ geser dengan kartu akun **SekolahKarir**, penguncian _body scroll_, dan dukungan tombol `Escape`.
- **Zero Cumulative Layout Shift (CLS)**:
  - `<RoleCardSkeleton />` dan `<RoleDetailSkeleton />` dirancang mengikuti dimensi, tinggi minimum (`min-h-[296px]`), _padding_, dan struktur baris yang presisi dengan komponen aslinya.
- **Kartu Peran Terstruktur & Sejajar**:
  - Menggunakan _single-line title_ (`line-clamp-1`), ringkasan 2 baris dengan tinggi tetap (`min-h-[2.75rem] line-clamp-2`), baris _skill_ ringkas dengan indikator `+N` untuk keahlian tambahan, serta _footer_ 2 kolom (Lokasi di kiri & tombol kapsul `Lihat Detail →` dengan `whitespace-nowrap` di kanan) agar seluruh kartu dalam satu baris _grid_ sejajar sempurna.
- **Uji Empty State dalam 1 Klik**:
  - Setiap tombol filter departemen menampilkan lencana jumlah posisi terbuka. Departemen **`Legal & People (0)`** sengaja disiapkan dengan `0` posisi agar _reviewer_ dapat langsung menguji tampilan **Empty State** beserta tombol aksi **`Tampilkan Semua Departemen`** hanya dengan satu klik.
- **Halaman Detail Peran (`/roles/[id]`) & Halaman 404 (`not-found.jsx`)**:
  - Halaman detail peran menampilkan _hero cover photo_ dengan **Glassmorphism Badges** (`backdrop-blur-md`), galeri 3 foto suasana kerja tim, tanggung jawab, kualifikasi, benefit, _sticky sidebar_ ringkasan kompensasi, profil _Hiring Lead_, serta rekomendasi posisi terkait.
  - Tautan yang belum tersedia di luar cakupan tugas diarahkan ke halaman **404 Not Found** berdesain senada yang dilengkapi tombol **`Kembali ke Karir`**.
- **Aksesibilitas (WCAG & Screen Reader)**:
  - Tombol filter menggunakan `aria-pressed={isActive}`, sedangkan bar status menggunakan `role="status" aria-live="polite" aria-atomic="true"` untuk mengumumkan perubahan jumlah hasil filter secara kontekstual.
  - Mendukung penuh preferensi pengguna dengan `prefers-reduced-motion` (`motion-reduce:transition-none` & `motion-reduce:animate-none`).

---

## 5. Catatan Penggunaan AI (`TOOLS & AI POLICY`)

Sesuai ketentuan pada _brief assignment_, pengerjaan proyek ini menggunakan bantuan _AI tools_ berikut:

- **Google Gemini**: Digunakan untuk merancang arsitektur komponen, menyusun struktur direktori modular, dan menyusun _mock data_ posisi karir yang kontekstual dengan ekosistem produk **SekolahKarir**.
- **Google Antigravity**: Digunakan untuk _scaffolding_ kode komponen JSX, penerapan standar _Next.js Best Practices_ (seperti `<Suspense>` boundary pada `useSearchParams()` dan `usePathname()`, serta `generateStaticParams()` pada rute dinamis), dan penyempurnaan antarmuka menggunakan panduan desain _UI/UX Pro Max_.

Seluruh hasil kode, logika _state handling_, keputusan UX, responsivitas _mobile/desktop_, serta struktur komponen dipahami, diperiksa, dan dapat dijelaskan secara menyeluruh oleh kandidat.

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

Untuk memeriksa kualitas kode (_linting_) dan menguji _production build_:

```bash
# Pemeriksaan ESLint
npm run lint

# Build produksi & jalankan server produksi
npm run build
npm run start
```
