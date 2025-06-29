import type { Component } from 'solid-js';

interface HobbiesListProps {
  items: string[];
}

const HobbiesList: Component<HobbiesListProps> = (props) => {
  return (
    <ul class="space-y-1">
      {props.items.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
};

export default HobbiesList;
