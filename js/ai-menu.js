const submitBtn = document.getElementById('submitBtn');
const loadingText = document.getElementById('loadingText');
const menuResult = document.getElementById('menuResult');
const regenBtn = document.getElementById('regenBtn');

// 點擊生成按鈕
submitBtn.addEventListener('click', async () => {
  loadingText.style.display = 'block';
  menuResult.innerHTML = '';
  regenBtn.style.display = 'none';

  // 收集表單資料
  const food_allergy = document.querySelector('input[name="allergy"]').value;
  const health_goal = document.querySelector('input[name="goal"]').value;
  const diet_preference = document.querySelector('input[name="habit"]').value;
  const age = parseInt(document.querySelector('input[name="age"]').value);
  const height = parseFloat(document.querySelector('input[name="height"]').value);
  const weight = parseFloat(document.querySelector('input[name="weight"]').value);

  try {
    const response = await fetch('http://localhost:3000/generate-menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ food_allergy, health_goal, diet_preference, age, height, weight })
    });

    const data = await response.json();
    console.log('後端回傳：', data); // 🛠️ 測試用

    loadingText.style.display = 'none';
    menuResult.innerHTML = generateMenuHTML(data.result);
    regenBtn.style.display = 'inline-block';
  } catch (err) {
    console.error('提交錯誤', err);
    loadingText.style.display = 'none';
    menuResult.innerHTML = '<p>❌ 無法生成菜單，請稍後再試</p>';
  }
});

// 重新生成
regenBtn.addEventListener('click', () => {
  submitBtn.click();
});

// 生成菜單HTML
function generateMenuHTML(result) {
  if (!result) return '<p>找不到資料</p>';

  const createSection = (title, items) => `
    <div class="meal-section">
      <h4>${title}</h4>
      <ul>
        ${items.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `;

  return `
    <div class="day-card">
      <h3>第1天</h3>
      ${createSection('早餐 (Breakfast)', result["Day 1"].Breakfast)}
      ${createSection('午餐 (Lunch)', result["Day 1"].Lunch)}
      ${createSection('晚餐 (Dinner)', result["Day 1"].Dinner)}
      ${createSection('飲料點心 (Snack)', result["Day 1"].Snack)}
    </div>
    <div class="day-card">
      <h3>第2天</h3>
      ${createSection('早餐 (Breakfast)', result["Day 2"].Breakfast)}
      ${createSection('午餐 (Lunch)', result["Day 2"].Lunch)}
      ${createSection('晚餐 (Dinner)', result["Day 2"].Dinner)}
      ${createSection('飲料點心 (Snack)', result["Day 2"].Snack)}
    </div>
  `;
}


