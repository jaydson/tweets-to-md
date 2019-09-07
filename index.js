import { tweets } from './tweet';
import fs from 'fs';
import crypto from 'crypto';
import ora from 'ora';

const frontMatterTemplate = `
+++
author = "Jaydson Gomes"
categories = ["tweet"]
date = "{TWEET_DATE}"
draft = false
image = "{TWEET_IMAGE}"
slug = "{SLUG}"
tags = ["tweet"]
title = "{TITLE}"
+++
{CONTENT}
`;
let ignored = 0;
let created = 0;
let counter = 0;
const length  = tweets.length;

const spinner = ora('Converting Tweets to posts').start();

tweets.forEach((tweet) => {
  counter++;
  if (tweet.in_reply_to_status_id || tweet.in_reply_to_user_id) {
    ignored++;
  } else {
    created++;
    let content = frontMatterTemplate.replace('{TWEET_DATE}', tweet.created_at);
    content = content.replace('{TITLE}', `${tweet.full_text.replace('"', "'").replace(/\//gi,'').replace(/\\/gi,'').substring(0,25).replace(/\n/gi, '')}...`);
    content = content.replace('{TWEET_DATE}', tweet.created_at);
    content = content.replace('{CONTENT}', tweet.full_text.replace('"', "'"));
    let fileName = `${crypto.createHash('sha1').update(tweet.created_at).digest('hex')}`
    content = content.replace('{SLUG}', fileName);
    fs.writeFile(`./posts/${fileName}.md`, content, (err) => {
      if(err) {
        return console.log(err);
      }
    });
    if (counter === length) {
      spinner.stop();
      console.log(`${created} posts created | ${ignored} tweets ignored`);
    }
  }
});