import Grid from './Grid.tsx';
import Section from './Section.tsx';

export default function SkillsGrid() {
  const skillsData = [
    {
      title: 'Languages',
      items: [
        'TypeScript/JavaScript',
        'Go',
        'Python',
        'Lua',
        'Ruby',
        'Java',
        'C#',
        'C++',
      ],
    },
    {
      title: 'Store & Transport',
      items: [
        'SQL',
        'NoSQL',
        'In-Memory',
        'WebSocket',
        'REST & RPC',
        'GraphQL',
        'MQTT & AMQP',
      ],
    },
    {
      title: 'Tools',
      items: [
        'VS Code',
        'Git',
        'Vite / PNPM / NPM',
        'Postman',
        'Vi(m)',
        'cURL',
        'SSH',
        'FTP',
      ],
    },
    {
      title: 'Libs & Frameworks',
      items: [
        'Echo',
        'NestJS',
        'Express',
        'Django',
        'Passport',
        'MSAL',
        'Electron',
      ],
    },
    {
      title: 'Backend',
      items: [
        'REST, GraphQL, RPC',
        'Database Modeling',
        'Cluster / Worker',
        'IPC',
        'Documentation',
        'NIST Compliance',
      ],
    },
    {
      title: 'Frontend',
      items: [
        'Vue + Vuex',
        'React + Redux',
        'CSS, SASS, SCSS',
        'Tailwind',
        'Primer',
        'Bulma',
        'Bootstrap',
      ],
    },
    {
      title: 'Testing',
      items: ['Vitest', 'Playwright', 'Jest', 'Mocha', 'Chai'],
    },
    {
      title: 'Integration',
      items: ['AzureAD', 'MS Graph', 'Auth0', 'LDAP', 'Smartsheet'],
    },
    {
      title: 'Operating Systems',
      items: ['Linux', 'MacOS', 'Windows'],
    },
  ];

  return (
    <Grid cols="grid-cols-1 md:grid-cols-3">
      {skillsData.map((skill) => (
        <Section title={skill.title} items={skill.items} />
      ))}
    </Grid>
  );
}
