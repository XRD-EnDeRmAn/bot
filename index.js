const puppeteer = require('puppeteer');
const express = require('express');
const app = express();

// Basit uptime sunucusu
app.get("/", (req, res) => {
  res.send("Discord Web 7/24 aktif! 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Uptime sunucusu port ${PORT} üzerinde çalışıyor!`);
});

// Discord Web otomasyonu
(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true, // Render üzerinde görünmez
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();

    // Timeout ve network idle ayarı
    await page.goto('https://discord.com/login', { waitUntil: 'networkidle2', timeout: 0 });

    console.log("Discord Web açıldı. QR veya manuel giriş yapabilirsiniz.");

    // Sayfayı 5 dakikada bir yenile
    setInterval(async () => {
      try {
        await page.reload({ waitUntil: 'networkidle2', timeout: 0 });
        console.log("Sayfa yenilendi, sistem aktif.");
      } catch (err) {
        console.error("Refresh hatası:", err);
      }
    }, 5 * 60 * 1000);

  } catch (err) {
    console.error("Browser başlatma hatası:", err);
  }
})();
