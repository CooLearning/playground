/**
 * @description is the current environment assignable to development?
 */
export function isDevEnv (): boolean {
    return window.location.href.includes ('localhost')
}