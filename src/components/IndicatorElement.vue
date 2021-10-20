<template>
  <div class="indicator">
    <p class="indicator__name" v-html="name" />
    <div class="indicator__indicator" ref="indicator">
      <div class="indicator__item indicator__item_low image" />
      <div class="indicator__item indicator__item_middle image" />
      <div class="indicator__item indicator__item_good image" />
    </div>
  </div>
</template>

<script>
export default {
  name: "IndicatorElement",
  props: {
    name: {
      type: String,
      default: "Name",
    },
    elementsWidth: {
      type: Array,
      default() {
        return [1, 15, 15];
      },
    },
  },
  data() {
    return {
      indicatorElements: false,
    };
  },
  methods: {
    setIndicatorElements() {
      this.indicatorElements = document.querySelectorAll(".indicator__item");
    },
    setStylesElements(elements) {
      let currentLeft = 0;

      elements.forEach((el, i) => {
        const currentElementWidth = this.calculateWidth(this.elementsWidth[i]);
        const smallestElementWidth = currentElementWidth < 8 ? 8 : currentElementWidth;

        el.style.left = currentLeft + "px";
        el.style.width = smallestElementWidth + "px";

        currentLeft += smallestElementWidth;
      });
    },

    calculateWidth(percent) {
      return this.$refs.indicator.offsetWidth * percent / 100;
    },
  },
  mounted() {
    this.setIndicatorElements();
    this.setStylesElements(this.indicatorElements);
  },
};
</script>

<style lang="sass">
.indicator
	display: flex
	align-items: center

	&__name
		color: #1A1A1A

	&__indicator
		position: relative
		margin-left: 16px
		width: 274px
		height: 6px
		background-color: #F2F2F2
		border-radius: 4px
		overflow: hidden

	&__item
		position: absolute
		min-width: 8px
		height: 100%

		&_low
			left: 0
			background-color: #45E596

		&_middle
			background-color: #FFC44C

		&_good
			background-color: #FF4C4C
</style>
