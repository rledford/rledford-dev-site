import Grid from './Grid.tsx';
import Card from './Card.tsx';

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
        'bg-gradient-to-r from-pink-500 to-pink-600 text-white border-b border-pink-400',
      borderClass: 'border-pink-300',
    },
  ];

  return (
    <Grid cols="grid-cols-1 md:grid-cols-2">
      {hobbiesData.map((category) => (
        <Card
          title={category.title}
          content={
            <ul class="space-y-3">
              {category.items.map((item) => (
                <li class="flex items-start gap-3 text-gray-700">
                  <div class="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          }
          headerClass={category.headerClass}
          borderClass={category.borderClass}
        />
      ))}
    </Grid>
  );
}
