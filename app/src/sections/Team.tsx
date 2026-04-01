// React Hooks和图标
import { useEffect, useRef, useState } from 'react';
import { Building2, GraduationCap, ExternalLink } from 'lucide-react';

// 合作机构数据
const collaborators = [
  {
    name: 'IRIP Lab, Beihang University',
    nameZh: '北京航空航天大学 IRIP实验室',
    location: 'Beijing, China',
    url: 'https://irip.buaa.edu.cn/',
  },
  {
    name: 'Shandong Center for Data and Application of High Resolution Earth Observation System',
    nameZh: '高分辨率对地观测系统山东数据与应用中心',
    location: 'Shandong, China',
    url: '#',
  },
];

// 团队组件
export default function Team() {
  // 动画可见性状态
  const [isVisible, setIsVisible] = useState(false);
  // section DOM引用
  const sectionRef = useRef<HTMLElement>(null);

  // IntersectionObserver 滚动动画
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 渲染团队页面
  return (
    <section id="team" ref={sectionRef} className="py-24 relative">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4d6bfa]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 区块标题 */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4d6bfa]/10 border border-[#4d6bfa]/20 mb-6">
            <GraduationCap className="w-4 h-4 text-[#4d6bfa]" />
            <span className="text-sm text-[#4d6bfa] font-medium">Academic Partners</span>
          </div>
          <h2 className="section-title">Collaborating Institutions</h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            This dataset is a collaborative effort across multiple prestigious universities
          </p>
        </div>

        {/* 合作机构卡片 */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {collaborators.map((institution, index) => (
            <a
              key={institution.name}
              href={institution.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-8 rounded-2xl bg-[#161b22]/80 border border-[#2a2d47]/50 hover:border-[#4d6bfa]/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden w-full text-center cursor-pointer block"
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* 外部链接图标 */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLink className="w-5 h-5 text-[#4d6bfa]" />
              </div>

              {/* 机构图标 */}
              <div className="w-16 h-16 mx-auto mb-5 rounded-xl bg-gradient-to-br from-[#4d6bfa]/20 to-[#4353fa]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Building2 className="w-8 h-8 text-[#4d6bfa]" />
              </div>

              {/* 机构信息 */}
              <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-[#4d6bfa] transition-colors">
                {institution.name}
              </h3>
              <p className="text-base text-[#8b949e] mb-2">{institution.nameZh}</p>
              <p className="text-sm text-[#6e7681] flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4d6bfa]/60" />
                {institution.location}
              </p>

              {/* 悬停发光效果 */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#4d6bfa]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* 角落装饰 */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#4d6bfa]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </a>
          ))}
        </div>

        {/* 底部提示文字 */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-sm text-[#6e7681]">
            For inquiries regarding this dataset, please contact the corresponding author in our paper
          </p>
        </div>
      </div>
    </section>
  );
}
