export interface RideRequest {
  id: string;
  passengerName: string;
  from: string;
  to: string;
  fare: string;
  distance: string;
  time: string;
  type: 'auto' | 'taxi';
}
