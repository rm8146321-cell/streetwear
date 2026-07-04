let currentMethod = "Virtual Account (Midtrans)";

document.addEventListener("DOMContentLoaded", () => {
  // Ambil rekam data dari halaman checkout sebelumnya
  const buyerName = localStorage.getItem("checkout_buyer_name") || "Pelanggan";
  const totalBill = localStorage.getItem("checkout_final_bill") || "Rp 0";

  document.getElementById("pay-buyer-name").innerText = buyerName;
  document.getElementById("pay-final-total").innerText = totalBill;
});

const changePaymentMethod = (methodName, cardElement) => {
  currentMethod = methodName;
  document.getElementById("pay-method-chosen").innerText = methodName;

  const cards = document.querySelectorAll(".payment-card");
  cards.forEach((c) => c.classList.remove("active"));
  cardElement.classList.add("active");
};

const executePaymentSim = async () => {
  const btn = document.querySelector(".btn-checkout");
  btn.innerText = "⏳ Memproses Transaksi Ke Gateway...";
  btn.disabled = true;

  // Simulasi jeda network response API 1.5 detik
  await new Promise((res) => setTimeout(res, 1500));

  const totalBill = document.getElementById("pay-final-total").innerText;

  // PANGGIL POP-UP KONFIRMASI KUSTOM (Menggantikan confirm() lama)
  showTrendShopConfirm(
    "Bayar Sekarang?",
    `Tagihan sebesar ${totalBill} terdeteksi via ${currentMethod}.\nSilakan tentukan hasil simulasi pembayaran Anda:`,
    "⚙️",

    // PILIHAN A: JIKA USER MENGEKLIK "SIMULASI SUKSES"
    async () => {
      btn.innerText = "⚡ Memverifikasi Berhasil...";
      await new Promise((res) => setTimeout(res, 1000));

      // Tampilkan notifikasi sukses akhir
      showTrendShopAlert(
        "Pembayaran Berhasil! 🎉",
        `Pembayaran Anda sebesar ${totalBill} sukses diverifikasi oleh pihak ${currentMethod}. Terima kasih sudah berbelanja!`,
        "✅",
        () => {
          localStorage.removeItem("cart");
          localStorage.removeItem("checkout_buyer_name");
          localStorage.removeItem("checkout_final_bill");
          window.location.href = "index.html";
        }
      );
    },

    // PILIHAN B: JIKA USER MENGEKLIK "SIMULASI GAGAL"
    () => {
      // Tampilkan notifikasi gagal akhir
      showTrendShopAlert(
        "Pembayaran Dibatalkan ❌",
        "Transaksi Anda gagal atau dibatalkan. Silakan periksa kembali saldo Anda atau coba gunakan metode pembayaran lainnya.",
        "⚠️",
        () => {
          btn.innerText = "Konfirmasi & Bayar Sekarang";
          btn.disabled = false;
        }
      );
    }
  );
};
