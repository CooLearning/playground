export function getDeepestFirstChild (element: Element): Element {
    let node = element
    while (typeof node.children[0] !== 'undefined') node = node.children[0]
    return node
}