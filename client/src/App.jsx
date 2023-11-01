import { EthProvider } from "./contexts/EthContext";
import Demo from "./components/Demo";
import CreateVC from "./components/IPFS/CreateVC";
function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Demo />
          <CreateVC></CreateVC>
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
