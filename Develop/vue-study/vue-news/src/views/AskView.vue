<template>
  <div>
    <div
      v-for="ask in asks"
      :key="ask.id"
    >{{ ask.title }}</div>
  </div>
</template>

<script>
import { fetchAsksList } from '../api/index'

export default {
  data() {
    return {
      asks: []
    }
  },
  created() {
    fetchAsksList()
      .then(response => this.asks = response.data)
      .catch((err) => {
        console.log(err)
      })
  }
}
</script>