import { Injectable } from '@angular/core';
import { Node } from '../data';
import { DataStoreService } from './data-store.service';
@Injectable()
export class UtilityService {

  constructor(
    private dataStoreService: DataStoreService
  ) { }

  selectNode(parent, node, direction: number) {
    if (node.type === 'level') {
      parent = {};
      parent.children = this.dataStoreService.data;
    }
    let position = parent.children.indexOf(node);
    let nextNode = parent.children[position + direction]
    if (typeof nextNode === 'undefined') {
      return node;
    } else {
      return nextNode;
    }
  }
  moveItem(node, direction: number) {
    let array;
    if (node.type === 'level') {
      if (this.dataStoreService.allowLevelMovement === true) {
        array = this.dataStoreService.data;
      } else {
        return;
      }
    } else {
      array = node.parent.children;
    }
    let from = array.indexOf(node);
    let to = from + direction;
    if (to === -1) {
      return;
    }
    array.splice(to, 0, array.splice(from, 1)[0]);
  }

  selectPreviousNode(parent, node) {
    let position = parent.children.indexOf(node);
    let nextNode = parent.children[position - 1]
    return nextNode;
  }

  moveItemWithinArray(array, from, to) {
    array.splice(to, 0, array.splice(from, 1)[0]);
  }
  moveItemToOtherArray(array, node, direction) {
    if (direction === 'up') {
      array.push(node);
    } else {
      array.unshift(node)
    }
  }

  moveUp(node: Node) {
    let tempNode: Node;
    let position: number;
    let parentPosition: number;
    let parent = node.parent;
    if (node.type === 'unit') {
      position = parent.children.indexOf(node);
      parentPosition = this.dataStoreService.data.indexOf(parent)
      if (position === 0 && parentPosition <= 0) {
        return;
      } else if (position === 0) {
        tempNode = parent.children[position];
        parent.children.splice(position, 1);
        this.moveItemToOtherArray(this.dataStoreService.data[parentPosition - 1].children, tempNode, 'up');
      } else {
        this.moveItemWithinArray(parent.children, position, position - 1);
      }
    } else if (node.type === 'activity') {
      position = parent.children.indexOf(node);
      parentPosition = parent.parent.children.indexOf(parent);
      if (position === 0 && parentPosition <= 0) {
        return;
      } else if (position === 0) {
        tempNode = parent.children[position];
        parent.children.splice(position, 1);
        this.moveItemToOtherArray(parent.parent.children[parentPosition - 1].children, tempNode, 'up');
      } else {
        this.moveItemWithinArray(parent.children, position, position - 1);
      }
    }
  }
  moveDown(node: Node) {
    let tempNode: Node;
    let position: number;
    let parentPosition: number;
    let parent = node.parent;
    if (node.type === 'unit') {
      position = parent.children.indexOf(node);
      parentPosition = this.dataStoreService.data.indexOf(parent)
      if (position + 1 === parent.children.length && parentPosition + 1 === this.dataStoreService.data.length) {
        return;
      } else if (position + 1 === parent.children.length) {
        tempNode = parent.children[position];
        parent.children.splice(position, 1);
        this.moveItemToOtherArray(this.dataStoreService.data[parentPosition + 1].children, tempNode, 'down');
      } else {
        this.moveItemWithinArray(parent.children, position, position + 1);
      }
    } else if (node.type === 'activity') {
      position = parent.children.indexOf(node);
      parentPosition = parent.parent.children.indexOf(parent);
      if (position + 1 === parent.children.length && parentPosition + 1 === this.dataStoreService.data.length) {
        return;
      } else if (position + 1 === parent.children.length) {
        tempNode = parent.children[position];
        parent.children.splice(position, 1);
        this.moveItemToOtherArray(parent.parent.children[parentPosition + 1].children, tempNode, 'down');
      } else {
        this.moveItemWithinArray(parent.children, position, position + 1);
      }
    }
  }

}
