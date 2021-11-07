import { b, div, h1, h2, p } from "../elements/dom";
import diff from "../renderer/diff";
import mount from "../renderer/mount";
import render from "../renderer/render";

const createApp = (count: number) => div({
  attrs: { id: "app" },
  children: [
    div({
      attrs: { id: "header" },
      children: [
        h1({
          attrs: { id: "title" },
          children: ["Hello World"],
        }),
      ],
    }),
    div({
      attrs: { id: "content" },
      children: [
        div({
          attrs: { id: "main" },
          children: [
            h2({
              attrs: { id: "main-title" },
              children: ["Main"],
            }),
            p({
              attrs: { id: "count" },
              children: [
                b({
                  attrs: { id: "count-label" },
                  children: [`Count: `],
                }),
                String(count)
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});

let App = createApp(0);
const $app = render(App);
let $rootEl = mount($app, document.getElementById('root'));

setInterval(() => {
  const n = Math.floor(Math.random() * 10);
  const newApp = createApp(n);

  const patch = diff(App, newApp);

  $rootEl = patch($rootEl);

  App = newApp;
}, 1000);
