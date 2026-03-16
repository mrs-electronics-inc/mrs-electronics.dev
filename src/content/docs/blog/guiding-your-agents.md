---
title: Guiding Your Agents
date: 2026-03-16
authors:
  name: Addison Emig
  title: Lead Software Engineer
  picture: https://avatars.githubusercontent.com/u/17209828?s=200
---

`AGENTS.md` files are a great way to persist long-term "memory" for your coding agents. However, it's easy for them to become bloated and/or outdated. A [recent study](https://arxiv.org/abs/2602.11988) has shown this is actually worse than having no `AGENTS.md` at all.

## Best Practices

### Avoid Summarizing the Codebase

There is no need to list your tech stack, file structure, or list of [`just`](/blog/just-is-just-great) recipes in your `AGENTS.md`. This is redundant and can be harmful to your agents' effectiveness when this information becomes outdated. Modern coding agents can quickly figure out the essential details of your codebase for themselves. If you put these details in your `AGENTS.md` file, you are wasting context space and putting yourself at a high risk of documentation rot - when you update your tech stack or file structure, will you remember to also update `AGENTS.md`?

### Focus on Guidelines

In our experience, the best usage of `AGENTS.md` is for recording guidelines that help your coding agents stay on the right path. Think of it as building some guardrails for your agents. When your agents make mistakes, be sure to update the guidelines to help point them in the right direction for future work.

#### Three-tier System

We've found that the following [three-tier system](https://addyosmani.com/blog/good-spec/#:~:text=Use%20three%2Dtier%20boundaries) works well for organizing agent guidelines:

- Always Do (no asking)
  - A list of things the agent is allowed to do (and **must do**) without asking.
- Ask First (pause for approval)
  - A list of things the agent should pause and ask for permission for.
- Never Do (hard stop)
  - A list of things the agent **should never** do.

### Long Term Memory

Sometimes you need to record facts that don't fit well into the three-tier guidelines system. For these, it works well to add a **Long Term Memory** section to your `AGENTS.md`. Be careful to prune this list frequently. Often your agent will want to add items here that provide no value for future situations.

### Use Skills Wherever Possible

It's easy for your `AGENTS.md` to become polluted with information related to specific workflows or tasks (for example, running automated tests or accessing GitLab issues). [Agent Skills](https://agentskills.io) are a much better fit for this. Whenever possible, move non-essential information from `AGENTS.md` to your skill files.

## Summary

In general, be very strict about what is in your `AGENTS.md` file. It takes up valuable context space and biases every coding agent session. Be sure that your guidelines provide positive benefits with useful guardrails rather than redundant or outdated documentation.
