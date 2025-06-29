import SocialLink from './SocialLink.tsx';

export default function Header() {
  return (
    <div class="flex flex-col md:flex-row md:justify-between md:items-start">
      <div class="mb-4 md:mb-0">
        <small class="text-gray-500">
          Knowledge | Persistence | Discipline
        </small>
        <h1 class="text-4xl font-bold">Ryan Ledford</h1>
      </div>
      <div class="md:text-right">
        <small class="text-red-500 block mb-2">
          Full Stack | Solutions | Engineer
        </small>
        <div class="text-center md:text-right">
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
