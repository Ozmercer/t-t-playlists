export interface PlaylistsResponseObject {
  featuredPlaylists: {
    content: PlaylistItem[]
  };
}

interface PlaylistItem {
  artwork: string;
  curator_name: string;
  id: string;
  kind: string;
  name: string;
  url: string;
}
