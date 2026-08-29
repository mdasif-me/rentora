import Banner from "./components/banner";
import HowItWorks from "./components/how-work";
import { PopularDeals } from "./components/popular-deals";
import Search from "./components/search";

export default function HomePage() {
  return (
    <main className="flex-1 pb-16">
      <Banner />
      <Search />
      <HowItWorks />
      <PopularDeals />
    </main>
  );
}
