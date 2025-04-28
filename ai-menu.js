const fileInput = document.getElementById('fileInput');
const fileNameDisplay = document.getElementById('fileName');
const submitBtn = document.getElementById('submitBtn');
const loadingText = document.getElementById('loadingText');
const menuResult = document.getElementById('menuResult');
const regenBtn = document.getElementById('regenBtn');

// 顯示上傳檔案名稱
fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    fileNameDisplay.textContent = `已選擇檔案：${fileInput.files[0].name}`;
  } else {
    fileNameDisplay.textContent = "未選擇檔案";
  }
});

// 提交按鈕
submitBtn.addEventListener('click', () => {
  loadingText.style.display = 'block';
  menuResult.innerHTML = '';
  regenBtn.style.display = 'none';

  // 模擬GPT生成過程
  setTimeout(() => {
    loadingText.style.display = 'none';
    menuResult.innerHTML = generateMockMenu();
    regenBtn.style.display = 'inline-block';
  }, 2000); // 模擬2秒生成
});

// 重新生成按鈕
regenBtn.addEventListener('click', () => {
  submitBtn.click();
});

// 模擬生成兩天的菜單
function generateMockMenu() {
  return `
    <div class="day-card">
      <h3>第1天</h3>
      <p>早餐：地瓜燕麥粥 + 無糖豆漿</p>
      <p>午餐：烤雞胸佐時蔬 + 糙米飯</p>
      <p>晚餐：蒸鮭魚 + 青花菜 + 紫米飯</p>
    </div>
    <div class="day-card">
      <h3>第2天</h3>
      <p>早餐：酪梨吐司 + 水煮蛋</p>
      <p>午餐：牛肉炒蔬菜 + 藜麥</p>
      <p>晚餐：番茄豆腐鍋 + 玉米飯</p>
    </div>
  `;
}
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
      window.location.href = 'index.html'; // 跳回首頁
    }, 500);
  });
}



