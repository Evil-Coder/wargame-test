<template>
  <section class="enter-page">
    <IndicatorElement name="Risk of Loss" :employees="200" :elements-width="[1, 30, 60]"
											:select-element="selectElement" :elementIndex="1"
											@hoverIndicator="chooseElement" @unchoose="unchooseElement"/>
    <IndicatorElement name="Impact of Loss" :employees="200" :elements-width="[10, 85, 5]"
											:select-element="selectElement" :elementIndex="2"
											@hoverIndicator="chooseElement" @unchoose="unchooseElement"/>
    <IndicatorElement name="Satisfaction" :employees="200" :elements-width="[1, 8, 10]"
											:select-element="selectElement" :elementIndex="3"
											@hoverIndicator="chooseElement" @unchoose="unchooseElement"/>
    <IndicatorElement name="Performance" :employees="200" :elements-width="[70, 15, 10]"
											:select-element="selectElement" :elementIndex="4"
											@hoverIndicator="chooseElement" @unchoose="unchooseElement"/>
  </section>
</template>

<script>
import IndicatorElement from "../components/IndicatorElement";

export default {
  name: "EnterPage",
  components: { IndicatorElement },
	data() {
		return {
			selectElement: 0,
		}
	},
	methods: {
		chooseElement(chooseElementIndex) {
			return this.selectElement = chooseElementIndex
		},
		unchooseElement() {
			return this.selectElement = 0
		}
	},
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
