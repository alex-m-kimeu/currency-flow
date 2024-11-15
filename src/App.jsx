import { CurrencyList } from "./components/CurrencyList"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { SearchBox } from "./components/SearchBox"

function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SearchBox />
      <main className="flex-grow">
        <CurrencyList/>
      </main>
      <Footer />
    </div>
  )
}

export default App
