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

import { Button } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import YoutubeEmbed from "components/YoutubeEmbed";
import Link from "next/link";

// navy rgb(49, 58, 97);
// turquoise rgb(79,194,197)
// https://meyerweb.com/eric/tools/color-blend/#4FC2C5:313A61:5:rgbd



export default function Index() {
  const { height, width } = useViewportSize()

  return (
    <div className="container">
      <div className="block-1">
        <div className="b1-left" style={{ width: width > 1000 ? "50%" : "100%", height: "100%" }}>
          <div className="title">Be more satisfied with your life</div>
          <div className="description">
            Writing down what you are grateful for&nbsp;
            <a style={{ textDecoration: "underline" }} href="https://greatergood.berkeley.edu/pdfs/GratitudePDFs/6Emmons-BlessingsBurdens.pdf" target="_blank" rel="noopener noreferrer">has shown</a>
            &nbsp;to bear emotional and interpersonal benefits.
          </div>
        </div>
        <div className="b1-right" style={{ width: width > 1000 ? "50%" : "100%" }}>
          <YoutubeEmbed embedId="WPPPFqsECz0" />
        </div>
      </div>
      {width}

      A gratitude journal with your friends

      Stay motivated and learn what is important for your friends
      Permission system (video? photos?)



      {
        Array(30).fill().map(() => (<div>aaa</div>))
      }
      <style jsx>
        {`
          .block-1 {
            background: rgb(69,149,164);
            padding-top: 60px;
            padding-bottom: 60px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
          }

          .b1-left {
            padding-left: 60px;
            padding-right: 60px;
          }

          .title {
            font-size: 40px;
            line-height: 40px;
            font-weight: 600;
            color: white;
          }

          .description {
            margin-top: 20px;
            font-size: 18px;
            font-weight: 600;
            color: white;
            margin-bottom: 40px;
          }

          .b1-right {
            padding-left: 60px;
            padding-right: 60px;
          }
        `}
      </style>
    </div>
  )
}