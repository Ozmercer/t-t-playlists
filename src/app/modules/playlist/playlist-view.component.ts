import {Component, OnDestroy, OnInit} from '@angular/core';
import {Playlist} from '../../models/playlist';
import {CategoryStyle, PlaylistService} from './playlist.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrls: ['./playlist-view.component.scss']
})
export class PlaylistViewComponent implements OnInit, OnDestroy {
  playlists: Playlist[];
  categories: { name: string, style: CategoryStyle }[];
  playlists$: Subscription;
  categories$: Subscription;

  constructor(private playlistService: PlaylistService) {
    this.playlists = [];
    this.categories = [];
    this.playlists$ = new Subscription();
    this.categories$ = new Subscription();
  }

  ngOnInit(): void {
    this.playlists$ = this.playlistService.playlists$.subscribe(resp => {
      this.playlists = resp;
    });
    this.categories$ = this.playlistService.categories$.subscribe(resp => {
      this.categories = resp;
    });
    if (!this.playlistService.categories.length) {
      this.playlistService.fetchPlaylists();
    }
  }

  ngOnDestroy(): void {
    this.playlists$.unsubscribe();
    this.categories$.unsubscribe();
  }
}
