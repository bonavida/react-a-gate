# react-a-gate

[![version](https://img.shields.io/npm/v/react-a-gate.svg)](https://www.npmjs.com/package/react-a-gate)
[![install-size](https://packagephobia.now.sh/badge?p=react-a-gate)](https://packagephobia.now.sh/result?p=react-a-gate)
[![license](https://img.shields.io/npm/l/react-a-gate.svg)](https://github.com/bonavida/react-a-gate/blob/master/LICENSE)

## Overview

`react-a-gate` is a React library for modals, tooltips and popovers. It uses the new React feature called [Portals](https://reactjs.org/docs/portals.html). Basically, a portal (ehem... a gate) allows you to render an element of a child component outside the DOM hierarchy by creating another top-level tree and injecting this component inside it.

## Demo

If you want to see the library in action, [here are some live demos](https://react-a-gate.bonavida.dev/).

## Requirements

- node 12.xx.x
- npm 6.x.x

## Installation

```sh
npm install react-a-gate
```

or

```sh
yarn add react-a-gate
```

## Usage

### Modal

1 . Import `ModalGate` after the installation.

```js
import { ModalGate } from 'react-a-gate';
```

2 . Add the ModalGate component into your JSX code.

```js
const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button className="App-button" onClick={openModal}>
        Open modal
      </button>
      <ModalGate id="app_modal" isOpen={isOpen} onClose={closeModal}>
        <>
          <div>This is a modal</div>
          <button className="App-button" onClick={closeModal}>
            Close modal
          </button>
        </>
      </ModalGate>
    </>
  );
};
```

You can also use a custom React component to be rendered inside the modal, like the example below:

```js
const Text = () => <div>This is some text</div>;

const App = () => {
  // ...
  <ModalGate id="app_modal" isOpen={isOpen} onClose={closeModal}>
    <Text />
  </ModalGate>;
  // ...
};
```

#### Props

| Property              | Type     | Default       | Description                                                                                                                                                                    |
| --------------------- | -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id                    | String   | -             | Identificator for the modal.<br>_Required_.                                                                                                                                    |
| rootId                | String   | `portal-root` | Identificator for the portal. If you already have a different root included in your HTML code, just put here the element id. If not, a new one will be created.                |
| className             | String   | -             | Property used to override the default CSS styles with custom ones.                                                                                                             |
| isOpen                | Boolean  | `false`       | Property used to show and hide the modal.<br>_Required_.                                                                                                                       |
| closeWhenClickOutside | Boolean  | `true`        | Enable or disable the closing of the modal when the user clicks outside.                                                                                                       |
| onClose               | Function | -             | Function that triggers the closing of the modal. It is used to close the modal when the user clicks outside the modal and when the user pressed the Escape key.<br>_Required_. |

### Tooltip

1 . Import `TooltipGate` after the installation.

```js
import { TooltipGate } from 'react-a-gate';
```

2 . Add the TooltipGate component into your JSX code.

```js
const App = () => (
  <TooltipGate content="This is some text" place="top">
    <button className="App-button">Hover me</button>
  </TooltipGate>
);
```

You can also use a custom React component to be rendered inside the tooltip, like the example below:

```js
const Text = () => <div>This is some text</div>;

const App = () => {
  <TooltipGate content={<Text />} place="top">
    <button className="App-button">Hover me</button>
  </TooltipGate>;
};
```

#### Props

| Property  | Type                 | Default       | Description                                                                                                                                                     |
| --------- | -------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rootId    | String               | 'portal-root' | Identificator for the portal. If you already have a different root included in your HTML code, just put here the element id. If not, a new one will be created. |
| className | String               | -             | Property used to override the default CSS styles with custom ones. It also overrides the current selected theme.                                                |
| content   | String / JSX Element | -             | Content that will be rendered inside the tooltip. It can be a simple string or a custom React component.<br>_Required_.                                         |
| place     | String               | `top`         | Property to set where the tooltip will be placed.<br>**Accepted values:** `top`, `bottom`, `left` and `right`.                                                  |
| theme     | String               | `dark`        | Property to set an already defined theme.<br>**Accepted values:** `light` and `dark`.                                                                           |
| offset    | Number               | `10`          | Distance between the trigger element and the tooltip.                                                                                                           |
| children  | ReactNode            | -             | The trigger element. It can be an HTMLElement or any custom React component. <br>_Required_.                                                                    |

### Popover

1 . Import `PopoverGate` after the installation.

```js
import { PopoverGate } from 'react-a-gate';
```

2 . Add the PopoverGate component into your JSX code.

```js
const App = () => (
  <PopoverGate content="This is some text" place="top">
    <button className="App-button">Click me</button>
  </PopoverGate>
);
```

You can also use a custom React component to be rendered inside the popover, like the example below:

```js
const Text = () => <div>This is some text</div>;

const App = () => {
  <PopoverGate content={<Text />} place="top">
    <button className="App-button">Click me</button>
  </PopoverGate>;
};
```

#### Props

| Property              | Type                 | Default       | Description                                                                                                                                                                                                                                                                                   |
| --------------------- | -------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| rootId                | String               | 'portal-root' | Identificator for the portal. If you already have a different root included in your HTML code, just put here the element id. If not, a new one will be created.                                                                                                                               |
| className             | String               | -             | Property used to override the default CSS styles with custom ones.                                                                                                                                                                                                                            |
| content               | String / JSX Element | -             | Content that will be rendered inside the popover. It can be a simple string or a custom React component.<br>_Required_.                                                                                                                                                                       |
| place                 | String               | `top`         | Property to set where the popover will be placed.<br>**Accepted values:** `top`, `bottom`, `left` and `right`.                                                                                                                                                                                |
| mode                  | String               | `click`       | Property to set the mode of the popover. `'click'` mode will open and close the popover when the user clicks at the trigger element, and the `'hover'` mode will open and close the popover when the user hovers in and out the trigger element.<br>**Accepted values:** `click` and `hover`. |
| closeWhenClickOutside | Boolean              | `true`        | Enable or disable the closing of the popover when the user clicks outside.                                                                                                                                                                                                                    |
| theme                 | String               | `dark`        | Property to set an already defined theme.<br>**Accepted values:** `light` and `dark`.                                                                                                                                                                                                         |
| offset                | Number               | `10`          | Distance between the trigger element and the popover.                                                                                                                                                                                                                                         |
| children              | ReactNode            | -             | The trigger element. It can be an HTMLElement or any custom React component. <br>_Required_.                                                                                                                                                                                                  |

### How to override CSS styles

Each component has a few styles by default. In case you want to override them, here are the main classes you need to override on your project:

#### Modal

```
modal__backdrop
  >  modal__content
modal__backdrop--active
  >  modal__content
```

#### Tooltip

```
tooltip__container
tooltip__arrow
tooltip__arrow-border
tooltip__inner
```

In case you want to customize the colors of the tooltip, here's an example of what you need to do:

```scss
.red {
  .tooltip__inner {
    background-color: #ac2121;
    border: 1px solid #700404;
  }

  .tooltip__arrow {
    border-color: #ac2121;
  }

  .tooltip__arrow-border {
    border-color: #700404;
  }
}
```

```jsx
<TooltipGate content="This is some text" className="red">
  <button className="App-button">Hover me</button>
</TooltipGate>
```

#### Popover

```
popover__container
popover__arrow
popover__arrow-border
popover__inner
```

In case you want to customize the colors of the popover, here's an example of what you need to do:

```scss
.red {
  .popover__inner {
    background-color: #ac2121;
    border: 1px solid #700404;
  }

  .popover__arrow {
    border-color: #ac2121;
  }

  .popover__arrow-border {
    border-color: #700404;
  }
}
```

```jsx
<PopoverGate content="This is some text" className="red">
  <button className="App-button">Click me</button>
</PopoverGate>
```
