# plantWorld
Visualize how plants are distributed around the world.

This is a proof of concept to see how plants are distributed around the world.
Search for a plant, click on the search results, see the map color in countries where the plant is likely to be found.

https://github.com/user-attachments/assets/434a97a3-30f0-4f97-864b-59d24c9f97b2

To setup locally, do:
1. `npm install`
2. `npm run start`

This app colors in countries that constitute the regions represented by TDWG codes, which leads to the Caveats section.
`tdwgandcountrycodes.csv` lists the mappings of tdwg codes to country codes.

**Caveats**

The plant data is provided by Plants of the World Online (POWO - https://powo.science.kew.org).
The app colors in a blank world map whose regions are identified by **country codes** instead of TDWG codes, which follow the Biodiversity Information Standards.
Recording plant distribution can be tricky because they do not follow country borders.
For example, a certain plant species may grow on a certain tropical island (represented by a TDWG code), but that island territory may be governed by a foreign commonwealth (represented by a country code) thousands of nautical miles northward away from the tropics.
Without a more accurately labelled map, the colored in regions tend to overestimate the distribution.

**Future improvements**

1. Switch to using pykew library (https://github.com/RBGKew/pykew).
2. Find a map that uses TDWG labeling.
3. Add pan and zoom to the map canvas.
4. Add global weather statuses on the map.

With more improvements, this visualizer can help identify patterns in interspecies relations and how weather influences distribution.
