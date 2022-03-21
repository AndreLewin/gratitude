/*
I recommend to write several gratitude messages a day as a goal. That way, you will stay attentive about your positive experiences. Then, every week, reread your previous messages. That way, you will remember what makes you happy and you can better reflect on your life.


This (in order to stay attentive about positive experiences). Every week, I reread     and to reread your previous gratitude messages every week (in order to remember those nice things)

If y
send them a message. It's nice to know w

-- What is gratitude journaling
https://en.wikipedia.org/wiki/Gratitude_journal

https://www.youtube.com/watch?v=WPPPFqsECz0
https://www.youtube.com/watch?v=GZghu_xFRM8




-- Why this website (social)
It's hard to maintain a gratitude journal.
The experience is often solitary.
It is easier to maintain a goal when in it is done with friends.


There is no like, no retweet, no follower count.
Everything is private by default.
No social pressure.
Everything is self paced.
But you can add friends, and share you gratitude messages to your friends.
It harder to forget to write gratitude messages if you want to connect daily to read the messages of your friends.
That way, you can stay motivated.
You can learn more about yourself, but also about your friends at the same time.

There is also the public.
There you can take inspiration.
Maybe also meet new friends.

Remember it's not a social media.
You can write a little bio of yourself with links to your social media accounts if you wish to be contacted.
GJ is (and will stay) a tool focused on personal gratitude journaling and happiness.


-- 

-- Friends and Public system
you can send messages to only your friends

-- Permission system

-- There is also a public channel, where you can see what
-- Understand yourself better. Know what is important for your friends and what makes them happy.

*/

import { ActionIcon, Button } from "@mantine/core";
import Link from "next/link";


/*
- How often should I write a gratitude message?

Some people recommend writing gratitude messages daily. Some other people recommend thrice a week. Personally, I try to write at least one message every day ON AVERAGE. My daily goal helps me to stay attentive to positive emotions, and it makes it easier to turn gratitude journaling into a routine. It's a loose and flexible goal: it is okay if I write nothing for several days, then a lot in one day.

But that's my personal goal. In general, I recommend to NOT have a schedule. (Or at least not a schedule that has been imposed on you by someone else.) Everyone is different. The frequency of your gratitude events might not match a preset plan. And if you can't keep with your schedule, you will get frustrated. Allow your usage of the gratitude journal to adapt to yourself.

I recommend writing down your gratitude shortly after you are experiencing it. That way, you will not forget to write it down, and because it's still fresh in your memory, you will be able to describe and explain it with more details. Don't force yourself to express gratitude. Let it come to you naturally. If you are feeling happy, it's maybe the moment to write a new entry.


- What should I write over?

Everything that you are grateful for. What is being grateful? That's when you have a pleasant feeling when you think about something you have, received or perceived.

Please don't use the website to boast about all your achievements and everything you were able to buy. Gratefulness is not something you can buy or force to happen. Also, don't confuse happiness and gratefulness. Gratefulness is more about being content of all the small things that are happening around you in an unpredicted way.

Try to get into the details. What precisely made you grateful and why? The more you explore, the easier it will be to reproduce the positive emotions.



- How often should I read my previous gratitude message?

At least one time. Reviewing (re-reading) your gratitude messages is highly recommended. By seeing the whole picture on the scale of a week or a month, you will remember (or realize) what makes you happy, who makes you happy and what actually matters to you.

Personally, I read the gratitude messages of the last week on every Sunday morning. (Sometimes I also randomly jump weeks and months in the past). Then I start a chat with the people that made me happy. This routine made me more pro-social. Also, people really enjoy hearing that someone is grateful for them. Don't keep all the pleasure for yourself. :)

Tip: re-read the gratitude messages of your friends, and talk also about these! It's a very good way to know your friends.

It is also a good idea to read your gratitude messages when you are feeling down or depressed. Reading about your previous gratitude events will make you experience them partially a second time. It's literally happiness on demand.

*/


