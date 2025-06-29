import type { Component, JSX } from 'solid-js';

interface CardProps {
  title: string;
  subtitle?: string;
  content: string | JSX.Element;
  footer?: string;
  headerClass?: string;
  borderClass?: string;
  images?: string[];
}

const Card: Component<CardProps> = (props) => {
  const headerClasses = () => props.headerClass || 'bg-gray-100 text-gray-800';
  const borderClasses = () => props.borderClass || 'border-gray-300';

  return (
    <div
      class={`bg-white border-2 ${borderClasses()} rounded-lg shadow overflow-hidden`}
    >
      <div class={`${headerClasses()} px-4 py-2 font-bold`}>{props.title}</div>

      {props.images &&
        props.images.map((image) => (
          <img src={image} alt={props.title} class="w-full h-auto" />
        ))}

      <div class="p-4">
        {props.subtitle && <h6 class="text-gray-600 mb-2">{props.subtitle}</h6>}
        {typeof props.content === 'string' ? (
          <p class="text-gray-700">{props.content}</p>
        ) : (
          props.content
        )}
      </div>

      {props.footer && (
        <div class="bg-gray-100 px-4 py-3">
          <div class="text-gray-600">{props.footer}</div>
        </div>
      )}
    </div>
  );
};

export default Card;
