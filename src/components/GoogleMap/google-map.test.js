import {getCoordinates} from './google-map';

describe('GoogleMap utils', () => {
  it('should return coordinates from a string', () => {
    const result = getCoordinates('52.3536124,4.8448589');
    expect(result).toEqual({
      lat: 52.3536124,
      lng: 4.8448589,
    });
  });
});
