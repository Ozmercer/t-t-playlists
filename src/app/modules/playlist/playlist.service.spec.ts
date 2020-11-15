import {TestBed} from '@angular/core/testing';

import {PlaylistService} from './playlist.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PlaylistService', () => {
  let service: PlaylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PlaylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate random theme', () => {
    const theme = service.themeRandomizer();
    const regex = /^(repeating-)?(linear|radial)-gradient\((\d+deg, )?#[0-9a-f]{6}, #[0-9a-f]{6}( \d+px)?\)/g;
    expect(theme.backgroundImage.match(regex)).toBeTruthy(theme.backgroundImage);
    expect(theme.color.match(/#[0-9a-f]{6}/g)).toBeTruthy(theme.color);
  });

  it('should get playlists filtered by category', () => {
    service.playlists = [
      {
        coverImage: 'coverImage',
        id: '1',
        link: 'link',
        category: 'a',
        name: 'name',
      },
      {
        coverImage: 'coverImage',
        id: '2',
        link: 'link',
        category: 'b',
        name: 'name',
      },
      {
        coverImage: 'coverImage',
        id: '3',
        link: 'link',
        category: 'a',
        name: 'name',
      },
      {
        coverImage: 'coverImage',
        id: '4',
        link: 'link',
        category: 'c',
        name: 'name',
      },
    ];

    const filteredList = service.getPlaylistsOfCategory('a');
    expect(filteredList.length).toEqual(2);
    expect(filteredList[0].id).toEqual('1');
    expect(filteredList[1].id).toEqual('3');
  });

  it('should set categories', () => {
    expect(service.categories).toEqual([]);

    const categories = [{name: 'a', style: {backgroundImage: '', color: ''}}];
    service.categories = categories;

    expect(service.categories).toEqual(categories);
  });
});

