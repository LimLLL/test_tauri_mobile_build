import {useState} from "react";
import reactLogo from "./assets/react.svg";
import {invoke} from "@tauri-apps/api/core";
import "./App.css";
// import {checkPermissions, getCurrentPosition, requestPermissions} from '@tauri-apps/plugin-geolocation'
import VConsole from "vconsole";
import { Map, APILoader, ScaleControl, ToolBarControl, ControlBarControl, Geolocation } from '@uiw/react-amap';

const vConsole = new VConsole({ theme: 'dark' });

// async function getLocation() {
//   let permissions = await checkPermissions()
//   if (
//     permissions.location === 'prompt'
//     || permissions.location === 'prompt-with-rationale'
//   ) {
//     permissions = await requestPermissions(['location'])
//   }
//
//   if (permissions.location === 'granted') {
//     return await getCurrentPosition().then(res => res)
//   }
// }


function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState({});

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
      <br/>

      <APILoader akey={'121d0d8da90c335b09729991efaa8b20'}>
        <Map style={{height: 300}} zoom={10}>
          <ScaleControl offset={[16, 30]} position="LB" />
          <ToolBarControl offset={[16, 10]} position="RB" />
          <ControlBarControl offset={[16, 180]} position="RB" />
          <Geolocation
            maximumAge={100000}
            borderRadius="5px"
            position="RB"
            offset={[16, 80]}
            zoomToAccuracy={true}
            showCircle={true}
          />
        </Map>
      </APILoader>

      {/*<button*/}
      {/*  onClick={async () => {*/}
      {/*    const location = await getLocation()*/}
      {/*    console.log(location)*/}
      {/*    console.log(await checkPermissions())*/}
      {/*    setLocation(location)*/}
      {/*    alert(JSON.stringify(location))*/}
      {/*  } }*/}
      {/*  className="btn"*/}
      {/*>*/}
      {/*  Get User Location*/}
      {/*</button>*/}

      {/*<p>*/}
      {/*  {*/}
      {/*    JSON.stringify(location)*/}
      {/*      .replaceAll('{', '{\n')*/}
      {/*      .replaceAll('}', '\n}')*/}
      {/*      .replaceAll(',', ',\n')*/}
      {/*      .replaceAll(':', ': ')*/}
      {/*      .replaceAll('"', '')*/}
      {/*  }*/}
      {/*</p>*/}

    </main>
  );
}

export default App;
