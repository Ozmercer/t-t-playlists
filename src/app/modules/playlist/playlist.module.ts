import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlaylistRoutingModule} from './playlist-routing.module';
import {PlaylistViewComponent} from './playlist-view.component';
import {HttpClientModule} from '@angular/common/http';
import { PlaylistCategoryComponent } from './playlist-category/playlist-category.component';
import {PlaylistService} from './playlist.service';


@NgModule({
  declarations: [
    PlaylistViewComponent,
    PlaylistCategoryComponent,
  ],
  imports: [
    CommonModule,
    PlaylistRoutingModule,
    HttpClientModule,
  ],
  providers: [
    PlaylistService
  ]
})
export class PlaylistModule {
}
