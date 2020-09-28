import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgfConferenciaPage } from './agf-conferencia.page';

describe('AgfConferenciaPage', () => {
  let component: AgfConferenciaPage;
  let fixture: ComponentFixture<AgfConferenciaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgfConferenciaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgfConferenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
