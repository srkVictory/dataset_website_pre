import Navbar from './components/Navbar';
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

function App() {
  return (
    <div className="min-h-screen bg-[#04070a] text-white">
      <Navbar />

      <main>
        <Hero />

        <div id="dataset">
          <DatasetOverview />
        </div>

        <DatasetFormat />

        <ModelEvaluation />

        <AnnotationProcess />

        <LandUse />

        <Sensors />

        <ChangeDetection />

        <TasksBenchmarks />

        <Leaderboard />

        <CodeModels />

        <DownloadSection />

        <Citation />

        <Team />
      </main>

      <Footer />
    </div>
  );
}

export default App;
