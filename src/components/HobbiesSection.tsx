import Grid from './Grid.tsx';
import Card from './Card.tsx';
import HobbiesList from './HobbiesList.tsx';

export default function HobbiesSection() {
  const hobbiesData = [
    {
      title: 'Creative Pursuits',
      items: ['Pixel Art', 'Game Dev', 'Music', 'Guitar'],
      headerClass:
        'bg-gradient-to-r from-purple-500 to-purple-600 text-white border-b border-purple-400',
      borderClass: 'border-purple-300',
    },
    {
      title: 'Learning & Growth',
      items: ['Learning', 'Teaching', 'Reading', 'Tinkering'],
      headerClass:
        'bg-gradient-to-r from-purple-500 to-purple-600 text-white border-b border-purple-400',
      borderClass: 'border-purple-300',
    },
  ];

  return (
    <Grid cols="grid-cols-1 md:grid-cols-2">
      {hobbiesData.map((category) => (
        <Card
          title={category.title}
          content={<HobbiesList items={category.items} color="purple" />}
          headerClass={category.headerClass}
          borderClass={category.borderClass}
        />
      ))}
    </Grid>
  );
}
