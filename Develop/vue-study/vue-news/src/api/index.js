import axios from 'axios'

/**
 * 1. HTTP Request & Response와 관련된 기본 설정
 */
const config = {
  baseUrl: 'https://api.hnpwa.com/v0/'
}

/**
 * 2. API 함수 정리
 */
function fetchNewsList() {
  return axios.get(`${config.baseUrl}news/1.json`)
}
function fetchJobsList() {
  return axios.get(`${config.baseUrl}jobs/1.json`)
}
function fetchAsksList() {
  return axios.get(`${config.baseUrl}ask/1.json`)
}

export {
  fetchNewsList,
  fetchJobsList,
  fetchAsksList,
}