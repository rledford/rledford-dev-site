import Grid from './Grid.tsx';
import Card from './Card.tsx';

export default function Timeline() {
  const timelineData = [
    {
      title: '2024 - Present',
      subtitle: 'Sr. Software Engineer',
      company: 'ReflexAI',
      content:
        'AI solution development, team leadership, and scalable platform architecture. Roleplay simulation and intelligent quality assurance systems.',
      headerClass:
        'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-b border-blue-500',
      borderClass: 'border-blue-300',
    },
    {
      title: '2021 - 2024',
      subtitle: 'Sr. Software Engineer',
      company: 'Monks',
      content:
        'Educational assessment platforms and real-time analytics. Custom data processing, WebSocket streaming, and DOM replay systems for research applications.',
      headerClass:
        'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-b border-emerald-400',
      borderClass: 'border-emerald-300',
    },
    {
      title: '2017 - 2021',
      subtitle: 'Software Engineer',
      company: 'Gould Southern',
      content:
        'Real-time asset tracking and RFID tool control systems. REST API development, WebSocket integration, and touch-screen kiosk applications.',
      headerClass:
        'bg-gradient-to-r from-purple-500 to-purple-600 text-white border-b border-purple-400',
      borderClass: 'border-purple-300',
    },
    {
      title: '2014 - 2017',
      subtitle: 'Sr. Engineer Offshore',
      company: 'DOF Subsea',
      content:
        'Offshore vessel tracking and real-time video streaming systems. Hardware integration, location services, and marine client notification platforms.',
      headerClass:
        'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white border-b border-indigo-400',
      borderClass: 'border-indigo-300',
    },
  ];

  return (
    <Grid cols="grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
      {timelineData.map((job) => (
        <Card
          title={job.title}
          subtitle={job.subtitle}
          content={job.content}
          headerClass={job.headerClass}
          borderClass={job.borderClass}
        />
      ))}
    </Grid>
  );
}
