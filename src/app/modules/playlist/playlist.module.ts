import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlaylistRoutingModule} from './playlist-routing.module';
import {PlaylistViewComponent} from './playlist-view.component';
import {HttpClientModule} from '@angular/common/http';
import { PlaylistCategoryComponent } from './playlist-category/playlist-category.component';
import {PlaylistService} from './playlist.service';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    PlaylistViewComponent,
    PlaylistCategoryComponent,
  ],
  imports: [
    CommonModule,
    PlaylistRoutingModule,
    HttpClientModule,
    MatButtonModule,
  ],
  providers: [
    PlaylistService
  ]
})
export class PlaylistModule {
}
