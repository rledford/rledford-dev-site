import type { Component, JSX } from 'solid-js';

interface ProjectCardProps {
  title: string;
  images: string[];
  children: JSX.Element;
  year: string;
}

const ProjectCard: Component<ProjectCardProps> = (props) => {
  return (
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <h4 class="text-xl font-bold bg-gray-100 px-6 py-4">{props.title}</h4>
      {props.images.map((image) => (
        <img src={image} alt={props.title} class="w-full h-auto" />
      ))}
      <div class="p-6">{props.children}</div>
      <div class="bg-gray-100 px-6 py-3">
        <div class="text-gray-600">{props.year}</div>
      </div>
    </div>
  );
};

export default ProjectCard;
