import { Title, Text } from "@mantine/core";

export default function Faq() {
  return (
    <div className="container">
      <div className="text-block">
        <Title order={3}>How often should I write a gratitude message?</Title>
        <Text>Some people recommend writing gratitude messages daily. Some other people recommend thrice a week. Personally, I try to write at least one message every day on average. A daily goal helps me to stay attentive to positive emotions, and it makes it easier to turn gratitude journaling into a routine. Yet, it's a loose and flexible goal: it is okay if I write nothing for several days, then a lot in one day.</Text>
        <Text>But that's my personal goal. In general, I recommend to not have a schedule. (Or at least not a schedule that has been imposed on you by someone else.) This reason is that everyone is different. The frequency of your gratitude events might not match an arbitrary preset plan. And if you can't keep with your schedule, you will get frustrated. Allow your usage of the gratitude journal to adapt to yourself.</Text>
        <Text>I recommend writing down your gratitude shortly after you experienced it. That way, you will not forget to write it down, and because it's still fresh in your memory, you will be able to describe and explain it with more details. Don't force yourself to express gratitude. Let it come to you naturally. If you are feeling happy, it's maybe the moment to write a new entry.</Text>
      </div>

      <div className="text-block">
        <Title order={3}>What should I write over?</Title>
        <Text>Everything that you are grateful for. What is being grateful? That's when you have a pleasant feeling when you think about something you have, received or perceived.</Text>
        <Text>Please, don't use the website to boast about all your achievements and everything you were able to buy. Gratefulness is not something you can buy or force to happen. Also, don't confuse happiness and gratefulness. Gratefulness is more about being content of all the small things that are happening around you in an unpredicted way.</Text>
        <Text>While describing your grateful events, try to get into the details. What precisely made you grateful and why? The more you explore, the easier it will be to reproduce the positive emotions.</Text>
      </div>

      <div className="text-block">
        <Title order={3}>How often should I read my previous gratitude messages?</Title>
        <Text>At least one time. Reviewing (re-reading) your gratitude messages is highly recommended. By seeing the whole picture on the scale of a week or a month, you will remember (or realize) what makes you happy, who makes you happy and what actually matters to you.</Text>
        <Text>Personally, I read the gratitude messages of the last week on every Sunday morning. (Sometimes I also randomly jump weeks and months in the past). Then I start a chat with the people that made me happy. This routine made me more pro-social. Also, people really enjoy hearing that someone is grateful for them. Don't keep all the pleasure for yourself. 🙂</Text>
        <Text>Tip: re-read the gratitude messages of your friends, and talk also about these! It's a very good way to know your friends.</Text>
        <Text>It is also a good idea to read your gratitude messages when you are feeling down or depressed. Reading about your previous gratitude events will make you experience them partially a second time. It's literally happiness on demand.</Text>
      </div>

      <style jsx>
        {`
          .container {
            padding: 20px;            
          }

          .container > :not(:first-child) {
            margin-top: 30px;
          }

          .text-block > :not(:first-child) {
            margin-top: 20px;
          }
        `}
      </style>
    </div>
  )
}