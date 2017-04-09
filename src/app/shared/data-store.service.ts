import { Injectable } from '@angular/core';
import { Node } from '../data';

import { GetXmlService } from './get-xml.service';

@Injectable()
export class DataStoreService {
  // whether or not user should be able to move level
  allowLevelMovement: boolean = false;
  // data store
  data: Node[] = [];
  // xml document
  xmlDoc: Document = null;
  constructor(
    private getXmlService: GetXmlService
  ) { }
  loadXmlStructure(url) {
    this.getXmlService.getXmlFile(url)
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
          this.data = [];
          let levelTags = packageReference[0].getElementsByTagName('level');
          for (let i = 0; i < levelTags.length; i++) {
            let nodes = { 'label': 'level', 'type': 'level', 'id': levelTags[i].id, 'children': [], 'expandedIcon': 'fa-folder-open', 'collapsedIcon': 'fa-folder', 'draggable': false, 'droppableScope': 'level' };
            let unitTags = packageReference[0].getElementsByTagName('level')[i].getElementsByTagName('unit');
            for (let j = 0; j < unitTags.length; j++) {
              let unit = { 'label': 'unit', 'type': 'unit', 'id': unitTags[j].id, 'children': [], 'expandedIcon': 'fa-folder-open', 'collapsedIcon': 'fa-folder', 'droppableScope': 'unit', 'draggableScope': 'level' };
              let activityTags = packageReference[0].getElementsByTagName('level')[i].getElementsByTagName('unit')[j].getElementsByTagName('activity');
              for (let k = 0; k < activityTags.length; k++) {
                unit.children.push({ 'label': 'activity', 'type': 'activity', 'id': activityTags[k].id, 'expandedIcon': 'fa-folder-open', 'collapsedIcon': 'fa-folder', 'draggableScope': 'unit' });
              }
              nodes.children.push(unit);
            }
            this.data.push(nodes);
          }
        }
      }
      )
  }
}
