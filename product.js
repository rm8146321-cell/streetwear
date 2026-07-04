/**
 * LOGIKA SMART-PAGE HALAMAN PRODUK TERFILTER (product.js)
 */
let targetProduct = null;
let orderQty = 1;

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));

  const catalogView = document.getElementById("products-catalog-view");
  const detailView = document.getElementById("product-detail-view");

  if (isNaN(productId)) {
    if (catalogView) catalogView.classList.remove("hidden");
    if (detailView) detailView.classList.add("hidden");
    handleFilterChange();
  } else {
    if (catalogView) catalogView.classList.add("hidden");
    if (detailView) detailView.classList.remove("hidden");
    setupSingleProductDetail(productId);
  }
});

// SINKRONISASI FILTER PENCARIAN & KATEGORI
const handleFilterChange = () => {
  const keyword = document.getElementById("search-input").value.toLowerCase();
  const selectedCategory = document.getElementById("category-filter").value;
  const selectedSort = document.getElementById("price-sort").value;

  let filteredProducts = products.filter((product) => {
    const matchName = product.name.toLowerCase().includes(keyword);
    const matchCategory =
      selectedCategory === "semua" || product.category === selectedCategory;
    return matchName && matchCategory;
  });

  if (selectedSort === "murah") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedSort === "mahal") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  renderFilteredCatalog(filteredProducts);
};

// CETAK GAMBAR KE KATALOG
const renderFilteredCatalog = (productsArray) => {
  const allProductsBox = document.getElementById("all-products-list");
  if (!allProductsBox) return;

  if (productsArray.length === 0) {
    allProductsBox.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #718093;">
                <h3>❌ Produk tidak ditemukan</h3>
                <p>Coba gunakan kata kunci atau ubah filter lain.</p>
            </div>
        `;
    return;
  }

  allProductsBox.innerHTML = productsArray
    .map(
      (p) => `
        <div class="product-card" onclick="window.location.href='produk.html?id=${
          p.id
        }'">
            <img src="${p.image}" alt="${p.name}" class="product-img">
            <h3>${p.name}</h3>
            <p>Rp ${p.price.toLocaleString("id-ID")}</p>
            <button class="btn-view-detail">Lihat Detail</button>
        </div>
    `
    )
    .join("");
};

// CETAK GAMBAR KE HALAMAN DETAIL UTAMA
const setupSingleProductDetail = (productId) => {
  targetProduct = products.find((p) => p.id === productId);

  if (!targetProduct) {
    document.getElementById("product-detail-view").innerHTML = `
            <div class="card-section" style="text-align:center; padding: 50px 0;">
                <h3>⚠️ Maaf, produk tidak ditemukan.</h3>
                <a href="produk.html" style="color:#ff4757; font-weight:bold;">Kembali ke Katalog</a>
            </div>
        `;
    return;
  }

  // Suntik Gambar Asli Langsung Ke Pembungkusnya
  const galleryBox = document.querySelector(".main-image-placeholder");
  if (galleryBox) {
    galleryBox.innerHTML = `<img src="${targetProduct.image}" alt="${targetProduct.name}" style="width:100%; height:100%; object-fit:cover; border-radius:16px;">`;
  }

  document.getElementById("detail-title").innerText = targetProduct.name;
  document.getElementById(
    "detail-price"
  ).innerText = `Rp ${targetProduct.price.toLocaleString("id-ID")}`;
  document.getElementById("detail-desc").innerText = targetProduct.desc;

  refreshPriceCalculation();
};

const adjustQty = (amount) => {
  orderQty += amount;
  if (orderQty < 1) orderQty = 1;
  document.getElementById("qty-val").innerText = orderQty;
  refreshPriceCalculation();
};

const refreshPriceCalculation = () => {
  const total = targetProduct.price * orderQty;
  document.getElementById(
    "detail-total-price"
  ).innerText = `Rp ${total.toLocaleString("id-ID")}`;
};

const handleAddToCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemInCart = cart.find((item) => item.id === targetProduct.id);

  if (itemInCart) {
    itemInCart.qty += orderQty;
  } else {
    cart.push({ ...targetProduct, qty: orderQty });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  syncNavbarCartCount();

  // GANTI ALERT LAMA DENGAN POP-UP BARU CLARA
  showTrendShopAlert(
    "Berhasil Masuk Keranjang!",
    `Mantap! ${orderQty}x ${targetProduct.name} sudah aman tersimpan di keranjang belanjamu.`,
    "🛍️",
    () => {
      // Ini adalah tindakan yang baru berjalan SETELAH tombol pop-up diklik
      window.location.href = "checkout.html";
    }
  );
};

const selectSize = (element) => {
  const allSizeButtons = document.querySelectorAll(".size-btn");
  allSizeButtons.forEach((btn) => btn.classList.remove("active"));
  element.classList.add("active");
};
