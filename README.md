# mls

### Challenge Overview:

Your task is to write a script that fetches content from a website and compares it to a list of items found in an XML feed. The script should check if the lineups section(players' names) on the website matches any of the items in the XML feed.

 

### Requirements:

1. The match URL IS:

https://www.mlssoccer.com/competitions/mls-regular-season/2025/matches/stlvspor-07-13-2025/lineups

2. Parse an XML file, feeds.xml (provided), to extract what is needed

3- check inside <team><players></players></team> hint there is a field that contains the display name

3. Validate if the list from the website matches any of the items in the XML feed.

4- Use a GitHub repo to share the code with me and provide screenshots of execution 

 

### Challenge Enhancements(Optional):

- Validate bench players and coaches

- Describe how you will automate this to generate an alert indicating the failure (use any tool you are comfortable with).

- How to improve the code execution if you need to run the same code against parallel matches running at the same time, let's say 10?