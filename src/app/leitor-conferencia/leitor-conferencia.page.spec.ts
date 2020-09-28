import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeitorConferenciaPage } from './leitor-conferencia.page';

describe('LeitorConferenciaPage', () => {
  let component: LeitorConferenciaPage;
  let fixture: ComponentFixture<LeitorConferenciaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeitorConferenciaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeitorConferenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
