import { Button } from "@mantine/core";
import Link from "next/link";
import RedirectIfNotAuthenticated from "../components/RedirectIfNotAuthenticated";

export default function Home() {
  return (
    <RedirectIfNotAuthenticated>
      <Link href="/" passHref>
        <Button component="a">
          Go to index (WIP)
        </Button>
      </Link>
    </RedirectIfNotAuthenticated>
  )
}