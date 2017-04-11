import { Injectable } from '@angular/core';

// Interface
import { Node } from '../data';

// Services
import { GetXmlService } from './get-xml.service';

@Injectable()
export class DataStoreService {
  // whether or not user should be able to move level
  allowLevelMovement: boolean = false;
  // data store
  data = [{ 'label': '', 'type': 'database', 'id': '', 'children': [], 'expandedIcon': 'fa-database', 'collapsedIcon': 'fa-database', 'draggable': false }];
  // xml document
  xmlDoc: Document = null;
  constructor(
    private getXmlService: GetXmlService
  ) { }

  /**
   * Takes xml document, converts it into a DOM structure and then to a json object
   * @param  {string} url url (relative to src folder or websource)
   * @return {void}       data is stored in this service
   */
  loadXmlStructure(url: string) {
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
          this.data[0].children = [];
          let packageReference = this.xmlDoc.getElementsByTagName('package');
          let levelTags = packageReference[0].getElementsByTagName('level');

          // loop through level and create them
          for (let i = 0; i < levelTags.length; i++) {
            let nodes = { 'label': 'level', 'type': 'level', 'id': levelTags[i].id, 'children': [], 'expandedIcon': 'fa-folder-open', 'collapsedIcon': 'fa-folder', 'draggable': false };
            let levelReference = packageReference[0].getElementsByTagName('level')
            let unitTags = levelReference[i].getElementsByTagName('unit');

            // loop through units and create them
            for (let j = 0; j < unitTags.length; j++) {
              let unit = { 'label': 'unit', 'type': 'unit', 'id': unitTags[j].id, 'children': [], 'expandedIcon': 'fa-folder-open-o', 'collapsedIcon': 'fa-folder-o' };
              let unitReference = levelReference[i].getElementsByTagName('unit');
              let activityTags = unitReference[j].getElementsByTagName('activity');

              // loop through activities and create them
              for (let k = 0; k < activityTags.length; k++) {
                unit.children.push({ 'label': 'activity', 'type': 'activity', 'id': activityTags[k].id, 'icon': 'fa-file-code-o' });
              }

              nodes.children.push(unit);
            }
            this.data[0].children.push(nodes);
            let id = url.split('/')[1];
            this.data[0].id = id;
            this.data[0].label = id;
          }
        }
      }
      )
  }
}
