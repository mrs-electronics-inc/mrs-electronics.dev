---
title: Just Is Just Great
date: 2026-02-27
authors:
  name: Addison Emig
  title: Lead Software Engineer
  picture: https://avatars.githubusercontent.com/u/17209828?s=200
---

## The Problem

We work on software projects across a variety of programming languages and build systems. Some of them provide an easy way to run development scripts (for example, `npm run`), and others do not.

Another problem with development scripts is documenting them. For every project, developers need to know:

- how to install dependencies
- how to run the software on their machine
- how to run the automated test suite

It's easy to write this documentation once and then forget to update it as your project grows.

We needed a system that we can use on any project, no matter the language or build system. Something that would keep the development commands and related documentation in sync.

## Why `just` is great

[`just`](https://just.systems) is just great because it solves several problems at once while keeping things simple. You only need one simple file and one simple command. `just` is a command runner that reads all your common project commands (called `recipes`) from a single file. You can also add explanation comments above each recipe and `just` will automatically include them in the help output.

:::note[Why not just use npm run?]

`npm run` works great for JavaScript or TypeScript projects, but not all our projects use these languages. We prefer `just` because it is language-agnostic - it can provide value in projects of just about any programming language and build system.
:::

### Our core recipes

For any of our active projects, a new developer can run `just` to get a list of the available recipes. Our core set of recipes includes:

- `default` - to list recipes
- `deps` - to install dependencies
- `setup` - to run all required commands to set up a local development environment

`just` automatically runs the first recipe of your file if you run `just` without any arguments. We take advantage of this by always putting the `default` recipe at the top, and have it list the available recipes with `just --list`.

Many of our projects also have a `test` recipe for running the automated test suite. You'll also often see at least one of `dev`, `up`, `run-mobile`, or `run-docs` for running the given project in the local development environment.
We use `lint` and `format` recipes to trigger the correct linter and formatter for the project's programming language.

### A quick example

Here is a minimal example that demonstrates all of our core recipes, along with a `dev` recipe. This is actually the current [`justfile`](https://github.com/mrs-electronics-inc/docs-template/blob/main/justfile) from our [`docs-template`](https://github.com/mrs-electronics-inc/docs-template) repository.

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

The comments above each recipe are automatically included in the output of `just --list`:

```bash
Available recipes:
    default # List available recipes
    deps    # Install dependencies
    dev     # Run in development environment
    setup   # Set up development environment
```

## Why we’re adding a `justfile` to each of our active projects

Having a `justfile` in every active project means that new developers can get started quickly in a project they've never worked in before. The "muscle memory" of `just` to list available recipes and `just setup` to set up the local environment makes things very convenient.

We can onboard developers to projects quicker, and we can spend more time focused on writing code rather than internal developer documentation.
