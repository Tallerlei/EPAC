import { Component } from '@angular/core';
import { GetXmlService } from './shared/get-xml.service';

import { Data, Node } from './data';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Welcome to CAPE';
  // specify url here
  xmlFileUrl = 'assets/data.xml';
  data: Data = {} as Data;
  // Contextmenu Data
  items = [
    {
      label: 'Show ID',
      command: (event) => this.showDetails(this.selectedNode)
    },
    {
      label: 'Move up',
      command: (event) => this.moveUp(this.selectedNode)

    },
    {
      label: 'Move down',
      command: (event) => this.moveDown(this.selectedNode)

    }
  ];
  msgs;
  selectedNode: Node;
  xmlDoc: Document = null;
  constructor(
    private getXmlService: GetXmlService
  ) {

  }

  loadXmlStructure() {
    this.getXmlService.getXmlFile(this.xmlFileUrl)
      .then(
      res => {
        this.xmlDoc = this.getXmlService.createXmlStructure(res.text());
      }, rej => {
        alert(rej);
      })
      .then(
      res => {
        if (this.xmlDoc.getElementsByTagName('package')) {
          let packageReference = this.xmlDoc.getElementsByTagName('package');
          this.data.nodes = [];
          let levelTags = packageReference[0].getElementsByTagName('level');
          for (let i = 0; i < levelTags.length; i++) {
            let nodes = { 'label': 'level', 'nodeType': 'level', 'id': levelTags[i].id, 'children': [], 'expandedIcon': 'fa-folder-open', 'collapsedIcon': 'fa-folder', 'draggable': false };
            let unitTags = packageReference[0].getElementsByTagName('level')[i].getElementsByTagName('unit');
            for (let j = 0; j < unitTags.length; j++) {
              let unit = { 'label': 'unit', 'nodeType': 'unit', 'id': unitTags[j].id, 'children': [], 'expandedIcon': 'fa-folder-open', 'collapsedIcon': 'fa-folder' };
              let activityTags = packageReference[0].getElementsByTagName('level')[i].getElementsByTagName('unit')[j].getElementsByTagName('activity');
              for (let k = 0; k < activityTags.length; k++) {
                unit.children.push({ 'label': 'activity', 'nodeType': 'activity', 'id': activityTags[k].id, 'expandedIcon': 'fa-folder-open', 'collapsedIcon': 'fa-folder' });
              }
              nodes.children.push(unit);
            }
            this.data.nodes.push(nodes);
          }
        }
        console.log(this.data)
      }
      )
  }

  showDetails(node: Node) {

    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Node ID: ', detail: node.id });
  }
  moveUp(node: Node) {
    let tempNode: Node;
    let position: number;
    let parentPosition: number;
    let parent = node.parent;
    if (node.nodeType === 'unit') {
      position = parent.children.indexOf(node);
      parentPosition = this.data.nodes.indexOf(parent)
      if (position === 0 && parentPosition <= 0) {
        return;
      } else if (position === 0) {
        tempNode = parent.children[position];
        parent.children.splice(position, 1);
        this.moveItemToOtherArray(this.data.nodes[parentPosition - 1].children, tempNode, 'up');
      } else {
        this.moveItemWithinArray(parent.children, position, position - 1);
      }
    } else if (node.nodeType === 'activity') {
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
    } else {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Node type cannot be moved: ', detail: node.nodeType });
    }
  }
  moveDown(node: Node) {
    let tempNode: Node;
    let position: number;
    let parentPosition: number;
    let parent = node.parent;
    if (node.nodeType === 'unit') {
      position = parent.children.indexOf(node);
      parentPosition = this.data.nodes.indexOf(parent)
      if (position + 1 === parent.children.length && parentPosition + 1 === this.data.nodes.length) {
        return;
      } else if (position + 1 === parent.children.length) {
        tempNode = parent.children[position];
        parent.children.splice(position, 1);
        this.moveItemToOtherArray(this.data.nodes[parentPosition + 1].children, tempNode, 'down');
      } else {
        this.moveItemWithinArray(parent.children, position, position + 1);
      }
    } else if (node.nodeType === 'activity') {
      position = parent.children.indexOf(node);
      parentPosition = parent.parent.children.indexOf(parent);
      if (position + 1 === parent.children.length && parentPosition + 1 === this.data.nodes.length) {
        return;
      } else if (position + 1 === parent.children.length) {
        tempNode = parent.children[position];
        parent.children.splice(position, 1);
        this.moveItemToOtherArray(parent.parent.children[parentPosition + 1].children, tempNode, 'down');
      } else {
        this.moveItemWithinArray(parent.children, position, position + 1);
      }
    } else {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Node type cannot be moved: ', detail: node.nodeType });
    }
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
}
