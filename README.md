# SekolahKarir - Role Explorer

Aplikasi web **Role Explorer** responsif untuk **Mini Assignment - Frontend Engineer (SekolahKarir Batch 2)**. Proyek ini dirancang dengan fokus pada **ketepatan eksekusi brief**, **kualitas _product reasoning_**, serta keseimbangan antara **struktur kode yang _scalable_**, **detail UX yang matang**, dan **pengelolaan _state_ yang reliabel**.

🔗 **Live Demo**: _https://sekolahkarir-role.vercel.app/_

---

## 1. Kerangka Berpikir & Pengambilan Keputusan (_Problem Framing & Trade-offs_)

Brief menekankan bahwa penilaian tidak dilihat dari seberapa kompleks solusi, melainkan dari **kualitas _reasoning_ dan kejelasan eksekusi**. Berikut adalah keputusan produk dan teknis utama yang diambil beserta alasan di baliknya:

| Tantangan / Masalah Produk                                                                 | Keputusan Desain & Teknis                                                                                  | Alasan (_Trade-off & Product Reasoning_)                                                                                                                                                                                                                                                                                                                                                      |
| :----------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Bagaimana menyimpan _state_ filter & pencarian agar praktis bagi kandidat?**          | **Hybrid URL + Local State** (`?dept=...&q=...`) menggunakan Next.js `useSearchParams` & `router.replace`. | Menyimpan _state_ di URL memungkinkan kandidat membagikan tautan posisi spesifik ke rekan (misal: `/?dept=engineering&q=react`) dan menjaga _state_ saat halaman di-_refresh_. Penggunaan _debounce_ `250ms` pada _search query_ menjaga pengetikan tetap instan (**0ms input lag**) tanpa membebani _history stack_ peramban.                                                                |
| **2. Bagaimana cara tercepat bagi _reviewer_ & _user_ menguji _Empty State_?**             | Menyediakan departemen **`Legal & People (0)`** + **Contextual Search Empty State**.                       | Alih-alih mengharuskan _reviewer_ mengubah kode untuk melihat _empty state_, tersedia tab departemen dengan `0` lowongan untuk pengujian **1 klik**, ditambah _empty state_ kontekstual saat kata kunci pencarian tidak ditemukan.                                                                                                                                                            |
| **3. Apa yang terjadi jika _user_ mencari kata kunci di satu departemen dan hasilnya 0?**  | **Dynamic Department Badge Counter** yang bereaksi terhadap kata kunci pencarian.                          | Saat _user_ mengetik kata kunci (misal: `"Figma"` saat berada di tab `Engineering`), angka pada lencana departemen lain (`Design 2`) otomatis diperbarui secara _real-time_. Ini mencegah _blind clicking_ dan memberi petunjuk visual di departemen mana peran tersebut berada.                                                                                                              |
| **4. Tata letak tombol filter di layar _mobile_: _Horizontal Scroll_ vs _Wrapped Pills_?** | Menggunakan **Wrapped Pills (`flex-wrap`)** di seluruh ukuran layar.                                       | Dengan hanya 6 departemen, menampilkan seluruh opsi secara langsung (_wrapped_) menghilangkan _hidden discoverability_ (opsi tersembunyi di balik _scroll_ samping) dan mencegah teks terpotong di layar sempit.                                                                                                                                                                              |
| **5. Mengapa menyertakan Header, Footer, & Halaman Detail Peran?**                         | Dibangun sebagai **Contextual Product Shell** dengan **Strict Scope Boundary**.                            | Komponen _Role Explorer_ jarang berdiri di ruang hampa. Menyertakan _Header_ (dengan _hover dropdown_ & _mobile drawer_) dan _Footer_ di `layout.jsx` mendemonstrasikan bagaimana komponen ini hidup di ekosistem nyata **SekolahKarir**. Menu di luar cakupan tugas sengaja diarahkan ke halaman `404 Not Found` kustom agar batas _scope_ tetap jelas dan tidak terdistraksi fitur _dummy_. |

---

## 2. Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Library UI**: React 19 (JavaScript / JSX)
- **Styling**: Tailwind CSS v4
- **Typography**: `Urbanist` (`400`, `500`, `600`, `700`, `800`) via `next/font/google`
- **Icons & Media**: `lucide-react`, Inline SVG kustom, & `next/image` teroptimasi

