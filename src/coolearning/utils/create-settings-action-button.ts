import { CLASSES } from '../constants'
import { SettingsActions } from '../enums'
import { Parameter } from '../types'

type CreateSettingsActionButtonProps = {
    action: SettingsActions,
    parameter: Parameter,
}

/**
 * @description create action button for given parameter
 * appears inside settings UI
 */
export function createSettingsActionButton (
    {
        action = SettingsActions.Learn,
        parameter,
    }: CreateSettingsActionButtonProps,
): HTMLButtonElement {
    if (!action) throw new Error ('action is not defined')
    if (!parameter) throw new Error ('parameter is not defined')
    if (typeof action !== 'string') throw new Error ('type is not a string')
    if (typeof parameter !== 'string') throw new Error ('parameter is not a string')

    let button = null

    switch (action) {
        case SettingsActions.Learn:
            button = `<button class="${CLASSES.actions.learn}" parameter="${parameter}">Learn</button>`
            break
        case SettingsActions.Unlearn:
            button = `<button class="${CLASSES.actions.unlearn}" parameter="${parameter}">x</button>`
            break
        default:
            throw new Error ('action type not found')
    }

    return button
}