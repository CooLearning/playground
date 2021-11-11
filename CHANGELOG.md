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
