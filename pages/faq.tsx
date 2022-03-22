import { Title } from "@mantine/core";

export default function Faq() {
  return (
    <div className="container">
      <div className="div-block">
        <Title order={3}>How often should I write a gratitude message?</Title>
        <div>Some people recommend writing gratitude messages daily. Some other people recommend thrice a week. Personally, I try to write at least one message every day on average. A daily goal helps me to stay attentive to positive emotions, and it makes it easier to turn gratitude journaling into a routine. Yet, it's a loose and flexible goal: it is okay if I write nothing for several days, then a lot in one day.</div>
        <div>But that's my personal goal. In general, I recommend to not have a schedule. (Or at least not a schedule that has been imposed on you by someone else.) This reason is that everyone is different. The frequency of your gratitude events might not match an arbitrary preset plan. And if you can't keep with your schedule, you will get frustrated. Allow your usage of the gratitude journal to adapt to yourself.</div>
        <div>I recommend writing down your gratitude shortly after you experienced it. That way, you will not forget to write it down, and because it's still fresh in your memory, you will be able to describe and explain it with more details. Don't force yourself to express gratitude. Let it come to you naturally. If you are feeling happy, it's maybe the moment to write a new entry.</div>
      </div>

      <div className="div-block">
        <Title order={3}>What should I write over?</Title>
        <div>Everything that you are grateful for. What is being grateful? That's when you have a pleasant feeling when you think about something you have, received or perceived.</div>
        <div>Please, don't use the website to boast about all your achievements and everything you were able to buy. Gratefulness is not something you can buy or force to happen. Also, don't confuse happiness and gratefulness. Gratefulness is more about being content of all the small things that are happening around you in an unpredicted way.</div>
        <div>While describing your grateful events, try to get into the details. What precisely made you grateful and why? The more you explore, the easier it will be to reproduce the positive emotions.</div>
      </div>

      <div className="div-block">
        <Title order={3}>How often should I read my previous gratitude messages?</Title>
        <div>At least one time. Reviewing (re-reading) your gratitude messages is highly recommended. By seeing the whole picture on the scale of a week or a month, you will remember (or realize) what makes you happy, who makes you happy and what actually matters to you.</div>
        <div>Personally, I read the gratitude messages of the last week on every Sunday morning. (Sometimes I also randomly jump weeks and months in the past). Then I start a chat with the people that made me happy. This routine made me more pro-social. Also, people really enjoy hearing that someone is grateful for them. Don't keep all the pleasure for yourself. 🙂</div>
        <div>Tip: re-read the gratitude messages of your friends, and talk also about these! It's a very good way to know your friends.</div>
        <div>It is also a good idea to read your gratitude messages when you are feeling down or depressed. Reading about your previous gratitude events will make you experience them partially a second time. It's literally happiness on demand.</div>
      </div>

      <style jsx>
        {`
          .container {
            padding: 30px;            
          }

          .container > :not(:first-child) {
            margin-top: 30px;
          }

          .div-block > :not(:first-child) {
            margin-top: 20px !important;
          }
        `}
      </style>
    </div>
  )
}