export default function Index() {
  return (
    <div className="container">
      <div className="content">
        <Link href='/login' passHref>
          <Button
            leftIcon={<svg viewBox="0 0 256 256" height="20px" width="20px"><path fill="currentColor" d="m144.5 136.5l-42 42A12 12 0 0 1 94 182a12.2 12.2 0 0 1-8.5-3.5a12 12 0 0 1 0-17L107 140H24a12 12 0 0 1 0-24h83L85.5 94.5a12 12 0 0 1 17-17l42 42a12 12 0 0 1 0 17ZM192 28h-56a12 12 0 0 0 0 24h52v152h-52a12 12 0 0 0 0 24h56a20.1 20.1 0 0 0 20-20V48a20.1 20.1 0 0 0-20-20Z"></path></svg>}
            color="blue"
            component="a"
          >
            Log In / Sign Up
          </Button>
        </Link>
        <Link href='/public' passHref>
          <Button
            leftIcon={<svg viewBox="0 0 256 256" height="20px" width="20px"><path fill="currentColor" d="m225.9 163.2l.3-1a103.7 103.7 0 0 0 0-68.4l-.3-1A104.4 104.4 0 0 0 128 24a104.2 104.2 0 0 0-97.9 68.8l-.3 1a103.7 103.7 0 0 0 0 68.4l.3 1A104.2 104.2 0 0 0 128 232a104.2 104.2 0 0 0 97.9-68.8ZM102.5 168h51a108.6 108.6 0 0 1-25.5 42.4a108.6 108.6 0 0 1-25.5-42.4Zm-4.2-16a126.4 126.4 0 0 1 0-48h59.4a127.6 127.6 0 0 1 2.3 24a126.8 126.8 0 0 1-2.3 24ZM40 128a90.3 90.3 0 0 1 3.3-24H82a145 145 0 0 0 0 48H43.3a90.3 90.3 0 0 1-3.3-24Zm113.5-40h-51A108.6 108.6 0 0 1 128 45.6A108.6 108.6 0 0 1 153.5 88Zm20.5 16h38.7a88.9 88.9 0 0 1 0 48H174a145 145 0 0 0 0-48Zm32.4-16h-36a128.7 128.7 0 0 0-24.1-46.1A88.6 88.6 0 0 1 206.4 88Zm-96.7-46.1A128.7 128.7 0 0 0 85.6 88h-36a88.6 88.6 0 0 1 60.1-46.1ZM49.6 168h36a128.7 128.7 0 0 0 24.1 46.1A88.3 88.3 0 0 1 49.6 168Zm96.7 46.1a128.7 128.7 0 0 0 24.1-46.1h36a88.3 88.3 0 0 1-60.1 46.1Z"></path></svg>}
            variant="outline"
            component="a"
          >
            See public gratitude messages
          </Button>
        </Link>
        {
          Array(5).fill().map(() => (<div>aaa</div>))
        }
      </div>
      <footer className="footer">
        <Link href='/'>
          <a className="link">
            Home
          </a>
        </Link>
        <Link href='/terms_and_privacy'>
          <a className="link">
            <svg className="icon" viewBox="0 0 256 256"><path fill="currentColor" d="M53.9 34.6a8 8 0 0 0-11.8 10.8l19.2 21.1C25 88.8 9.4 123.2 8.7 124.8a8.2 8.2 0 0 0 0 6.5c.3.7 8.8 19.5 27.6 38.4c25.1 25 56.8 38.3 91.7 38.3a128.6 128.6 0 0 0 52.1-10.8l22 24.2a8 8 0 0 0 5.9 2.6a8.2 8.2 0 0 0 5.4-2.1a7.9 7.9 0 0 0 .5-11.3Zm47.3 75.9l41.7 45.8A31.6 31.6 0 0 1 128 160a32 32 0 0 1-26.8-49.5ZM128 192c-30.8 0-57.7-11.2-79.9-33.3A128.3 128.3 0 0 1 25 128c4.7-8.8 19.8-33.5 47.3-49.4l18 19.8a48 48 0 0 0 63.6 70l14.7 16.2A112.1 112.1 0 0 1 128 192Zm119.3-60.7c-.4.9-10.5 23.3-33.4 43.8a8.1 8.1 0 0 1-5.3 2a7.6 7.6 0 0 1-5.9-2.7a8 8 0 0 1 .6-11.3A131 131 0 0 0 231 128a130.3 130.3 0 0 0-23.1-30.8C185.7 75.2 158.8 64 128 64a112.9 112.9 0 0 0-19.4 1.6a8.1 8.1 0 0 1-9.2-6.6a8 8 0 0 1 6.6-9.2a132.4 132.4 0 0 1 22-1.8c34.9 0 66.6 13.3 91.7 38.3c18.8 18.9 27.3 37.7 27.6 38.5a8.2 8.2 0 0 1 0 6.5ZM134 96.6a8 8 0 0 1 3-15.8a48.3 48.3 0 0 1 38.8 42.7a8 8 0 0 1-7.2 8.7h-.8a7.9 7.9 0 0 1-7.9-7.2A32.2 32.2 0 0 0 134 96.6Z"></path></svg>
            Terms & Privacy (TODO: page) (TODO: add the footer to the public pages)
          </a>
        </Link>
        <Link href='/faq'>
          <a className="link">
            Frequently Asked Questions
          </a>
        </Link>
        <Link href='/updates'>
          <a className="link">
            Updates
          </a>
        </Link>
        <Link href="mailto:063e8ewjr@mozmail.com?subject=Gratitude journaling website">
          <a className="link">
            Contact
          </a>
        </Link>
        <a className="link" href="https://github.com/AndreLewin/gratitude" target="_blank" rel="noopener noreferrer">
          <svg className="icon" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .297c-6.62 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
          GitHub
        </a>
      </footer>

      <style jsx>
        {`
          .container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }

          .content {
            flex-grow: 1;
          }

          footer {
            width: 100%;
            background: black;

            padding: 15px 20px 15px 20px;
            display: flex;
            justify-content: flex-end;
            flex-wrap: wrap;
          }

          .link {
            white-space: nowrap;
            margin: 5px 15px 5px 15px;
            color: #E7E7E7;
            font-weight: 600;
          }

          .icon {
            width: 16px;
            height: 16px;
            margin-right: 8px;
            margin-bottom: -2px;
          }
        `}
      </style>
    </div>
  )
}