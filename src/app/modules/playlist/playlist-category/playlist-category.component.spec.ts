import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistCategoryComponent } from './playlist-category.component';

describe('DetailsComponent', () => {
  let component: PlaylistCategoryComponent;
  let fixture: ComponentFixture<PlaylistCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
