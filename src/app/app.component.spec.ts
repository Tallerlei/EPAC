import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
// import { browser, element, by, protractor } from 'protractor';
import { AppComponent } from './app.component';
import { TreeModule, TreeNode } from 'primeng/primeng';
import { TreeDragDropService } from 'primeng/primeng';
import { ContextMenuModule, MenuItem } from 'primeng/primeng';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { MessagesModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';

// Services
import { GetXmlService } from './shared/get-xml.service';
import { UtilityService } from './shared/utility.service';
import { DataStoreService } from './shared/data-store.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DetailViewComponent,
      ],
      imports: [
        TreeModule,
        ContextMenuModule,
        MessagesModule,
        ButtonModule,
        InputTextModule,
        FormsModule,
        HttpModule
      ],
      providers: [
        TreeDragDropService,
        GetXmlService,
        UtilityService,
        DataStoreService

      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Welcome to CAPE'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Welcome to CAPE');
  }));

  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const app = fixture.debugElement.componentInstance;
    expect(compiled.querySelector('h1').textContent).toContain(app.title);
  }));
});
