import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer>
        <Link href='/'>
          <a className="link">
            Home
          </a>
        </Link>
        <Link href='/faq'>
          <a className="link">
            Frequently Asked Questions
          </a>
        </Link>
        <Link href='/terms_and_privacy'>
          <a className="link">
            Terms & Privacy
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
            color: white;
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
    </>
  )
}