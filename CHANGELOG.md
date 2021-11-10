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
