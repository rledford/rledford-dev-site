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
      class="inline-block ml-2 first:ml-0"
      aria-label={props.label}
    >
      <i class={`${props.icon} fa-2x text-gray-800`}></i>
    </a>
  );
};

export default SocialLink;