---

## 3. Arsitektur & Struktur Frontend (`Frontend Structure`)

Struktur direktori menerapkan pemisahan tanggung jawab (_modular separation of concerns_) yang jelas antara lapisan data, logika bisnis/state, komponen primitif UI, dan fitur domain:

```text
public/
└── logo.png                         # Aset logo resmi SekolahKarir
src/
├── app/
│   ├── globals.css                  # Konfigurasi tema, variabel warna, dan font Urbanist
│   ├── layout.jsx                   # Root layout global (Header, main wrapper, & Footer)
│   ├── loading.jsx                  # Fallback skeleton halaman utama untuk Suspense boundary
│   ├── not-found.jsx                # Halaman 404 kustom untuk menjaga scope boundary
│   ├── page.jsx                     # Halaman utama Role Explorer
│   └── roles/
│       └── [id]/
│           ├── loading.jsx          # Skeleton loading khusus halaman detail peran
│           └── page.jsx             # Halaman detail posisi karir (SSG via generateStaticParams)
├── components/
│   ├── ui/                          # Komponen primitif reusable (Design System)
│   │   ├── badge.jsx                # Varian solid, outline, dan glassmorphism
│   │   ├── button.jsx               # Tombol kapsul aksesibel dengan focus ring jelas
│   │   └── skeleton.jsx             # Primitif skeleton dengan dukungan reduced-motion
│   ├── layout/                      # Contextual Layout Shell
│   │   ├── header.jsx               # Floating pill navbar, hover dropdown, & mobile drawer
│   │   └── footer.jsx               # Global footer reusable
│   ├── shared/
│   │   └── empty-state.jsx          # Empty State kontekstual (filter departemen & pencarian)
│   └── features/
│       └── role-explorer/           # Domain utama Role Explorer
│           ├── department-filter.jsx # Panel kontrol terpadu: Search Bar + Department Pills
│           ├── role-card.jsx        # Kartu informasi peran dengan tinggi seragam
│           ├── role-card-skeleton.jsx # Skeleton presisi untuk mencegah layout shift (CLS)
│           ├── role-detail-view.jsx # Tampilan detail posisi, galeri, & posisi terkait
│           ├── role-explorer.jsx    # Container orchestrator fitur Role Explorer
│           └── role-grid.jsx        # Grid kartu + atomic live status bar
├── config/
│   └── site.js                      # Konfigurasi metadata situs
├── data/
│   └── roles.json                   # Mock data 10 posisi karir lintas departemen
├── hooks/
│   └── use-role-filter.js           # Custom hook pengelolaan state filter, search, & URL sync
├── lib/
│   ├── constants.js                 # Konstanta departemen & konfigurasi transisi
│   └── utils.js                     # Utilitas penggabung class ringan (cn)
└── services/
    └── role.service.js              # Pure functions untuk query, multi-field search, & agregasi
```

**Keunggulan Arsitektur Ini**:

- **Mudah Diuji & Dipelihara**: Seluruh logika pemfilteran dan kalkulasi jumlah posisi berada di fungsi murni (`src/services/role.service.js`), terpisah dari siklus hidup React (`src/hooks/use-role-filter.js`) dan representasi visual (`src/components/`).
- **Zero External State Bloat**: Memanfaatkan _built-in hooks_ React (`useMemo`, `useCallback`, `useState`) dan URL Search Params tanpa ketergantungan _library state management_ eksternal yang berlebihan untuk skala fitur ini.

---

## 4. Penanganan State (`State Handling`)

1. **Sinkronisasi Dua Arah dengan URL (`?dept=...&q=...`)**:
   - Parameter `?dept=` menjadi _Single Source of Truth_ untuk departemen aktif. Apabila pengguna memasukkan nilai `?dept=` yang tidak valid di URL, sistem otomatis melakukan _fallback_ aman ke `all` (`Semua Departemen`).
   - Parameter `?q=` disinkronkan secara _debounced_ (`250ms`) dari _state_ input pencarian lokal agar responsivitas ketikan tetap instan sekaligus menghasilkan URL yang dapat dibagikan (_deep-linkable_).
