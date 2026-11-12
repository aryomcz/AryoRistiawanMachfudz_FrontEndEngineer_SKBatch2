# SekolahKarir - Role Explorer

Aplikasi pencarian dan filter lowongan posisi untuk **Mini Assignment - Frontend Engineer (SekolahKarir Batch 2)**.

🔗 **Live Demo**: [sekolahkarir-role.vercel.app](https://sekolahkarir-role.vercel.app)

---

## 1. Latar Belakang & Pendekatan Solusi

Tantangan awal dalam tugas ini adalah menerjemahkan requirement awal yang sederhana menjadi alur produk yang terasa nyata dan kontekstual. 

Untuk menentukan gaya visual dan batasan fitur, saya melakukan benchmarking langsung ke website resmi SekolahKarir:
- [sekolahkarir.id](https://sekolahkarir.id) & [tools.sekolahkarir.id](https://tools.sekolahkarir.id) sebagai referensi warna, tipografi (`Urbanist`), serta gaya navbar, kartu, dan footer.
- Membangun layout pelengkap (Header, Footer, Halaman Detail Peran, dan Halaman 404) agar komponen filter lowongan bekerja layaknya fitur di dalam ekosistem produk yang utuh.

---

## 2. Keputusan Desain & Kebutuhan UX

Berikut beberapa keputusan produk yang diterapkan untuk meningkatkan kenyamanan pengguna:

| Masalah / Kebutuhan | Solusi yang Diterapkan | Alasan & Pertimbangan |
| :--- | :--- | :--- |
| **Menyimpan status filter & pencarian** | Sinkronisasi URL Search Params (`?dept=...&q=...`) | Memudahkan kandidat membagikan tautan posisi tertentu ke orang lain dan menjaga filter tetap aktif saat halaman dimuat ulang. Input pencarian diberi *debounce* 250ms agar peramban tidak mencatat riwayat berlebih di tiap ketikan huruf. |
| **Pemisahan kontrol pencarian & filter** | Memisahkan `<SearchBar />` dan `<DepartmentFilter />` | Menerapkan prinsip tanggung jawab tunggal (*single responsibility*). Komponen pencarian bisa dikembangkan atau dipindahkan secara terpisah tanpa terikat logika filter departemen. |
| **Kemudahan menguji *Empty State*** | Menyediakan tab departemen **`Legal & People (0)`** | Reviewer dan penguji dapat melihat tampilan *empty state* dalam 1 klik tanpa harus mengubah data di kode. Tersedia juga *empty state* kontekstual ketika kata kunci pencarian tidak ditemukan. |
| **Menghindari klik kosong saat mencari peran** | Badge Counter departemen dinamis | Angka pada tombol departemen otomatis menyesuaikan dengan kata kunci pencarian yang sedang aktif. Pengguna langsung tahu jika peran yang dicari ada di departemen lain. |
| **Keterbacaan kartu lowongan** | Struktur kartu 3 bagian teratur | Mengelompokkan kartu menjadi Header (kategori & judul), Informasi Utama (lokasi, tipe kerja, ringkasan), dan Footer (tag keahlian & tombol detail). Seluruh area kartu dapat diklik langsung ke halaman detail. |
| **Tampilan tombol filter di layar HP** | Tombol fleksibel (*flex-wrap*) | Karena hanya ada 6 kategori, tombol filter dibiarkan turun ke baris berikutnya (*wrap*), bukan digeser ke samping (*horizontal scroll*), agar semua opsi tetap terlihat langsung tanpa tersembunyi. |
| **Batasan ruang lingkup (*scope boundary*)** | Halaman 404 Kustom (`not-found.jsx`) | Menu navigasi di luar cakupan tugas sengaja diarahkan ke halaman 404 kustom agar batas pengerjaan tugas jelas dan tidak dipenuhi halaman *dummy*. |

---

## 3. Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Library UI**: React 19 (JavaScript / JSX)
- **Styling**: Tailwind CSS v4
- **Tipografi**: Font `Urbanist` (`next/font/google`)
- **Ikon**: `lucide-react`

---

## 4. Arsitektur & Kesiapan Backend

Struktur folder memisahkan secara jelas antara tampilan UI, manajemen state, dan sumber data:

```text
src/
├── app/
│   ├── globals.css                  # Tema, variabel warna, dan font
│   ├── layout.jsx                   # Layout utama (Navbar, wrapper, Footer)
│   ├── loading.jsx                  # Skeleton loading halaman utama
│   ├── not-found.jsx                # Halaman 404 kustom
│   ├── page.jsx                     # Halaman utama Role Explorer
│   └── roles/
│       └── [id]/
│           ├── loading.jsx          # Skeleton loading halaman detail
│           └── page.jsx             # Halaman detail posisi peran
├── components/
│   ├── ui/                          # Komponen dasar (Button, Badge, Skeleton)
│   ├── layout/                      # Komponen layout (Header, Footer)
│   ├── shared/                      # Komponen bersama (EmptyState)
│   └── features/
│       └── role-explorer/           # Fitur utama Role Explorer
│           ├── search-bar.jsx       # Input pencarian, shortcut "/", tombol hapus
│           ├── department-filter.jsx# Tombol filter departemen dengan counter
│           ├── role-card.jsx        # Kartu posisi peran
│           ├── role-card-skeleton.jsx # Skeleton placeholder saat filter berganti
│           ├── role-detail-view.jsx # Tampilan lengkap informasi peran
│           ├── role-explorer.jsx    # Penggabung SearchBar, Filter, dan Grid
│           └── role-grid.jsx        # Grid kartu posisi dan status jumlah hasil
├── config/
│   └── site.js                      # Metadata situs
├── data/
│   └── roles.json                   # Mock data posisi peran
├── hooks/
│   └── use-role-filter.js           # Hook pengelolaan filter, pencarian, dan URL
├── lib/
│   ├── constants.js                 # Data departemen dan konfigurasi transisi
│   └── utils.js                     # Utilitas styling (cn)
└── services/
    └── role.service.js              # Logika query data, filter, dan perhitungan jumlah
```

**Kesiapan Backend (Service Layer)**:
Data saat ini disimpan dalam file JSON lokal (`roles.json`), namun seluruh logika pemfilteran dan pengambilannya diisolasi di dalam `role.service.js`. Dengan pemisahan ini, ketika aplikasi nantinya dihubungkan ke backend atau REST API nyata, pengembang cukup memperbarui fungsi di layer *service* tanpa perlu mengubah komponen tampilan.

---

## 5. Pengelolaan State

1. **Sinkronisasi Parameter URL (`?dept=...&q=...`)**:
   - Parameter `?dept=` menjadi acuan utama departemen aktif. Jika parameter tidak valid, otomatis kembali ke kategori `all` (Semua Departemen).
   - Parameter pencarian `?q=` diperbarui dengan *debounce* 250ms agar input ketikan tetap lancar dan URL tetap dapat dibagikan langsung.
2. **Derived State (`useMemo`)**:
   - Data lowongan terfilter dan jumlah posisi per departemen dihitung langsung dari data utama menggunakan `useMemo` untuk mencegah ketidaksinkronan data antar state.
3. **Transisi Skeleton**:
   - Saat berpindah departemen, skeleton ditampilkan sebentar (220ms) dengan pembersihan timer (`clearTimeout`) agar tidak terjadi *race condition* saat tab ditekan bergantian dengan cepat.
4. **Pembersihan Pencarian**:
   - Pengguna dapat menghapus kata kunci pencarian menggunakan tombol `Hapus ×` atau tombol `Escape`, maupun mereset seluruh filter melalui tombol `Reset filter`.

---

## 6. Detail UX & Aksesibilitas

- **Pencarian Multi-Atribut**: Mendukung pencarian berdasarkan judul posisi, departemen, ringkasan, keahlian (`React`, `Figma`, `SQL`), tipe kerja (`Remote`, `Hybrid`, `On-site`), hingga tingkat pengalaman.
- **Shortcut Keyboard**: Tekan tombol `/` dari mana saja untuk memfokuskan kursor ke kolom pencarian, dan tekan `Escape` untuk mengosongkan kata kunci.
- **Halaman Detail Posisi (`/roles/[id]`)**: Menyediakan informasi peran lebih lengkap beserta daftar posisi terkait.
- **Aksesibilitas**:
  - Tombol departemen dilengkapi atribut `aria-pressed`.
  - Kolom input memiliki label dan `role="searchbox"`.
  - Jumlah hasil yang ditampilkan menggunakan `aria-live="polite"` agar perubahan dibacakan dengan benar oleh *screen reader*.
  - Mendukung preferensi `prefers-reduced-motion` untuk mematikan animasi bagi pengguna yang membutuhkannya.

---

## 7. Catatan Penggunaan AI

Sesuai ketentuan penugasan, penggunaan AI dalam proyek ini difungsikan sebagai asisten pemrograman:
- **Google Gemini & Google Antigravity**: Digunakan untuk eksplorasi penanganan *edge cases*, pembuatan kerangka awal komponen JSX, penyusunan *mock data*, dan verifikasi implementasi Next.js App Router (seperti penanganan `<Suspense>` pada `useSearchParams`).
- Seluruh keputusan produk, arsitektur kode, logika filter, serta penyesuaian gaya visual dipahami dan ditulis secara langsung oleh saya.

---

## 8. Cara Menjalankan Project

Pastikan **Node.js** (versi 18.18+ atau 20+) sudah terpasang:

```bash
# 1. Pasang dependensi
npm install

# 2. Jalankan server pengembangan
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

Perintah tambahan:
```bash
# Linting kode
npm run lint

# Build untuk produksi
npm run build
npm run start
```
