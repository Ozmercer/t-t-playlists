import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistCategoryComponent } from './playlist-category.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterModule} from '@angular/router';

describe('PlaylistCategoryComponent', () => {
  let component: PlaylistCategoryComponent;
  let fixture: ComponentFixture<PlaylistCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistCategoryComponent ],
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([])
      ]
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
