---
headless: true
title: Hugo Comments Test-Site
---

# "Static" Comments with Gulp, Hugo & Netlify

Detailed description: https://ttntm.me/blog/static-blog-comments-hugo/

GitHub: https://github.com/ttntm/hugo-comments

## Description

The comments posted are handled by [Netlify Forms](https://www.netlify.com/docs/form-handling/) and get processed there according to this flowchart:

![Flowchart](https://d33wubrfki0l68.cloudfront.net/64cc83534b7add7fc2272e274153163c1482c293/4aeec/img/blog/comment-flow.jpg)

During the build process, the comments are obtained from Netlify Forms via their API and put into a `comments.json` file by Gulp. In order to make this work on `localhost` environments, don't forget that you'll need an `.env` file within the project directory that stores the necessary `Form ID` and `API Token` for your own Netlify setup.

Based on: https://css-tricks.com/jamstack-comments/