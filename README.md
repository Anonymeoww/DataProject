# DataProject: Analyzing 50 years of Billboard's Hot 100 Charts :musical_note:
## Problem statement
Music plays an important role in society. Many researchers are interested in 
the popular music in different eras. My website will take the analysis to a higher level, by looking at the audio features of the songs.

## Solution 
My website will have an interactive datavisualization that analyzes audio features of the songs in the Hot 100.

### Main features (MVP)
* A ``Bubble Chart`` that shows the danceability and speechiness of all 100 songs of one year.
* The bubbles will be sized according to the loudness of the song.
* The bubbles will be coloured according to their genre.
* Hovering over a bubble will show the title and artist for the corresponding song.
* Clicking a bubble will show a ``Line Graph`` that will show how long the song has been in the Hot 100, and on what position.
* Clicking a bubble will also show a ``Radar Chart`` with the acousticness, danceability, energy, instrumentalness, liveness, loudness and speechiness of the song.
* Selecting the year from a ``Dropdown Menu`` will change the year.

### Main features (optional)
* Changing the axes of the scatterplot
* Functionality to compare two years (for example having two scatter plots side by side or showing the different years in different shaped datapoints)
* Selecting the season from a ``Dropdown Menu`` will show all songs tagged with this season.

### Prerequisites
* The song data will come from [data.world](https://data.world/kcmillersean/billboard-hot-100-1958-2017). 
* The data on the audio features can be retrieved using the [Spotify API](https://developer.spotify.com/documentation/web-api/). 
* However, I will probably use the [Spotipy](https://spotipy.readthedocs.io/en/latest/) library.
* The visualizations will be made using JavaScript's D3 libraby and the D3-tip.

### Related projects
I found this [dashboard](https://theartandscienceofdata.herokuapp.com/music-dashboard/#!) that uses the same audio features. I can tell from the code that some elements come from D3 and I see some jQuery. I like the idea, but it doesn't look very structured to me.

### Difficulties
I have never worked with Spotipy, so that may be more difficult than it looks. Also, retrieving all of the data might take long because of Spotify's API limits of 50 songs per request.
