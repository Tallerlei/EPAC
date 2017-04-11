import { Component, Input } from '@angular/core';

// Interface
import { Node } from '../data';

@Component({
  selector: 'detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent {
  // data model, which is editableNode from app.component
  @Input() node: Node;
  editMode: boolean = false;
  constructor() { }


}
