<template>
  <div class="indicator">
    <p class="indicator__name" v-html="name" />
		<div class="indicator__indicator-container">
			<template v-show="!indicatorInfo.show">
				<p class="indicator__info-top"
					 :class="[topInfoClass]">
					{{indicatorInfo.name}} - {{indicatorInfo.percent}}%
				</p>
				<p class="indicator__info-bottom">{{indicatorInfo.employees}} employees</p>
			</template>

			<div class="indicator__indicator" ref="indicator">

				<div class="indicator__item indicator__item_low image"
						 data-name="Low"
						 @mouseenter="showInfo" @mouseleave=""/>
				<div class="indicator__item indicator__item_middle image"
						 data-name="Middle"
						 @mouseenter="showInfo" @mouseleave=""/>
				<div class="indicator__item indicator__item_high image"
						 data-name="High"
						 @mouseenter="showInfo" @mouseleave=""/>
				<div class="indicator__item indicator__item_not image"
						 data-name="Not Rated"
						 @mouseenter="showInfo" @mouseleave=""/>
			</div>
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
		employees: {
      type: Number,
      default: 110,
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

			indicatorInfo: {
				show: false,

				name: '',
				percent: 0,
				employees: 0
			}
    };
  },
	computed: {
		topInfoClass() {
			return 'indicator__info-top_' + this.indicatorInfo.name.toLowerCase()
		}
	},
  methods: {
    setIndicatorElements() {
      this.indicatorElements = document.querySelectorAll(".indicator__item");
    },
    setStylesElements(elements) {
      let currentLeft = 0;
      let currentPercent = 0;

      elements.forEach((el, i) => {
				const currentElementPercent = i === 3 ? 100 - currentPercent : this.elementsWidth[i]
        const currentElementWidth = this.calculateWidth(currentElementPercent);
        const smallestElementWidth = currentElementWidth < 8 ? 8 : currentElementWidth;

        el.style.left = currentLeft + "px";
        el.style.width = smallestElementWidth + "px";

        currentLeft += smallestElementWidth;
				currentPercent += this.elementsWidth[i]

        el.dataset.percent = currentElementPercent
      });
    },

		setInfo({name, percent, employees}) {
			this.indicatorInfo.name = name
			this.indicatorInfo.percent = percent
			this.indicatorInfo.employees = employees
		},
		showInfo(e) {
			this.setInfo({
				name: e.target.dataset.name,
				percent: e.target.dataset.percent,
				employees: this.calculateEmployeesPercent(e.target.dataset.percent)
			})

			this.indicatorInfo.show = true

			console.log(this.indicatorInfo)
		},

    calculateWidth(percent) {
      return this.$refs.indicator.offsetWidth * percent / 100;
    },
    calculateEmployeesPercent(percent) {
      return Math.round(this.employees * percent / 100);
    },
  },
  mounted() {
    this.setIndicatorElements();
    this.setStylesElements(this.indicatorElements);
  },
};
</script>

<style lang="sass">
$low: #45E596
$middle: #FFC44C
$high: #FF4C4C
$not: #F2F2F2
$not-hover: #808080


.indicator
	display: flex
	align-items: center

	&__name
		color: #1A1A1A

	&__indicator-container
		position: relative

	&__indicator
		position: relative
		margin-left: 16px
		width: 274px
		height: 6px
		background-color: #F2F2F2
		border-radius: 4px
		overflow: hidden
		&:hover
			cursor: pointer

	&__item
		position: absolute
		min-width: 8px
		height: 100%

		&_low
			background-color: $low
		&_middle
			background-color: $middle
		&_high
			background-color: $high
		&_not
			background-color: $not
			&:hover
				background-color: $not-hover

	&__info-top
		position: absolute
		top: -30px

		&_low
			color: $low
		&_middle
			color: $middle
		&_high
			color: $high
		&_not
			color: $not-hover

	&__info-bottom
		position: absolute
		top: 20px
</style>
