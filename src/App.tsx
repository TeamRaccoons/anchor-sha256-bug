import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { sha256 } from "js-sha256";
import { BorshAccountsCoder } from "@coral-xyz/anchor";

function App() {
  const [webApiDiscriminator, setWebApiDiscriminator] = useState<Uint8Array>();

  useEffect(() => {
    (async () => {
      setWebApiDiscriminator(
        new Uint8Array(
          await crypto.subtle.digest(
            "sha-256",
            new TextEncoder().encode("account:Organisation")
          )
        ).slice(0, 8)
      );
    })();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Direct js-sha256 digest:{" "}
          {sha256.digest("account:Organisation").slice(0, 8)}
        </p>
        <p>
          Anchor discriminator{" "}
          {BorshAccountsCoder.accountDiscriminator("Organisation")}
        </p>
        <p>crypto.subtle digest: {webApiDiscriminator}</p>
        <p>
          Expected discriminator:{" "}
          {new Uint8Array([100, 235, 183, 55, 240, 174, 86, 191])}
        </p>
      </header>
    </div>
  );
}

export default App;
