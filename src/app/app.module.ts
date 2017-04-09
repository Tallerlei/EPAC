import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// CAPE Components and Services
import { AppComponent } from './app.component';
import { GetXmlService } from './shared/get-xml.service';
import { UtilityService } from './shared/utility.service';
// import { XmlTreeComponent } from './xml-tree/xml-tree.component';
// import { TreeNodeComponent } from './tree-node/tree-node.component';

// 3rd Party enables Treeview, Drag'n'Drop and Contextmenu
import {TreeModule,TreeNode} from 'primeng/primeng';
import {TreeDragDropService} from 'primeng/primeng';
import {ContextMenuModule,MenuItem} from 'primeng/primeng';
import { DetailViewComponent } from './detail-view/detail-view.component';
import {MessagesModule} from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    DetailViewComponent,
    // XmlTreeComponent,
    // TreeNodeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TreeModule,
    ContextMenuModule,
    MessagesModule
  ],
  providers: [
    GetXmlService,
    UtilityService,
    TreeDragDropService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
