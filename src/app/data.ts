export interface Data {
  'nodes': Node[],
}

export interface Node {
  'id': string,
  'label': string,
  'nodeType': string,
  'expandedIcon': string,
  'collapsedIcon': string,
  'parent'?: Node,
  'children'?: Node[],
  'droppable'?: boolean,
  'draggable'?: boolean,
  'selectable'?: boolean,
  'icon'?: string
}
