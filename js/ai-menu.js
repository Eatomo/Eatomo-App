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
  const food_allergy = document.querySelector('input[name="allergy"]').value;
  const health_goal = document.querySelector('input[name="goal"]').value;
  const diet_preference = document.querySelector('input[name="habit"]').value;
  const age = parseInt(document.querySelector('input[name="age"]').value);
  const height = parseFloat(document.querySelector('input[name="height"]').value);
  const weight = parseFloat(document.querySelector('input[name="weight"]').value);

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
      weight
    })
  });

  // 解析後端回應的資料
  const data = await response.json();

  // 顯示結果
  loadingText.style.display = 'none'; // 隱藏「正在生成」訊息
  menuResult.innerHTML = generateMenuHTML(data.result); // 顯示從後端獲取的菜單
  regenBtn.style.display = 'inline-block'; // 顯示重新生成按鈕
});

// 重新生成菜單
regenBtn.addEventListener('click', () => {
  submitBtn.click();
});

function generateMenuHTML(menuData) {
  const day1 = menuData["Day 1"];
  const day2 = menuData["Day 2"];

  return `
    <div class="day-card">
      <h3>第1天</h3>
      <p><strong>早餐：</strong>${day1.Breakfast.map(dish => dish.name).join('、')}</p>
      <p><strong>午餐：</strong>${day1.Lunch.map(dish => dish.name).join('、')}</p>
      <p><strong>晚餐：</strong>${day1.Dinner.map(dish => dish.name).join('、')}</p>
    </div>
    <div class="day-card">
      <h3>第2天</h3>
      <p><strong>早餐：</strong>${day2.Breakfast.map(dish => dish.name).join('、')}</p>
      <p><strong>午餐：</strong>${day2.Lunch.map(dish => dish.name).join('、')}</p>
      <p><strong>晚餐：</strong>${day2.Dinner.map(dish => dish.name).join('、')}</p>
    </div>
  `;
}

