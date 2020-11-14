import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlaylistViewComponent} from './playlist-view.component';
import {PlaylistService} from './playlist.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';

describe('PlaylistComponent', () => {
  let component: PlaylistViewComponent;
  let fixture: ComponentFixture<PlaylistViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaylistViewComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        {provide: PlaylistService}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a list of all categories', () => {
    const resultLength = 9;
    component.categories = Array(resultLength).fill({name: 'test'});
    console.log(component);

    fixture.detectChanges();
    const elements = fixture.nativeElement.querySelectorAll('.category');
    expect(elements.length).toEqual(9);
  });

  it('should show show category name in list item', () => {
    const testName = 'test';
    const style = {backgroundImage: 'background', color: 'colour'};
    component.categories = [{name: testName, style}];

    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.category'));
    expect(element.nativeElement.innerText).toContain(testName);
  });
});
