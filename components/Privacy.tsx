export default function Privacy() {
  return (
    <div className="container">
      <div className="title">Privacy</div>
      <div className="line">You have full control over the data you enter into the website. Anything you write (messages, username, bio, account ...) can be accessed, edited or deleted at any time.</div>
      <div className="line">By default, all messages have the "private" visibility level, meaning that only the author can see them.</div>
      <div className="line">Messages with the "friends" visibility level can only be seen from the friends you have accepted (they send you a friend request, and you have accepted it).</div>
      <div className="line">The friendship status can be revoked at any time.</div>
      <div className="line">Messages with the "public" visibility level can be seen from everyone, even from people who don't have an account. They can be easily copied to other websites, so be careful about what you write in it.</div>
      <div className="line">The developer promises to never spy on content that is private or friend only.</div>
      <div className="line">The application stores no data that is not inherently needed for the goal of the application (social gratitude journaling).</div>
      <div className="line">Everything about your account (messages, profile, friendship statuses...) might be deleted after one year of inactivity depending on storage capacity.</div>
      <div className="line">The applications uses <a className="link" href="https://supabase.com/" target="_blank" rel="noopener noreferrer">Supabase</a> for its backend, especially for user authentication and database storage. The developer believes Supabase is a trustable company that will not spy on and leak database information. Developers would not work with them if they do.</div>
      <div className="line">No data is shared with third-parties.</div>
      <div className="line">The application will never be for-profit.</div>

      <style jsx>
        {`
          .title {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 15px;
          }

          .line {
            margin-top: 10px;
            margin-left: 10px;
          }
        `}
      </style>
    </div>
  )
}