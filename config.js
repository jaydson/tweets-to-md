const config = {
  frontMatterTemplate : `
+++
author = "Jaydson Gomes"
categories = ["tweet"]
date = "{TWEET_DATE}"
draft = false
image = "{TWEET_IMAGE}"
slug = "{SLUG}"
tags = ["tweet"]
title = """{TITLE}"""
tweet = true
tweet_url = "https://twitter.com/jaydson/status/{TWEET_ID}"
+++
{CONTENT}
`,
  tweetMediaPath: '/images/tweet-media'
}

export default config;