import type { Component } from 'solid-js';
import ListItem from './ListItem.tsx';

interface SectionProps {
  title: string;
  items: string[];
  color?: 'indigo' | 'blue' | 'red' | 'emerald' | 'orange' | 'purple' | 'amber';
}

const Section: Component<SectionProps> = (props) => {
  const getAccentColor = () => {
    switch (props.color) {
      case 'indigo':
        return 'from-indigo-500 to-indigo-600';
      case 'blue':
        return 'from-blue-500 to-blue-600';
      case 'red':
        return 'from-red-500 to-red-600';
      case 'emerald':
        return 'from-emerald-500 to-emerald-600';
      case 'orange':
        return 'from-orange-500 to-orange-600';
      case 'purple':
        return 'from-purple-500 to-purple-600';
      case 'amber':
        return 'from-amber-500 to-amber-600';
      default:
        return 'from-blue-500 to-blue-600';
    }
  };

  return (
    <div class="bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 p-6 backdrop-blur-sm">
      <h4 class="text-xl font-bold mb-4 text-gray-900 flex items-center gap-3">
        <div
          class={`w-2 h-8 bg-gradient-to-b ${getAccentColor()} rounded-full`}
        ></div>
        {props.title}
      </h4>
      <ul class="space-y-3">
        {props.items.map((item) => (
          <ListItem color={props.color}>{item}</ListItem>
        ))}
      </ul>
    </div>
  );
};

export default Section;
