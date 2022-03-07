import GratitudeList from "../components/GratitudeList";
import Navigation from "../components/Navigation";
// import RedirectIfNotAuthenticated from "../components/RedirectIfNotAuthenticated";

export default function Public() {
  return (
    // <RedirectIfNotAuthenticated>
    <Navigation>
      <GratitudeList mode={"public"} />
    </Navigation>
    // </RedirectIfNotAuthenticated>
  )
}