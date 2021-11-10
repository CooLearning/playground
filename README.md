# CooLearning: playground

## 📖 Context

This project is an evolution based
on [tensorflow/playground](https://github.com/tensorflow/playground).

It aims to bring interactivity to the user interface with USB controllers by
using WebMIDI.

It has been authored
at [CREATIS Laboratory](https://www.creatis.insa-lyon.fr/site7/fr) (Lyon,
France).

## 🚀 Features

There are two main categories of devices you can attach.

### 🖱️ Selector

This usually provides a grid of colored backlit pads.

- Use the grid to display the inputs, neurons and output of the current neural
  network
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
- Use potentiometers to control **activation curves**, etc. of selected **
  neurons**
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

Publishing and versioning is automatic upon any changes done to the `master`
branch.

### 🌐 Online version

Available [here](https://coolearning.github.io/playground).

### ⚡ Offline version

- Go to [releases](https://github.com/CooLearning/playground/releases)
- Download the `coolearning-playground-v{version}.zip` asset
- Unzip the archive
- Open `index.html` with chrome

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

<img alt="novation launchpad x" width="200px" src="https://novationmusic.com/sites/novation/files/lpx-overhead-391-390.png">

### [Novation Launch Control XL](https://novationmusic.com/en/launch/launch-control-xl)

<img alt="novation launch control xl" width="200px" src="https://novationmusic.com/sites/novation/files/LCXL-overhead-1067-1062.png">
