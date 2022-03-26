export interface User {
  access_token: string;
  refresh_token: string;
  athlete: {
    id: number;
    username: string;
  }
}

export interface Activity {
  id: number;
  map: {
    summary_polyline: string;
  }
}