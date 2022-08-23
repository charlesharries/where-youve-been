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
  start_latlng: [number, number];
  start_latitude: number;
  start_longitude: number;
  start_date: string;
}

export interface Stats {
  totalDistance: number;
  totalTime: number;
  reset: () => void;
}