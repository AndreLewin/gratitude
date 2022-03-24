import { useViewportSize } from "@mantine/hooks";
import YoutubeEmbed from "components/YoutubeEmbed";

export default function Index() {
  const { height, width } = useViewportSize()

  return (
    <div className="container">
      <div className="block" style={{ background: "rgb(69,149,164)" }}>
        <div className="left" style={{ width: width > 1000 ? "50%" : "100%", height: "100%" }}>
          <div className="center-vertically">
            <div className="title">Be more satisfied in your life</div>
            <div className="description">
              <a style={{ textDecoration: "underline" }} href="https://en.wikipedia.org/wiki/Gratitude_journal" target="_blank" rel="noopener noreferrer">Gratitude journaling</a> is the act to write down what you are grateful for. It <a style={{ textDecoration: "underline" }} href="https://greatergood.berkeley.edu/pdfs/GratitudePDFs/6Emmons-BlessingsBurdens.pdf" target="_blank" rel="noopener noreferrer">has shown</a>
              &nbsp;to bring emotional and interpersonal benefits. It's probably the easiest way to have a more fulfilling life in the long term. ✨
            </div>
          </div>
        </div>
        <div className="right" style={{ width: width > 1000 ? "50%" : "100%", marginTop: width > 1000 ? 0 : "40px" }}>
          <YoutubeEmbed embedId="WPPPFqsECz0" />
        </div>
      </div>

      <div className="block" style={{ background: "rgb(64,126,147)" }}>
        <div className="left" style={{ width: width > 1000 ? "50%" : "100%", height: "100%" }}>
          TODO: Feature showcase: create gratitude message, see public messages, ask for friendship, accept friends, change visibility to friends, see friend messages
        </div>
        <div className="right" style={{ width: width > 1000 ? "50%" : "100%" }}>
          <div className="center-vertically">
            <div className="title">Together with your friends</div>
            <div className="description">
              Gratitude journaling does not have to be a solitary experience. You can invite friends and adjust the visibility of each message. Reading the gratitude messages of your friends is a good way to stay motivated to do the same and to learn what is important for them. 🫂
            </div>
          </div>
        </div>
      </div>

      <div className="block" style={{ background: "rgb(69,149,164)" }}>
        <div className="left" style={{ width: width > 1000 ? "50%" : "100%", height: "100%" }}>
          Ready to try? Button
        </div>
        <div className="right" style={{ width: width > 1000 ? "50%" : "100%", marginTop: width > 1000 ? 0 : "40px" }}>
          Want to see example of gratitude message ?
        </div>
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
            font-size: 40px;
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
          }

          .center-vertically {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
        `}
      </style>
    </div>
  )
}