2. **Derived State Bebas Redundansi (`useMemo`)**:
   - Daftar peran hasil saringan (`filteredRoles`), jumlah posisi per departemen (`departmentCounts`), dan label departemen aktif dihitung secara _derived_ menggunakan `useMemo`. Tidak ada duplikasi _state_ antara daftar peran penuh dan daftar peran terfilter yang berisiko menyebabkan _out-of-sync bug_.
3. **Controlled Skeleton Transition & Cleanup**:
   - Saat berpindah departemen, sistem menampilkan _skeleton loading_ terukur (`220ms`) dengan pembersihan `clearTimeout` pada `useEffect` untuk mencegah _race condition_ ketika pengguna berpindah tab dengan cepat.
4. **Granular Reset Actions**:
   - Pengguna dapat menghapus kata kunci pencarian saja melalui tombol **`Hapus (X)`** atau tombol **`Escape`** (mempertahankan departemen aktif), maupun mereset seluruh filter sekaligus melalui tombol **`Reset filter`**.

---

## 5. Detail UX & Aksesibilitas (`UX Detail`)

- **Panel Kontrol Pencarian & Filter Terpadu**:
  - Mendukung pencarian _multi-keyword_ lintas atribut: **judul posisi**, **departemen**, **ringkasan**, **keahlian (`React`, `Figma`, `SQL`)**, **tipe kerja (`Remote`, `Hybrid`, `On-site`)**, hingga **level (`Intern`, `Junior`, `Mid-Level`)**.
  - **Keyboard Shortcuts**: Tekan `/` dari mana saja di halaman untuk langsung memfokuskan kolom pencarian, dan tekan `Escape` untuk membersihkan kata kunci.
- **Zero Cumulative Layout Shift (CLS)**:
  - `<RoleExplorerFallback />`, `<RoleCardSkeleton />`, dan `<RoleDetailSkeleton />` dirancang mengikuti dimensi, _border-radius_, dan struktur elemen asli sehingga transisi pemuatan bebas dari lompatan tata letak.
- **Keseragaman Visual Kartu (_Card Alignment_)**:
  - Menggunakan judul 1 baris (`line-clamp-1`), ringkasan 2 baris dengan tinggi tetap (`min-h-[2.75rem] line-clamp-2`), deretan _skill badge_ dengan indikator `+N`, serta _footer_ yang selalu rata bawah (`mt-auto`) sehingga seluruh kartu dalam satu baris _grid_ sejajar rapi di segala ukuran layar.
- **Navigasi Responsif & Interaktif**:
  - **Desktop**: _Floating pill navbar_ dengan menu _dropdown_ halus saat di-_hover_ (dilengkapi _invisible hover bridge_ agar menu tidak tertutup saat kursor berpindah) serta perilaku _auto-hide_ saat _scroll_ ke bawah.
  - **Mobile**: _Slide-over drawer_ dengan animasi _spring cubic-bezier_ (`cubic-bezier(0.16, 1, 0.3, 1)`), _backdrop fade_, penguncian _body scroll_, dan dukungan tombol `Escape`.
- **Aksesibilitas (WCAG & Screen Reader)**:
  - Tombol departemen menggunakan `aria-pressed={isActive}`, kolom pencarian memiliki `<label>` eksplisit, dan bar status menggunakan `role="status" aria-live="polite" aria-atomic="true"` untuk mengumumkan perubahan jumlah hasil secara otomatis kepada pengguna _screen reader_.
  - Menghormati preferensi sistem `prefers-reduced-motion` (`motion-reduce:transition-none` & `motion-reduce:animate-none`).

---

## 6. Catatan Penggunaan AI (`TOOLS & AI POLICY`)

Sesuai ketentuan pada _brief assignment_, pengerjaan proyek ini menggunakan bantuan _AI tools_ sebagai _pair-programming assistant_:

- **Google Gemini & Google Antigravity**:
  - Digunakan untuk berdiskusi mengenai _edge cases_ UX, melakukan _scaffolding_ komponen JSX, menyusun _mock data_ posisi karir yang realistis bagi ekosistem **SekolahKarir**, serta memvalidasi praktik terbaik Next.js App Router (seperti `<Suspense>` boundary pada `useSearchParams()` dan `generateStaticParams()`).
  - Seluruh keputusan produk, arsitektur _folder_, logika _filtering & state synchronization_, serta struktur kode diperiksa, dipahami sepenuhnya, dan dapat dijelaskan oleh saya.

---

## 7. Cara Menjalankan Secara Lokal

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
