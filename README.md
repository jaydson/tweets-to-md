# Convert tweets to markdown

## Story
I quit social media in 2018 (https://jaydson.com/social-detox-rehab/ - Portuguese only).  
I was on Twitter since 2009 and I didn't want to lose the good part of it (there is some, I think).  

## Before run
1. Download you Twitter data from your Twitter account  
2. Open the file `tweet.js` and change the first line:  
```
export const tweets = [ {  
```
3. Copy `tweet.js` to `./`

## How to run
```
mkdir posts
npm install
npm start
```

## Example
This is my last tweet:  

```
{
  "retweeted" : false,
  "source" : "<a href=\"https://about.twitter.com/products/tweetdeck\" rel=\"nofollow\">TweetDeck</a>",
  "entities" : {
    "hashtags" : [ ],
    "symbols" : [ ],
    "user_mentions" : [ ],
    "urls" : [ {
      "url" : "https://t.co/OcqN37iCFo",
      "expanded_url" : "https://jaydson.com/social-detox-rehab/",
      "display_url" : "jaydson.com/social-detox-r…",
      "indices" : [ "19", "42" ]
    } ]
  },
  "display_text_range" : [ "0", "42" ],
  "favorite_count" : "5",
  "id_str" : "1034898743869534208",
  "truncated" : false,
  "retweet_count" : "2",
  "id" : "1034898743869534208",
  "possibly_sensitive" : false,
  "created_at" : "Wed Aug 29 20:21:02 +0000 2018",
  "favorited" : false,
  "full_text" : "Social Detox/Rehab\nhttps://t.co/OcqN37iCFo",
  "lang" : "da"
}
```
It will be converted to:  

```
+++
author = "Jaydson Gomes"
categories = ["tweet"]
date = "Wed Aug 29 20:21:02 +0000 2018"
draft = false
image = "{TWEET_IMAGE}"
slug = "7dffcf9a1433013e157d31838bef66565002208f"
tags = ["tweet"]
title = """Social Detox/Rehab https:..."""
+++
Social Detox/Rehab
https://t.co/OcqN37iCFo
```
