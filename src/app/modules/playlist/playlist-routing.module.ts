import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PlaylistViewComponent} from './playlist-view.component';
import {PlaylistCategoryComponent} from './playlist-category/playlist-category.component';

const routes: Routes = [
  {
    path: '',
    component: PlaylistViewComponent
  },
  {
    path: ':category',
    component: PlaylistCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistRoutingModule {
}
