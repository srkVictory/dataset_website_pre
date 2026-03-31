// React相关API
import * as React from "react"

// 移动端断点宽度768px
const MOBILE_BREAKPOINT = 768

// 检测是否为移动设备的Hook
export function useIsMobile() {
  // 移动端状态，初始值undefined
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  // 监听窗口大小变化
  React.useEffect(() => {
    // 媒体查询监听器
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    // 窗口变化回调
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    // 添加事件监听
    mql.addEventListener("change", onChange)
    // 初始化状态
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    // 清理事件监听
    return () => mql.removeEventListener("change", onChange)
  }, [])

  // 返回是否为移动端
  return !!isMobile
}
