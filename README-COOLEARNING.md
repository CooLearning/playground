# CooLearning

## 📖 Context

The `CooLearning` project is a Proof of Concept based
on [tensorflow/playground](https://github.com/tensorflow/playground).

It aims to bring interactivity to the existing user interface with USB controllers by using WebMIDI.

It has been authored at [CREATIS Laboratory](https://www.creatis.insa-lyon.fr/site7/fr) (Lyon, France).

## 🚀 Features

There are two main categories of devices you can attach.

### 🖱️ Selector

This usually provides a grid of colored backlit pads.

- Use the grid to display the inputs, neurons and output of the current neural network
    - Color code:
        - `gray` disabled node
        - `yellow` input (enabled)
        - `green` neuron (enabled)
        - `blue` neuron (selected)
        - `purple` output's input link / weight
    - Short press action:
        - `enable` or `disable` inputs or output input weights
        - `select` or `unselect` neurons
    - Long press action:
        - `enable` or `disable` neurons

### 🎛️ Controller

This device usually provides faders, potentiometers and buttons.

- Use faders to control **input weights** of selected **neurons**
- Use potentiometers to control **activation curves**, etc. of selected **neurons**
- Use buttons to play, pause or reset the neural network iterations.

## 🧮 Constraints

### 🧵 Short term

- Locked base playground state until later rewrite and merge.
- No compatibility with unknown devices until creation of a mapping manager.

### 🧶 Long term

- `chrome` only compatibility
- `selector` at least 64 pads
- `controller` at least 8 faders
- `d3` version 3 dependency

## 💫 More

The project is under development and is prior to first release.

Versioning will be decided after [current discussion](https://github.com/tensorflow/playground/issues/160) of potential
contribution to [tensorflow/playground](https://github.com/tensorflow/playground).

### 👁️ Branch Previews

- [dev/playground](https://playground-git-dev-playground-bamdad.vercel.app)

### 🔨 Development environment

```shell
git clone https://github.com/bamdadsabbagh/playground.git
cd playground
yarn
yarn start
# navigate to http://localhost:5000
```

## 📚 Supported Devices

### [Novation Launchpad X](https://novationmusic.com/en/launch/launchpad-x)

![](https://novationmusic.com/sites/novation/files/lpx-overhead-391-390.png)

### [Novation Launch Control XL](https://novationmusic.com/en/launch/launch-control-xl)

![](https://novationmusic.com/sites/novation/files/LCXL-overhead-1067-1062.png)
