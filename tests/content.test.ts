import { describe, expect, it } from 'vitest';
import baseline from './fixtures/content.json';
import {
  agenticSkills,
  focus,
  hobbies,
  identity,
  projects,
  sections,
  skills,
  socialLinks,
  specializations,
  timeline,
  type TextPart,
} from '../src/lib/content';

const normalizeWhitespace = (text: string) => text.replace(/\s+/g, ' ').trim();

function projectParagraphs(paragraphs: TextPart[][]) {
  return paragraphs.map((parts) => ({
    text: normalizeWhitespace(parts.map((part) => part.text).join('')),
    emphasis: parts.filter((part) => part.strong).map((part) => normalizeWhitespace(part.text)),
  }));
}

describe('original portfolio content', () => {
  it('preserves identity and the association of social labels with destinations', () => {
    expect({ identity, socialLinks }).toEqual({
      identity: { ...baseline.identity, image: '/images/profile-picture.png' },
      socialLinks: baseline.socialLinks,
    });
  });

  it.each([
    ['focus', focus, baseline.focus],
    ['specializations', specializations, baseline.specializations],
    ['hobbies', hobbies, baseline.hobbies],
    ['timeline', timeline, baseline.timeline],
  ])('preserves all original %s content and ordering', (_name, actual, original) => {
    expect(actual.filter((entry) => original.some((item) => item.title === entry.title))).toEqual(original);
  });

  it('separates confirmed agentic capabilities and tools from retained software engineering skills', () => {
    expect({ agenticSkills, skills }).toEqual({
      agenticSkills: [
        {
          title: 'Capabilities',
          items: [
            'Workflow Automation',
            'Agent Skills Development',
            'Context Engineering',
            'Multi-Agent Orchestration',
            'Tool Design & Integration',
            'MCP Server Development',
            'Harness Engineering',
            'Evaluations',
          ],
        },
        { title: 'Frameworks & Tools', items: ['LangChain', 'Langfuse'] },
      ],
      skills: baseline.skills.filter((group) => group.title !== 'Operating Systems'),
    });
  });

  it('preserves project descriptions, emphasis, years, screenshot associations, and ordering', () => {
    expect(projects.map((project) => ({
      title: project.title,
      year: project.year,
      images: project.images,
      paragraphs: projectParagraphs(project.paragraphs),
    }))).toEqual(baseline.projects.map((project) => ({
      title: project.title,
      year: project.year,
      images: project.images,
      paragraphs: projectParagraphs(project.paragraphs),
    })));
  });

  it('preserves section titles and ordering with unique navigation destinations', () => {
    expect({
      titles: sections.map((section) => section.title),
      uniqueDestinations: new Set(sections.map((section) => section.id)).size,
    }).toEqual({
      titles: ['Agentic Engineering', 'Software Engineering', ...baseline.sectionTitles.slice(1)],
      uniqueDestinations: 7,
    });
  });
});
