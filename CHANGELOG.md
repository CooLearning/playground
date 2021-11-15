# [1.9.0](https://github.com/CooLearning/playground/compare/v1.8.2...v1.9.0) (2021-11-15)


### Bug Fixes

* **devices/controller:** draw unsnapped for select modes after waiting the first draw ([5682a37](https://github.com/CooLearning/playground/commit/5682a3791816a16070800aca3aa76dcdc9b51543))
* make the selector device re-render the layer buttons on the playground UI ([cb1f150](https://github.com/CooLearning/playground/commit/cb1f1503675f065aec5b4cea398206fbe189ada5))
* **state/devices:** save store when unpicking device ([ddb07e9](https://github.com/CooLearning/playground/commit/ddb07e9efb017b6bc5ff4c9d484bbb38c6814d89))


### Features

* add imports-exports ui + remove old reset button + add very basic import logic without overwriting strategy ([714b107](https://github.com/CooLearning/playground/commit/714b10763b21862b159133c3f81e2a0cf11ca339))
* add new imports/exports dialog (work in progress) ([84c5d6a](https://github.com/CooLearning/playground/commit/84c5d6a73614e77cca686653d0c451628b91effc))
* allow layers to interact with the mouse ([d8af52c](https://github.com/CooLearning/playground/commit/d8af52cc1310dfc579906abfc77ce8645f5438e1))


### Performance Improvements

* **devices/controller:** better lights management ([3281729](https://github.com/CooLearning/playground/commit/3281729a62de6d6b25bb5127f2152cfc7d18b4f5))
* **devices:** set blinking interval to 400ms ([d084899](https://github.com/CooLearning/playground/commit/d084899387f989396de9eba48f989f6304418133))

## [1.8.2](https://github.com/CooLearning/playground/compare/v1.8.1...v1.8.2) (2021-11-15)


### Performance Improvements

* **devices:** switch colors on selector for layers (now yellow) and inputs (now blue) to match with controller ([e908c0c](https://github.com/CooLearning/playground/commit/e908c0c9351e513b10084cddab12a13d7a5fa44d))

## [1.8.1](https://github.com/CooLearning/playground/compare/v1.8.0...v1.8.1) (2021-11-15)


### Bug Fixes

* **store:** remove infinite delete loop when store is not defined ([bf088f0](https://github.com/CooLearning/playground/commit/bf088f074050fdf3881e060d0bb92809cf2aaf39))

# [1.8.0](https://github.com/CooLearning/playground/compare/v1.7.0...v1.8.0) (2021-11-15)


### Features

* add storage management + on the fly save/load for mappings and devices with UI sync + remove delays for faster device boot sequences + add reset method to device prototype ([80bb5aa](https://github.com/CooLearning/playground/commit/80bb5aaf5e335defb09d552bce31a2446284616b))

# [1.7.0](https://github.com/CooLearning/playground/compare/v1.6.1...v1.7.0) (2021-11-15)


### Features

* add LAYER mode (card + selector + controller) + add small various improvements ([f82122c](https://github.com/CooLearning/playground/commit/f82122c2b7a8e58893f9cc2bcc4bf3c4b1e1966a))


### Performance Improvements

* **device/prototype:** apply `stroustrup` code style + set default interval at `200` ms ([ad429bb](https://github.com/CooLearning/playground/commit/ad429bb8fa532e7eed311fce9d8f85cc2a7b5c0b))
* **UI:** rename `neuron-card` to `select-card` ([276f543](https://github.com/CooLearning/playground/commit/276f5432c3136a5851809a16caefe7e9173e47a1))

## [1.6.1](https://github.com/CooLearning/playground/compare/v1.6.0...v1.6.1) (2021-11-14)


### Bug Fixes

* **device/controller:** add sanity checks when changing sources ([8672d5a](https://github.com/CooLearning/playground/commit/8672d5ae923cb30bebbd0e711134edcee42ab08e))
* **device/controller:** reverse third row bindings as to control regularization rates by default and regularization types when shift key is pressed ([b24bb8b](https://github.com/CooLearning/playground/commit/b24bb8b9452696c67236719432b933bba57ebdc4))
* **device/selector:** add sanity check before updating lights ([f91dcd1](https://github.com/CooLearning/playground/commit/f91dcd1822e2fab87a542ba759dc1c8ed4053196))
* **UI/neuron-card:** set title items to singular ([48e4824](https://github.com/CooLearning/playground/commit/48e4824b59a08133f8607d7c0e31da8eb65dd692))

# [1.6.0](https://github.com/CooLearning/playground/compare/v1.5.0...v1.6.0) (2021-11-14)


### Features

* modify original playground to allow on the fly meta parameters change + add controls from controller device + add meta parameters to neuron-card + add bias setters + add shift mode on controller device + various improvements ([bedb04a](https://github.com/CooLearning/playground/commit/bedb04a10ca7bf5e9cbe3a2acf94786999caff1e))

# [1.5.0](https://github.com/CooLearning/playground/compare/v1.4.1...v1.5.0) (2021-11-12)


### Bug Fixes

* devices and mappings semantics were inverted ([4370272](https://github.com/CooLearning/playground/commit/437027250becc6e18655c8dbd021f9d24243c3de))


### Features

* add and use `updateWeightsUI` in playground facade so that we can render efficiently while updating weights with our `controller` ([ae2b0a5](https://github.com/CooLearning/playground/commit/ae2b0a5783fc0b659b2317ca9daf2b29b1bae376))


### Performance Improvements

* **state/network:** grab neuron element only when building targets ([6a76ef4](https://github.com/CooLearning/playground/commit/6a76ef4ecdb438412a8299379ec98a999a5b8d5b))

## [1.4.1](https://github.com/CooLearning/playground/compare/v1.4.0...v1.4.1) (2021-11-12)


### Bug Fixes

* **help:** set relative paths to device drawings ([a0f63a9](https://github.com/CooLearning/playground/commit/a0f63a9c3785242201ba3b5ead7075e439fb2cd9))

# [1.4.0](https://github.com/CooLearning/playground/compare/v1.3.0...v1.4.0) (2021-11-12)


### Features

* **help:** add new help UI + add detailed drawing for novation launchpad X + update build command ([e8df82b](https://github.com/CooLearning/playground/commit/e8df82b54430afbcfc5b95ef0a81502e3953e2c7))

# [1.3.0](https://github.com/CooLearning/playground/compare/v1.2.1...v1.3.0) (2021-11-12)


### Bug Fixes

* make a click on play pause update light on selector device ([df5532b](https://github.com/CooLearning/playground/commit/df5532be1a6297003bd4273a4ff1f7280bb37496))


### Features

* add automatic unsnap after setting a weight with `controller` device ([2818b97](https://github.com/CooLearning/playground/commit/2818b97fc08f00278273d708e9b9657d46e439db))
* add navigation global buttons for selector device (assign the last button of the last column to play/pause) ([26e1951](https://github.com/CooLearning/playground/commit/26e19510347604546b6d6ea3e0e5505f24df193c))
* **device prototype:** add blinking light feature + add new `isToggle` argument for `addControlListener` as some buttons can act like controls ([b96917b](https://github.com/CooLearning/playground/commit/b96917bd2fa41851b9844ddd0d8a68088823c4ec))
* embed version from package.json to main `app` object ([79b104d](https://github.com/CooLearning/playground/commit/79b104d326a64138679d4c93562329bbf557aedd))
* keep rendering the network upon changes even if playback is paused + improve new weight performance from selector device (rounded value) ([086c068](https://github.com/CooLearning/playground/commit/086c0688eb396d932da83ee411701bcd0ab98ed3))
* **playground:** make dead links transparent ([ff41643](https://github.com/CooLearning/playground/commit/ff4164309e3ab3044d0b1caeca8242c239ad0f9a))
* **selector:** add new (dummy) layer events handler (WIP) ([61605ac](https://github.com/CooLearning/playground/commit/61605ac31cb4767778a0c91efaff288b54d1f6d4))


### Performance Improvements

* **eslint:** update dependency and configuration ([db63018](https://github.com/CooLearning/playground/commit/db63018ce3b40fc32232aeddf23a8b71c2e1864c))
* **playground:** disable original `link-hover` ([98dacc6](https://github.com/CooLearning/playground/commit/98dacc6d8a683c5ca4efda1182494f7bc6a5e41e))
* temporarily disable very costly UI rendering call ([9e19b54](https://github.com/CooLearning/playground/commit/9e19b54c30e56a03fcbddff6dcbe8f7326a5395e))

## [1.2.1](https://github.com/CooLearning/playground/compare/v1.2.0...v1.2.1) (2021-11-11)


### Bug Fixes

* add checks before drawing lights on devices + better method semantics + changing values in the neuron UI updates the weights + various improvements ([8842d14](https://github.com/CooLearning/playground/commit/8842d143a95cdcbb1a15d8b435be5be3dfc51868))
* **state/devices:** remove useless argument in pick + set false attribute on unpick + create a common `pickDevice` function ([d19690d](https://github.com/CooLearning/playground/commit/d19690d1ee582d74a0198ca0a062b500d4d5455d))
* **ui/mappings:** disable learning mode if parameter is already mapped ([2e4fd4e](https://github.com/CooLearning/playground/commit/2e4fd4e8b41e1844c6b526fac76ccd72cdcce494))


### Performance Improvements

* **controller-device:** better event listeners handling ([cae298b](https://github.com/CooLearning/playground/commit/cae298b6c9e3b32a9fccda68f33dccfd25b01126))
* **controllerDevice:** rewrite `is*Mode` attributes with get accessors ([104a6b2](https://github.com/CooLearning/playground/commit/104a6b29b2d2a6bbf86b718789e6e7c3f02ccbc4))
* **devices:** use more explicit handler names for note events + add comments ([5a9e959](https://github.com/CooLearning/playground/commit/5a9e95961ba8fa558181138b554d86003c3a692a))
* prefer shorter syntax for optional parameters (`?` instead of `= undefined`) ([1874aa5](https://github.com/CooLearning/playground/commit/1874aa526939ba8c56f3ee63268916a4c299359f))
* **selectorDevice:** add call for removing listeners before attaching events (might be redundant, but it's OK) ([13045c5](https://github.com/CooLearning/playground/commit/13045c521776688c3d308f143400e56284dcba47))
* **state:** remove unused global state object ([c82ea32](https://github.com/CooLearning/playground/commit/c82ea32082cbb50ad8bae03daf54ff827533e949))

# [1.2.0](https://github.com/CooLearning/playground/compare/v1.1.3...v1.2.0) (2021-11-10)


### Features

* Migrate old mapping UI to new dialog based UI + Use new `MappingChipComponent` to display mappings + Small improvements and dead code removal ([6d49897](https://github.com/CooLearning/playground/commit/6d498976de1c07c5cd1a283656a5dc406fb51e85))

## [1.1.3](https://github.com/CooLearning/playground/compare/v1.1.2...v1.1.3) (2021-11-10)


### Bug Fixes

* **release:** Archive release before adding to released assets ([32b26a4](https://github.com/CooLearning/playground/commit/32b26a4a5cb091650c684a8c5706087e50249502))

## [1.1.2](https://github.com/CooLearning/playground/compare/v1.1.1...v1.1.2) (2021-11-10)


### Bug Fixes

* **release:** Handle asset generation and upload directly with `semantic-release` ([830b51c](https://github.com/CooLearning/playground/commit/830b51c1ffa6c7466dcb18dc25055c7c18044a86))

## [1.1.1](https://github.com/CooLearning/playground/compare/v1.1.0...v1.1.1) (2021-11-10)


### Bug Fixes

* **release:** Improve `publish-and-deploy` performance + Correctly add the archive to released assets ([fa47dd3](https://github.com/CooLearning/playground/commit/fa47dd35f3708dd85b860c450b0f2a293372b3e1))

# [1.1.0](https://github.com/CooLearning/playground/compare/v1.0.2...v1.1.0) (2021-11-10)


### Features

* Add devices UI for dynamic selection of MIDI ports + Make the MIDI service populate the state of available devices + Add various improvements ([bb08a36](https://github.com/CooLearning/playground/commit/bb08a36a0b1a557bbb3a07882a9dfc0dbfbc5a22))
* Handle disconnections for picked devices (selector/controller) + Add dynamic rendering to devices UI ([85fd764](https://github.com/CooLearning/playground/commit/85fd76461556a205dce58d2d8cf5d8a6f5f5067e))

## [1.0.2](https://github.com/CooLearning/playground/compare/v1.0.1...v1.0.2) (2021-11-10)


### Bug Fixes

* **network:** make sure to keep weight dead if dest./source node is disabled ([6fc9b3a](https://github.com/CooLearning/playground/commit/6fc9b3ac6e0fed4091b680becf6c80900fb9c60e))

## [1.0.1](https://github.com/CooLearning/playground/compare/v1.0.0...v1.0.1) (2021-11-10)


### Bug Fixes

* a long click with the mouse on the playground to disable a neuron now correctly unselect it + migrate playground UI logic from facade to view model ([f478ec4](https://github.com/CooLearning/playground/commit/f478ec4aa2b7ddeeb9d6a67ef4059d0d68261f7e))
* **device/controller:** add a check when trying to update a undefined input weight ([0100772](https://github.com/CooLearning/playground/commit/010077279bded8609c99cf6fa44db7c2cb7ef6f7))


### Performance Improvements

* migrate learn/unlearn logic from state to view model ([d09d9b7](https://github.com/CooLearning/playground/commit/d09d9b7eed42281a4ec2f82b823edc29b2cb5c62))
* migrate old state into new model + add parameters UI view model ([6d6b484](https://github.com/CooLearning/playground/commit/6d6b4849a9232355ef709a8d1606d41d2820f916))
* remove prototypes methods + remove unused statements ([1e796fd](https://github.com/CooLearning/playground/commit/1e796fd70e55152422fb19876bc01b1a29bd5417))

# 1.0.0 (2021-11-09)


### Features

* initial commit ([fb76b1b](https://github.com/CooLearning/playground/commit/fb76b1baf11405f6859779f4b2cdbdf04c57b0d2))
