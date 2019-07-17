<template>
  <div>
    <div
      v-for="job in jobs"
      :key="job.id"
    >{{ job.title }}</div>
  </div>
</template>

<script>
import { fetchJobsList } from '../api/index'
export default {
  data() {
    return {
      jobs: []
    }
  },
  created() {
    fetchJobsList()
      .then(response => this.jobs = response.data)
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>