// React严格模式
import { StrictMode } from 'react'
// React DOM createRoot方法
import { createRoot } from 'react-dom/client'
// 全局样式
import './index.css'
// 主应用组件
import App from './App.tsx'

// 创建根节点并渲染应用，严格模式检查潜在问题
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
