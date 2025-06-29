import type { Component } from 'solid-js';

interface SocialLinkProps {
  href: string;
  icon: string;
  label?: string;
}

const SocialLink: Component<SocialLinkProps> = (props) => {
  return (
    <a
      target="_blank"
      href={props.href}
      class="inline-flex items-center justify-center w-12 h-12 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 group"
      aria-label={props.label}
    >
      <i
        class={`${props.icon} text-xl text-gray-600 group-hover:text-blue-600 transition-colors duration-300`}
      ></i>
    </a>
  );
};

export default SocialLink;
