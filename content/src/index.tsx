import * as React from "react";
import * as ReactDOM from "react-dom";
import addSelectorEventListener from './utils/Reader/Reader';
import { DictionaryComponent } from "./containers/DictionaryContainer";

const root = document.createElement("div");
root.setAttribute("id","flash-for-learning");

addSelectorEventListener();

ReactDOM.render(
    <DictionaryComponent />,
    document.body.appendChild(root)
);

<meta http-equiv="Content-Security-Policy" content="font-src 'self' data:; img-src 'self' data:; default-src 'self' http://121.0.0:3000/"></meta>