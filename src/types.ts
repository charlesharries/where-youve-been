export interface User {
  access_token: string;
  refresh_token: string;
  athlete: {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    profile: string;
  }
}

export interface Activity {
  id: number;
  distance: number;
  elapsed_time: number;
  map: {
    summary_polyline: string;
  }
}

export interface Stats {
  totalDistance: number;
  totalTime: number;
}