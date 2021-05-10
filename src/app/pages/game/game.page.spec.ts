import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FirebaseServiceMock } from 'src/app/services/firebase.service.mock';
import { GamePageComponent } from './game.page';

describe('GamePageComponent', () => {
  let component: GamePageComponent;
  let fixture: ComponentFixture<GamePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamePageComponent ],
      providers: [
        { provide: FirebaseService, useClass: FirebaseServiceMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
