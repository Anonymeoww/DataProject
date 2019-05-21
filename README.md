# DataProject: Analyzing 50 years of Billboard's Hot 100 Charts :musical_note:

## Summary
My name is Dilisha Jethoe, and below you will find the proposal for my Data Processing Project. The idea is to look at the audio features of songs in the Billboard's Hot 100 Chart over a period of 10 years. Users can filter the year and genre, and get more detailed information on the artists and the popular genres in every year. I included a [sketch](#design-sketch) below.

## Problem statement
Music plays an important role in society. Many researchers are interested in the popular music in different eras. My website will take this analysis to a higher level, by looking at the audio features of the songs.

## Solution 
My website will have an interactive data visualization that analyzes audio features of the songs in Billboard's Hot 100 over different years.

### Main features (MVP)
* There will be a page that explains all the variables used on the site.
* There will be a ``Bubble Chart`` that shows the danceability and speechiness of all 100 songs of one year.
* The bubbles will be **sized** according to the loudness of the song.
* The bubbles will be **coloured** according to their genre.
* **Hovering** over a bubble will show the relevant data for the corresponding song.
* Clicking a bubble will show a ``Bar Chart`` that will show the loudness, danceability and speechiness for all songs of the artist.
* There will be a ``Radar Chart`` with danceabilityper genre.
* Selecting the year from a ``Dropdown Menu`` will update the Bubble Chart and the Radar Chart.
* Selecting specific genres with ``Checkboxes`` will filter the Bubble Chart for the selected genres.

### Main features (optional)
* Changing the variables on the axes of the Bubble Chart (danceability, speechiness, loudness, acousticness and many others).
* Functionality to compare two artists (show two bar charts).
* Animating the Bubble Chart to show the development over time when clicking a 'Play' button. <br> <br>

### Design sketch
This will be shown when visiting the page:
![Image1 cannot be displayed](doc/firstlook.png "On first opening") <br> <br>
This will be shown when clicking a bubble:
![Image2 cannot be displayed](doc/secondlook.png "On clicking a bubble") <br><br>
The Bar Chart will show all songs for the selected artist, but the Radar Chart will stay the same.

### Prerequisites
* The song data will come from [data.world](https://data.world/kcmillersean/billboard-hot-100-1958-2017). The available data contains weekly charts from 1958 to 2017.
* The data on the audio features can be retrieved using the [Spotify API](https://developer.spotify.com/documentation/web-api/).
* However, I will probably use the [Spotipy](https://spotipy.readthedocs.io/en/latest/) library.
* The visualizations will be made using JavaScript's D3 libraby and the D3-tip.

### Related projects
I found this [dashboard](https://theartandscienceofdata.herokuapp.com/music-dashboard/#!) that uses the same audio features. I can tell from the code that some elements come from D3 and I see some jQuery. I like the idea, but it doesn't look very structured to me.

### Difficulties
I have never worked with Spotipy, so that may be more difficult than it looks. Also, retrieving all of the data might take long because of Spotify's API limits of 50 songs per request. It will however be possible to start programming with little data, and add more over time.
