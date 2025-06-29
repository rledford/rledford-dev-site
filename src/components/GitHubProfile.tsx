import { createSignal, onMount, type Component } from 'solid-js';
import ProfileTable from './ProfileTable.tsx';

interface GitHubData {
  avatar_url: string;
  public_repos: number;
  public_gists: number;
  created_at: string;
}

const GitHubProfile: Component = () => {
  const [githubData, setGithubData] = createSignal<GitHubData | null>(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);

  onMount(async () => {
    try {
      const response = await fetch('https://api.github.com/users/rledford');
      if (!response.ok) {
        throw new Error('Failed to fetch GitHub profile');
      }
      const data = await response.json();
      setGithubData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Failed to fetch GitHub profile:', err);
    } finally {
      setLoading(false);
    }
  });

  const tableRows = () => {
    const data = githubData();
    if (!data) return [];

    return [
      { label: 'Repos', value: data.public_repos.toString() },
      { label: 'Gists', value: data.public_gists.toString() },
      {
        label: 'Joined',
        value: new Date(data.created_at).getFullYear().toString(),
      },
    ];
  };

  return (
    <div class="flex justify-center">
      <div class="w-3/4">
        <div class="card mx-auto rounded-full overflow-hidden bg-white">
          {loading() ? (
            <div class="w-full h-48 bg-gray-200 rounded-full flex items-center justify-center">
              <span class="text-gray-500">Loading...</span>
            </div>
          ) : error() ? (
            <div class="w-full h-48 bg-gray-200 rounded-full flex items-center justify-center">
              <span class="text-red-500">Error loading avatar</span>
            </div>
          ) : (
            <img
              src={githubData()?.avatar_url}
              alt="GitHub Avatar"
              class="w-full h-full object-cover rounded-full"
            />
          )}
        </div>
        <div class="card-body mt-4">
          <h3 class="text-xl font-bold text-center mb-4">
            <a
              href="https://github.com/rledford"
              target="_blank"
              class="text-black underline"
            >
              @rledford
            </a>
          </h3>
          {loading() ? (
            <div class="text-center">Loading profile data...</div>
          ) : error() ? (
            <div class="text-center text-red-500">
              Error loading profile data
            </div>
          ) : (
            <ProfileTable rows={tableRows()} />
          )}
        </div>
      </div>
    </div>
  );
};

export default GitHubProfile;
