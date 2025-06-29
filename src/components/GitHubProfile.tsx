import { createSignal, onMount, type Component } from 'solid-js';
import ProfileTable from './ProfileTable.tsx';

interface GitHubData {
  public_repos: number;
  public_gists: number;
  created_at: string;
  avatar_url: string;
  name: string;
  login: string;
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

  const SkeletonTable = () => (
    <div class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <table class="w-full text-sm">
        <tbody>
          <tr class="border-b border-gray-100">
            <td class="py-3 px-4 font-medium text-gray-700">Repos</td>
            <td class="py-3 px-4 text-center">
              <div class="h-4 bg-gray-200 rounded animate-pulse mx-auto w-8"></div>
            </td>
          </tr>
          <tr class="border-b border-gray-100">
            <td class="py-3 px-4 font-medium text-gray-700">Gists</td>
            <td class="py-3 px-4 text-center">
              <div class="h-4 bg-gray-200 rounded animate-pulse mx-auto w-8"></div>
            </td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-medium text-gray-700">Joined</td>
            <td class="py-3 px-4 text-center">
              <div class="h-4 bg-gray-200 rounded animate-pulse mx-auto w-12"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div class="flex justify-center">
      <div class="w-full max-w-sm">
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
          <div class="relative card mx-auto rounded-full overflow-hidden bg-white aspect-square shadow-xl">
            {loading() ? (
              <div class="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-pulse rounded-full flex items-center justify-center relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite] bg-[length:200%_100%]"></div>
                <span class="text-gray-500 relative z-10 font-medium">
                  Loading...
                </span>
              </div>
            ) : error() ? (
              <div class="w-full h-full bg-gray-200 rounded-full flex items-center justify-center aspect-square">
                <span class="text-red-500 font-medium">
                  Error loading avatar
                </span>
              </div>
            ) : (
              <img
                src={githubData()?.avatar_url || '/images/github-avatar.jpg'}
                alt="GitHub Avatar"
                class="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
              />
            )}
          </div>
        </div>
        <div class="card-body mt-6">
          <h3 class="text-xl font-bold text-center mb-6">
            <a
              href="https://github.com/rledford"
              target="_blank"
              class="text-gray-900 hover:text-blue-600 transition-colors duration-200 flex items-center justify-center gap-2 group"
            >
              <i class="fab fa-github text-gray-600 group-hover:text-blue-600 transition-colors duration-200"></i>
              @{githubData()?.login || 'rledford'}
            </a>
          </h3>
          {loading() ? (
            <SkeletonTable />
          ) : error() ? (
            <div class="text-center text-red-500 bg-red-50 rounded-lg border border-red-200 p-4">
              <i class="fas fa-exclamation-triangle mb-2"></i>
              <div>Error loading profile data</div>
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
