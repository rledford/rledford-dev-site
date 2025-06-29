import Grid from './Grid.tsx';
import HobbiesList from './HobbiesList.tsx';

export default function HobbiesSection() {
  return (
    <Grid cols="grid-cols-1 md:grid-cols-2">
      <HobbiesList items={['Pixel Art', 'Game Dev', 'Music', 'Guitar']} />
      <HobbiesList items={['Learning', 'Teaching', 'Reading', 'Tinkering']} />
    </Grid>
  );
}
