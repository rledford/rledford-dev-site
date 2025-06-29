import SocialLink from './SocialLink.tsx';

export default function Header() {
  return (
    <div class="flex flex-col md:flex-row md:justify-between md:items-start py-8">
      <div class="mb-6 md:mb-0">
        <small class="text-gray-500 font-medium tracking-wide uppercase text-xs">
          Knowledge | Persistence | Discipline
        </small>
        <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mt-2 leading-tight">
          Ryan Ledford
        </h1>
      </div>
      <div class="md:text-right">
        <small class="text-red-500 block mb-4 font-medium tracking-wide uppercase text-xs">
          Full Stack | Solutions | Engineer
        </small>
        <div class="flex gap-4 justify-center md:justify-end">
          <SocialLink
            href="https://github.com/rledford"
            icon="fab fa-github"
            label="GitHub Profile"
          />
          <SocialLink
            href="https://www.npmjs.com/~rledford"
            icon="fab fa-npm"
            label="NPM Profile"
          />
          <SocialLink
            href="https://www.linkedin.com/in/ryan-ledford-356944124/"
            icon="fab fa-linkedin"
            label="LinkedIn Profile"
          />
        </div>
      </div>
    </div>
  );
}
