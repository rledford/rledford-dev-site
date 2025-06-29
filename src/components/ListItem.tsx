import type { Component } from 'solid-js';

interface ListItemProps {
  children: string;
  color?: 'indigo' | 'blue' | 'red' | 'emerald' | 'orange' | 'purple' | 'amber';
}

const ListItem: Component<ListItemProps> = (props) => {
  const getBulletColor = () => {
    switch (props.color) {
      case 'indigo':
        return 'bg-indigo-400';
      case 'blue':
        return 'bg-blue-400';
      case 'red':
        return 'bg-red-400';
      case 'emerald':
        return 'bg-emerald-400';
      case 'orange':
        return 'bg-orange-400';
      case 'purple':
        return 'bg-purple-400';
      case 'amber':
        return 'bg-amber-400';
      default:
        return 'bg-blue-400';
    }
  };

  return (
    <li class="flex items-start gap-3 text-gray-700 leading-relaxed">
      <div
        class={`w-1.5 h-1.5 ${getBulletColor()} rounded-full mt-2 flex-shrink-0`}
      ></div>
      <span>{props.children}</span>
    </li>
  );
};

export default ListItem;
