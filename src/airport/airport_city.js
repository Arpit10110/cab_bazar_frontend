/**
 * Extra ₹/km beyond `includedKm` (matches CabBazar-style cards: hatchback/sedan ₹16, SUV ₹20).
 * Keys must match `price` object keys on each slab.
 */
const EXTRA_FARE_PER_KM = {
  "Swift, WagonR or Similar": 16,
  "Dzire, Etios or Similar": 16,
  "Ertiga, Carens or Similar": 20,
};

/** Toll, fuel, driver, night — same wording as product UI */
const INCLUDED_CHARGES = {
  tollStateTax: "included",
  fuelCharges: "included",
  driverCharges: "included",
  nightCharges: "included",
};

/** CabBazar vehicle art — keys match `price` / `extraFarePerKm` labels */
export const AIRPORT_VEHICLE_IMAGES = {
  "Swift, WagonR or Similar":
    "https://cabbazar.com/assets/img/vehicles/hatchback.png",
  "Dzire, Etios or Similar":
    "https://cabbazar.com/assets/img/vehicles/sedan.png",
  "Ertiga, Carens or Similar":
    "https://cabbazar.com/assets/img/vehicles/suv.png",
};

/** Card order: hatchback → sedan → SUV */
export const AIRPORT_VEHICLE_LABELS = [
  "Swift, WagonR or Similar",
  "Dzire, Etios or Similar",
  "Ertiga, Carens or Similar",
];

/**
 * Per distance slab: base fare per vehicle + included km + extras (shared by all cities on that slab).
 * @type {Record<string, {
 *   includedKm: number,
 *   price: Record<string, number>,
 *   extraFarePerKm: Record<string, number>,
 *   tollStateTax: string,
 *   fuelCharges: string,
 *   driverCharges: string,
 *   nightCharges: string,
 * }>}
 */
export const AIRPORT_KM_SLABS = {
  "20km": {
    includedKm: 20,
    price: {
      "Swift, WagonR or Similar": 689,
      "Dzire, Etios or Similar": 734,
      "Ertiga, Carens or Similar": 1040,
    },
    extraFarePerKm: { ...EXTRA_FARE_PER_KM },
    ...INCLUDED_CHARGES,
  },
  "30km": {
    includedKm: 30,
    price: {
      "Swift, WagonR or Similar": 835,
      "Dzire, Etios or Similar": 881,
      "Ertiga, Carens or Similar": 1214,
    },
    extraFarePerKm: { ...EXTRA_FARE_PER_KM },
    ...INCLUDED_CHARGES,
  },
  "40km": {
    includedKm: 40,
    price: {
      "Swift, WagonR or Similar": 982,
      "Dzire, Etios or Similar": 1028,
      "Ertiga, Carens or Similar": 1387,
    },
    extraFarePerKm: { ...EXTRA_FARE_PER_KM },
    ...INCLUDED_CHARGES,
  },
};

/** @param {string} cityName @param {"20km"|"30km"|"40km"} slabKey */
function cityRow(cityName, slabKey) {
  const s = AIRPORT_KM_SLABS[slabKey];
  return {
    cityName,
    km: slabKey,
    includedKm: s.includedKm,
    price: { ...s.price },
    extraFarePerKm: { ...s.extraFarePerKm },
    tollStateTax: s.tollStateTax,
    fuelCharges: s.fuelCharges,
    driverCharges: s.driverCharges,
    nightCharges: s.nightCharges,
  };
}

const DELHI_IGI_CITIES = [
  cityRow("Faridabad", "30km"),
  cityRow("Ghaziabad", "40km"),
  cityRow("Delhi", "20km"),
  cityRow("Gurgaon", "20km"),
  cityRow("Noida", "30km"),
];

/** Mumbai CSIA T1 / T2 */
const MUMBAI_AIRPORT_CITIES = [
  cityRow("Bhiwandi", "30km"),
  cityRow("Dombivli", "40km"),
  cityRow("Mumbai", "20km"),
];

/** Kempegowda T1 / T2 */
const BANGALORE_AIRPORT_CITIES = ["Bangalore", "Hesaraghatta", "Hoskote"].map(
  (name) => cityRow(name, "40km"),
);

/** Pune International Airport */
const PUNE_AIRPORT_CITIES = ["Lavale", "Pune"].map((name) =>
  cityRow(name, "20km"),
);

