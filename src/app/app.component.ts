import { Component, HostListener } from '@angular/core';

// Services
import { UtilityService } from './shared/utility.service';
import { DataStoreService } from './shared/data-store.service';

// Interface
import { Node } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: string = 'Welcome to CAPE';
  // specify url here
  dataUrl: string = 'assets/data.xml';
  // Contextmenu Entries
  items = [{
    label: 'Show ID',
    command: (event) => this.showDetails(this.selectedNode)
  }];
  msgs;

  tempParentType: string = '';
  copiedNode: Node;
  cuttedNode: Node;
  editableNode: Node;
  selectedNode: Node;

  // whether or not ctrl is pressed
  controlActive: boolean = false;
  constructor(
    private utilityService: UtilityService,
    private dataStoreService: DataStoreService
  ) {

  }

  // Window EventListener
  // For control key
  @HostListener('window:keydown.control', ['$event'])
  onControlDown(event: any) {
    if (this.controlActive === true) {
      return;
    }
    this.controlActive = true;
  }
  @HostListener('window:keyup.control', ['$event'])
  onControlUp(event: any) {
    this.controlActive = false;
  }
  // Arrows
  @HostListener('window:keyup', ['$event'])
  onArrowPress(event: any) {
    let direction: number;
    if (!this.selectedNode) {
      return;
    }
    switch (event.key) {
      case 'ArrowUp':
        direction = -1;
        break;
      case 'ArrowDown':
        direction = 1;
        break;
      case 'ArrowRight':
        if (typeof this.selectedNode.children !== 'undefined' && typeof this.selectedNode.children[0].parent !== 'undefined') {
          this.selectedNode = this.selectedNode.children[0];
        }
        break;
      case 'ArrowLeft':
        if (typeof this.selectedNode.parent !== 'undefined') {
          this.selectedNode = this.selectedNode.parent;
        }
        break;
      case 'x':
        if (this.controlActive === true) {
          // need to reset copiedNode when node is cut, otherwise the copiedNode will be in clipboard after pasting the cut node
          this.copiedNode = undefined;
          this.cuttedNode = this.utilityService.cutNodeFromArray(this.selectedNode.parent.children, this.selectedNode);
          this.tempParentType = this.selectedNode.parent.type;
        }
        return;
      case 'c':
        if (this.controlActive === true) {
          this.copiedNode = this.selectedNode;
          this.tempParentType = this.selectedNode.parent.type;
        }
        return;
      case 'v':
        if (this.controlActive === true) {
          let insertNode: Node;
          if (typeof this.cuttedNode !== 'undefined') {
            insertNode = this.cuttedNode;

          } else if (typeof this.copiedNode !== 'undefined') {
            insertNode = this.copiedNode;
          } else {
            this.msgs = [];
            this.msgs.push({ severity: 'info', summary: 'There is no node in your clipboard. Please try copying or cutting one again!' });
            return;
          }
          if (this.tempParentType === this.selectedNode.type) {
            this.cuttedNode = undefined;
            this.utilityService.insertNodeInArray(this.selectedNode.children, insertNode);
          } else {
            this.msgs = [];
            this.msgs.push({ severity: 'error', summary: 'Node type ' + this.selectedNode.type + ' can only be copied to node type ' + this.tempParentType });
          }
        }
        return;
      default:
        return;
    }

    // When user holds control key while pressing arrow up/down the item will be moved.
    if (this.controlActive === true) {
      this.utilityService.moveItem(this.selectedNode, direction);
    } else {
      this.selectedNode = this.utilityService.selectNode(this.selectedNode, direction);
    }
  }

  /**
   * In this case double-click (mouse) event sets editableNode to the clicked node
   * @param  {[type]} event double-click Event
   * @return {void}
   */
  onDoubleClick(event) {
    this.editableNode = this.selectedNode;
  }

  /**
   * Triggers the loading of the data if data is not already loaded.
   * In that case user gets a notification. Someday it should be a confirm() or something like that.
   * @return {[type]} [description]
   */
  loadData() {
    if (this.dataStoreService.data[0].id !== '') {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: 'Data already loaded!' });
      return;
    }
    this.dataStoreService.loadXmlStructure(this.dataUrl);
  }

  /**
   * Displays the selectedNode ID. Can be triggered from context menu
   * @param  {Node}   node  selectedNode
   * @return {[type]}      [description]
   */
  showDetails(node: Node) {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Node ID: ', detail: node.id });
  }
}
