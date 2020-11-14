import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PlaylistRoutingModule} from './playlist-routing.module';
import {PlaylistComponent} from './playlist.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [PlaylistComponent],
  imports: [
    CommonModule,
    PlaylistRoutingModule,
    HttpClientModule,
  ]
})
export class PlaylistModule {
}
