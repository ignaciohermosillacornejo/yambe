import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { FirebaseServiceMock } from 'src/app/services/firebase/firebase.service.mock';
import { JoinCreateGamePageComponent } from './join-create-game.page';

describe('GamePageComponent', () => {
  let component: JoinCreateGamePageComponent;
  let fixture: ComponentFixture<JoinCreateGamePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinCreateGamePageComponent ],
      providers: [
        { provide: FirebaseService, useClass: FirebaseServiceMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinCreateGamePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
