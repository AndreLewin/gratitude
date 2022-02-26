import { Button } from "@mantine/core";
import Link from "next/link";
import GratitudeList from "../components/GratitudeList";
import Navigation from "../components/Navigation";
import RedirectIfNotAuthenticated from "../components/RedirectIfNotAuthenticated";
import store from "../store";

export default function Home() {
  return (
    <RedirectIfNotAuthenticated>
      <Navigation>
        <Link href="/" passHref>
          <Button component="a">
            Go to index (WIP)
          </Button>
        </Link>

        <GratitudeList />
      </Navigation>
    </RedirectIfNotAuthenticated>
  )
}