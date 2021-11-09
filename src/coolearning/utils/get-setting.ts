import { getSettings } from './get-settings'
import { Parameter } from '../types'

/**
 * @description get a single setting element by parsing settings UI
 */
export function getSetting (parameter: Parameter): HTMLDivElement {
    const settings = getSettings ()

    // todo might want to write the setting in an HTML attribute instead
    const results = settings.filter (s => s.firstElementChild.innerText === parameter)

    if (results.length !== 1) throw new Error ('results length should be 1')

    return results[0]
}