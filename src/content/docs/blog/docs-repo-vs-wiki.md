---
title: Should I Really Use a Gitlab Wiki?
date: 2025-03-14
authors:
  name: Bennett Moore
  title: Software Developer
  picture: https://avatars.githubusercontent.com/u/120052232?s=400&u=0c610467b3f8295f904f0c81c97214217def6020&v=4
---

Recently, as we've been taking on new software projects and continuing to develop existing ones, the role of documentation has come into focus.

In fact, the development of this very site is a direct result of an increased focus by our whole software team to better document the things we learn and already know.

But...WHERE should all this information go? In the past, we always defaulted to Gitlab wikis...but is that the best option? Would an dedicated documentation repository for each project make more sense?

I will note that if your project uses a monorepo, I will think of "dedicated repo" as meaning "dedicated folder inside the repo"; something like `apps/docs` will work just fine and function the same as a separate repo in a multi-repo project structure.

## Gitlab Wiki: Pros

The Gitlab wiki feature is really a very powerful one. Every group and repository is **automatically given a wiki** (unless it's disabled in the project settings), so there's no additional setup required.

Wikis are designed to be very **quick and easy to contribute to**. Internally, they are based on a Git repo, but you don't have to clone the repo or worry about local copies or anything; Gitlab allows you to make and commit all your edits right from the UI and then does the Git operations behind the scenes.

Wikis support **easy file uploads** for images, PDFs, and whatever else in much the same way that other features do (like uploading files to an issue or MR description). You can attach the file and Gitlab automatically stores it for you with no extra configuration needed.

## Gitlab Wiki: Cons

Gitlab wikis also have some negatives that come with them.

First, these automatic wikis are nice, but they can quickly result in **splintered, spread out documentation**. It's very common for one "project" to consist of a group of multiple projects. If each one has its own wiki, including the top-level group, then which one should the project's documentation go in?

This quickly becomes a problem when you have multiple developers adding things to different wikis. Not only is it likely that some of the more general information will be duplicated, which means unnecessary work, but it also becomes hard to know which wiki is the central source of truth. If two wikis have conflicting information, which version of the information should you choose as being true? You'll have to ask someone else to confirm, which only serves to take more time for both of you.

Having multiple wikis requires you to remember which one has which pieces of information, which can quickly become a headache when trying to point other team members to something.

The only real way to avoid this problem is to establish from the start which wiki will be the central source of truth and disable the other wikis entirely.

Another disadvantage is a **lack of peer review**. Gitlab wikis are easy to contribute to...but that can also be a negative, because no outside approval is required to make changes. Anyone on the team can write down whatever they want and the only way for erroneous documentation to be discovered is if another team member stumbles across it and recognizes the error.

Gitlab wikis are also just that--Gitlab wikis. They're **tied to Gitlab**. If your project is ever migrated to another code-hosting or issue-tracking site, such as Jira/Bitbucket or Github, then you'll have to do some work to migrate the wiki with it. It's fairly easy to clone the wiki's internal repo and push that to the new site, but you'll have to go through and update all the Gitlab-specific parts: for example, those lovely file uploads that I mentioned earlier? You'll have to download each file, change the link that points to it, and figure out a simple way of storing those files in the repo.

## Dedicated Repo: Pros

There are a lot of advantages to using a dedicated separate repository for documentation. One of the biggest ones is **peer review**. By creating a separate repository (and setting up the typical workflow, with MRs, protected branches, required approvals, and the like), you force all new documentation to be reviewed by another member of the team.

There are a multitude of reasons why this is a good thing that boil down to the reasons why _any_ peer review on code is a good thing. Reviewers can test any deployment/setup steps that are documented to make sure they work correctly; they can filter information that isn't really worth documenting; they can suggest spots where more clarity or explanation might be needed; and so on. Code review is core to the functioning of any well-managed project, and documentation must be held to the same rigorous standard.

Another big, closely related advantage is **real version control**. The Gitlab wiki does use an internal repo, but when editing through the UI, it's as if every change you make is a push straight to `main` (which, as any good developer knows, is NOT a good practice). I've seen multiple occasions where someone was trying to edit a wiki page at the same time as someone else and their changes conflicted.

With a dedicated repo, this abstraction of easy changes is removed, and that's a good thing. Team members can check out their own branches to modify content and make sure all their edits are complete and concise. If someone is working on a big new feature, they can make a separate branch of the documentation where they document their new feature as they implement it. While this does require maintaining multiple MRs, we find that to be a small tradeoff for the benefits it brings.

Using a separate repo also simplifies the task of **deployment to an external location**. For example, if you want to use [Starlight](https://starlight.astro.build/) (hint: that's what we used for this site!) to create an actual website for the project documentation, then it's _easy_ to do so. You can set up the Starlight project in the repository, configure the CI/CD deployments, and so on.

This becomes very important when you want customers to be able to see some or all of the documentation. Gitlab wikis have the same visibility as the project they are a part of; if the project is private (as the majority of ours are), then the wiki is also private. You can't link to the wiki when talking to customers unless they are made a member of the project, which is its own can of worms...suffice to say it is a can of worms that SHOULD NOT be opened. So, for customers to get access to useful information, you'll have to have some way of deploying it outside of the project.

Having a separate repo also gives you much more **structural freedom**. You can define the hierarchy of files however you want, use whatever file formats/types you want, and so forth. For example, in one of my projects, the documentation repo contains both an external site and an internal "wiki". The external site is for things that we want the customer to be able to access, and the internal wiki is for more development-centric things: running tests, working with hardware, meeting notes, and the like. Having "docs" for external documentation and a "wiki" for internal documentation is a pattern that has served our team well across multiple projects.

## Dedicated Repo: Cons

One of the only real "cons" to a dedicated repo is that it takes slightly **longer to make changes** as compared to a Gitlab wiki, but this is only a con if you don't care about review. We care about making sure documentation is correct and complete and thus much appreciate the slightly slower turnaround time for pushing new information to customers.

It can also be tedious to have to **manage MRs in multiple repos**; if you implement a new feature in the actual project repo, and then provide documentation for said feature in the docs repo, you now have two MRs to complete one feature.

However, this isn't a big issue...wikis effectively require the same thing because you are still updating the documentation in a spot that is not the project repo. Plus, if your project uses a monorepo, then the problem is avoided entirely and in fact becomes even more streamlined because the documentation changes and feature changes can be reviewed in a single MR.

## Conclusions

We have found using a dedicated separate repository for documentation to be far preferable to using a Gitlab wiki in the projects here at MRS. While this doesn't mean that it's the unquestioned best solution for every project, the majority of projects will likely benefit from this structure.

A dedicated repo is much more flexible in terms of deployment and structure, allows for real peer review, and avoids problems with splintered docs in more than one place and over-reliance on Gitlab. If you're going to be creating a new project anytime soon, we recommend creating your documentation repo right from the start.
