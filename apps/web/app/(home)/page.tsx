import Banner from "./components/banner";
import HowItWorks from "./components/how-work";
import Search from "./components/search";

export default function HomePage() {
  return (
    <main className="flex-1 pb-16">
      <Banner />
      <Search />
      <HowItWorks />
    </main>
  );
}
