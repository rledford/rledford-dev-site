import type { Component, JSX } from 'solid-js';

interface ProjectCardProps {
  title: string;
  images: string[];
  children: JSX.Element;
  year: string;
}

const ProjectCard: Component<ProjectCardProps> = (props) => {
  return (
    <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1 border border-gray-200">
      <div class="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <h4 class="text-xl font-bold px-6 py-4 text-gray-900">{props.title}</h4>
      </div>
      <div class="overflow-hidden">
        {props.images.map((image) => (
          <img
            src={image}
            alt={props.title}
            class="w-full h-auto group-hover:scale-105 transition-transform duration-300"
          />
        ))}
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
