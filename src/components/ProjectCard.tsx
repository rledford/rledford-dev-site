import type { Component, JSX } from 'solid-js';
import ImageCarousel from './ImageCarousel.tsx';

interface ProjectCardProps {
  title: string;
  images: string[];
  children: JSX.Element;
  year: string;
  color?: 'indigo' | 'blue' | 'red' | 'emerald' | 'orange' | 'purple' | 'amber';
}

const ProjectCard: Component<ProjectCardProps> = (props) => {
  const getHeaderColor = () => {
    switch (props.color) {
      case 'indigo':
        return 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white border-b border-indigo-400';
      case 'blue':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-b border-blue-400';
      case 'red':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white border-b border-red-400';
      case 'emerald':
        return 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-b border-emerald-400';
      case 'orange':
        return 'bg-gradient-to-r from-orange-500 to-orange-600 text-white border-b border-orange-400';
      case 'purple':
        return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white border-b border-purple-400';
      case 'amber':
        return 'bg-gradient-to-r from-amber-500 to-amber-600 text-white border-b border-amber-400';
      default:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200';
    }
  };

  const getBorderColor = () => {
    switch (props.color) {
      case 'indigo':
        return 'border-indigo-300';
      case 'blue':
        return 'border-blue-300';
      case 'red':
        return 'border-red-300';
      case 'emerald':
        return 'border-emerald-300';
      case 'orange':
        return 'border-orange-300';
      case 'purple':
        return 'border-purple-300';
      case 'amber':
        return 'border-amber-300';
      default:
        return 'border-gray-200';
    }
  };

  const getTextColor = () => {
    return props.color ? 'text-white' : 'text-gray-900';
  };

  return (
    <div
      class={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1 border ${getBorderColor()}`}
    >
      <div class={getHeaderColor()}>
        <h4 class={`text-xl font-bold px-6 py-4 ${getTextColor()}`}>
          {props.title}
        </h4>
      </div>
      <div class="overflow-hidden">
        {props.images.length > 1 ? (
          <ImageCarousel
            images={props.images}
            alt={props.title}
            interval={5000}
          />
        ) : props.images.length === 1 ? (
          <img
            src={props.images[0]}
            alt={props.title}
            class="w-full h-auto group-hover:scale-105 transition-transform duration-300"
          />
        ) : null}
      </div>
      <div class="p-6 text-gray-700 leading-relaxed">{props.children}</div>
      <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200">
        <div class="text-gray-600 font-medium flex items-center gap-2">
          <i class="fas fa-calendar-alt text-sm"></i>
          {props.year}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
