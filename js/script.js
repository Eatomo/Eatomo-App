const buttons = document.querySelectorAll('.category-button');

// 按鈕對應跳轉頁面
const linkMap = {
  "AI菜單生成": "ai-menu.html",
  "最新食譜": "index.html",
  "人氣食譜": "popular.html",
  "潤餅皮料理": "springroll.html",
  "低卡瘦身": "lowcal.html",
  "蒜頭": "garlic.html",
  "番茄": "tomato.html",
  "蘆筍": "asparagus.html",
  "早餐": "breakfast.html",
  "素食/蔬食": "vegan.html",
  "烘焙點心&甜點": "dessert.html",
  "親子": "family.html"
};

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.textContent.trim();
    const targetPage = linkMap[text];
    if (targetPage) {
      window.location.href = targetPage;
    } else {
      console.warn("找不到對應頁面：", text);
    }
  });
});

// 📅 顯示今日日期
const todayDateElement = document.getElementById('today-date');
const today = new Date();
const formattedDate = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
todayDateElement.textContent = `📅 今日日期：${formattedDate}`;

// 🌦️ 顯示今日天氣
const weatherApiKey = 'd1c8fa0e63745ae8af24bf7c8ebe5dcf';
navigator.geolocation.getCurrentPosition(position => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric&lang=zh_tw`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const temp = Math.round(data.main.temp);
      const description = data.weather[0].description;
      const city = data.name;
      document.getElementById('today-weather').textContent = `🌦️ ${city}：${description}，${temp}°C`;
    })
    .catch(error => {
      console.error('天氣讀取失敗', error);
      document.getElementById('today-weather').textContent = '🌦️ 天氣讀取失敗';
    });
}, error => {
  console.error('無法取得位置', error);
  document.getElementById('today-weather').textContent = '🌦️ 無法取得天氣資訊';
});
const bgMusic = document.getElementById('backgroundMusic');
const volumeSlider = document.getElementById('volumeSlider');
const homeButton = document.querySelector('.home-button');
const homeIcon = document.querySelector('.home-icon');
const clickSound = document.getElementById('clickSound');

// ✅ 音量記憶功能
if (bgMusic && volumeSlider) {
  // 讀取 localStorage 裡的音量
  const savedVolume = localStorage.getItem('backgroundMusicVolume');
  if (savedVolume !== null) {
    bgMusic.volume = parseFloat(savedVolume);
    volumeSlider.value = savedVolume;
  } else {
    bgMusic.volume = volumeSlider.value; // 預設0.5
  }

  // 當滑動音量拉桿時，調整音量+儲存到localStorage
  volumeSlider.addEventListener('input', function (e) {
    e.stopPropagation();
    bgMusic.volume = this.value;
    localStorage.setItem('backgroundMusicVolume', this.value); // 存起來
  });

  volumeSlider.addEventListener('click', function (e) {
    e.stopPropagation();
  });
}

// ✅ 酪梨icon正常運作
if (homeButton) {
  homeButton.addEventListener('click', function (e) {
    e.preventDefault();
    homeIcon.classList.add('jump');

    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.volume = 0.5;
      clickSound.play();
    }

    setTimeout(() => {
      window.location.href = 'home.html'; // 跳回首頁
    }, 500);
  });
}
