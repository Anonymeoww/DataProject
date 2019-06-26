## Process Book

### Week 4 - Day 4 (June 20)
The multiline graph works now, with static data. I don't understand why the whole graph seems to have little opacity,
but I'm first focusing on making sure it is linked with the bubble chart. New things on the planning include changing the
position of the graphs and adding explanatory texts.

### Week 4 - Day 3 (June 19)
I had much difficulty in understanding the working of the multiline graph example I found. But I got that working in a separate
file now, with fake data.

### Week 2 - Day 4 (June 13)
The bubble chart now has a connection with the radar chart. When you click a bubble, the radar chart updates. I did change my mind on the radar chart, I want it to show all songs of one artist that have been in the Hot 100 in the selected year. It works now with one song, so I need to add more data to fix this.

### Week 2 - Day 3 (June 12)
Today I made a lot of progress. I managed to create a radar chart of one song with increased opacity on hovering over the area. I found a [library](http://bl.ocks.org/nbremer/raw/21746a9668ffdf6d8242/radarChart.js) online to accomplish this. I had some difficulty with implementing the extra code, because I needed to include both `d3v3` and `d3v5` to make this work.

### Week 2 - Day 2 (June 11)
I managed to create a bubble chart with data from one year. The labels and axes are complete, it just needs a legend to be finished. <br>
A slight change in my python code fixed my last issue. I now have a complete dataset for all years with the audio features. Looking back on the first days, I really overestimated the time it would take to collect all data. It was done within 4 hours.  

### Week 1 - Day 5 (June 7)
I found a problem in my dataset with missing values from Spotify. I gave missing values a value of 0, this should have been a list containing the element 0, like this `[0]`, because my js-function expected a list in that place. I should rewrite my code to fix this.

### Week 1 - Day 4 (June 6)
I managed to delete all duplicates from my first dataset and I used Spotipy to get all audio features for the songs. I now have enough data for the bubble chart and the radar chart.
Unfortunately, the search function in Spotipy (that generates query's to send through the API) doesn't work perfectly with my method. I am aware that I am missing some data, I am not yet sure how much that is.

### Week 1 - Day 3 (June 5)
#### Standup
Today I shared my process so far with the team. *Leo* asked me how long it takes to get the audio features for the songs, because one request takes max 50 track id's. We calculated it would be a total of 17 hours, which is a lot. <br>
#### Progress
I asked Nigel why there were no duplicates in my JSON-file. It turns out that I had accidentally overwritten them, which was nice. It did make me realize that deleting the duplicates from the dataframe can save a lot of time, also for adding the audio features. <br>
Nigel also gave me a great idea for filtering the genre of the songs. He told me I can assign a class to each song with the genre and simply change the opacity when some checkboxes are clicked.

### Week 1 - Day 2 (June 4)
Today I finished my Design Document. I included my ideas for preprocessing and formatting the data and the functions I think I will need. <br> <br>
I also managed to clean half of the data and created the first of two JSON-files from the CSV. I will try to add the audio features to this file tomorrow. I realized that I did not delete any duplicates from the CSV. I loaded the JSON-file in my JS-file and logged it in the console. I couldn't find any duplicates there, wondering if I just made a big mistake or it accidentally turned out fine.

### Week 1 - Day 1 (June 3)
Today I changed my proposal for the last time. It turned out that one of the visuals in my design sketch was not linked with the other two. So I discussed this with Nigel, and decided to use the Radio Chart for displaying information about the selected song. I swapped the Bar Chart with a Line Graph that shows information about the position of the songs from the selected artist in the Hot 100. <br> <br>
I made great progress in testing the Spotipy library as well. I managed to find all the audio features of a song, when giving the song title and artist name. I think I can read these from the CSV file that I have, but I will see that tomorrow. <br> <br>
Also, I started working on my design document, just writing down some ideas to work on tomorrow.
