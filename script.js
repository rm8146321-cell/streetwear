/**
 * DATA MASTER PUSAT & SINKRONISASI GLOBAL (script.js)
 */

// 1. DATABASE UTAMA: 20 Produk Lengkap dengan Gambar Asli dari Unsplash
const products = [
  {
    id: 1,
    name: "Sepatu Sneakers",
    price: 450000,
    category: "sepatu",
    image: "img/sneakers.jpg",
    desc: "Sneakers kasual bergaya klasik dengan insole Ortholite yang empuk.",
  },
  {
    id: 2,
    name: "Kemeja Flanel",
    price: 250000,
    category: "pakaian",
    image: "img/kamejaflanel.jpeg",
    desc: "Kemeja flanel lengan panjang berbahan 100% katun wol pilihan.",
  },
  {
    id: 3,
    name: "Tas Ransel Minimalis",
    price: 350000,
    category: "tas",
    image: "img/ransel.webp",
    desc: "Tas punggung anti-air (waterproof) dengan kompartemen laptop 15.6 inci.",
  },
  {
    id: 4,
    name: "Jaket Bomber",
    price: 520000,
    category: "pakaian",
    image: "img/jaket.jpg",
    desc: "Jaket bomber tangguh tahan angin dengan lapisan dalam dacron hangat.",
  },
  {
    id: 5,
    name: "Celana Chino Slim-Fit Stretch",
    price: 299000,
    category: "pakaian",
    image: "img/chino.jpeg",
    desc: "Celana panjang chino berbahan katun twill stretch yang fleksibel.",
  },
  {
    id: 6,
    name: "Kaos Polos Cotton Combed 30s",
    price: 95000,
    category: "pakaian",
    image: "img/kaospolos.jpg",
    desc: "Kaos polos ultra-lembut, menyerap keringat dengan pilihan warna solid.",
  },
  {
    id: 7,
    name: "Sepatu Pantofel Kulit Oxford",
    price: 650000,
    category: "sepatu",
    image: "img/pantofel.jpg",
    desc: "Sepatu formal pria berbahan kulit sapi asli dengan finishing kilap elegan.",
  },
  {
    id: 8,
    name: "Dompet Kulit Sapi Minimalis",
    price: 180000,
    category: "aksesoris",
    image: "img/dompet.jpg",
    desc: "Dompet kartu ramping berteknologi RFID blocking anti-pencurian data.",
  },
  {
    id: 9,
    name: "Jam Tangan Chronograph Sporty",
    price: 850000,
    category: "aksesoris",
    image: "img/jamtangan.jpg",
    desc: "Jam tangan pria water-resistant 50m dengan strap stainless steel.",
  },
  {
    id: 10,
    name: "Tas Selempang Canvas Retro",
    price: 210000,
    category: "tas",
    image: "img/tasslempang.jpg",
    desc: "Sling bag kasual berbahan canvas tebal untuk membawa gadget harian.",
  },
  {
    id: 11,
    name: "Hoodie Oversize Fleece",
    price: 320000,
    category: "pakaian",
    image: "img/hoodie.webp",
    desc: "Jaket hoodie tebal dengan tekstur dalam super lembut dan hangat.",
  },
  {
    id: 12,
    name: "Kacamata Hitam Anti-UV Polaris",
    price: 150000,
    category: "aksesoris",
    image: "img/kacamata.jpg",
    desc: "Kacamata pelindung silau matahari dengan lensa polarized premium.",
  },
  {
    id: 13,
    name: "Ikat Pinggang Kulit Otomatis",
    price: 125000,
    category: "aksesoris",
    image: "img/sabug.webp",
    desc: "Sabuk pria dengan buckle sistem rel otomatis tanpa lubang, praktis.",
  },
  {
    id: 14,
    name: "Sandal Gunung Ergo-Grip",
    price: 195000,
    category: "sepatu",
    image: "img/sendal.jpg",
    desc: "Sandal outdoor dengan outsole karet tebal anti-slip di medan basah.",
  },
  {
    id: 15,
    name: "Topi Baseball Klasik Canvas",
    price: 85000,
    category: "aksesoris",
    image: "img/topi.jpg",
    desc: "Topi pelindung panas dengan strap kulit yang bisa diatur ukurannya.",
  },
  {
    id: 16,
    name: "Jaket Denim Vintage Wash",
    price: 480000,
    category: "pakaian",
    image: "img/jaketdenim.jpg",
    desc: "Jaket jeans klasik dengan efek pencucian estetik pudar yang trendi.",
  },
  {
    id: 17,
    name: "Tas Jinjing Tote Bag Canvas",
    price: 175000,
    category: "tas",
    image: "img/tasjinjing.jpg",
    desc: "Tote bag unisex dengan kancing ritsleting utama, cocok untuk kuliah.",
  },
  {
    id: 18,
    name: "Kaos Kaki Bambu Breathable",
    price: 45000,
    category: "aksesoris",
    image: "img/kaoskaki.jpg",
    desc: "Kaos kaki serat bambu anti-bakteri, mencegah bau kaki seharian.",
  },
  {
    id: 19,
    name: "Sepatu Lari Ultra-Light Foam",
    price: 720000,
    category: "sepatu",
    image: "img/sepatu.jpg",
    desc: "Sepatu running berbobot ringan dengan bantalan foam peredam benturan.",
  },
  {
    id: 20,
    name: "Celana Pendek Cargo Santai",
    price: 185000,
    category: "pakaian",
    image: "img/celana.jpg",
    desc: "Celana pendek katun ripstop dengan banyak saku fungsional.",
  },
];

const syncNavbarCartCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.innerText = totalItems;
};

// RENDER BERANDA (Menggunakan tag <img> asli untuk 3 produk terlaris)
document.addEventListener("DOMContentLoaded", () => {
  syncNavbarCartCount();

  const indexCatalogBox = document.getElementById("product-list");
  if (indexCatalogBox) {
    const bestSellers = products.slice(0, 3);
    indexCatalogBox.innerHTML = bestSellers
      .map(
        (p) => `
          <div class="product-card" onclick="window.location.href='produk.html?id=${
            p.id
          }'">
              <!-- Sekarang memanggil gambar asli -->
              <img src="${p.image}" alt="${p.name}" class="product-img">
              <h3>${p.name}</h3>
              <p>Rp ${p.price.toLocaleString("id-ID")}</p>
              <button class="btn-view-detail">Lihat Detail</button>
          </div>
      `
      )
      .join("");
  }
});

// FUNGSI GLOBAL POP-UP KUSTOM ESTETIK (Bisa dipakai di semua halaman)
const showTrendShopAlert = (title, message, icon, onConfirmAction) => {
  // 1. Buat elemen pembungkus secara gaib via DOM
  const overlay = document.createElement("div");
  overlay.className = "custom-alert-overlay";

  // 2. Masukkan struktur kotak pesan
  overlay.innerHTML = `
      <div class="custom-alert-box">
          <div class="custom-alert-icon">${icon}</div>
          <h3>${title}</h3>
          <p>${message}</p>
          <button class="custom-alert-btn">Sip, Lanjutkan! 🚀</button>
      </div>
  `;

  // 3. Suntikkan ke dalam body HTML
  document.body.appendChild(overlay);

  // 4. Picu animasi muncul dengan jeda micro-second
  setTimeout(() => overlay.classList.add("active"), 10);

  // 5. Beri fungsi mati/pindah halaman ketika tombol diklik
  overlay.querySelector(".custom-alert-btn").addEventListener("click", () => {
    overlay.classList.remove("active"); // Jalankan animasi menutup
    setTimeout(() => {
      overlay.remove(); // Hapus elemen dari dokumen
      if (onConfirmAction) onConfirmAction(); // Jalankan rute pindah halaman jika ada
    }, 300);
  });
};
// FUNGSI GLOBAL KONFIRMASI DUA TOMBOL (Untuk Sandbox/Pilihan)
const showTrendShopConfirm = (title, message, icon, onConfirm, onCancel) => {
  const overlay = document.createElement("div");
  overlay.className = "custom-alert-overlay";

  // Struktur dengan dua tombol berdampingan
  overlay.innerHTML = `
      <div class="custom-alert-box" style="max-width: 420px;">
          <div class="custom-alert-icon">${icon}</div>
          <h3>${title}</h3>
          <p>${message}</p>
          <div style="display: flex; gap: 12px; justify-content: center;">
              <button class="custom-alert-btn btn-sim-success" style="background: linear-gradient(135deg, #2ed573, #26af5f); box-shadow: 0 4px 15px rgba(46, 213, 115, 0.3);">Bayar? ✅</button>
              <button class="custom-alert-btn btn-sim-danger" style="background: linear-gradient(135deg, #ff4757, #ff6b81); box-shadow: 0 4px 15px rgba(255, 71, 87, 0.3);">Batal? ❌</button>
          </div>
      </div>
  `;

  document.body.appendChild(overlay);
  setTimeout(() => overlay.classList.add("active"), 10);

  // Jalur Aksi 1: Jika memilih tombol "Simulasi Sukses"
  overlay.querySelector(".btn-sim-success").addEventListener("click", () => {
    overlay.classList.remove("active");
    setTimeout(() => {
      overlay.remove();
      if (onConfirm) onConfirm();
    }, 300);
  });

  // Jalur Aksi 2: Jika memilih tombol "Simulasi Gagal"
  overlay.querySelector(".btn-sim-danger").addEventListener("click", () => {
    overlay.classList.remove("active");
    setTimeout(() => {
      overlay.remove();
      if (onCancel) onCancel();
    }, 300);
  });
};
