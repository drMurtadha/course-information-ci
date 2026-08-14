# Arahan untuk Codex (Web Builder)

Dokumen ini disediakan untuk AI/agent lain (cth. ChatGPT Codex) yang akan membina laman web untuk repository ini. Claude mengurus **kandungan** (content); Codex mengurus **paparan web** (UI/UX). Sila baca sebelum mula kerja.

## Peraturan Asas — Jangan Ubah

Folder berikut adalah kandungan sumber yang diselenggara secara berasingan (oleh Claude / penyelaras kursus). **Jangan edit, pindah, atau padam fail dalam folder ini** — hanya baca (read) untuk dipaparkan di laman web:

- `templates/` — Template CI rasmi (CI_Template_New.md, CI_Checklist.md)
- `guides/` — Panduan langkah demi langkah kemas kini CI (panduan-kemaskini-ci.md)
- `references/` — Bahan rujukan (matrix kursus, garis panduan VBE/ESD)
- `courses/` — CI sebenar mengikut kursus (UG & PG), termasuk versi asal dan versi dikemas kini
- `README.md` (root) — Gambaran keseluruhan projek

## Di Mana Kod Web Patut Diletakkan

Letakkan **semua kod laman web** (HTML/CSS/JS, atau static site generator seperti Jekyll/Astro/Next.js) di dalam folder:

```
docs/
```

Folder ini kosong (baru disediakan) dan khas untuk output/kod Codex. Kalau guna GitHub Pages, boleh set source ke `docs/` di repo Settings → Pages.

Jangan letak kod web di root repo atau bercampur dengan folder kandungan di atas — supaya sejarah git kandungan (Claude) dan kod web (Codex) senang dibezakan.

## Struktur Kandungan (untuk paparan)

```
courses/
├── UG/                          # CI Prasiswazah (kosong buat masa ini)
└── PG/                          # CI Pascasiswazah
    ├── MECS2313/
    │   ├── README.md            # nota kursus
    │   ├── original/            # CI asal (sebelum kemas kini VBE/ESD)
    │   └── updated/             # CI dikemas kini (docx/xlsx)
    └── MECS2323/
        ├── original/
        └── updated/

templates/CI_Template_New.md     # struktur CI rasmi (Markdown, ada jadual)
templates/CI_Checklist.md        # 15 item semakan akhir (Markdown table)
guides/panduan-kemaskini-ci.md   # panduan 7 langkah (Markdown)
references/matrix-kursus/README.md          # rujukan PLO↔GA↔VBE↔ESD (Markdown table)
references/panduan-vbe-esd/*.pdf            # garis panduan rasmi (PDF)
```

**Nota format:** Kebanyakan kandungan dalam Markdown (`.md`) dengan jadual GFM (GitHub Flavored Markdown). Fail CI kursus sebenar (`courses/PG/*/updated/*.xlsx` atau `.docx`) adalah dokumen Office — kalau nak paparkan di web, pertimbang convert ke HTML/PDF semasa build, jangan edit fail asal.

## Cadangan Fungsi Laman Web

- Halaman utama: ringkasan projek (guna kandungan `README.md`)
- Senarai kursus (UG/PG) dengan status: belum dikemas kini / dalam proses / selesai
- Paparan template & checklist secara interaktif (cth. checklist boleh ditanda)
- Carian/tapis kursus mengikut kod kursus atau nilai VBE/ESD yang dipetakan

## Perkara Yang Perlu Ditanya Pemilik Repo (Murtadha) Dahulu

- Sama ada nak guna GitHub Pages (`docs/` folder) atau hosting lain
- Sama ada perlu login/akses terhad untuk lihat CI kursus (data dalaman fakulti)
- Reka bentuk/branding yang dikehendaki (warna, logo UTM/Fakulti Komputeran, dsb.)
