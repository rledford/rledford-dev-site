import Grid from './Grid.tsx';
import Section from './Section.tsx';

export default function FocusGrid() {
  const focusAreas = [
    {
      title: 'Learning',
      items: ['New Technologies', 'Programming Languages', 'New Skills'],
    },
    {
      title: 'Backend',
      items: [
        'API Development',
        'Data Modeling',
        'Mock & Simulation',
        'Documentation',
        'Automated tests',
      ],
    },
    {
      title: 'Frontend',
      items: [
        'Backend integration',
        'UI/UX implementation',
        'Reusable components',
        'Wireframes',
        'Documentation',
      ],
    },
    {
      title: 'Integration',
      items: ['Edge Servers', 'Middleware', 'Extensions'],
    },
    {
      title: 'Data',
      items: ['Metrics', 'Collection', 'Processing', 'Generation'],
    },
    {
      title: 'Electronics',
      items: ['Interfacing', 'Development', 'Testing', 'Repair'],
    },
    {
      title: 'Programming',
      items: ['TypeScript', 'Go', 'Python', 'Lua'],
    },
    {
      title: 'Fields',
      items: ['IoT', 'RFID', 'Asset Tracking', 'Inventory Control'],
    },
  ];

  return (
    <Grid>
      {focusAreas.map((area) => (
        <Section title={area.title} items={area.items} color="emerald" />
      ))}
    </Grid>
  );
}
