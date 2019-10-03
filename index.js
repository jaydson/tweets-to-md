import { tweets } from './tweet';
import fs from 'fs';
import crypto from 'crypto';
import ora from 'ora';
import config from './config'

let ignored = 0;
let created = 0;
let counter = 0;
const length  = tweets.length;

const spinner = ora('Converting Tweets to posts').start();

tweets.forEach((tweet) => {
  counter++;
  let imgPath;
  let hasMedia = false;

  if (config.ignoreReplies && (tweet.in_reply_to_status_id || tweet.in_reply_to_user_id)) {
    ignored++;
  } else {
    created++;
    let content = config.frontMatterTemplate.replace('{TWEET_DATE}', tweet.created_at);
    content = content.replace('{TITLE}', `${tweet.full_text.substring(0,25)}...`).replace(/\\/g, '&#92;');
    content = content.replace('{TWEET_DATE}', tweet.created_at);
    content = content.replace('{CONTENT}', tweet.full_text.replace('"', "'"));
    content = content.replace('{TWEET_ID}', tweet.id);
    if (tweet.extended_entities && tweet.extended_entities.media.length > 0) {
      hasMedia = true;
      const media = tweet.extended_entities.media[0];
      imgPath = `${config.tweetMediaPath}/${tweet.id}-${media.media_url.split('media/')[1]}`;
      content = content.replace('{TWEET_IMAGE}', imgPath);
    } else {
      content = content.replace('{TWEET_IMAGE}', 'No media found for this Tweet');
    }

    if (hasMedia) {
      content = content + `\n![](${imgPath})`;
    }
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