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
  const headerClasses = () =>
    props.headerClass ||
    'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border-b border-gray-200';
  const borderClasses = () => props.borderClass || 'border-gray-200';

  return (
    <div
      class={`bg-white border ${borderClasses()} rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1 backdrop-blur-sm`}
    >
      <div class={`${headerClasses()} px-6 py-4 font-bold text-lg`}>
        {props.title}
      </div>

      {props.images &&
        props.images.map((image) => (
          <div class="overflow-hidden">
            <img
              src={image}
              alt={props.title}
              class="w-full h-auto group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}

      <div class="p-6">
        {props.subtitle && (
          <h6 class="text-gray-600 mb-3 font-medium text-base">
            {props.subtitle}
          </h6>
        )}
        {typeof props.content === 'string' ? (
          <p class="text-gray-700 leading-relaxed">{props.content}</p>
        ) : (
          props.content
        )}
      </div>

      {props.footer && (
        <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200">
          <div class="text-gray-600 text-sm">{props.footer}</div>
        </div>
      )}
    </div>
  );
};

export default Card;
