const SHIPPING_FEE = 25000;

document.addEventListener("DOMContentLoaded", () => {
  renderCartList();
});

const renderCartList = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("checkout-cart-items");

  if (cart.length === 0) {
    container.innerHTML = `<p style="color: #718093; padding: 15px 0;">Keranjang kosong. Silakan belanja terlebih dahulu.</p>`;
    document.getElementById("subtotal-val").innerText = "Rp 0";
    document.getElementById("total-val").innerText = "Rp 0";
    return;
  }

  container.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <div>
                <h4>${item.name}</h4>
                <small>${item.qty} pcs x Rp ${item.price.toLocaleString(
        "id-ID"
      )}</small>
            </div>
            <strong>Rp ${(item.price * item.qty).toLocaleString(
              "id-ID"
            )}</strong>
        </div>
    `
    )
    .join("");

  const subtotal = cart.reduce(
    (acc, current) => acc + current.price * current.qty,
    0
  );
  document.getElementById(
    "subtotal-val"
  ).innerText = `Rp ${subtotal.toLocaleString("id-ID")}`;
  document.getElementById("total-val").innerText = `Rp ${(
    subtotal + SHIPPING_FEE
  ).toLocaleString("id-ID")}`;
};

const goToPayment = (event) => {
  event.preventDefault(); // Mencegah form mereload halaman secara tidak sengaja

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) return alert("Keranjang kosong!");

  // Simpan informasi pengiriman sementara ke localStorage agar bisa diakses di halaman bayar
  const buyerName = document.getElementById("ship-name").value;
  const finalBill = document.getElementById("total-val").innerText;

  localStorage.setItem("checkout_buyer_name", buyerName);
  localStorage.setItem("checkout_final_bill", finalBill);

  // Alihkan langsung ke halaman metode pembayaran
  window.location.href = "bayar.html";
};
