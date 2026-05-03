// services/wikiService.js
// this file handles all API calls to Wikipedia
// we use Wikipedia API to get productivity tips

import axios from 'axios'

// Wikipedia API base URL
const WIKI_API = 'https://en.wikipedia.org/api/rest_v1/page/summary/'

// this function fetches a summary about a productivity topic from Wikipedia
export async function getProductivityTip(topic) {
  try {
    // make API call using axios
    const response = await axios.get(WIKI_API + encodeURIComponent(topic))
    // return the extract (short summary)
    return response.data.extract
  } catch (error) {
    // if API fails, return a default message
    console.error('Wikipedia API error:', error)
    return 'Could not load tip. Try again later.'
  }
}

// list of topics to fetch tips about

export const PRODUCTIVITY_TOPICS = [
  "Pomodoro_technique",
  "Getting_Things_Done",
  "Time_management",
  "Mindfulness",
  "Deep_work",
  "Time_blocking",
  "Atomic_habits",
  "Goal_setting",
 "Concentration",
 "Cognitive_control",
  "Productivity"
]