# Test site for "static" comments in Hugo

Source: https://css-tricks.com/jamstack-comments/

## Description

This site is built around the linked tutorial above but it doesn't make use of the Slack notifications/Netlify functions in order to keep things simply.

So, the comments entered here go into [Netlify Forms](https://www.netlify.com/docs/form-handling/) and [IFTTT](https://ifttt.com/) takes care of re-building the site every hour.

During the build process, the comments are obtained from Netlify Forms via their API and put into a `comments.json` file by Gulp. In order to make this work on `localhost` environments, don't forget that you'll need an `.env` file within the project directory that stores the necessary `Form ID` and `API Token` for your own Netlify setup.

## Demo

https://hugo-comments.netlify.com/

## Status

[![Netlify Status](https://api.netlify.com/api/v1/badges/6a5bdcb6-71ef-444b-93fc-afcc2fea774c/deploy-status)](https://app.netlify.com/sites/hugo-comments/deploys)
