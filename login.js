const proxy = ""; // tidak pakai proxy
const scriptURL = "https://script.google.com/macros/s/AKfycbwcMi_pBDlXeEzS5wxpIuiRmDjvkiwjgR53TmcfhGyi0DcKTSj3sgGXxfmPEpbVhUgg4g/exec";


document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("loginBtn");
  btn.addEventListener("click", async () => {
    const u = document.getElementById("username").value.trim();
    const p = document.getElementById("password").value.trim();
    const msg = document.getElementById("msg");

    if (!u || !p) { msg.textContent = "⚠️ Lengkapi username & password"; return; }

    msg.textContent = "⚡ Memeriksa ...";
    try {
      const res = await fetch(proxy + scriptURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", username: u, password: p })
      });
      const r = await res.json();
      if (r.status === "success") {
        localStorage.setItem("petugas", r.nama);
        localStorage.setItem("role", r.role);
        msg.style.color = "#8aff8a";
        msg.textContent = "✅ Berhasil, membuka dashboard ...";
        setTimeout(() => location.href = "index.html", 700);
      } else {
        msg.textContent = "❌ " + (r.message || "Login gagal");
      }
    } catch (err) {
      msg.textContent = "❌ Koneksi gagal";
    }
  });
});
