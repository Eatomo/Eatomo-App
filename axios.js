// js/axios.js
const instance = axios.create({
  baseURL: 'https://backage-2dtn.onrender.com',
  timeout: 10000
});

instance.interceptors.request.use((config) => {
  const userId = localStorage.getItem('userId');
  const source = localStorage.getItem('source');
  if (userId && source) {
    config.headers['x-user-id'] = userId;
    config.headers['x-source'] = source;
  }
  return config;
});

// 全域註冊到 window（讓 HTML 直接用）
window.api = instance;
