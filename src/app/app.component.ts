import { Component, HostListener } from '@angular/core';
import { UtilityService } from './shared/utility.service';
import { DataStoreService } from './shared/data-store.service';

import { Node } from './data';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Welcome to CAPE';
  // specify url here
  dataUrl = 'assets/data.xml';
  // Contextmenu Data
  items = [{
    label: 'Show ID',
    command: (event) => this.showDetails(this.selectedNode)
  }];
  msgs;
  selectedNode: Node;
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
    if(event.key === 'ArrowUp') {
      direction = -1;
    } else if (event.key === 'ArrowDown'){
      direction = 1;
    } else {
      return;
    }
    if (this.controlActive === true) {
      this.utilityService.moveItem(this.selectedNode, direction);
    } else {
      this.selectedNode = this.utilityService.selectNode(this.selectedNode.parent, this.selectedNode, direction);
    }
  }



  loadData() {
    this.dataStoreService.loadXmlStructure(this.dataUrl);
  }

  showDetails(node: Node) {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Node ID: ', detail: node.id });
  }
}
