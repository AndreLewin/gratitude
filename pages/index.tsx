import { Button } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import YoutubeEmbed from "components/YoutubeEmbed";
import Link from "next/link";

export default function Index() {
  const { height, width } = useViewportSize()

  return (
    <div className="container">
      <div className="block" style={{ background: "rgb(69,149,164)" }}>
        <div className="left" style={{ width: width > 1000 ? "50%" : "100%", height: "100%" }}>
          <div className="center-vertically">
            <div className="title">Be more satisfied in your life <span style={{ textShadow: "initial" }}>🙂</span></div>
            <div className="description">
              <a style={{ textDecoration: "underline" }} href="https://en.wikipedia.org/wiki/Gratitude_journal" target="_blank" rel="noopener noreferrer">Gratitude journaling</a> is the act of writing down what you are grateful for. It <a style={{ textDecoration: "underline" }} href="https://greatergood.berkeley.edu/pdfs/GratitudePDFs/6Emmons-BlessingsBurdens.pdf" target="_blank" rel="noopener noreferrer">has shown</a>
              &nbsp;to bring emotional and interpersonal benefits. It's probably the easiest way to have a more fulfilling life in the long term.
            </div>
          </div>
        </div>
        <div className="right" style={{ width: width > 1000 ? "50%" : "100%", marginTop: width > 1000 ? 0 : "40px" }}>
          <div style={{ maxWidth: "600px", width: "100%", boxShadow: "1px 1px 1px black" }}>
            <YoutubeEmbed embedId="WPPPFqsECz0" />
          </div>
        </div>
      </div>

      <div className="block" style={{ background: "rgb(64,126,147)" }}>
        <div className="left" style={{ width: width > 1000 ? "50%" : "100%", height: "100%" }}>
          <img
            src="/feature-reel.gif"
            alt="Showcase of various features of the web app"
            style={{ maxWidth: "800px", width: "100%", boxShadow: "1px 1px 1px black" }}
          />
        </div>
        <div className="right" style={{ width: width > 1000 ? "50%" : "100%", marginTop: width > 1000 ? 0 : "40px" }}>
          <div className="center-vertically">
            <div className="title">Together with your friends <span style={{ textShadow: "initial" }}>🫂</span></div>
            <div className="description">
              Gratitude journaling does not have to be a solitary experience. You can invite friends and adjust the visibility of each message. Reading the gratitude messages of your friends is a good way to stay motivated to do the same and to learn what is important for them.
            </div>
          </div>
        </div>
      </div>

      <div className="last-block" style={{ background: "rgb(69,149,164)" }}>
        <div className="title" style={{ margin: "0px 10px 5px 10px" }}>Ready to try?</div>
        <Link href="/login" passHref>
          <Button style={{ margin: "5px 10px 5px 10px", boxShadow: "1px 1px 1px black" }} color="cyan" variant="light" component="a" leftIcon={<svg viewBox="0 0 256 256" height="20px" width="20px"><path fill="currentColor" d="m144.5 136.5l-42 42A12 12 0 0 1 94 182a12.2 12.2 0 0 1-8.5-3.5a12 12 0 0 1 0-17L107 140H24a12 12 0 0 1 0-24h83L85.5 94.5a12 12 0 0 1 17-17l42 42a12 12 0 0 1 0 17ZM192 28h-56a12 12 0 0 0 0 24h52v152h-52a12 12 0 0 0 0 24h56a20.1 20.1 0 0 0 20-20V48a20.1 20.1 0 0 0-20-20Z"></path></svg>}>
            Start gratitude journaling
          </Button>
        </Link>
        <Link href="/public" passHref>
          <Button style={{ margin: "5px 10px 5px 10px", boxShadow: "1px 1px 1px black" }} color="cyan" variant="light" component="a" leftIcon={<svg viewBox="0 0 256 256" height="20px" width="20px"><path fill="currentColor" d="m225.9 163.2l.3-1a103.7 103.7 0 0 0 0-68.4l-.3-1A104.4 104.4 0 0 0 128 24a104.2 104.2 0 0 0-97.9 68.8l-.3 1a103.7 103.7 0 0 0 0 68.4l.3 1A104.2 104.2 0 0 0 128 232a104.2 104.2 0 0 0 97.9-68.8ZM102.5 168h51a108.6 108.6 0 0 1-25.5 42.4a108.6 108.6 0 0 1-25.5-42.4Zm-4.2-16a126.4 126.4 0 0 1 0-48h59.4a127.6 127.6 0 0 1 2.3 24a126.8 126.8 0 0 1-2.3 24ZM40 128a90.3 90.3 0 0 1 3.3-24H82a145 145 0 0 0 0 48H43.3a90.3 90.3 0 0 1-3.3-24Zm113.5-40h-51A108.6 108.6 0 0 1 128 45.6A108.6 108.6 0 0 1 153.5 88Zm20.5 16h38.7a88.9 88.9 0 0 1 0 48H174a145 145 0 0 0 0-48Zm32.4-16h-36a128.7 128.7 0 0 0-24.1-46.1A88.6 88.6 0 0 1 206.4 88Zm-96.7-46.1A128.7 128.7 0 0 0 85.6 88h-36a88.6 88.6 0 0 1 60.1-46.1ZM49.6 168h36a128.7 128.7 0 0 0 24.1 46.1A88.3 88.3 0 0 1 49.6 168Zm96.7 46.1a128.7 128.7 0 0 0 24.1-46.1h36a88.3 88.3 0 0 1-60.1 46.1Z"></path></svg>}>
            See some examples
          </Button>
        </Link>
      </div>

      <style jsx>
        {`
          .block {
            padding-top: 60px;
            padding-bottom: 60px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
          }

          .left {
            padding-left: 60px;
            padding-right: 60px;
          }

          .title {
            font-size: 28px;
            line-height: 40px;
            font-family: Tahoma;
            text-shadow: 0px 1px 1px black;
            color: white;
          }

          .description {
            margin-top: 30px;
            margin-left: 3px;
            font-size: 18px;
            font-weight: 600;
            color: white;
          }

          .right {
            padding-left: 60px;
            padding-right: 60px;

            display: flex;
            justify-content: center;
          }

          .center-vertically {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .last-block {
            padding: 60px 60px 60px 60px;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
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