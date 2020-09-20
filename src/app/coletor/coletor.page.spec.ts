import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ColetorPage } from './coletor.page';

describe('ColetorPage', () => {
  let component: ColetorPage;
  let fixture: ComponentFixture<ColetorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColetorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ColetorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
