// src/lib/getMaps.ts
import { client } from './sanity.client';

export async function getMaps() {
  return await client.fetch(`
    *[_type=="map"]{
      streetId,
      coordinatesLat,
      coordinatesLng,
      municipalityName,
      boroughName,
      subareaName,
      postalCode,
      streetName,
      streetNumber,
      streetLetter,
      slug,
      unitType,
      hasLiveSales,
      isLiveSalesApproved,
      adStates,
      marketStates
    }
  `);
}

// "streetId": "2943256",
//     "hash": "83a6d0422c413eb44c1161b163dae744",
//     "coordinatesLat": 59.9034999017531,
//     "coordinatesLng": 10.7559539314992,
//     "municipalityName": "Oslo",
//     "boroughName": "Gamle Oslo",
//     "subareaName": "Loenga",
//     "postalCode": "0194",
//     "streetName": "Sørengkaia",
//     "streetNumber": "33",
//     "streetLetter": null,
//     "slug": "sørengkaia-33",
//     "unitType": "building",
//     "hasLiveSales": false,
//     "isLiveSalesApproved": false,
//     "adStates": ["sold"],
//     "marketStates": ["pending"]
