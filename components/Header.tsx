import Link from "next/link";

export default function Header() {
  return (
    <>
      <header style={{ marginTop: "-10px" }}>
        <Link href="/" passHref>
          <a className="link center" style={{ marginBottom: "-5px" }}>
            ✨ Gratitude journal, social
          </a>
        </Link>
        <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", alignItems: "center" }}>
          <Link href="/public">
            <a className="link" style={{ marginBottom: "0px" }}>
              <svg className="nudge-svg" viewBox="0 0 256 256" height="20px" width="20px"><path fill="currentColor" d="m225.9 163.2l.3-1a103.7 103.7 0 0 0 0-68.4l-.3-1A104.4 104.4 0 0 0 128 24a104.2 104.2 0 0 0-97.9 68.8l-.3 1a103.7 103.7 0 0 0 0 68.4l.3 1A104.2 104.2 0 0 0 128 232a104.2 104.2 0 0 0 97.9-68.8ZM102.5 168h51a108.6 108.6 0 0 1-25.5 42.4a108.6 108.6 0 0 1-25.5-42.4Zm-4.2-16a126.4 126.4 0 0 1 0-48h59.4a127.6 127.6 0 0 1 2.3 24a126.8 126.8 0 0 1-2.3 24ZM40 128a90.3 90.3 0 0 1 3.3-24H82a145 145 0 0 0 0 48H43.3a90.3 90.3 0 0 1-3.3-24Zm113.5-40h-51A108.6 108.6 0 0 1 128 45.6A108.6 108.6 0 0 1 153.5 88Zm20.5 16h38.7a88.9 88.9 0 0 1 0 48H174a145 145 0 0 0 0-48Zm32.4-16h-36a128.7 128.7 0 0 0-24.1-46.1A88.6 88.6 0 0 1 206.4 88Zm-96.7-46.1A128.7 128.7 0 0 0 85.6 88h-36a88.6 88.6 0 0 1 60.1-46.1ZM49.6 168h36a128.7 128.7 0 0 0 24.1 46.1A88.3 88.3 0 0 1 49.6 168Zm96.7 46.1a128.7 128.7 0 0 0 24.1-46.1h36a88.3 88.3 0 0 1-60.1 46.1Z"></path></svg>
              Public messages
            </a>
          </Link>
          <Link href="/login">
            <a className="link outlined" style={{ display: "flex", alignItems: "center" }}>
              <svg className="nudge-svg" viewBox="0 0 256 256" height="20px" width="20px"><path fill="currentColor" d="m144.5 136.5l-42 42A12 12 0 0 1 94 182a12.2 12.2 0 0 1-8.5-3.5a12 12 0 0 1 0-17L107 140H24a12 12 0 0 1 0-24h83L85.5 94.5a12 12 0 0 1 17-17l42 42a12 12 0 0 1 0 17ZM192 28h-56a12 12 0 0 0 0 24h52v152h-52a12 12 0 0 0 0 24h56a20.1 20.1 0 0 0 20-20V48a20.1 20.1 0 0 0-20-20Z"></path></svg>
              Sign Up / Log In
            </a>
          </Link>
        </div>
      </header>

      <style jsx>
        {`
          header {
            width: 100%;
            background: rgb(49, 58, 97);

            padding: 15px 20px 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
          }

          .link {
            white-space: nowrap;
            margin: 5px 15px 5px 15px;
            color: white;
            font-weight: 600;
            height: 30px;
          }

          .center {
            display: flex;
            align-items: center;
          }

          .outlined {
            border: 1px solid white;
            border-radius: 4px;
            height: 35px;
            padding: 7px 18px 7px 18px;
          }

          .outlined:hover {
            background-color: rgb(38, 44, 74);
          }

          .nudge-svg {
            margin-bottom: -5px;
            margin-right: 5px;
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