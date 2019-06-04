# DataProject: Analyzing 50 years of Billboard's Hot 100 Charts :musical_note:

## Summary
My name is Dilisha Jethoe, and below you will find the proposal for my Data Processing Project. The idea is to look at the audio features of songs in the Billboard's Hot 100 Chart over a period of 10 years. Users can filter the year and genre, and get more detailed information on the artists and the popular genres in every year. I included a [sketch](#design-sketch) below.

## Problem statement
Music plays an important role in society. Many researchers are interested in the popular music in different eras. My website will take this analysis to a higher level, by looking at the micro and macro aspects of music. The analysis will be done on micro level by looking at the songs themselves. At the same time, you will be able to get a macro perspective on this analysis by looking at the trends over time, surpassing the boundaries of just one era by looking at the music industry history as a whole.

## Solution
My website will have an interactive data visualization that analyzes audio features of the songs in Billboard's Hot 100 over different years.

### Main features (MVP)
* There will be a page that explains all the variables used on the site.
* There will be a ``Bubble Chart`` that shows the danceability and speechiness of all unique songs of one year. Every bubble will represent one song.
* The bubbles will be **sized** according to the loudness of the song.
* The bubbles will be **coloured** according to their genre.
* **Hovering** over a bubble will show the relevant data for the corresponding song.
* Clicking a bubble will show a ``Line Graph`` that will show different lines. The lines represent all songs from the corresponding artist that were in the Hot 100 Chart in the selected year. The graph will show the position that the songs had in the Hot 100, so the x-axis will show the weeknumber and the y-axis will show the positions 1 to 100.
* Clicking a bubble will show a ``Radar Chart`` . The different variables for the selected song will be shown on the different axes.
* Selecting the year from a ``Dropdown Menu`` will update the Bubble Chart and the Radar Chart.
* Selecting specific genres with ``Checkboxes`` will filter the Bubble Chart for the selected genres.

### Main features (optional)
* Changing the variables on the axes of the Bubble Chart (danceability, speechiness, loudness, acousticness and many others).
* Animating the Bubble Chart to show the development over time when clicking a 'Play' button. <br> <br>

### Design sketch
I based my sketch on dummy data. So the 10 bubbles in the sketch should be all bubbles for all unique songs in the selected year. <br>
This will be shown when visiting the page:
![Image1 cannot be displayed](https://github.com/Anonymeoww/DataProject/blob/master/doc/firstlook2.PNG "On first opening") <br> <br>
This will be shown when clicking a bubble:
![Image2 cannot be displayed](https://github.com/Anonymeoww/DataProject/blob/master/doc/secondlook.PNG "On clicking a bubble") <br><br>
The Line Graph will show all songs for the selected artist, but the Radar Chart will stay the same.

### Prerequisites
* The song data will come from [data.world](https://data.world/kcmillersean/billboard-hot-100-1958-2017). The available data contains weekly charts from 1958 to 2017. While preprocessing, my goal is to create two datasets. <br>
The first dataset will come directly from the above mentioned source and will be used for the Line Graph. <br>
The second dataset will contain all unique songs from the Hot 100 per year.
 I will use this data to retrieve information about the audio features of the separate songs, combining the data myself.
* The data on the audio features can be retrieved using the [Spotify API](https://developer.spotify.com/documentation/web-api/).
* The [Spotipy](https://spotipy.readthedocs.io/en/latest/) library will be used to send requests to the Spotify WEB API.
* The visualizations will be made using JavaScript's D3 library and the D3-tip.

### Related projects
I found this [dashboard](https://theartandscienceofdata.herokuapp.com/music-dashboard/#!) that uses the same audio features. I can tell from the code that some elements come from D3 and I see some jQuery. I like the idea, but it doesn't look very structured to me.

### Difficulties
I have never worked with Spotipy, so I might need my time to figure out authentication and sending requests using this library. Additionally, retrieving all of the data might take a while because Spotify's API limits to 50 songs per request. It will however be possible to start programming with little data, and add more over time.
