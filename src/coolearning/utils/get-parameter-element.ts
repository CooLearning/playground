import { PARAMETERS } from '../constants'
import { Parameter } from '../types'

type GetParameterElementProps = {
    parameter: Parameter,
}

/**
 * @description get parameter DOM element
 */
export function getParameterElement ({parameter}: GetParameterElementProps): any {
    const element = PARAMETERS[parameter]

    if (!element) throw new Error ('parameter does not exist')

    return element
}