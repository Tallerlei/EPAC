import { Injectable } from '@angular/core';

// Interface
import { Node } from '../data';

// Services
import { DataStoreService } from './data-store.service';

@Injectable()
export class UtilityService {

  constructor(
    private dataStoreService: DataStoreService
  ) { }

  /**
   * Changes selectedNode
   * @param  {Node} node        according to Interface
   * @param  {number} direction -1 equals previous array item, 1 next array item
   * @return {Node}             returns new selectedNode
   */
  selectNode(node: Node, direction: number) {
    // edge case for root element
    if (typeof node.parent === 'undefined') {
      return node;
    }
    let parent = node.parent;
    let position = parent.children.indexOf(node);
    let nextNode = parent.children[position + direction];
    // next node does not exist e.g. node is at beginning or end of array
    if (typeof nextNode === 'undefined') {
      return node;
    } else {
      return nextNode;
    }
  }

  /**
   * move selected Node in model arround
   * @param  {Node} node        node which shall be moved
   * @param  {number} direction -1 equals previous array item, 1 next array item
   * @return {void}
   */
  moveItem(node: Node, direction: number) {
    let array;
    // Database shall not be moveable
    // Level movement is configurable in dataStoreService. Should get the config data from an extra file someday
    if (typeof node.parent === 'undefined' || node.type === 'database' || node.type === 'level' && this.dataStoreService.allowLevelMovement === false) {
      return;
    } else {
      array = node.parent.children;
    }
    let from = array.indexOf(node);
    let to = from + direction;
    // invalid target
    if (to === -1) {
      return;
    }
    // the actual moving happens here
    array.splice(to, 0, array.splice(from, 1)[0]);
  }

  /**
   * inserts node copy into given array
   * @param  {Node[]} array Where to insert the node
   * @param  {Node}   node  copiedNode
   * @return {void}
   */
  insertNodeInArray(array: Node[], node: Node) {
    // create a copy instead of reference
    let newNode = this.deepCloneNode(node);
    array.push(newNode);
  }

  /**
   * removes specified node from data model and returns it
   *
   * @param  {Node[]} array node array where item shall be removed
   * @param  {Node}   node  specified node
   * @return {void}
   */
  cutNodeFromArray(array, node: Node) {
    let index = array.indexOf(node);
    if (index > -1) {
      return array.splice(index, 1)[0];
    }
  }

  /**
   * deep clones an object removing circular references
   * this is a function from stackoverflow user Fabio Poloni which worked out for this case.
   * It copies all properties without allowing references to be left over.
   *
   * @param  {Object} node could be any kind of object
   * @return {Object}      clean copy of object, no reference any longer
   */
  deepCloneNode(node) {
    const gdcc = "__getDeepCircularCopy__";
    if (node !== Object(node)) {
      return node; // primitive value
    }

    var set = gdcc in node,
      cache = node[gdcc],
      result;
    if (set && typeof cache == "function") {
      return cache();
    }
    // else
    node[gdcc] = function() { return result; }; // overwrite
    if (node instanceof Array) {
      result = [];
      for (var i = 0; i < node.length; i++) {
        result[i] = this.deepCloneNode(node[i]);
      }
    } else {
      result = {};
      for (var prop in node)
        if (prop != gdcc)
          result[prop] = this.deepCloneNode(node[prop]);
        else if (set)
          result[prop] = this.deepCloneNode(cache);
    }
    if (set) {
      node[gdcc] = cache; // reset
    } else {
      delete node[gdcc]; // unset again
    }
    return result;
  }
}
