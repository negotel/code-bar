import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OperacoesPage } from './operacoes.page';

describe('OperacoesPage', () => {
  let component: OperacoesPage;
  let fixture: ComponentFixture<OperacoesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperacoesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OperacoesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
