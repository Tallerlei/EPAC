import { Component, Input } from '@angular/core';
import { Node } from '../data';
@Component({
  selector: 'detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent {
  @Input() node: Node;
  editMode: boolean = false;
  constructor() { }


}
