import {Injectable} from '@angular/core';
import {Playlist} from '../../models/playlist';
import {HttpClient} from '@angular/common/http';
import {PlaylistsResponseObject} from '../../models/PlaylistsResponseObject';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private _playlists: BehaviorSubject<Playlist[]>;
  private _categories: BehaviorSubject<string[]>;

  constructor(private http: HttpClient) {
    this._playlists = new BehaviorSubject<Playlist[]>([]);
    this._categories = new BehaviorSubject<string[]>([]);
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

  set categories(categories: string[]) {
    this._categories.next(categories);
  }

  get categories(): string[] {
    return this._categories.getValue();
  }

  get categories$(): Observable<string[]> {
    return this._categories.asObservable();
  }

  fetchPlaylists(): void {
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
          link: item.url
        });
        categories.add(item.curator_name);
      });

      this.playlists = respPlaylists;
      this.categories = Array.from(categories);
    });
  }
}
