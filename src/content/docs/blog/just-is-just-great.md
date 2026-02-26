---
title: Just Is Just Great
date: 2026-02-27
authors:
  name: Addison Emig
  title: Lead Software Engineer
  picture: https://avatars.githubusercontent.com/u/17209828?s=200
---

## The problem

[Problem/friction across projects]

## Why `just` Is Great

[Self-documenting commands, faster onboarding, consistency]

### Our Core Recipes

[mention the core recipes we have across all projects, along with common recipes we have across many projects]

### A Quick Example

Here is a minimal example that demonstrates all of our core recipes, along with a `dev` recipe. This is actually the current `justfile` we use for our `docs-template` repository.

TODO: add links to `docs-template` repo and it's justfile.

```just
# List available recipes
default:
    @just --list

# Install dependencies
deps:
    npm i

# Set up development environment
setup: deps
    pre-commit install

# Run in development environment
dev:
    npm run dev
```

## Why We’re Adding A `justfile` To Each Of Our Active Projects

[Team standardization decision + expected benefits]

:::note
Why not just use `npm run`?

`npm run` works great for JavaScript or TypeScript projects, but not all our projects use these languages. We prefer `just` because it is language-agnostic. Our developers can build the muscle memory of `just setup` to set up their dev environment and then `just` to list available recipes. Just is great because it can provide value in projects of just about any programming language and build system.
:::
