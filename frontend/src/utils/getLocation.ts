// define the function that finds the users geolocation
export default function getUserLocation(
  func: (lat: number, long: number) => void,
): Error | undefined {
  // if geolocation is supported by the users browser
  if (navigator.geolocation) {
    // get the current users location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // save the geolocation coordinates in two variables
        const { latitude, longitude } = position.coords;
        // update the value of userlocation variable
        func(latitude, longitude);
        return undefined;
      },
      // if there was an error getting the users location
      (error) => {
        return error;
      },
    );
  }
  // if geolocation is not supported by the users browser
  else {
    const err: Error = {
      name: "not suppoerted",
      message: "Geolocation is not supported by this browser",
    };
    return err;
  }
}
