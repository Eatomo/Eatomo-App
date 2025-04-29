const submitBtn = document.getElementById('submitBtn');
const loadingText = document.getElementById('loadingText');
const menuResult = document.getElementById('menuResult');
const regenBtn = document.getElementById('regenBtn');

// 讓提交按鈕觸發送資料給後端
submitBtn.addEventListener('click', async () => {
  loadingText.style.display = 'block'; // 顯示「正在生成」的訊息
  menuResult.innerHTML = '';  // 清空之前的結果
  regenBtn.style.display = 'none'; // 隱藏重新生成按鈕

  // 收集手動填寫表單資料
  const height = parseFloat(document.querySelector('input[name="height"]').value);
  const weight = parseFloat(document.querySelector('input[name="weight"]').value);
  const age = parseInt(document.querySelector('input[name="age"]').value);
  const body_fat = parseFloat(document.querySelector('input[name="body_fat"]').value);
  const food_allergy = document.querySelector('input[name="allergy"]').value;
  const health_goal = document.querySelector('input[name="goal"]').value;
  const diet_preference = document.querySelector('input[name="habit"]').value;

  // 發送資料到後端
  const response = await fetch('http://localhost:3000/generate-menu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      food_allergy,
      health_goal,
      diet_preference,
      age,
      height,
      weight,
      body_fat   // ✅ 加進來
    })
  });

  // 解析後端回應的資料
  const data = await response.json();

  // ✅ 確保 result 是字串
  const resultText = (data && data.result)
    ? String(data.result)
    : "⚠️ 沒有收到有效的菜單資料";

  // 顯示結果
  loadingText.style.display = 'none'; // 隱藏「正在生成」訊息
  menuResult.innerHTML = generateMenuHTML(resultText); // ✅ 傳 resultText
  regenBtn.style.display = 'inline-block'; // 顯示重新生成按鈕
});

// 重新生成菜單
regenBtn.addEventListener('click', () => {
  submitBtn.click();
});

// 顯示菜單
function generateMenuHTML(resultText) {
  const day1 = resultText.split("### Day 1")[1]?.split("### Day 2")[0]?.trim() || "找不到 Day 1 資料";
  const day2 = resultText.split("### Day 2")[1]?.trim() || "找不到 Day 2 資料";

  return `
    <div class="day-card">
      <h3>第1天</h3>
      <pre>${day1}</pre>
    </div>
    <div class="day-card">
      <h3>第2天</h3>
      <pre>${day2}</pre>
    </div>
  `;
}
