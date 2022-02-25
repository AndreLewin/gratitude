import { Button } from "@mantine/core";
import Link from "next/link";

export default function Home() {
  // TODO: redirect if not authenticated
  return (
    <div>

      <Link href="/" passHref>
        <Button component="a">
          Go to index (WIP)
        </Button>
      </Link>

    </div>
  )
}
    // <div>
    //   WIP
    //   {<IndexConnected key={session.user?.id} session={session} />}
    // </div>