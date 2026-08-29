import Banner from "./components/banner";
import Search from "./components/search";

export default function HomePage() {
  return (
    <main className="flex-1 pb-16">
      <Banner />
      <Search />
    </main>
  );
}
