---
title: To the Moon
date: 2026-05-29
authors:
  name: Bennett Moore
  title: Software Engineer
  picture: https://avatars.githubusercontent.com/u/120052232?v=4
---

## Problem Backstory

Over the past year, our team here at MRS had been working on solutions to two seemingly unrelated problems.

First, some of our projects had grown from just one or two repositories in the beginning to sprawling groups of repos that posed a real challenge for **keeping project admin and management best practices in sync**. For example, when we began implementing [`pre-commit` hooks](https://pre-commit.com/index.html) as a standard part of projects, we had to copy the same code to each repo.

Sometimes we were able to resolve this with other means. For example, we had implemented an automatic issue triaging bot in many projects with some custom JS code that ran in CI. A few months ago, we took its core concepts and created our simple [custom issue bot](https://github.com/mrs-electronics-inc/bots#issue-management-), which we then imported into each project. Now, the ROI for implementing new features for that bot is much higher because they are automatically applied to all projects instead of having to be ported from repo to repo.

However, many times these sorts of DevOps centralizations take a significant amount of development, and the structure of our team prevented us from dedicating lots of resources to such initiatives. Besides, many administrative tasks, such as configuring GitLab branch rules for each repo, cannot be efficiently centralized.

Second, we began to implement AI into more areas of our development workflow, from patching small bugs to designing and implementing large features to automating code review. This exposed an issue: **AI agents frequently did not have all of the necessary context in one repo** for implementing or reviewing code because other parts of the system were in different repos.

Additionally, as you doubtless have discovered, the world of AI is moving _VERY_ quickly. Standard practices and tooling change practically every month. For example, when [`AGENTS.md`](https://agents.md) started to become standard as a tool for giving project-level context to agents, we of course wanted to add one to each project we were actively developing. However, in practice, this meant creating and curating `AGENTS.md` in each of the many repos. The same thing happened with [`opencode` skills](https://opencode.ai/docs/skills/) and then [`standard agent skills`](https://skills.sh): we wanted to add our custom-built skills to each project, but this required quite a few MRs.

## The Solution: Monorepos

Our solution to these two problems has been to migrate our polyrepo projects to [**monorepos**](https://monorepo.tools/#what-is-a-monorepo).

Frankly, this has **revolutionized** our per-repo workflows. GitLab/GitHub admin is simpler. Internal innovations are easily applied to multiple projects. The code changes for a feature that affects more than one part of the project (e.g. new password regex rules made in the frontend and backend for redundancy) can be applied simultaneously, in one MR, instead of requiring developers to create two MRs.

## The New Problem

Clearly there are benefits to the monorepo approach, but there are also some drawbacks. For example, consider how you might design the CI pipeline for a monorepo. If every project had its own CI suite when it was in its own repo, how would those be merged together? (Stay tuned for a deeper discussion on this in a later post...) If every project has its suite of common development commands, managed in a [`justfile`](/blog/just-is-just-great), how will those work together in the monorepo?

Additionally, now that we have this monorepo, how will we implement such potential advantages as build caching? If `App A` depends on `Lib A`, and `Lib A` has already been compiled, we don't want to recompile it every time we build `App A`. Speaking of which, what about dependency management? How will we define the dependency surface for `App A`? How will we _keep track_ of that dependency graph once it's been implemented?

## The Solution: `moon`

Recently, we came upon a tool called [`moon`](https://moonrepo.dev/moon) that solves all of these new problems.

`moon` is built to help teams efficiently and effectively manage monorepos. There are other tools out there for this, such as [`nx`](https://nx.dev) and [`turborepo`](https://turborepo.dev/) (which we would encourage you to try for yourself), but we chose `moon` because of its toolchain-agnostic nature and simplicity of setup. Where other tools are optimized for JS/TS-focused repos, `moon` is fully equipped to help with projects of all types. We are using it for Flutter mobile apps, embedded Qt/C++ apps and libraries, Go tools, and, yes, JS projects.

### Task Definition

The impetus for adding `moon` to our monorepo workflow first came from a need to scale our per-project `justfile`s. For example, if each project has a `deps` recipe for installing dependencies, then how do we run those efficiently? While `just` does support [invoking recipes in subdirectories](https://just.systems/man/en/invoking-justfiles-in-other-directories.html), this doesn't scale well. How do I quickly install dependencies for a bunch of projects? How do I install all dependencies for all projects without knowing the locations of every single one?

`moon` solves this problem by scoping tasks (their name for recipes) by project, the list of which is defined at the top of the monorepo.

You go from this:

```bash
just app1/deps app2/deps libs/lib1/deps libs/lib3/deps tools/deps
```

To this:

```bash
moon run :deps
```

Each project can define its own `deps` task...or you can define a common `deps` task for certain projects. If a monorepo has 6 Dart packages, all of which use the same set of static analysis tasks, you could define `.moon/tasks/dart-lib.yml` like this:

```yaml
# These tasks are inherited by Dart libraries.
inheritedBy:
  layer: library
  language: dart

tasks:
  deps:
    command: dart pub get --enforce-lockfile
  check:
    script: |
      dart fix "$projectRoot"
      dart format --output json --set-exit-if-changed "$projectRoot"
  fix:
    script: |
      dart fix --apply "$projectRoot"
      dart format "$projectRoot"
```

This completely solves the problem of duplicating tasks between lots of repos; now, those tasks are defined in _one_ place. You can run them locally, in `pre-commit` hooks, or in CI. Plus, `moon` automatically generates a project dependency graph and full list of tasks, so that you can see all the available tasks with one `moon tasks` command.

For more references:

- https://moonrepo.dev/docs/concepts/task
- https://moonrepo.dev/docs/concepts/task-inheritance
- https://moonrepo.dev/docs/config/project

### Task Caching

One of the benefits of `moon` that we weren't looking for at first but soon found to be extremely useful is its automatic task caching. When you run a task, `moon` will cache the results and output locally, hashed by the state of the project at the time of the run. Then, if you do not change any relevant files before running the task again, the cached results will be used; if relevant files did change, the task will be fully run again.

The caching behavior of `moon` is extremely configurable; you can tell it exactly what file changes should trigger a rerun, what files should be treated as build artifacts, what other tasks should be treated as dependencies to force a rerun, and so on.

This caching behavior actually has a very nice application in CI environments. The cache is stored in `.moon/cache`, which means that you can configure your CI to store that directory in the runner cache and then use it in other jobs. At MRS, we had done this on a lesser level with techniques like NPM and Go caches, but `moon` provides another level by effectively caching entire jobs and their outputs.

For more information:

- https://moonrepo.dev/docs/concepts/cache
- https://moonrepo.dev/docs/guides/ci

### "Affected" Projects and Tasks

Another great feature of `moon` is its ability to run tasks only when relevant files changed, as determined by the VCS. This concept is similar to how cache hits and misses are determined, but it has an added benefit when running a bunch of tasks at once.

By tracking which tasks have been "affected" by changed files, `moon` can avoid running a task at all if no input files have changed. You can run something like `moon run :check --affected` and it will run the `check` task for only those projects which have been modified.

This is extremely useful in monorepos for things like Git hooks and CI. For example, if every project has a `check` job defined, I can define a simple `pre-commit` hook that runs `moon run :check` to make sure all static checks run before commit. I can do the same thing in CI--but this isn't efficient in the slightest, nor is it good practice. I want my CI runs to be _scoped_ to the project I changed. If I am working a new feature for `app1`, then I don't want or need to run the entire unit test suites (task `test`, for example) for `app2` and `lib1`. So, I use `moon run :check :test --affected` in my CI pipeline, and presto! All the static checks and unit tests suites for the project(s) I'm working on get ran without any extra configuration.

In fact, this is such a core use case of `moon` that they have a [dedicated `moon ci` command](https://moonrepo.dev/docs/commands/ci) with extra options.

For more information:

- https://moonrepo.dev/docs/concepts/affected
- https://moonrepo.dev/docs/commands/ci

## Conclusion

Monorepos are a great way to address the problems that come with having many repos for one project. They are especially well-suited for today's increasingly AI-focused software development cycle.

However, monorepos pose unique challenges, and we have found `moon` to be the tool for resolving them. It does a great job of preserving the things we love about `just` in smaller repos while providing advanced features for effectively managing and developing in a monorepo.

TO THE MOON!! 🌑 🌘 🌗 🌖 🌕