/** Kolkata — Netaji Subhash Chandra Bose International */
const KOLKATA_AIRPORT_CITIES = [
  "Central Kolkata",
  "Dankuni",
  "Dum Dum",
  "Howrah",
].map((name) => cityRow(name, "20km"));

/** Chennai International Airport */
const CHENNAI_AIRPORT_CITIES = ["Chennai"].map((name) =>
  cityRow(name, "20km"),
);

/** Rajiv Gandhi International Airport (Hyderabad) */
const HYDERABAD_AIRPORT_CITIES = [
  "Hyderabad",
  "Ramoji Film City",
  "Saroornagar",
].map((name) => cityRow(name, "30km"));

export const airport_city = [
  {
    airportId: "c1496d1f-44c6-4ebc-8165-8d610ac86c1e",
    cities: DELHI_IGI_CITIES,
  },
  {
    airportId: "7ca88b13-d4ee-4f4e-8b72-9d64f6c0d942",
    cities: DELHI_IGI_CITIES,
  },
  {
    airportId: "c857c0e8-d855-4375-96ff-97534cb9dc96",
    cities: DELHI_IGI_CITIES,
  },
  {
    airportId: "fdadc76b-3f80-4970-91e8-f20d9e3b6e94",
    cities: MUMBAI_AIRPORT_CITIES,
  },
  {
    airportId: "d6e64f84-5312-485d-b575-9224b8b96b53",
    cities: MUMBAI_AIRPORT_CITIES,
  },
  {
    airportId: "48adad01-efdd-42db-bf0b-00a655665e5f",
    cities: BANGALORE_AIRPORT_CITIES,
  },
  {
    airportId: "8c7dcb58-0c20-4599-8745-6a5da6fc0f9a",
    cities: BANGALORE_AIRPORT_CITIES,
  },
  {
    airportId: "f3be0908-22d4-4072-a9d2-5f7becbd6240",
    cities: PUNE_AIRPORT_CITIES,
  },
  {
    airportId: "c9d78b1d-5f7b-42e5-ae0b-26fecac8071b",
    cities: KOLKATA_AIRPORT_CITIES,
  },
  {
    airportId: "bce198eb-de74-47b5-9dad-21cbc580dfed",
    cities: CHENNAI_AIRPORT_CITIES,
  },
  {
    airportId: "119d3cc7-3d46-41c5-9e95-ed1deba58f69",
    cities: HYDERABAD_AIRPORT_CITIES,
  },
];

/** @param {string} airportId */
export function getAirportCities(airportId) {
  const row = airport_city.find((a) => a.airportId === airportId);
  return row?.cities ?? [];
}

/** Best-effort city label from `airportName` when no row exists in `airport_city`. */
export function guessPrimaryCityFromAirportName(airportName) {
  const n = String(airportName ?? "").trim();
  if (!n) return "City";
  if (n.includes(" - ")) {
    return n.split(" - ")[0].trim();
  }
  const comma = n.match(/^(.+?),\s*([^,]+)$/);
  if (comma) {
    const tail = comma[2].replace(/\s*Airport.*$/i, "").trim();
    if (tail) return tail;
  }
  return (
    n
      .replace(/\s*International\s+Airport.*$/i, "")
      .replace(/\s*Airport.*$/i, "")
      .replace(/\s*-\s*Terminal\s*\([^)]+\)\s*$/i, "")
      .replace(/\s*-\s*Terminal.*$/i, "")
      .trim() || n
  );
}

function buildFallbackDestinationCity(airportRecord) {
  const cityName = guessPrimaryCityFromAirportName(airportRecord.airportName);
  const s = AIRPORT_KM_SLABS["30km"];
  return {
    cityName,
    km: "30km",
    includedKm: s.includedKm,
    price: { ...s.price },
    extraFarePerKm: { ...s.extraFarePerKm },
    tollStateTax: s.tollStateTax,
    fuelCharges: s.fuelCharges,
    driverCharges: s.driverCharges,
    nightCharges: s.nightCharges,
  };
}

/** Cities for dropdown: configured rows, or one synthetic row (30km slab) from airport name. */
export function resolveAirportDestinationOptions(airportRecord) {
  if (!airportRecord?._id) return [];
  const list = getAirportCities(airportRecord._id);
  if (list.length > 0) return list;
  return [buildFallbackDestinationCity(airportRecord)];
}

/** Prefer first 30km option when multiple cities exist in data. */
export function getDefaultAirportDestinationCityName(options) {
  if (!options?.length) return "";
  const thirty = options.find((c) => c.km === "30km");
  return (thirty ?? options[0]).cityName;
}
