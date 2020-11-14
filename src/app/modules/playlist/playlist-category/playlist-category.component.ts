import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Playlist} from '../../../models/playlist';
import {PlaylistService} from '../playlist.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-playlist-category',
  templateUrl: './playlist-category.component.html',
  styleUrls: ['./playlist-category.component.scss']
})
export class PlaylistCategoryComponent implements OnInit, OnDestroy {
  category: string;
  playlists: Playlist[];
  playlists$: Subscription;
  loading = true;

  constructor(private route: ActivatedRoute, private playlistService: PlaylistService) {
    this.category = '';
    this.playlists = [];
    this.playlists$ = new Subscription();
  }

  ngOnInit(): void {
    this.category = this.route.snapshot.params.category;
    if (this.playlistService.categories.length) {
      this.playlists = this.playlistService.getPlaylistsOfCategory(this.category);
      this.loading = false;
    } else {
      this.playlists$ = this.playlistService.fetchPlaylists().subscribe(() => {
        this.playlists = this.playlistService.getPlaylistsOfCategory(this.category);
        this.loading = false;
      });
    }
  }

  navigateToPlaylist(url: string): void {
    window.open(url, '_blank');
  }

  ngOnDestroy(): void {
    this.playlists$.unsubscribe();
  }
}
