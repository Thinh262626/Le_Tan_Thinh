import {
  frontend,
  backend,
  ux,
  prototyping,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  git,
  figma,
  docker,
  postgresql,
  rubyrails,
  graphql,
  komikult,
  leaderboard,
  math,
  movie,
  nyeusi,
  space,
  coverhunt,
  dcc,
  kelhel,
  microverse,
  thinhAbout,
  thinhHome,
  screenshot1,
  screenshot2,
  thumbnailBangkok,
  thumbnailNepal,
  thumbnailSeoul,
  thumbnailSeoulDay1,
  thumbnailVlogKorea2,
  thumbnailVlog,
  blog1,
  blog2,
  blog3,
  blog4,
  blog5,
} from '../assets';

export const navLinks = [
  {
    id: 'about',
    title: 'About',
  },
  {
    id: 'projects',
    title: 'Projects',
  },
  {
    id: 'blogs',
    title: 'Blogs & SEO',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
];

const services = [
  {
    title: 'Video Editor',
    icon: frontend,
  },
  {
    title: 'Content Creator',
    icon: backend,
  },
  {
    title: 'Motion Graphic & Design',
    icon: ux,
  },
  {
    title: 'SEO Marketing',
    icon: prototyping,
  },
];

const technologies = [
  {
    name: 'HTML 5',
    icon: html,
  },
  {
    name: 'CSS 3',
    icon: css,
  },
  {
    name: 'JavaScript',
    icon: javascript,
  },
  {
    name: 'TypeScript',
    icon: typescript,
  },
  {
    name: 'React JS',
    icon: reactjs,
  },
  {
    name: 'Tailwind CSS',
    icon: tailwind,
  },
  {
    name: 'Node JS',
    icon: nodejs,
  },
  {
    name: 'git',
    icon: git,
  },
  {
    name: 'figma',
    icon: figma,
  },
  {
    name: 'docker',
    icon: docker,
  },
];

const experiences = [
  {
    title: 'Content Creator & Video Editor',
    company_name: 'Tam Luxury',
    icon: coverhunt,
    iconBg: '#333333',
    date: '2022 - Present',
  },
  {
    title: 'Freelancer',
    company_name: 'Self-Employed',
    icon: microverse,
    iconBg: '#333333',
    date: '2022 - Present',
  },
  {
    title: 'Tutoring',
    company_name: 'Self-Employed',
    icon: kelhel,
    iconBg: '#333333',
    date: '2023 - Present',
  },
];

const projects = [
  {
    id: 'project-1',
    name: 'Travel Vlog: Seoul Day 1-2',
    description: 'A cinematic travel vlog capturing the beauty of Seoul, South Korea. Editing focused on smooth transitions and engaging storytelling.',
    tags: [
      {
        name: 'premiere',
        color: 'blue-text-gradient',
      },
      {
        name: 'colorgrading',
        color: 'green-text-gradient',
      },
      {
        name: 'vlog',
        color: 'pink-text-gradient',
      },
    ],
    image: thumbnailSeoulDay1,
    repo: '',
    demo: 'https://youtube.com/YOUR_VIDEO_ID_HERE',
  },
  {
    id: 'project-2',
    name: 'Commercial: PMC 1',
    description: 'A commercial video project demonstrating product features with dynamic motion graphics and sound design.',
    tags: [
      {
        name: 'aftereffects',
        color: 'blue-text-gradient',
      },
      {
        name: 'commercial',
        color: 'green-text-gradient',
      },
      {
        name: 'motion',
        color: 'pink-text-gradient',
      },
    ],
    image: screenshot1,
    repo: '',
    demo: 'https://youtube.com/YOUR_VIDEO_ID_HERE',
  },
  {
    id: 'project-3',
    name: 'Event: Bangkok Official',
    description: 'An official event recap video shot in Bangkok, focusing on high energy, fast-paced editing, and engaging music.',
    tags: [
      {
        name: 'event',
        color: 'blue-text-gradient',
      },
      {
        name: 'recap',
        color: 'green-text-gradient',
      },
      {
        name: 'premiere',
        color: 'pink-text-gradient',
      },
    ],
    image: thumbnailBangkok,
    repo: '',
    demo: 'https://youtube.com/YOUR_VIDEO_ID_HERE',
  },
  {
    id: 'project-4',
    name: 'Travel Documentary: Nepal',
    description: 'A documentary-style travel video exploring the culture and landscapes of Nepal.',
    tags: [
      {
        name: 'documentary',
        color: 'blue-text-gradient',
      },
      {
        name: 'travel',
        color: 'green-text-gradient',
      },
      {
        name: 'cinematic',
        color: 'pink-text-gradient',
      },
    ],
    image: thumbnailNepal,
    repo: '',
    demo: 'https://youtube.com/YOUR_VIDEO_ID_HERE',
  },
  {
    id: 'project-5',
    name: 'Commercial: Đông Trùng',
    description: 'A product demonstration and promotional video for Đông Trùng Hạ Thảo.',
    tags: [
      {
        name: 'product',
        color: 'blue-text-gradient',
      },
      {
        name: 'promo',
        color: 'green-text-gradient',
      },
      {
        name: 'premiere',
        color: 'pink-text-gradient',
      },
    ],
    image: screenshot2,
    repo: '',
    demo: 'https://youtube.com/YOUR_VIDEO_ID_HERE',
  },
];

const blogs = [
  {
    id: 'blog-1',
    name: 'Trang Sức : 4 Xu Hướng Chiếm Lĩnh Thị Trường Năm 2023',
    description: 'Xu hướng trang sức 2023 sẽ như thế nào? Trang sức hiện đại hay trang sức cổ điển sẽ lên ngôi?',
    image: blog1,
    link: 'https://tamluxury.vn/trang-suc-4-xu-huong-chiem-linh-thi-truong-nam-2023/',
  },
  {
    id: 'blog-2',
    name: 'Top 10 : Viên Kim Cương Lớn Nhất Thế Giới',
    description: 'Lịch sử những viên Kim cương thiên nhiên lớn nhất thế giới. Với chiều sâu lịch sử và quá trình hình thành...',
    image: blog2,
    link: 'https://tamluxury.vn/top-10-vien-kim-cuong-lon-nhat-the-gioi/',
  },
  {
    id: 'blog-3',
    name: 'Ý Nghĩa Của Nhẫn Cưới Trong Hôn Nhân Của Công Giáo',
    description: 'Đã từng xuất hiện một cuốn sách: “Hãy Trải Nghiệm Điều Tuyệt Vời Của Hôn Nhân” của...',
    image: blog3,
    link: 'https://tamluxury.vn/kien-thuc-y-nghia-cua-nhan-cuoi-trong-hon-nhan-cua-cong-giao/',
  },
  {
    id: 'blog-4',
    name: '10 Viên Kim Cương Thiên Nhiên Đắt Đỏ Nhất Thế Giới',
    description: 'Kim cương vẫn luôn là viên đá thiên nhiên được săn đón và đắt giá nhất trên thế giới...',
    image: blog4,
    link: 'https://tamluxury.vn/top-10-vien-kim-cuong-thien-nhien-quy-gia-va-dat-do-nhat-the-gioi/',
  },
  {
    id: 'blog-5',
    name: 'Các Thương Hiệu Trang Sức Xa Xỉ Nhất Thế Giới',
    description: 'Quá trình hình thành và phát triển về ngành kim hoàn hay còn gọi là trang sức là một quá trình lịch sử...',
    image: blog5,
    link: 'https://tamluxury.vn/cac-thuong-hieu-trang-suc-xa-xi-va-noi-tieng-nhat-the-gioi/',
  },
];

export { services, technologies, experiences, projects, blogs };

