export default function Terms() {
  return (
    <div className="container">
      <div className="title">Terms</div>
      <div className="term">➡️ You must be at least 13 years old to use the application.</div>
      <div className="term">➡️ The application should only be used to write down (and eventually share) gratitude messages.</div>
      <div className="explain">Do not use the application as a messaging app. It's not a Twitter or Messenger alternative! If you wish to be contacted by other users, you can leave a link to your social media profiles in your bio.</div>
      <div className="term">➡️ Do not post offensive content.</div>
      <div className="explain">The application is moderated. If a moderator considers that a content is not fitting for a gratitude platform they can turn it private or delete it.</div>
      <div className="term">➡️ Do not post adult themed content publicly.</div>
      <div className="explain">Keep those private.</div>
      <div className="term">➡️ Do not enter absolutely confidential information.</div>
      <div className="explain">Even if we do our best, the internet will never be as trustworthy and secretive as pen and paper.</div>

      <style jsx>
        {`
          .title {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 15px;
          }

          .term {
            font-weight: 600;
            margin-top: 10px;
          }

          .explain {
            margin-left: 28px;
            opacity: 0.7;
            margin-top: 3px;
          }
        `}
      </style>
    </div>
  )
}