// 导航栏组件
import Navbar from './components/Navbar';
// 页面区块组件
import Hero from './sections/Hero';
import DatasetOverview from './sections/DatasetOverview';
import DatasetFormat from './sections/DatasetFormat';
import ModelEvaluation from './sections/ModelEvaluation';
import AnnotationProcess from './sections/AnnotationProcess';
import LandUse from './sections/LandUse';
import Sensors from './sections/Sensors';
import ChangeDetection from './sections/ChangeDetection';
import TasksBenchmarks from './sections/TasksBenchmarks';
import Leaderboard from './sections/Leaderboard';
import CodeModels from './sections/CodeModels';
import DownloadSection from './sections/Download';
import Citation from './sections/Citation';
import Team from './sections/Team';
import Footer from './sections/Footer';

// 主应用组件，组装整个页面
function App() {
  return (
    // 页面背景色和文字颜色
    <div className="min-h-screen bg-[#04070a] text-white">
      {/* 导航栏 */}
      <Navbar />

      {/* 主体内容 */}
      <main>
        {/* 首页横幅 */}
        <Hero />

        {/* 数据集概览区块 */}
        <div id="dataset">
          <DatasetOverview />
        </div>

        {/* 数据格式说明区块 */}
        <DatasetFormat />

        {/* 模型评估区块 */}
        <ModelEvaluation />

        {/* 标注流程区块 */}
        <AnnotationProcess />

        {/* 土地利用分布区块 */}
        <LandUse />

        {/* 传感器信息区块 */}
        <Sensors />

        {/* 变化检测演示区块 */}
        <ChangeDetection />

        {/* 任务与基准测试区块 */}
        <TasksBenchmarks />

        {/* 排行榜区块 */}
        <Leaderboard />

        {/* 代码与模型区块 */}
        <CodeModels />

        {/* 下载区块 */}
        <DownloadSection />

        {/* 引用信息区块 */}
        <Citation />

        {/* 团队介绍区块 */}
        <Team />
      </main>

      {/* 页脚 */}
      <Footer />
    </div>
  );
}

// 导出主应用组件
export default App;
