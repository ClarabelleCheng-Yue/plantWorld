// TODO: 
// 1. Switch to using pykew library here: https://github.com/RBGKew/pykew
// 2. Add pan and zoom to the map
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import csv from 'csv-parser';
import fs from 'fs';
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

let details = {};
let errorMessage = "";
let results = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function makeTdwgCodeToCountryCodeMap () {
  const filePath = __dirname + '/tdwgandcountrycodes.csv';

  const dictionary = {};

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => {
          const { countrycode, countryname, tdwgcode } = data;
          const bucket = dictionary[tdwgcode] || [];
          bucket.push({ 
            countryCode: countrycode, 
            countryName: countryname
          }); 
    
          dictionary[tdwgcode] = bucket;
        }).on("end", () => {
            resolve(dictionary);
        }).on("error", (err) => {
          errorMessage = err;
          reject(err);
        });
    });
}

const tdwgCountryDictionary = await makeTdwgCodeToCountryCodeMap();

app.get("/", async (req, res) => {
  res.render("index.ejs", {
    details,
    errorMessage,
    results
  });
});

app.get("/details/:tileId/:fqId", async (req, res) => {
  const { fqId, tileId } = req.params;

  try {
    const response = await axios.get(`https://powo.science.kew.org/api/1/taxon/${fqId}`);
    const { distributions, scientificName } = response.data;

    const distribution = distributions.map(d => {
      const { name, tdwgCode } = d;

      const countries = tdwgCountryDictionary[tdwgCode];
      if (!!countries) {
        const countryCodes = countries.map(country => country.countryCode);
        
        return {
          locationName: name,
          tdwgCode,
          countryCodes
        };
      }
    });

    const tileData = results[tileId];

    if (tileData) {
      const { images } = tileData;

      details = {
        distribution,
        scientificName,
        images
      }
    }
    
  } catch (error) {
    details = {};
    errorMessage = error.message;
    console.error("Failed to get details:", errorMessage);
  }

  res.redirect("/");
});

app.get("/search", async (req, res) => {
  const query = req.query.search_query;

  try {
    const response = await axios.get(`https://powo.science.kew.org/api/1/search?q=${query}`);
    const searchResults = response.data.results;
    results = [];

    for (const aResult of searchResults) {
      if (aResult.rank === "Species") {

        results.push({ 
          images: aResult.images || [],
          name: aResult.name,
          fqId: aResult.fqId,
          snippet: aResult.snippet
        });
      }
    }

    details = {}
    
  } catch (error) {
    errorMessage = error.message;
    console.error("Failed to make search request:", errorMessage);
  }

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
