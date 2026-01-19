---
title: 2025 in Review
date: 2026-01-19
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

In 2025, we made great progress in standardizing our project management practices. We have developed a set of best practices through trial-and-error across different projects the past few years, but they had only been shared through ad-hoc communication between engineers. It was time to document the best practices and apply them consistently, so every active project could benefit from a more efficient workflow. This improved our workflow on existing projects and made it much easier to get started with new projects. Before, there was uncertainty on how to configure each setting for a new project, leading to decision fatigue and wasted time. Now we have a pre-set package of settings we have discussed, tested, and know work well for us, allowing us to configure a new repo within minutes.

Of course, every project has its own unique constraints, requirements, and team. We don't have a rigid system that we treat as law. Instead, we have developed a set of general project management best practices including things like: how to label issues, how to merge changes, how to handle branching, and how to handle deployments.

To make getting a new repository off the ground very easy, we created internal checklists for both GitLab and GitHub. These cover things like: branch protection rules, repository settings that we change from the defaults, and setting up integrations like the [code review bot](https://github.com/mrs-electronics-inc/bots/blob/main/docs/code-review-bot-setup.md). We also created a couple helpful repository templates for our GitHub projects. One focused on docs repositories - [docs-template](https://github.com/mrs-electronics-inc/docs-template), and one for any new open source repository - [basic-template](https://github.com/mrs-electronics-inc/basic-template).

We open sourced the [issue-bot](https://github.com/mrs-electronics-inc/bots/tree/main?tab=readme-ov-file#issue-management-), our internal tool for helping us manage issues by reminding us of things like missing labels or incorrectly formatted issue titles. Currently, it only is available for GitLab, but in the future we would like to add support for GitHub. We are also interested in adding support for [GitLab Statuses](https://docs.gitlab.com/user/work_items/status/) (replacing our current practice of using scoped status labels) and finding interesting use cases for [GitLab Custom Fields](https://docs.gitlab.com/user/work_items/custom_fields/).

Going forward, I'm excited to experiment with using the [Specture System](https://github.com/specture-system/specture) for some of our projects. Specture is based on some basic strategies I've found to work well with AI agents after some experimentation in the past few months. The basic idea is a spec-driven approach, where designs are documented in the git repo in simple markdown files, rather than scattered across GitLab or GitHub issue descriptions and comments. It seems like it will work best for projects with very small teams and a lot of AI agent usage, which is a good match for many of our projects.

### Documentation

Another area of focus for us in standardization was in raising the bar with our documentation practices. We embraced the [Astro](https://astro.build) framework early on. We found it to be a great way to write documentation in Markdown and quickly deploy a static site.

Our current strategy is to have a `docs` directory in each new software project's repository for storing the Astro docs for that project. We've found that it works really well to have the documentation for a project in the same repository as the code. The goal is that every time a pull request includes an important update or new feature, that same pull request would include the corresponding documentation update.

We also created GitHub repositories dedicated to documentation for several of our hardware products (for example, [neuraplex.dev](https://neuralplex.dev) and [mconn.mrs-electronics.dev](https://mconn.mrs-electronics.dev)). Our [docs-template](https://github.com/mrs-electronics-inc/docs-template) repo serves as the starting point for these repositories.

We deployed [mrs-electronics.dev](https://mrs-electronics.dev) as the home for our public-facing developer content. We use subdomains for the docs of our different projects, for example: [qt.mrs-electronics.dev](https://qt.mrs-electronics.dev) and [mconn.mrs-electronics.dev](https://mconn.mrs-electronics.dev).

In 2025, we made a lot of good progress in standardizing and establishing our documentation practices within the software development team. However, we still have a lot of work to do. Establishing documentation is one thing, but keeping it up to date is another. We also hope to share some of the things we've learned about writing and deploying good documentation with others at MRS outside our team.

## Automated Tooling

_shortens feedback loops, so developers move faster with confidence_

From the start, we saw the need to scale our team's capabilities. Automated tooling is a powerful tool for leverage. We can automate the tedious and time-consuming tasks so we can focus on creative and high-impact work.

The following three sections cover three different feedback loops commonly encountered in software development: integration, local development, and implementation. We've found interesting ways to apply automated tooling in all three loops to shorten the cycle for each.

### Integration

It's important to reduce the feedback loop for the integration cycle. You can have developers producing all kinds of great code, but if you don't have a good system for reviewing and merging new code quickly and efficiently things will quickly get backed up.

Early in the year, we did some team training on Docker and containerization. This discussion led to much more widespread usage of Docker containers and CI/CD pipelines across our projects. Our CI/CD pipelines protect us from all kinds of mistakes. We run linters, formatting checks, and automated test suites on every commit to most of our active projects.

Another place that CI/CD can have a big impact in is deployment processes. Our web projects and docs sites have automated pipelines for every commit to `main`, and we have pipelines that automate the time-consuming process of building APK and AAB files for each new release in our Android projects.

We also started work on our [Code Review Bot](https://github.com/mrs-electronics-inc/bots?tab=readme-ov-file#code-review-). This runs on each new pull request for most of our projects. It allows us to shorten the code review feedback loop - a human review might not be available for several hours or days, but the code review bot can give basic feedback within a few minutes. It's not perfect, and we have a lot of ideas for how to improve it in 2026, but it caught many silly mistakes for us in 2025.

### Local Development

High quality tooling for local development is essential for rapid iteration. We don't want to have to rely on manual human checks for all our work. It is much quicker to have automated tooling that can check our work before each commit and push.

One essential piece that we've begun introducing to all our projects is [just](https://github.com/casey/just). It allows us to have a self-documenting place for configuring all the common commands for a project. This is very useful for enabling new developers to get started quickly with a project - they list the just recipes and find what they need.

Most of our projects have a `lint` recipe and `format` recipe in their `justfile`. These basic tools are essential for developing consistent code as a team. There is no reason to argue about code formatting - just use what your formatter produces.

It is also very convenient if developers don't have to remember to run the linter and formatter themselves. We have found the [pre-commit framework](https://pre-commit.com) invaluable for configuring Git hooks. It can run the linter and formatter on staged files for every new commit, and also check for things like trailing whitespace and unwanted large files.

As a learning experiment, we started using Go for a few projects ([time-tracker](https://github.com/mrs-electronics-inc/time-tracker/) and [mrs-sdk-manager](https://github.com/mrs-electronics-inc/mrs-sdk-qt/tree/main/tools/mrs-sdk-manager) being two notable examples). We found the superb built-in tooling to be a breath of fresh air compared to what we are used to in older languages like C++ or Python. Go has a built-in formatter, testing framework, and package manager, which makes it very easy for an inexperienced developer to get started with new projects without getting bogged down in a complicated ecosystem.

### Implementation

And now we get to the inner loop of software development. How do you take an idea from your brain to code? The past year or two has seen the rise of a brand-new way to convert ideas to code much faster - LLM-powered coding agents.

We've found coding agents to be helpful in many ways. They allow us to quickly prototype new ideas and explore new possibilities. Tedious refactors and writing boilerplate or glue code takes much less time. They also can be a great help in debugging tricky errors.

A great side benefit of embracing coding agents is that they thrive off of many of the same things as human developers - high quality documents, standardized development tooling, and good test coverage. When we invest in these things to help reduce the number of mistakes our agents make, we also make life better for ourselves. There is no excuse to have poor test coverage when a coding agent can quickly write you a bunch of test cases.

We tried out several different coding agents, adapting as new and better tools hit the market. Our first experiments were with [Aider](https://aider.chat). It was a great introduction to having an agent with direct access to your local filesystem, but it was a bit tedious to have to manually introduce each new file to the agent. [OpenCode](https://opencode.ai) was our next tool of choice. It is a great open source TUI for coding with LLMs. Tools like grep and bash commands really streamline the experience as compared to Aider. [Amp](https://ampcode.com) is our current favorite. It likes to go through tokens quickly, but their [ad-supported free mode](https://ampcode.com/manual#free) allows a generous $10 of access per day. The main drawback is that it is proprietary and relies on their cloud servers, but it provides nice extras like shareable threads and workspaces. The main reason we like it is that it just seems to **work**. Amp seems to take the least amount of trial and error to get decent results.

[OpenRouter](https://openrouter.ai) was invaluable throughout the year. It provides an easy and effective way to access any model we want, based on the needs at hand. We used it for Aider, OpenCode, and our Code Review Bot. I like to think of the overall integration of LLMs through OpenRouter and coding agents like Aider or OpenCode as similar to a brain and a body. We can switch out the brain (the model requested from OpenRouter) based on what we need for the current task - a more expensive model like Claude Sonnet for a more challenging problem, and a cheaper model like Gemini Flash for simpler tasks. We can also switch out the body (the coding agent/LLM interface) as required - maybe OpenCode for implementing a new feature, and our Code Review Bot for reviewing the code.

It has been interesting to see how our coding habits adjust as we acclimate to using code agents regularly, and I'm sure we will continue to see lots of big improvements in the space in 2026, which will require further adjustments. One thing we have found very useful is to have a good `AGENTS.md` file in each repository. This is a good place to store LLM "memories". After the coding agent makes a mistake, have it record the correct method of doing things in `AGENTS.md`. Most tools, including OpenCode and Amp, will automatically load `AGENTS.md` and this helps tune your agents in the correct way to operate on your projects.

## Open Source

_a shared place for fixes and features_

In 2025, we made our first steps into publishing open source software. Our open source projects provide us with a variety of benefits, including being a better way to distribute common shared code, and a good creative outlet for our developers.

### Customer SDKs

Our biggest and most ambitious open source project so far is the [MRS Qt SDK](https://qt.mrs-electronics.dev). We envision this to be the first of many SDKs, each focused on a different language and/or framework. The Qt SDK is targeted at the immediate need of our developers and our customers to have a solid foundation for new Qt applications for our embedded Linux hardware.

Our previous solution for shared code across different Qt projects was copy-and-paste between various repositories. This was far from ideal. Bug fixes and features would get introduced in one repository and never make it to other repositories. A centralized SDK should give us a single source of truth for Qt code optimized for working with our hardware. We can have a central place for applying bug fixes and new features, and then developers both internal and external can pull those improvements into their applications. It is a great way to reduce duplicate code across projects, and our improvements can have a larger impact as they multiply across projects.

### Developer Tools

We also started work on several helpful open source tools for improving our efficiency in our day-to-day work.

[`time-tracker`](https://github.com/mrs-electronics-inc/time-tracker) is a simple app written in Go that provides both a CLI and TUI for quickly recording time entries. This is very useful for tracking the time we spend across all our different projects. We hope to introduce a web interface soon, which should make the app accessible from even more places.

[`bots`](https://github.com/mrs-electronics-inc/bots) is a collection of CI/CD tooling that we use across many of our projects. It currently consists of an Issue Management Bot and a Code Review Bot, and we plan to add more bots in the future to automate other parts of our software development process. Like the Qt SDK, the `bots` codebase is based on code that we had developed and copied-and-pasted across several projects. Having it put together in a central place with automatically built Docker images makes it much easier to maintain and distribute across projects. The bots are a great way to reduce time spent on tedious or time-consuming project management tasks, allowing our team to focus on high-impact work.

## Conclusion

2025 was a year of big adjustments. We bore the grief of departing team members and faced uncertain prospects. We had to find creative ways to leverage the time and effort of our team to make an outsized impact. Standardization, automation, and shared open source codebases all helped to improve the effectiveness of our team, reduce inconsistencies between our projects, and shorten feedback loops. It was an exciting year of growth, and we look forward to finding more ways to continually improve our work in 2026!
