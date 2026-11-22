export interface Identity {
  name: string;
  motto: string;
  role: string;
  image: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface ContentGroup {
  title: string;
  items: string[];
}

export interface TimelineEntry {
  title: string;
  subtitle: string;
  company: string;
  content: string;
}

export interface TextPart {
  text: string;
  strong?: boolean;
}

export interface Project {
  title: string;
  solution: string;
  summary: string;
  domains: string[];
  year: string;
  images: string[];
  paragraphs: TextPart[][];
}

export interface SectionLink {
  id: string;
  title: string;
}

export const identity: Identity = {
  name: 'Ryan Ledford',
  motto: 'Knowledge | Persistence | Discipline',
  role: 'Full Stack | Solutions | Engineer',
  image: '/images/profile-picture.png',
};

export const socialLinks: SocialLink[] = [
  { label: 'GitHub Profile', href: 'https://github.com/rledford' },
  { label: 'NPM Profile', href: 'https://www.npmjs.com/~rledford' },
  { label: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/ryan-ledford-356944124/' },
];

export const agenticSkills: ContentGroup[] = [
  {
    title: 'Capabilities',
    items: [
      'Workflow Automation',
      'Agent Skills Development',
      'Context Engineering',
      'Multi-Agent Orchestration',
      'Tool Design & Integration',
      'MCP Server Development',
      'Harness Engineering',
      'Evaluations',
    ],
  },
  { title: 'Frameworks & Tools', items: ['LangChain', 'Langfuse'] },
];

export const skills: ContentGroup[] = [
  { title: 'Languages', items: ['TypeScript', 'Go', 'Python', 'Lua', 'Ruby', 'Java', 'C#', 'C++'] },
  { title: 'Store & Transport', items: ['SQL', 'NoSQL', 'In-Memory', 'WebSocket', 'REST & RPC', 'GraphQL', 'MQTT & AMQP'] },
  { title: 'Tools', items: ['VS Code', 'Git', 'Vite / PNPM / NPM', 'Postman', 'Vi(m)', 'cURL', 'SSH', 'FTP'] },
  { title: 'Libs & Frameworks', items: ['Echo', 'NestJS', 'Express', 'Django', 'Passport', 'MSAL', 'Electron'] },
  { title: 'Backend', items: ['REST, GraphQL, RPC', 'Database Modeling', 'Cluster / Worker', 'IPC', 'Documentation', 'NIST Compliance'] },
  { title: 'Frontend', items: ['Vue + Vuex', 'React + Redux', 'CSS, SASS, SCSS', 'Tailwind', 'Primer', 'Bulma', 'Bootstrap'] },
  { title: 'Testing', items: ['Vitest', 'Playwright', 'Jest', 'Mocha', 'Chai'] },
  { title: 'Integration', items: ['AzureAD', 'MS Graph', 'Auth0', 'LDAP', 'Smartsheet'] },
];

export const timeline: TimelineEntry[] = [
  {
    title: '2024 - Present',
    subtitle: 'Sr. Software Engineer',
    company: 'ReflexAI',
    content: 'AI solution development, team leadership, and scalable platform architecture. Roleplay simulation and intelligent quality assurance systems.',
  },
  {
    title: '2021 - 2024',
    subtitle: 'Sr. Software Engineer',
    company: 'Monks',
    content: 'Educational assessment platforms and real-time analytics. Custom data processing, WebSocket streaming, and DOM replay systems for research applications.',
  },
  {
    title: '2017 - 2021',
    subtitle: 'Software Engineer',
    company: 'Gould Southern',
    content: 'Real-time asset tracking and RFID tool control systems. REST API development, WebSocket integration, and touch-screen kiosk applications.',
  },
  {
    title: '2014 - 2017',
    subtitle: 'Sr. Engineer Offshore',
    company: 'DOF Subsea',
    content: 'Offshore vessel tracking and real-time video streaming systems. Hardware integration, location services, and marine client notification platforms.',
  },
];

export const projects: Project[] = [
  {
    title: 'NWEA Labs',
    solution: 'Educational assessment & session replay',
    summary: 'Privacy-first student assessments with real-time response collection and session replay for researchers.',
    domains: ['Education', 'Real-time analytics', 'Session replay'],
    year: '2021-2023',
    images: ['/images/nwea-labs.png'],
    paragraphs: [
      [{ text: 'A privacy-first educational assessment platform enabling researchers and content creators to deploy tests to thousands of students nationwide without collecting personal identifying information.' }],
      [{ text: 'Built dual applications: an administration portal for test deployment and management, and a student testing interface with real-time response collection. Custom data extraction and aggregation pipelines process assessment metrics for research analysis.' }],
      [
        { text: 'Key Innovation:', strong: true },
        { text: ' Developed a custom "Replay Service" that captures and streams DOM events, mouse movements, and keystrokes via WebSockets, allowing researchers to observe student sessions in real-time or replay recorded sessions with synchronized notes—all while maintaining strict privacy compliance.' },
      ],
    ],
  },
  {
    title: 'Positive Fusion',
    solution: 'Asset tracking & RFID tool control',
    summary: 'Real-time asset oversight, geographic tracking, and RFID-powered unattended tool assignment and returns.',
    domains: ['Asset tracking', 'RFID', 'Tool control'],
    year: '2019',
    images: ['/images/positive-fusion-1.png', '/images/positive-fusion-2.png', '/images/positive-fusion-3.png'],
    paragraphs: [
      [{ text: 'End-to-end asset tracking and tool control solution providing real-time oversight of items and assets. Built with extensibility in mind, featuring comprehensive REST API documentation, WebSocket events, and seamless integration capabilities with existing systems.' }],
      [
        { text: "The platform's developer-friendly architecture enabled creation of " },
        { text: 'Fusion Assist', strong: true },
        { text: ', a companion touch-screen application utilizing RFID technology for unattended item assignment and returns.' },
      ],
      [
        { text: 'Real-time capabilities:', strong: true },
        { text: ' Live status updates, geographic asset tracking, automated zone-based status changes, intelligent notifications, and comprehensive zone monitoring with activity broadcasting.' },
      ],
    ],
  },
  {
    title: 'SeaState',
    solution: 'Vessel tracking & offshore monitoring',
    summary: 'Live vessel location, HD video streams, and notifications for surface and subsea offshore operations.',
    domains: ['Asset tracking', 'Marine operations', 'Hardware integration'],
    year: '2016',
    images: ['/images/seastate-1.png'],
    paragraphs: [
      [{ text: 'Real-time vessel tracking and monitoring platform built for DOF Subsea to deliver live location data, HD video streams, and notifications to offshore operation clients. Integrated custom hardware and software components for comprehensive surface and subsea vessel monitoring.' }],
    ],
  },
];

export const focus: ContentGroup[] = [
  { title: 'Learning', items: ['New Technologies', 'Programming Languages', 'New Skills'] },
  { title: 'Backend', items: ['API Development', 'Data Modeling', 'Mock & Simulation', 'Documentation', 'Automated tests'] },
  { title: 'Frontend', items: ['Backend integration', 'UI/UX implementation', 'Reusable components', 'Wireframes', 'Documentation'] },
  { title: 'Integration', items: ['Edge Servers', 'Middleware', 'Extensions'] },
  { title: 'Data', items: ['Metrics', 'Collection', 'Processing', 'Generation'] },
  { title: 'Electronics', items: ['Interfacing', 'Development', 'Testing', 'Repair'] },
  { title: 'Programming', items: ['TypeScript', 'Go', 'Python', 'Lua'] },
  { title: 'Fields', items: ['IoT', 'RFID', 'Asset Tracking', 'Inventory Control'] },
];

export const specializations: ContentGroup[] = [
  { title: 'Impinj', items: ['ItemSense', 'API Integration', 'IoT API and Speedway Connect', 'Reader Configuration', 'Reader Provisioning'] },
  { title: 'PTC', items: ['ThingWorx 6', 'ThingWorx 7', 'ThingWorx 8', 'Extension Development'] },
  { title: 'SPOT', items: ['API Integration', 'Data Visualizations'] },
  { title: 'WISER Systems', items: ['Deployment', 'Configuration', 'API Integration', 'Data Visualizations'] },
  { title: 'ThingSpeak', items: ['Edge Server Development', 'API Integration', 'Data Visualizations'] },
];

export const hobbies: ContentGroup[] = [
  { title: 'Creative Pursuits', items: ['Pixel Art', 'Game Dev', 'Music', 'Guitar'] },
  { title: 'Learning & Growth', items: ['Learning', 'Teaching', 'Reading', 'Tinkering'] },
];

export const sections: SectionLink[] = [
  { id: 'agentic-engineering', title: 'Agentic Engineering' },
  { id: 'skills', title: 'Software Engineering' },
  { id: 'timeline', title: 'Timeline' },
  { id: 'projects', title: 'Professional Projects' },
  { id: 'focus', title: 'Focus' },
  { id: 'specializations', title: 'Product Specializations' },
  { id: 'hobbies', title: 'Hobbies & Interests' },
];
