import { CLASSES } from '../constants'

/**
 * @description get settings content DOM element
 */
export function getSettingsContent (): HTMLDivElement {
    return document.getElementsByClassName (CLASSES.settings.content)[0] as HTMLDivElement
}