# Sekolah Karir — Role Explorer

Komponen **Role Explorer** responsif untuk **Mini Assignment — Frontend Engineer (Sekolah Karir Batch 2)**. Aplikasi ini memungkinkan pengguna menjelajahi dan memfilter posisi karir berdasarkan departemen dengan penanganan state berbasis URL, *skeleton loading* bebas pergeseran tata letak (*Zero Cumulative Layout Shift*), dan *empty state* yang interaktif.

---

## 1. Tech Stack

- **Framework**: Next.js (App Router)
- **Library UI**: React (JavaScript / JSX)
- **Styling**: Tailwind CSS
- **Typography**: `Poppins` (Heading) & `Open Sans` (Body) via `next/font/google`
- **Icons**: Inline SVG (tanpa ketergantungan *library* ikon eksternal)

---

## 2. Arsitektur & Struktur Frontend

Struktur direktori dirancang secara modular (*separation of concerns*) agar mudah dipelihara dan diuji tanpa menambah *boilerplate* yang berlebihan:

```text
src/
├── app/
│   ├── globals.css          # Konfigurasi tema, variabel warna, dan tipografi
│   ├── layout.jsx           # Root layout (bahasa Indonesia, font Google, metadata)
│   ├── loading.jsx          # Fallback skeleton untuk Suspense boundary
│   └── page.jsx             # Halaman utama Role Explorer
├── components/
│   ├── ui/                  # Komponen primitif reusable (Badge, Button, Skeleton)
│   ├── layout/              # Komponen tata letak (Header sticky)
│   ├── shared/              # Komponen lintas fitur (EmptyState)
│   └── features/
│       └── role-explorer/   # Komponen domain Role Explorer
│           ├── department-filter.jsx
│           ├── role-card.jsx
│           ├── role-card-skeleton.jsx
│           ├── role-grid.jsx
│           └── role-explorer.jsx
├── config/
│   └── site.js              # Metadata dan konfigurasi situs
├── data/
│   └── roles.json           # Mock data 10 posisi karir lintas departemen
├── hooks/
│   └── use-role-filter.js   # Custom hook pengelolaan state filter & URL query
├── lib/
│   ├── constants.js         # Konstanta departemen & konfigurasi delay simulasi
│   └── utils.js             # Fungsi utilitas penggabung class (cn)
└── services/
    └── role.service.js      # Abstraksi akses data & kalkulasi jumlah posisi
```

**Alasan Pemilihan Struktur**:
- Memisahkan **UI Primitives** (`src/components/ui/`) dari **Feature Components** (`src/components/features/role-explorer/`) menjaga komponen tetap fokus dan mudah digunakan kembali.
- Memisahkan logika akses data ke `role.service.js` dan logika *state* ke `use-role-filter.js` membuat komponen presentasi (`RoleGrid`, `DepartmentFilter`, `RoleCard`) tetap bersih dan deklaratif.

---

## 3. Keputusan Penanganan State (State Handling Reasoning)

1. **Single Source of Truth via URL Search Parameters (`?dept=...`)**:
   - Status filter departemen aktif disimpan di URL query parameter menggunakan `useSearchParams()` dan diperbarui dengan `router.replace(..., { scroll: false })`.
   - **Manfaat**: Tautan hasil filter dapat dibagikan langsung (*shareable link*), tahan terhadap *page refresh*, dan mendukung navigasi riwayat *browser*. Parameter `?dept` yang tidak valid otomatis dikembalikan (*fallback*) ke state *default* (`all`).
2. **Derived State (`useMemo`)**:
   - Daftar peran yang terfilter (`filteredRoles`) dan jumlah peran per departemen (`departmentCounts`) dihitung menggunakan `useMemo` langsung dari sumber data dan parameter departemen aktif, menghindari *bug* sinkronisasi akibat duplikasi `useState`.
3. **Controlled Skeleton Transition & Cleanup**:
   - Transisi `isLoading` selama `300ms` dengan pembersihan `clearTimeout` di `useEffect` mencegah *race condition* ketika pengguna berpindah tab departemen secara cepat.

---

## 4. Detail UX & Aksesibilitas

- **Zero Cumulative Layout Shift (CLS)**: `<RoleCardSkeleton />` dirancang dengan tinggi minimum (`min-h-[280px]`), *padding*, dan struktur baris yang identik dengan `<RoleCard />`.
- **Counter Badge & Uji Empty State Instan**: Setiap tombol departemen menampilkan lencana jumlah posisi terbuka. Departemen **Legal & People (0)** sengaja disiapkan dengan `0` posisi agar *reviewer* dapat langsung menguji tampilan **Empty State** beserta tombol *"Tampilkan Semua Departemen"* hanya dalam satu klik.
- **Responsif & Ramah Sentuhan**: Bar filter dapat digeser secara horizontal pada layar ponsel dengan ukuran target sentuh minimum `44px` (`min-h-11`), serta membungkus (*wrap*) secara rapi pada layar *desktop*.
- **Aksesibilitas Layar Baca & Keyboard**:
  - Tombol filter menggunakan `aria-pressed={isActive}` dan cincin fokus (`focus-visible:ring-2`) yang jelas.
  - Bar status menggunakan `role="status" aria-live="polite" aria-atomic="true"` untuk mengumumkan perubahan jumlah posisi secara kontekstual kepada pengguna *screen reader*.
  - Menghormati preferensi `prefers-reduced-motion` (`motion-reduce:transition-none` & `motion-reduce:animate-none`).

---

## 5. Catatan Penggunaan AI (AI Usage Disclosure)

Sesuai kebijakan pada *brief assignment*, pengerjaan tugas ini dibantu oleh *AI tools* berikut:
- **Google Gemini**: Membantu penyusunan rencana arsitektur komponen, perancangan struktur folder modular, dan penyusunan *mock data* posisi karir yang relevan dengan konteks Sekolah Karir.
- **Google Antigravity**: Membantu *scaffolding* file komponen JSX, penerapan standar *Next.js Best Practices* (seperti pembungkusan `<Suspense>` untuk `useSearchParams()`), serta audit aksesibilitas dan UI/UX (*UI/UX Pro Max*).

Seluruh keputusan teknis, alur *state handling*, detail aksesibilitas, dan verifikasi akhir dipahami serta ditinjau secara menyeluruh oleh kandidat.

---

## 6. Cara Menjalankan Secara Lokal

Pastikan **Node.js** (versi 18.18+ atau 20+) telah terpasang, lalu jalankan perintah berikut:

```bash
# 1. Pasang dependensi
npm install

# 2. Jalankan server pengembangan
npm run dev
```

Buka `http://localhost:3000` di peramban untuk mencoba aplikasi.

Untuk menguji *build* produksi:

```bash
npm run build
npm run start
```
