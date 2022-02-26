import { Button } from "@mantine/core";
import Link from "next/link";
import Navigation from "../components/Navigation";
import RedirectIfNotAuthenticated from "../components/RedirectIfNotAuthenticated";

export default function Home() {
  return (
    <RedirectIfNotAuthenticated>
      <Navigation>
        <Link href="/" passHref>
          <Button component="a">
            Go to index (WIP)
          </Button>
        </Link>
      </Navigation>
    </RedirectIfNotAuthenticated>
  )
}