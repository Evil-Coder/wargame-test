<template>
  <section class="enter-page">
    <IndicatorElement name="Risk of Loss" :employees="200" :elements-width="[1, 30, 60]"/>
    <IndicatorElement name="Impact of Loss" :employees="200" :elements-width="[10, 85, 5]"/>
    <IndicatorElement name="Satisfaction" :employees="200" :elements-width="[1, 8, 10]"/>
    <IndicatorElement name="Performance" :employees="200" :elements-width="[70, 15, 10]"/>
  </section>
</template>

<script>
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
	flex-grow: 1
	padding: 100px

	div
		&:not(:last-child)
			margin-bottom: 50px
</style>
