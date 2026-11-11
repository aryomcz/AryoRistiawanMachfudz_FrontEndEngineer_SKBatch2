# SekolahKarir - Role Explorer

Aplikasi web **Role Explorer** responsif untuk **Mini Assignment - Frontend Engineer (SekolahKarir Batch 2)**. Proyek ini dirancang dengan fokus pada **ketepatan eksekusi brief**, **kualitas _product reasoning_**, serta keseimbangan antara **struktur kode yang _scalable_**, **detail UX berbasis _Laws of UX_**, dan **pengelolaan _state_ yang reliabel**.

🔗 **Live Demo**: _https://sekolahkarir-role.vercel.app/_

---

## 1. Kerangka Berpikir & Prinsip Desain (_Laws of UX & Product Reasoning_)

Pembaruan antarmuka dan fitur pencarian ini berlandaskan prinsip psikologi kognitif dari **[Laws of UX](https://lawsofux.com/)** untuk menciptakan hierarki visual yang bersih, mudah dipindai (_scannable_), dan bebas dari beban visual berlebih:

| Prinsip UX / Tantangan Produk | Keputusan Desain & Teknis | Alasan (_Trade-off & Product Reasoning_) |
| :--- | :--- | :--- |
| **1. Law of Proximity & Common Region** | Menggabungkan **Search Bar** dan **Department Filter Pills** ke dalam satu panel kontrol terpadu (`rounded-2xl bg-white border`) serta menerapkan skala jarak (_spacing scale_) yang ketat (`6px` mikro, `16px` intra-kartu, `24px` antar-kartu). | Elemen yang memiliki fungsi serupa (menyaring lowongan) dikelompokkan dalam satu area batas yang jelas, sementara pemisahan jarak vertikal makro (`py-10 md:py-14`, `space-y-8`) memudahkan mata membedakan antara Hero, Toolbar Filter, Status Bar, dan Grid Posisi. |
| **2. Hick's Law & Progressive Disclosure** | Menghilangkan tumpukan lencana warna-warni (_badge overload_) pada kartu dan menggantinya dengan **1 lencana aksen halus** (Departemen) serta baris teks metadata tenang (`Lokasi • Tipe Kerja • Status`). | Terlalu banyak lencana berwarna membuat waktu pemindaian (_scanning time_) melambat. Menyederhanakan atribut sekunder menjadi teks sebaris dan menyimpan deskripsi penuh di halaman detail (`/roles/[id]`) mengurangi beban kognitif kandidat secara signifikan. |
| **3. Miller's Law (3-Chunk Card Anatomy)** | Menyusun anatomi `<RoleCard />` menjadi **3 blok visual utama (3 Chunks)** dan membatasi maksimal **2 chip keahlian** (`+N` untuk sisanya). | Memori kerja manusia optimal memproses informasi dalam kelompok kecil. Membagi kartu menjadi *Header* (Departemen + Waktu + Judul), *Core Context* (Metadata + Ringkasan 2 baris), dan *Footer* (Maks 2 Skill + penunjuk `Detail →`) menjaga kartu tetap seragam dan mudah dibandingkan. |
| **4. Fitts's Law & Jakob's Law** | Menjadikan seluruh permukaan `<RoleCard />` sebagai satu tautan utuh (`<Link>`) dengan tinggi target interaktif minimal `40px–44px` serta tombol hapus pencarian (`Hapus ×`) satu klik. | Memperluas area klik ke seluruh kartu dan menyediakan kontrol pencarian berpasangan dengan filter kategori mengikuti pola portal karir modern yang sudah sangat dikenali pengguna. |
| **5. Doherty Threshold (Zero CLS)** | Menyelaraskan `<RoleCardSkeleton />` agar memiliki anatomi 3-chunk dan tinggi minimum (`min-h-[240px]`) yang identik dengan `<RoleCard />`, serta pembaruan ketikan pencarian tanpa jeda. | Memastikan umpan balik visual berlangsung cepat (`< 400ms`) dan perpindahan antar filter tidak menimbulkan pergeseran tata letak vertikal (_Cumulative Layout Shift_). |

---

## 2. Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Library UI**: React 19 (JavaScript / JSX)
- **Styling**: Tailwind CSS v4
- **Typography**: `Urbanist` (`400`, `500`, `600`, `700`, `800`) via `next/font/google`
- **Icons & Media**: `lucide-react` & `next/image` teroptimasi

---

## 3. Arsitektur & Struktur Frontend (`Frontend Structure`)

Struktur direktori menerapkan pemisahan tanggung jawab (_modular separation of concerns_) yang jelas antara lapisan data, logika bisnis/state, komponen primitif UI, dan fitur domain:

```text
public/
└── logo.png                              # Aset logo resmi SekolahKarir
src/
├── app/
│   ├── globals.css                       # Konfigurasi tema, variabel warna, dan utilitas scrollbar
│   ├── layout.jsx                        # Root layout global (Header, main wrapper, & Footer)
│   ├── loading.jsx                       # Fallback skeleton halaman utama untuk Suspense boundary
│   ├── not-found.jsx                     # Halaman 404 kustom untuk menjaga scope boundary
│   ├── page.jsx                          # Halaman utama Role Explorer dengan Hero terfokus
│   └── roles/
│       └── [id]/
│           ├── loading.jsx               # Skeleton loading khusus halaman detail peran
│           └── page.jsx                  # Halaman detail posisi karir (SSG via generateStaticParams)
├── components/
│   ├── ui/                               # Komponen primitif reusable
│   │   ├── badge.jsx                     # Komponen badge reusable
│   │   ├── button.jsx                    # Tombol aksesibel dengan focus ring jelas
│   │   └── skeleton.jsx                  # Primitif skeleton dengan dukungan reduced-motion
│   ├── layout/                           # Contextual Layout Shell
│   │   ├── header.jsx                    # Floating navbar, hover dropdown, & mobile drawer
│   │   └── footer.jsx                    # Global footer reusable
│   ├── shared/
│   │   └── empty-state.jsx               # Empty State dinamis (kata kunci pencarian vs departemen kosong)
│   └── features/
│       └── role-explorer/                # Domain utama Role Explorer
│           ├── search-bar.jsx            # Input pencarian real-time dengan shortcut "/" & tombol Hapus
│           ├── department-filter.jsx     # Bar filter departemen dengan kontras status aktif/inaktif/0
│           ├── role-card.jsx             # Kartu posisi dengan anatomi 3-chunk & seluruh permukaan klik
│           ├── role-card-skeleton.jsx    # Skeleton 3-chunk presisi untuk mencegah layout shift
│           ├── role-detail-view.jsx      # Halaman detail posisi dengan hierarki tipografi selaras
│           ├── role-explorer.jsx         # Container terpadu SearchBar + DepartmentFilter + Status Row
│           └── role-grid.jsx             # Grid kartu responsif 1/2/3 kolom
├── config/
│   └── site.js                           # Konfigurasi metadata situs
├── data/
│   └── roles.json                        # Mock data 10 posisi karir lintas departemen
├── hooks/
│   └── use-role-filter.js                # Custom hook pengelolaan state departemen, searchQuery, & URL sync
├── lib/
│   ├── constants.js                      # Konstanta departemen & konfigurasi transisi
│   └── utils.js                          # Utilitas penggabung class ringan (cn)
└── services/
    └── role.service.js                   # Pure functions filterRoles(), matchesRoleSearch(), & getDepartmentCounts()
```

---

## 4. Penanganan State Pencarian + Filter Departemen (`State Handling`)

1. **Kombinasi URL Parameter (`?dept=`) & Real-Time Keyword State (`searchQuery`)**:
   - `useRoleFilter` (`src/hooks/use-role-filter.js`) menjaga `activeDepartment` tetap tersinkronisasi dengan URL Search Params (`?dept=...`) sekaligus mengelola `searchQuery` lokal agar pengetikan terasa instan tanpa jeda (_snappy typing_), lalu menyinkronkan `?q=...` ke URL secara _debounced_ (`250ms`).
2. **Derived State Bebas Redundansi (`useMemo`)**:
   - `filteredRoles` dihitung secara _derived_ menggunakan `useMemo(() => filterRoles({ departmentId: activeDepartment, searchQuery }), [activeDepartment, searchQuery])`.
   - `departmentCounts` dihitung menggunakan `useMemo(() => getDepartmentCounts(searchQuery), [searchQuery])` sehingga angka pada pil setiap departemen secara otomatis mencerminkan jumlah lowongan yang cocok dengan kata kunci pencarian aktif.
   - `hasActiveFilters` mendeteksi apakah pengguna sedang mengaktifkan filter departemen (`!== "all"`) atau mengetik kata kunci pencarian untuk menampilkan tombol **`Reset semua filter`**.
3. **Granular & Complete Reset**:
   - `clearSearch()` membersihkan kata kunci pencarian saja dengan tetap mempertahankan departemen yang sedang dipilih.
   - `resetFilter()` mengembalikan departemen ke `"all"` (`Semua Departemen`) sekaligus mengosongkan `searchQuery` dan membersihkan parameter URL.

---

## 5. Cara Menjalankan Secara Lokal

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
# Pemeriksaan kualitas kode dengan ESLint
npm run lint

# Build produksi & jalankan server produksi
npm run build
npm run start
```
