## Design Document

### Preprocessing (Python, Pandas --> JSON)
The original [dataset](https://data.world/kcmillersean/billboard-hot-100-1958-2017) should be cleaned using a Pandas dataframe, to remove unwanted columns. Then, it should be converted to JSON. This file will be used for creating the line graph.

The Alt Version of dataset should as well be cleaned using a Pandas dataframe, to remove unwanted columns. It will be used for bubble chart and radio chart. All songs per year should be unique.
* Year 2018
  * Genre Pop
  * Genre Rock
    * Artist Muse
    * Artist Imagine Dragons
      * Song A
      * Song B
        * audio_feature1
        * audio_feature2
* Year 2017...

The audio features need to be retrieved using [Python's Spotipy library](https://spotipy.readthedocs.io/en/latest/) (that is connected to the [Spotify Web API](https://developer.spotify.com/documentation/web-api/)). The `audio_features` method takes an array of max 50 song-uri's, and returns an array of objects. Every object is one song with all the audio_features. These have to be added to the existing JSON file.

### JS-file functions
* select_data: This function should take only the desired data (e.g. specific year/genre/artist) and return this to a function that creates a visual.
* create_bubbles: This function should create the bubble chart, using D3. The data should come from **select_data** and change whenever the Year is updated on the webpage.
  * click_circle: This function should trigger both **create_lines** and **create_radio**. Furthermore, it should strongly highlight the bubble that is being selected, and lightly highlight the other songs from the same artist.
  * change_year: This function should trigger **create_bubbles**, and give it data from the newly selected year. The data should come from **select_data**.
  * change_genre: This function should trigger **create_bubbles** and give it data from the same year, but only the selected genre. The data should come from **select_data**.
* create_lines: This function should first check if a newly selected song is from a different artist than the current one. If so, it should create the line graph, using D3. The data should come from **select_data**.
* create_radio: This function should create the radio chart, using D3. The data should come from **select_data** and change whenever a song is selected on the bubble chart.

The following visualizations will use Justin Palmers' [D3-tip](https://github.com/Caged/d3-tip):
* Bubble Chart: Tip is shown when hovering over a bubble. It will show the song title, artist and genre.
* Line Graph: Tip is shown when hovering over a line, showing the name of the song.
