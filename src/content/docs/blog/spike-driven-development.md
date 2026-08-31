---
title: Spike-Driven Development
date: 2026-09-01
authors:
  name: Addison Emig
  title: Lead Software Engineer
  picture: https://avatars.githubusercontent.com/u/17209828?s=200
---

_"Spike-driven development"_ is a term I'm using for a sort of exploratory development with coding agents, in contrast to the popular (and useful) technique of "spec-driven development". It's most useful when I'm working with a new feature, technology, or technique that I'm not very familiar with. In such cases, it's not very useful to try to develop a comprehensive spec and then hand off to a coding agent. The spec would be useless, because I don't know what all decisions will come up or even how to best approach them. I'm at the entrance of a dark cave, with no map.

## Starting Out

The main focus of "spike-driven development" is exploration. You aren't going to spend a lot of time writing out long specs. It is more of a "design as you go" approach.

To start out, introduce the goal of your [spike](<https://en.wikipedia.org/wiki/Spike_(software_development)>) to your coding agent of choice. Try to keep the goal narrow and focused, [MVP-style](/blog/incremental-development/#mvp). Ask the agent to explore your existing codebase (if you have one) to anchor the new code into the existing patterns and examples.

The coding part is simple. Ask the agent to develop the spike end-to-end, from feature branch to merge request. You don't want to look at anything until the merge request is ready for your review. Don't worry about baby-sitting the agent. "Spike-driven development" is great for firing something off in the background and then switching to work on something that requires more focused attention.

## Revisions

The main focus of spike-driven development should not be the code. It should be the test-and-revise loop that you go through with your agent. Code is cheap. You can clean it up later before you merge to `main`.

Focus on testing the agent's output. Does it match your initial expectations? Did the agent develop extras you don't want? Prune those off early so you don't get bogged down. Does the output make you think of design decisions you didn't think of earlier? Good! That is the goal of spike-driven development. Quickly iterating to find the important decision points. Discuss the decisions as much as you need with your agent, weighing the different options. Then send it off to explore the path you chose. If it turns out you don't like the results of a particular decision, don't be afraid to backtrack and explore a different route!

Repeat this cycle several times until you are satisfied with the output. Don't get distracted with including every little detail you ever wanted. Try to stay focused on the core "thing", and then use follow-up sessions to revise and extend.

## Merge

Only after you are done critiquing the output should you bother looking at the code.

Hopefully at this point you have a much clearer idea of the shape and size of the metaphorical cave than you did at the beginning. The goal was to find the critical decisions that really define the problem at hand. Now that you have a clearer picture, you have several options for how to proceed with the code that was generated throughout your exploration:

1. Throw the code away and start fresh. Code is cheap. Don't feel attached to the code. Now that you have a better idea of the design decisions you want to make, you can sit down and write a clearer spec and proceed from there.
2. If the code changes are small, you can do a bit of cleanup and ship it. Oftentimes I am surprised by how little code it takes to implement a desired change.
3. If the code changes are large, split it up into a series of merge requests. There is no reason you should merge your original feature branch with thousands of lines of diffs into `main`. Work through a plan with your agent to split it up into a series of much smaller merge requests which you can review one by one. You shouldn't have to do any of the `git` wrangling yourself. Your agent already is an expert with `git`. You'll probably learn a lot reviewing the diffs of each merge request.

## Continuing On

Now that you have completed the initial spike, it should be much easier to keep going. Hopefully you have a much better idea of what you are working with, and it's not too difficult to revise and extend it over follow-up sessions, maybe using a bit of [incremental development](/blog/incremental-development).
