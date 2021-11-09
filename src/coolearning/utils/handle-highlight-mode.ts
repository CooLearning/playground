import { PARAMETERS } from '../constants'
import { getDeepestFirstChild } from './get-deepest-first-child'

/**
 * @description highlight mode handler
 */
export function handleHighlightMode (enable = true): void {

    // global pointer style
    document.body.style.cursor = enable ? 'crosshair' : 'auto'

    // intercept click
    const onGlobalClick = function (e) {
        // todo might need to set an HTML attribute to all parameter targets
        e.stopPropagation ()
        e.preventDefault ()
        e.stopImmediatePropagation ()
        console.log ('click intercepted', e, e.target, e.currentTarget)
        const targetElement = getDeepestFirstChild (e.target)
        console.log (targetElement)
        const closestElement = targetElement.closest ('#learningRate, #reset-button')
        console.log (closestElement)
    }

    document.onclick = enable ? onGlobalClick : undefined

    // change parameters
    Object.keys (PARAMETERS).forEach (index => {
        const parameter = PARAMETERS[index]

        // pointer events
        parameter.style.pointerEvents = enable ? 'none' : 'auto'

        // background
        parameter.style.background = enable ? 'red' : null
    })
}