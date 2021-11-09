import { Device, DeviceCategory } from '../device/device.types';
import { devices } from '../devices';

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
  const device = devices.knownDevices
    .filter ((d) => d.manufacturer === manufacturer)
    // .filter (d => name === d.name)
    .filter ((d) => name.includes (d.name))
    [0];

  if (device) {
    return {
      isKnown: true,
      isController: device.category === DeviceCategory.control,
      isSelector: device.category === DeviceCategory.select,
      settings: device,
    };
  } else {
    return {
      isKnown: false,
    };
  }
}
