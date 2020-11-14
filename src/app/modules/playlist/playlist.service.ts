import {Injectable} from '@angular/core';
import {Playlist} from '../../models/playlist';
import {HttpClient} from '@angular/common/http';
import {PlaylistsResponseObject} from '../../models/PlaylistsResponseObject';
import {BehaviorSubject, Observable} from 'rxjs';

export interface CategoryStyle {
  backgroundImage: string;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private _playlists: BehaviorSubject<Playlist[]>;
  private _categories: BehaviorSubject<{ name: string, style: CategoryStyle }[]>;

  constructor(private http: HttpClient) {
    this._playlists = new BehaviorSubject<Playlist[]>([]);
    this._categories = new BehaviorSubject<{ name: string, style: CategoryStyle }[]>([]);
  }

  set playlists(playlists: Playlist[]) {
    this._playlists.next(playlists);
  }

  get playlists(): Playlist[] {
    return this._playlists.getValue();
  }

  get playlists$(): Observable<Playlist[]> {
    return this._playlists.asObservable();
  }

  set categories(categories: { name: string, style: CategoryStyle }[]) {
    this._categories.next(categories);
  }

  get categories(): { name: string, style: CategoryStyle }[] {
    return this._categories.getValue();
  }

  get categories$(): Observable<{ name: string, style: CategoryStyle }[]> {
    return this._categories.asObservable();
  }

  fetchPlaylists(): Observable<Playlist[]> {
    const url = 'https://portal.organicfruitapps.com/programming-guides/v2/us_en-us/featured-playlists.json';
    this.http.get<PlaylistsResponseObject>(url).subscribe(resp => {
      const content = resp.featuredPlaylists.content;
      const categories = new Set<string>();
      const respPlaylists: Playlist[] = [];
      content.forEach(item => {
        respPlaylists.push({
          id: item.id,
          category: item.curator_name,
          coverImage: item.artwork,
          link: item.url,
          name: item.name
        });
        categories.add(item.curator_name);
      });

      this.playlists = respPlaylists;
      this.categories = Array.from(categories).map(name => {
        return {
          name,
          style: this.themeRandomizer(),
        };
      });
    });

    return this.playlists$;
  }

  getPlaylistsOfCategory(category: string): Playlist[] {
    return this.playlists.filter(playlist => playlist.category === category);
  }

  themeRandomizer(): CategoryStyle {
    const palettes = [
      [
        '#0b1c7a',
        '#6b5b95',
        '#d64161',
        '#ff7b25',
      ],
      [
        '#b1360d',
        '#b2ad7f',
        '#61debc',
        '#699cef',
      ],
      [
        '#13725c',
        '#f2e394',
        '#f2ae72',
        '#d96459',
      ],
      [
        '#034f84',
        '#f7786b',
        '#92a8d1',
        '#f7cac9',
      ],
      [
        '#8536d0',
        '#b1cbbb',
        '#deeaee',
        '#eea29a',
      ],
      [
        '#50394c',
        '#ffef96',
        '#b2b2b2',
        '#f4e1d2',
      ],
      [
        '#622569',
        '#5b9aa0',
        '#d6d4e0',
        '#b8a9c9',
      ],
      [
        '#fefbd8',
        '#618685',
        '#36486b',
        '#4040a1',
      ],
    ];
    const types = [
      'radial',
      'linear',
      'repeating-radial',
      'repeating-linear',
    ];

    const palette = [...palettes[Math.floor(Math.random() * palettes.length)]];
    const c3 = palette.splice(0, 1)[0];
    const c1 = palette.splice(Math.floor(Math.random() * 3), 1)[0];
    const c2 = palette.splice(Math.floor(Math.random() * 2), 1)[0];
    const type = types[Math.floor(Math.random() * 4)];
    const angle = Math.random() * 360;
    const range = 50 + Math.random() * 50;

    let background;
    switch (type) {
      case 'linear':
        background = `${type}-gradient(${angle.toFixed()}deg, ${c1}, ${c2})`;
        break;
      case 'repeating-linear':
        background = `${type}-gradient(${angle.toFixed()}deg, ${c1}, ${c2} ${range}px)`;
        break;
      case 'radial':
        background = `${type}-gradient(${c1}, ${c2})`;
        break;
      default:
        background = `${type}-gradient(${c1}, ${c2} ${range}px)`;
    }

    return {
      backgroundImage: background,
      color: c3,
    };
  }

}
