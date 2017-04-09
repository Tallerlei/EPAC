import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// CAPE Components and Services
import { AppComponent } from './app.component';
import { GetXmlService } from './shared/get-xml.service';
import { UtilityService } from './shared/utility.service';
import { DataStoreService } from './shared/data-store.service';


// 3rd Party enables Treeview, Drag'n'Drop, Messages Button and Contextmenu
import { TreeModule, TreeNode } from 'primeng/primeng';
import { TreeDragDropService } from 'primeng/primeng';
import { DragDropModule } from 'primeng/primeng';
import { ContextMenuModule, MenuItem } from 'primeng/primeng';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { MessagesModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    DetailViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TreeModule,
    ContextMenuModule,
    MessagesModule,
    ButtonModule,
    DragDropModule
  ],
  providers: [
    GetXmlService,
    UtilityService,
    TreeDragDropService,
    DataStoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
