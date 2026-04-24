---
title: Docs-Driven Infrastructure
date: 2026-04-24
authors:
  name: Addison Emig
  title: Lead Software Engineer
  picture: https://avatars.githubusercontent.com/u/17209828?s=200
---

## The Problem

Established infrastructure can often become a black box. You don't know how it was set up, and there is no documentation. The person who set it up isn't around to answer your questions or has forgotten the details because it's been five years. How can you set up new infastructure with good documentation to go along with it?

## The Solution

Deployment scripts or [infrastructure as code](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/infrastructure-as-code) are a good way to aim for reproducible infrastructure[^1], but often you are setting up specific infrastructure that only needs to be stood up once. What you really need is a simple guide describing the steps.

[^1]: Personally, I'm a big fan of [Nix flakes](https://zero-to-nix.com).

Instead of asking your coding agent "How do I set up X?", give a prompt of the form "Write a README explaining how to set up X". Then follow the steps in the new documentation. If you run into something incorrect or confusing, revise the documentation and try again. In the end, you should have a guide that accurately describes how to do it, provable by the new infrastructure that you just set up using the guide.

## The Payoff

Not only do you end up with a helpful setup guide for the new infrastructure, you also end up with accurate documentation for guiding yourself or other team members when you need to replicate or maintain the infrastructure in the future. It's a great way to kill two birds with one stone.
