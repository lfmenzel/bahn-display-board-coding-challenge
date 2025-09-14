# Coding Challenge Bahn Display Board

## Server:
Inclues SimpleServer and Bahn-Vendo-Client-Server.

[README-SERVER.md](server/README-SERVER.md)

`cd server`

## Client:
Inclues Client and StoryBook.

[README-CLIENT.md](client/README-CLIENT.md)

`cd client`

## Structure of the App:
- Top: Header
  - Left: Search, Select and Clear Stations
  - Right: Config
    - Choose Time limit for connections (5min, **15min**, 30min, 45min, 60min) 
    - Choose Vehicle type (**Trains**, Local, Ships, All)
    - Choose Refresh Interval (none, **1min**, 5min, 15min)
    - Choose Language (**de**, en)
    - Choose Theme (**System**, Dark, Light)
- Center: Board
  - 2 Columns for normal and large devices: Departures, Arrivals
  - 2 Rows for extreme small devices : Departures, Arrivals
  - Full responsive from iPhone SE upwards
- Bottom: Footer with element from top right for extreme small devices

## Stack:
- vite
- react
- typescript
- redux/toolkit
- shadcn
- tailwindcss
- lucide-react
- storybook
- axios
- lodash-es
- i18next
- eslint

# Known Issues and TODOs:
- Server with db-vendo-client is not finished. Experimental
- There are Stations without extIds (atm I filter them out)
- Search and Select is not perfect after a Station is selected
- There are probable more Vehicle Types
- No Tests right now, beside the Components in Storybook
- Quality of Response is not always good, so deal with edge cases
- i18n is not added to Storybook yet
- StoryBook Console Errors are not fixed yet

`@2025 Lars F. Menzel`
# **HAVE FUN!**

