---
title: Lessons from 2025
date: 2026-01-05
authors:
  name: Addison Emig
  title: Lead Software Engineer
  picture: https://avatars.githubusercontent.com/u/17209828?s=200
---

In 2024 and early 2025, we faced the departure of four well-regarded colleagues. It was a lot to absorb, and we started out 2025 with a good amount of uncertainty. There were fewer engineers per project and less review bandwidth to go around. We also lost a lot of accumulated expertise. How would we establish ourselves moving forward?

We did not want to compromise on the quality or consistency of our output, so we focused on leverage. For us, that meant using standardization and automated tooling to amplify our work. We also started an exciting open source initiative, which acted as a big morale boost.

## Standardization

_a smooth and consistent path is easier to walk than a rough and chaotic one_

Standardization was a big focus of 2025. Each project did project management differently, and there was no clarity for what to use for new projects. We also had a generally low bar for documentation across most of our projects.

### Project Management

In 2025, we made great progress in standardizing our project management practices. We have developed a set of best practices through trial-and-error across different projects the past few years, but they had only been shared through ad-hoc communication between engineers. It was time to document the best practices and apply them consistently, so every active project could benefit from a more efficient workflow. This improved our workflow on existing projects and made it much easier to get started with new projects. Before, there was uncertainity on how to configure each setting for a new project, leading to decision fatigue and wasted time. Now we have a pre-set package of settings we have discussed, tested, and know work well for us, allowing us to configure a new repo within minutes.

Of course, every project has its own unique constraints, requirements, and team. We don't have a rigid system that we treat as law. Instead, we have developed a set of general project management best practices including things like: how to label issues, how to merge changes, how to handle branching, and how to handle deployments.

To make getting a new repository off the ground very easy, we created internal check lists for both GitLab and GitHub. These cover things like: branch protection rules, repository settings that we change from the defaults, and setting up integrations like the [code review bot](https://github.com/mrs-electronics-inc/bots/blob/main/docs/code-review-bot-setup.md). We also created a couple helpful repository templates for our GitHub projects. One focused on docs repositories - [docs-template](https://github.com/mrs-electronics-inc/docs-template), and one for any new open source repository - [basic-template](https://github.com/mrs-electronics-inc/basic-template).

We open sourced the [issue-bot](https://github.com/mrs-electronics-inc/bots/tree/main?tab=readme-ov-file#issue-management-), our internal tool for helping us manage issues by reminding us of things like missing labels or incorrectly formatted issue titles. Currently, it only is available for GitLab, but in the future we would like to add support for GitHub. We are also interested in adding support for [GitLab Statuses](https://docs.gitlab.com/user/work_items/status/) (replacing our current practice of using scoped status labels) and finding interesting use cases for [GitLab Custom Fields](https://docs.gitlab.com/user/work_items/custom_fields/).

Going forward, I'm excited to experiment with using the [Specture System](https://github.com/specture-system/specture) for some of our projects. Specture is based on some basic strategies I've found to work well with AI agents after some experimentation in the past few months. The basic idea is a spec-driven approach, where designs are documented in the git repo in simple markdown files, rather than scattered across GitLab or GitHub issue descriptions and comments. It seems like it will work best for projects with very small teams and a lot of AI agent usage, which is a good match for many of our projects.

### Documentation

<!-- TODO -->

- Mention embracing Astro framework
- Mention new site mrs-electronics.dev
- Mention project doc site and docs template - https://github.com/mrs-electronics-inc/docs-template

## Automated Tooling

_shortens feedback loops, so developers move faster with confidence_

From the start, we saw the need to create some sort of force multiplier (TODO: USE BETTER WORDING) for our team. Automated tooling is a powerful tool for leverage.

<!-- TODO: flesh out introduction -->

### Integration

<!-- TODO -->

- CI/CD: team dove into Docker and containerization at the beginning of the year
- CI/CD: running automated tests on merge/pull requests for active projects
- CI/CD: building APKs for mobile app releases
- Code review bot: fast feedback on simple mistakes (e.g., misconfigured CI/CD yaml)

### Local Development

<!-- TODO -->

- Just files
- Linters
- Formatters
- Go lang is great because it has great automated tooling built in

### Implementation

<!-- TODO -->

- AI agents: faster way to type code - take ideas from brain to code FASTER
- Mention openrouter.ai - INCLUDE LINK
- Mention initial experiments with aider.chat - INCLUDE LINK
- Mention opencode.ai - INCLUDE LINK
- Mention ampcode.com - INCLUDE LINK
- Mention into new habit of adding AGENTS.md to most projects
  - useful place to store llm "memorires" after they make mistakes

## Open Source

_a shared place for fixes and features_

<!-- TODO: add introduction - mention morale boost first mentioned in the intro -->

### Customer SDKs

<!-- TODO -->

- Customer SDKs: shared code customers can pull from (and maybe contribute to)
- Customer SDKs: central place for bug fixes and new features

### Developer Tools

<!-- TODO -->

- Developer tools: creative outlet for helper apps (e.g., time-tracker - INCLUDE LINK)
- Developer tools: CI/CD tooling and bots that improve developer quality of life - INCLUDE LINK to bots repo

## Conclusion

<!-- TODO: Write closing paragraph -->

Something to wrap it all up.
