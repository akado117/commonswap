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
    photography: Boolean
    wineries: Boolean
    beachBum: Boolean
    film: Boolean
    hiking: Boolean
    clubber: Boolean
    liveMusic: Boolean
    foodie: Boolean
    orgTour: Boolean
  }
  
  type Profile {
    _id: String!
    ownerUserId: String!
    firstName: String!
    lastName: String!
    gender: String
    dob: Float
    email: String!
    phone: String
    lang: String
    personalSummary: String
    emergencyContacts: [EmergencyContact]
    school: String
    classOf: String
    work: String
    timeZone: String
    cleanliness: Int
    extroversion: Int
    interests: Interests
    places: [Place]
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
    essentials: Boolean
    wiFi: Boolean
    heat: Boolean
    gym: Boolean
    washerDryer: Boolean
    kitchen: Boolean
    dressers: Boolean
    pool: Boolean
    parking: Boolean
  }
  
  type PlaceDate {
    end: Int
    start: Int
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
    rent: String
    bathrooms: Int
    smoking: Boolean
    bedrooms: Int
    pets: Boolean
    typeOfPets: String
    specialInst: String
    notesOnArea: String
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
    places: Place
    profile: Profile
    image: Image
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
