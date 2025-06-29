import type { Component } from 'solid-js';

interface SectionProps {
  title: string;
  items: string[];
}

const Section: Component<SectionProps> = (props) => {
  return (
    <div>
      <h4 class="text-xl font-bold mb-3">{props.title}</h4>
      <ul class="space-y-1">
        {props.items.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Section;
