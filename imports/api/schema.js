export default [
  `
  type Url {
    url: String!
  }

  type Test {
    foo: String,
    bar: String
  }

  type Roomie {
    name: String,
    daysInRoom: Int,
    amountOwed: Float
  }

  type Customer {
    _id: String!
    ownerUserId: String
    accountBalance: Int
    created: String!
    currency: String!
  }

  type Room {
    _id: String!
    daysRented: Int!
    costPerNight: Float!
    fees: Float!
    taxRate: Float!
    roomies: [Roomie]
  }
  
  type EmergencyContact {
    _id: String!
    ownerUserId: String
    profile: Profile
    name: String!
    phone: String!
    email: String!
    relation: String
  }
  
  type Interests {
    _id: String!
    ownerUserId: String
    profile: Profile
    books: Boolean
    breweries: Boolean
    cars: Boolean
    clubber: Boolean
    environment: Boolean
    fashion: Boolean
    film: Boolean
    arts: Boolean
    foodie: Boolean
    gaming: Boolean
    fitness: Boolean
    hiking: Boolean
    liveMusic: Boolean
    orgTour: Boolean
    animals: Boolean
    photography: Boolean
    politics: Boolean
    wineries: Boolean
  }
  
  type Profile {
    _id: String!
    ownerUserId: String!
    firstName: String!
    lastName: String!
    gender: String
    dob: String
    email: String!
    phone: String
    lang: String
    personalSummary: String
    emergencyContacts: [EmergencyContact]
    school: String
    classOf: String
    occupation: String
    timeZone: String
    cleanliness: Int
    extroversion: Int
    interests: Interests
    places: [Place]
  }
  
  type Coords {
    lat: Float
    lng: Float
  }
  
  type DesiredDate {
    _id: String!
    ownerUserId: String
    day: String
  }

  type Address {
    _id: String!
    ownerUserId: String
    place: Place
    placeId: String
    profile: Profile
    profileId: String
    street: String
    apt: String
    city: String
    state: String
    zip: Int!
    lat: Float
    long: Float
  }
  
  type Amenity {
    _id: String!
    ownerUserId: String
    profile: Profile
    profileId: String
    place: Place
    placeId: String
    gym: Boolean
    parking: Boolean
    handicap: Boolean
    heat: Boolean
    wiFi: Boolean
    kitchen: Boolean
    pool: Boolean
    washer: Boolean
  }
  
  type PlaceDate {
    arrival: Int
    departure: Int
  }
  
  type Place {
    _id: String!
    ownerUserId: String
    profile: Profile
    profileId: String
    address: Address
    shortDesc: String
    detailedDesc: String
    availableDates: [PlaceDate]
    amenities: Amenity
    numOfGuests: Int
    beds: [String]
    rent: Float
    bathrooms: Int
    smoking: Boolean
    bedrooms: Int
    access: String
    pets: Boolean
    typeOfPets: String
    specialInst: String
    recommendations: String
    generalNotes: String
    placeImages: [Image]
  }
  
  type Image {
    _id: String
    deleted: Boolean
    userId: String
    placeId: String
    url: String
    fileName: String
    type: String
    added: Int
  }
  
  type PlaceForBrowse {
     _id: String
    ownerUserId: String
    placeId: String
    placeImgs: [Image]
    shortDesc: String
    numOfGuests: Int
    bedrooms: Int
    bathrooms: Int
    profileImg: Image
    address: Address
    profile: Profile
  }
  
  type TravelDate {
    arrival: String
    departure: String
  }
  
  type Trip {
    _id: String
    address: Address
    dates: TravelDate
    guests: Int
    rating: Int
    ratingMessage: String
    place: Place
    swapperMessage: String
    status: String
    requesterUserId: String
    requesteeUserId: String
    requesterPlaceId: String
    requesteePlaceId: String
    requesterName: String
    requesteeName: String
    requesterEmail: String
    requesteeEmail: String
    requesterProfileImg: Image
    requesteeProfileImg: Image
  }

  type RootMutation {
    insertUrl(url: String!): Url
  }

  type RootQuery {
      say: Test
      says: [Test]
      urls: [Url]
      getSavedRoom(Id: String!): Room
      getSavedRooms: [Room]
      getProfileByUserId(userId: String!, profileId: String): Profile
      getPlacesForBrowse: [PlaceForBrowse]
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }`,
];
