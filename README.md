# Astro-PaperMod 📄

![AstroPaper](public/astropaper-og.jpg)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub](https://img.shields.io/github/license/satnaing/astro-paper?color=%232F3741&style=for-the-badge)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=for-the-badge)](http://commitizen.github.io/cz-cli/)

Astro-PaperMod is a personal customized theme,based on AstroPaper, a minimal, responsive, accessible and SEO-friendly Astro blog theme. 


## 🆕 New Features in Astro PaperMod
  - [x] Easy to add new blog posts using `npm run new` command, like what `hexo` blog does.
  - [x] When creating a new post, `modDatetime` is initialized with `pubDatetime`, when modified, use `pre-commit`(a native hook of git) to update `modDatetime`.
  - [x] ; .
  - [ ] better Table of Contents (TOC).


## 🔥 Features

- [x] type-safe markdown
- [x] super fast performance
- [x] accessible (Keyboard/VoiceOver)
- [x] responsive (mobile ~ desktops)
- [x] SEO-friendly
- [x] light & dark mode
- [x] fuzzy search
- [x] draft posts & pagination
- [x] sitemap & rss feed
- [x] followed best practices
- [x] highly customizable
- [x] dynamic OG image generation for blog posts [#15](https://github.com/satnaing/astro-paper/pull/15) ([Blog Post](https://astro-paper.pages.dev/posts/dynamic-og-image-generation-in-astropaper-blog-posts/))

_Note: I've tested screen-reader accessibility of AstroPaper using **VoiceOver** on Mac and **TalkBack** on Android. I couldn't test all other screen-readers out there. However, accessibility enhancements in AstroPaper should be working fine on others as well._

## ✅ Lighthouse Score

<p align="center">
  <a href="https://pagespeed.web.dev/report?url=https%3A%2F%2Fastro-paper.pages.dev%2F&form_factor=desktop">
    <img width="710" alt="AstroPaper Lighthouse Score" src="AstroPaper-lighthouse-score.svg">
  </a>
</p>

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

Any static assets, like images, can be placed in the `public/` directory.

All blog posts are stored in `src/data/blog` directory.

## 📖 Documentation

Documentation can be read in two formats\_ _markdown_ & _blog post_.

- Configuration - [markdown](src/data/blog/how-to-configure-astropaper-theme.md) | [blog post](https://astro-paper.pages.dev/posts/how-to-configure-astropaper-theme/)
- Add Posts - [markdown](src/data/blog/adding-new-post.md) | [blog post](https://astro-paper.pages.dev/posts/adding-new-posts-in-astropaper-theme/)
- Customize Color Schemes - [markdown](src/data/blog/customizing-astropaper-theme-color-schemes.md) | [blog post](https://astro-paper.pages.dev/posts/customizing-astropaper-theme-color-schemes/)
- Predefined Color Schemes - [markdown](src/data/blog/predefined-color-schemes.md) | [blog post](https://astro-paper.pages.dev/posts/predefined-color-schemes/)


## 👨🏻‍💻 Running Locally

You can start using this project locally by running the following command in your desired directory:

```bash
npm create astro@latest -- --template satnaing/astro-paper
```

Then start the project by running the following commands:

```bash
# install dependencies if you haven't done so in the previous step.
npm install

# start running the project
npm run dev
```

## Google Site Verification (optional)

You can easily add your [Google Site Verification HTML tag](https://support.google.com/webmasters/answer/9008080#meta_tag_verification&zippy=%2Chtml-tag) in AstroPaper using an environment variable. This step is optional. If you don't add the following environment variable, the google-site-verification tag won't appear in the HTML `<head>` section.

```bash
# in your environment variable file (.env)
PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-site-verification-value
```

> See [this discussion](https://github.com/satnaing/astro-paper/discussions/334#discussioncomment-10139247) for adding AstroPaper to the Google Search Console.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                 | Action                                                                                                                           |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `npm install`           | Installs dependencies                                                                                                            |
| `npm run dev`           | Starts local dev server at `localhost:4321`                                                                                     |
| `npm run build`         | Build your production site to `./dist/`                                                                                         |
| `npm run preview`       | Preview your build locally, before deploying                                                                                    |
| `npm run format:check`  | Check code format with Prettier                                                                                                 |
| `npm run format`        | Format codes with Prettier                                                                                                      |
| `npm run sync`          | Generates TypeScript types for all Astro modules. [Learn more](https://docs.astro.build/en/reference/cli-reference/#astro-sync). |
| `npm run lint`          | Lint with ESLint                                                                                                                |
| `npm run hooks:install` | Configure Git to use versioned hooks from `.githooks/`.After this, each `git commit` updates `modDatetime` for modified posts in `src/data/blog` (newly added posts are ignored).                                                                          |


> **_Warning!_** Windows PowerShell users may need to install the [concurrently package](https://www.npmjs.com/package/concurrently) if they want to [run diagnostics](https://docs.astro.build/en/reference/cli-reference/#astro-check) during development (`astro check --watch & astro dev`). For more info, see [this issue](https://github.com/satnaing/astro-paper/issues/113).


## 📜 License

Licensed under the MIT License, Copyright © 2026