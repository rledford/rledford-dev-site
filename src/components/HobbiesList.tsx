import type { Component } from 'solid-js';
import ListItem from './ListItem.tsx';

interface HobbiesListProps {
  items: string[];
  color?: 'indigo' | 'blue' | 'red' | 'emerald' | 'orange' | 'purple' | 'amber';
}

const HobbiesList: Component<HobbiesListProps> = (props) => {
  return (
    <ul class="space-y-3">
      {props.items.map((item) => (
        <ListItem color={props.color}>{item}</ListItem>
      ))}
    </ul>
  );
};

export default HobbiesList;
