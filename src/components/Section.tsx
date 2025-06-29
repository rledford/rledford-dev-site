import type { Component } from 'solid-js';

interface SectionProps {
  title: string;
  items: string[];
}

const Section: Component<SectionProps> = (props) => {
  return (
    <div class="bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 p-6 backdrop-blur-sm">
      <h4 class="text-xl font-bold mb-4 text-gray-900 flex items-center gap-3">
        <div class="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
        {props.title}
      </h4>
      <ul class="space-y-3">
        {props.items.map((item) => (
          <li class="flex items-start gap-3 text-gray-700 leading-relaxed">
            <div class="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Section;
