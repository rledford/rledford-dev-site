<script lang="ts">
  import type { Identity, SocialLink } from '#lib/content.ts';

  let { identity, socialLinks }: { identity: Identity; socialLinks: SocialLink[] } = $props();
</script>

<section id="identity" class="identity" aria-labelledby="identity-heading">
  <div class="identity-copy">
    <p class="command-line"><span class="prompt" aria-hidden="true">❯</span> cat identity.md</p>
    <p class="identity-motto">{identity.motto}</p>
    <h1 id="identity-heading">{identity.name}</h1>
    <p class="identity-role">{identity.role}</p>
    <div class="identity-rule" aria-hidden="true"><span></span></div>
    <div class="social-links" aria-label="Social profiles">
      {#each socialLinks as link}
        <a href={link.href} target="_blank" rel="noreferrer"><span aria-hidden="true">[</span> {link.label} <span aria-hidden="true">]</span></a>
      {/each}
    </div>
  </div>
  <figure class="portrait-frame">
    <figcaption><span class="prompt" aria-hidden="true">▧</span> {identity.image.split('/').pop()}</figcaption>
    <div class="portrait-image"><img src={identity.image} alt={identity.name} width="320" height="320" fetchpriority="high" /></div>
    <div class="portrait-caption" aria-hidden="true">~/identity <span>PNG</span></div>
  </figure>
</section>
