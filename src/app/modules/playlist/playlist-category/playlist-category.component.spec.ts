import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlaylistCategoryComponent} from './playlist-category.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterModule} from '@angular/router';
import {PlaylistService} from '../playlist.service';
import {Observable} from 'rxjs';

describe('PlaylistCategoryComponent', () => {
  let component: PlaylistCategoryComponent;
  let fixture: ComponentFixture<PlaylistCategoryComponent>;
  let playlistService: PlaylistService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaylistCategoryComponent],
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([])
      ]
    })
      .compileComponents();

    playlistService = TestBed.inject(PlaylistService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get filtered playlists onInit', () => {
    spyOnProperty(playlistService, 'categories', 'get').and.returnValue(['category']);
    expect(component.playlists).toEqual([]);

    const playlists = [{name: 'a'}, {name: 'b'}];
    // @ts-ignore
    spyOn(playlistService, 'getPlaylistsOfCategory').and.returnValue(playlists);
    component.ngOnInit();

    // @ts-ignore
    expect(component.playlists).toEqual(playlists);
    expect(component.loading).toEqual(false);
  });

  it('should call fetchPlaylists if no categories exits on init', () => {
    spyOnProperty(playlistService, 'categories', 'get').and.returnValue([]);
    const fetchSpy = spyOn(playlistService, 'fetchPlaylists').and.callFake(() => new Observable());

    component.ngOnInit();
    expect(fetchSpy).toHaveBeenCalled();
  });

  it('open blank window when clicking item', () => {
    const windowSpy = spyOn(window, 'open').and.stub();
    component.playlists = [{
      name: 'name',
      link: 'test.com',
      coverImage: '',
      id: '',
      category: ''
    }];
    fixture.detectChanges();

    fixture.nativeElement.querySelector('.listen').click();

    expect(windowSpy).toHaveBeenCalledWith('test.com', '_blank');
  });
});
