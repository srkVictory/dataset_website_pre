// 图标组件
import { Satellite, Github, FileText, Database, Mail } from 'lucide-react';

// 页脚链接接口
interface FooterLink {
  name: string;
  href: string;
  external?: boolean;
}

// 页脚链接数据
const footerLinks: Record<string, FooterLink[]> = {
  dataset: [
    { name: 'Download', href: '#download' },
    { name: 'Documentation', href: '#code' },
    { name: 'API Reference', href: '#code' },
  ],
  resources: [
    { name: 'GitHub', href: 'https://github.com', external: true },
    { name: 'Paper', href: 'https://arxiv.org', external: true },
    { name: 'Tutorials', href: '#code' },
  ],
  community: [
    { name: 'Discussions', href: 'https://github.com', external: true },
    { name: 'Issues', href: 'https://github.com', external: true },
    { name: 'Contributing', href: 'https://github.com', external: true },
  ],
  support: [
    { name: 'Contact Us', href: 'mailto:contact@levir-mf.org' },
    { name: 'FAQ', href: '#' },
    { name: 'Feedback', href: 'mailto:contact@levir-mf.org' },
  ],
};

// 页脚组件
export default function Footer() {
  // 平滑滚动到锚点
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // 渲染页脚UI
  return (
    <footer className="py-16 border-t border-[#2a2d47]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页脚主内容区域 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* 品牌信息 */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4d6bfa] to-[#4353fa] flex items-center justify-center">
                <Satellite className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-white font-['Poppins']">
                Geo-BeyondCaptioning
              </span>
            </div>
            <p className="text-[#b4bcd0] text-sm leading-relaxed mb-6 max-w-sm">
              A comprehensive multi-modal change detection dataset for remote sensing, advancing AI research in satellite imagery analysis.
            </p>
            {/* 社交媒体图标链接 */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#161b22] border border-[#2a2d47]/50 flex items-center justify-center text-[#b4bcd0] hover:text-white hover:border-[#4d6bfa]/50 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://arxiv.org"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#161b22] border border-[#2a2d47]/50 flex items-center justify-center text-[#b4bcd0] hover:text-white hover:border-[#4d6bfa]/50 transition-all"
              >
                <FileText className="w-5 h-5" />
              </a>
              <a
                href="#dataset"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#dataset');
                }}
                className="w-10 h-10 rounded-lg bg-[#161b22] border border-[#2a2d47]/50 flex items-center justify-center text-[#b4bcd0] hover:text-white hover:border-[#4d6bfa]/50 transition-all"
              >
                <Database className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@levir-mf.org"
                className="w-10 h-10 rounded-lg bg-[#161b22] border border-[#2a2d47]/50 flex items-center justify-center text-[#b4bcd0] hover:text-white hover:border-[#4d6bfa]/50 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* 数据集链接栏目 */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Dataset
            </h4>
            <ul className="space-y-3">
              {footerLinks.dataset.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (!link.external) {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }
                    }}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-sm text-[#b4bcd0] hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 资源链接栏目 */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-sm text-[#b4bcd0] hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 支持链接栏目 */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-[#b4bcd0] hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 底部版权栏 */}
        <div className="pt-8 border-t border-[#2a2d47]/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p className="text-sm text-[#b4bcd0]">
              © 2026 Geo-BeyondCaptioning
            </p>
            <span className="hidden sm:block text-[#2a2d47]">|</span>
            <p className="text-sm text-[#b4bcd0]">
              Website by{' '}
              <span className="text-white font-medium">Shang Ruke</span>
              {' '}·{' '}
              <a
                href="mailto:srkVictory@163.com"
                className="text-[#4d6bfa] hover:underline"
              >
                srkVictory@163.com
              </a>
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-[#b4bcd0] hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-[#b4bcd0] hover:text-white transition-colors">
              Terms of Use
            </a>
            <span className="text-sm text-[#b4bcd0]">
              Licensed under{' '}
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4d6bfa] hover:underline"
              >
                CC BY-NC-SA 4.0
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
