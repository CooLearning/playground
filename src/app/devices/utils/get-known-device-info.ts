import { Device, DeviceCategory } from '../device/device.types';
import { devicesState } from '../../state/devices.state';

type GetKnownDeviceInfo = {
  isKnown: boolean;
  isController?: boolean;
  isSelector?: boolean;
  settings?: Device;
}

/**
 * Get the device info for a known device.
 *
 * @param {string} manufacturer - The manufacturer of the device.
 * @param {string} name - The name of the device.
 * @returns {GetKnownDeviceInfo} - The device info.
 */
export function getKnownDeviceInfo (manufacturer: string, name: string): GetKnownDeviceInfo {
  const device = devicesState.knownDevices
    .filter ((d) => d.manufacturer === manufacturer)
    // .filter (d => name === d.name)
    .filter ((d) => name.includes (d.name))
    [0];

  if (device) {
    return {
      isKnown: true,
      isController: device.category === DeviceCategory.controller,
      isSelector: device.category === DeviceCategory.selector,
      settings: device,
    };
  }
  else {
    return {
      isKnown: false,
    };
  }
}
