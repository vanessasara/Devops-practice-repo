import FruitsList from './components/Fruits';

export default function Home() {
  return (
    <div>
	  <header className="App-header">
	          <h1>Fruit Management App</h1>
	        </header>
	        <main>
	          <FruitsList />
	        </main>
    </div>
  );
}
