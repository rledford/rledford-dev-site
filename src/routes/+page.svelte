<script lang="ts">
  import { identity, socialLinks, agenticSkills, skills, timeline, projects, focus, specializations, hobbies, sections } from '#lib/content.ts';
  import TerminalNav from '#lib/components/TerminalNav.svelte';
  import TerminalPanel from '#lib/components/TerminalPanel.svelte';
  import Identity from '#lib/components/Identity.svelte';
  import GroupedList from '#lib/components/GroupedList.svelte';
  import Timeline from '#lib/components/Timeline.svelte';
  import ProjectCard from '#lib/components/ProjectCard.svelte';
</script>

<svelte:head>
  <title>{identity.name} | {identity.role}</title>
  <meta name="description" content={`${identity.name}. ${identity.role}. ${identity.motto}.`} />
</svelte:head>

<a href="#main" class="skip-link">Skip to content</a>
<div class="site-shell">
  <TerminalNav {sections} />
  <main id="main" tabindex="-1">
    <Identity {identity} {socialLinks} />
    <TerminalPanel id="agentic-engineering" title="Agentic Engineering"><GroupedList groups={agenticSkills} /></TerminalPanel>
    <TerminalPanel id="skills" title="Software Engineering"><GroupedList groups={skills} compact /></TerminalPanel>
    <TerminalPanel id="timeline" title="Timeline"><Timeline entries={timeline} /></TerminalPanel>
    <TerminalPanel id="projects" title="Professional Projects">
      <div class="projects">{#each projects as project}<ProjectCard {project} />{/each}</div>
    </TerminalPanel>
    <TerminalPanel id="focus" title="Focus"><GroupedList groups={focus} /></TerminalPanel>
    <TerminalPanel id="specializations" title="Product Specializations"><GroupedList groups={specializations} /></TerminalPanel>
    <TerminalPanel id="hobbies" title="Hobbies & Interests"><GroupedList groups={hobbies} /></TerminalPanel>
  </main>
  <footer class="site-footer"><a href="#identity"><span class="prompt" aria-hidden="true">&gt;_</span> {identity.name}</a><a class="back-top" href="#identity">[ back to top ]</a></footer>
</div>
