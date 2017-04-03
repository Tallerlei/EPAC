import { Component } from '@angular/core';
import { GetXmlService } from './get-xml.service';

import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  jsonObject: any = {};
  title = 'Welcome to CAPE';
  xmlFileUrl = 'assets/data.xml';
  xmlDoc: Document = null;
  options: any = {
    isContainer: function(el) {
      return false; // only elements in drake.containers will be taken into account
    },
    moves: function(el, source, handle, sibling) {
      console.log("MOVES")
      return true; // elements are always draggable by default
    },
    accepts: function(el, target, source, sibling) {
      return true; // elements can be dropped in any of the `containers` by default
    },
    invalid: function(el, handle) {
      return false; // don't prevent any drags from initiating by default
    },
    direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
    copy: false,                       // elements are moved by default, not copied
    copySortSource: false,             // elements in copy-source containers can be reordered
    revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
    removeOnSpill: false,              // spilling will `.remove` the element, if this is true
    mirrorContainer: document.body,    // set the element that gets mirror elements appended
    ignoreInputTextSelection: true     // allows users to select input text, see details below
  }
  constructor(
    private getXmlService: GetXmlService,
    private dragulaService: DragulaService
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
          console.log("package available");
          this.jsonObject.package = { 'level': [] };
          let levelTags = this.xmlDoc.getElementsByTagName('package')[0].getElementsByTagName('level');
          for (let i = 0; i < levelTags.length; i++) {
            console.log('level available id = ', levelTags[i].id);
            let level = { 'id': levelTags[i].id, 'units': [] };
            // this.jsonObject['package'].push({'id': levelTags[i].id});
            let unitTags = this.xmlDoc.getElementsByTagName('package')[0].getElementsByTagName('level')[i].getElementsByTagName('unit');
            for (let j = 0; j < unitTags.length; j++) {
              let unit = { 'id': unitTags[j].id, 'activities': [] };
              console.log('unit available id = ', unitTags[j].id);
              // this.jsonObject['package'][i].push({'id': unitTags[j].id});
              let activityTags = this.xmlDoc.getElementsByTagName('package')[0].getElementsByTagName('level')[i].getElementsByTagName('unit')[j].getElementsByTagName('activity');
              for (let k = 0; k < activityTags.length; k++) {
                console.log('activity available id = ', activityTags[k].id);
                unit.activities.push({ 'id': activityTags[k].id });
              }
              level.units.push(unit);
            }
            this.jsonObject.package.level.push(level);
          }
        }
        // this.jsonObject = this.xml2json(this.xmlDoc, '');
        console.log(this.jsonObject)
      }
      )
  }
}
