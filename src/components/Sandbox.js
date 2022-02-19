import React from "react";
import { Sandpack } from "@codesandbox/sandpack-react";

import "@codesandbox/sandpack-react/dist/index.css";

export default function Sandbox({
  config,
  openPaths = [],
  editorHeight = 650,
  activePath = "",
  autorun = true,
}) {
  return (
    <Sandpack
      theme="monokai-pro"
      customSetup={config}
      options={{
        showLineNumbers: true,
        wrapContent: true,
        editorHeight,
        openPaths,
        activePath,
        autorun,
      }}
    />
  );
}
