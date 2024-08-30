export function sortTrips(trips: any[], sortBy: string): any[] {
  if (sortBy === 'fastest') {
    return trips.sort((a, b) => a.duration - b.duration);
  } else if (sortBy === 'cheapest') {
    return trips.sort((a, b) => a.cost - b.cost);
  }
  return trips;
}

export function filterByTransportType(trips: any[], type?: string) {
  if (type) {
    return trips.filter((trip => trip.type === type));
  }
  return trips;
};