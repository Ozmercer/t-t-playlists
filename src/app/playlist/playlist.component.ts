import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Playlist} from '../models/playlist';
import {PlaylistsResponseObject} from '../models/PlaylistsResponseObject';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  playlists: Playlist[];
  categories: Set<string>;

  constructor(private http: HttpClient) {
    this.playlists = [];
    this.categories = new Set<string>();
  }

  ngOnInit(): void {
    this.http.get<PlaylistsResponseObject>('https://portal.organicfruitapps.com/programming-guides/v2/us_en-us/featured-playlists.json')
      .subscribe(resp => {
        resp.featuredPlaylists.content.forEach(item => {
          this.categories.add(item.curator_name);
          this.playlists.push({
            id: item.id,
            category: item.curator_name,
            coverImage: item.artwork,
            link: item.url
          });
        });
        console.log(this.playlists, this.categories);
      });
  }

}
