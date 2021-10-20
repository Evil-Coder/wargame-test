<template>
  <section class="enter-page">
    <IndicatorElement />
  </section>
</template>

<script>
// eslint-disable-next-line import/extensions,import/no-unresolved
import IndicatorElement from "../components/IndicatorElement";

export default {
  name: "EnterPage",
  components: { IndicatorElement },
};
</script>

<style lang="sass">
.enter-page
	display: flex
	flex-direction: column
	justify-content: space-between
	flex-grow: 1
</style>
