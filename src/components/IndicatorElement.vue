<template>
  <div class="indicator" :class="{indicator_hide: hideIntegration}">
    <p class="indicator__name" v-html="name" ref="indicatorName"/>
		<div class="indicator__indicator-container">
			<p class="indicator__info indicator__info_top" :class="[topInfoClass]"
				 ref="topInfo" v-show="indicatorInfo.show">
				{{indicatorInfo.name}} - {{indicatorInfo.percent}}%
			</p>
			<p class="indicator__info indicator__info_bottom"
				 ref="bottomInfo" v-show="indicatorInfo.show">
				{{indicatorInfo.employees}} employees
			</p>

			<div class="indicator__indicator" ref="indicator"
					 @mousemove="setInfoPosition">

				<div class="indicator__item indicator__item_low image"
						 data-name="Low"
						 @mouseenter="infoAnimation" @mouseleave="hideInfo" />
				<div class="indicator__item indicator__item_middle image"
						 data-name="Middle"
						 @mouseenter="infoAnimation" @mouseleave="hideInfo" />
				<div class="indicator__item indicator__item_high image"
						 data-name="High"
						 @mouseenter="infoAnimation" @mouseleave="hideInfo" />
				<div class="indicator__item indicator__item_not image"
						 data-name="Not Rated"
						 @mouseenter="infoAnimation" @mouseleave="hideInfo" />
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
			required: true
    },
		employees: {
      type: Number,
      default: 100,
			required: true
    },
    elementsWidth: {
      type: Array,
      default() {
        return [30, 15, 15];
      },
			required: true
    },
  },
  data() {
    return {
			elementId: new Date(),

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
		selectedIndicator() {
			return this.$store.getters.getSelectedIndicator
		},

		hideIntegration() {
			const elementWasChosen = this.selectedIndicator !== 0
			const notCurrentElement = this.selectedIndicator !== this.elementId

			return elementWasChosen && notCurrentElement
		},

		topInfoClass() {
			return 'indicator__info_' + this.indicatorInfo.name.toLowerCase()
		}
	},
  methods: {
		// Elements

    setIndicatorElements() {
      this.indicatorElements = this.$refs.indicator.querySelectorAll(".indicator__item");
    },
    setStylesElements(elements) {
      let currentLeft = 0;
      let currentPercent = 0;

      elements.forEach((el, i) => {
				const currentElementPercent = i === 3 ? 100 - currentPercent : this.elementsWidth[i]
        const currentElementWidth = this.calculateWidth(currentElementPercent);
        const smallestElementWidth = currentElementWidth < 8 ? 8 : currentElementWidth;

        el.style.left = currentLeft + "px";
				el.dataset.left = currentLeft;
        el.style.width = smallestElementWidth + "px";

        currentLeft += smallestElementWidth;
				currentPercent += this.elementsWidth[i]

        el.dataset.percent = currentElementPercent
        el.dataset.employees = this.calculateEmployeesPercent(+currentElementPercent)
      });
    },

		// Info

		setInfo({name, percent, employees}) {
			this.indicatorInfo.name = name
			this.indicatorInfo.percent = percent
			this.indicatorInfo.employees = employees
		},
		showInfo() {
			this.indicatorInfo.show = true
		},
		hideInfo(e) {
			this.indicatorInfo.show = false
			this.showNotSelected(e)

			this.$store.commit('setDefaultIndicator', 0)
		},
		setInfoPosition(e) {
			const left = (e.offsetX === undefined) ? e.layerX : e.offsetX;
			const sumLeft = +e.target.dataset.left + left
			const difRight = this.$refs.indicator.offsetWidth - sumLeft

			const borderViolation = this.calculateWidth(65) < sumLeft

			if (!borderViolation) {
				this.$refs.topInfo.style.left = sumLeft + "px"
				this.$refs.bottomInfo.style.left = sumLeft + "px"
			} else {
				this.$refs.topInfo.style.left = "initial"
				this.$refs.bottomInfo.style.left = "initial"

				this.$refs.topInfo.style.right = difRight + "px"
				this.$refs.bottomInfo.style.right = difRight + "px"
			}
		},
		infoAnimation(e) {
			if (this.indicatorInfo.name !== e.target.dataset.name) {
				this.setInfo(e.target.dataset)
			}
			this.hideNotSelected(e)
			this.showInfo()

			this.$store.commit('setSelectedIndicator', this.elementId)
		},

		// Hide not selected

		showNotSelected() {
			this.$refs.indicatorName.style.opacity = '1'
			this.indicatorElements.forEach(el => el.style.opacity = '1')
		},
		hideNotSelected(e) {
			this.$refs.indicatorName.style.opacity = '0.08'
			this.indicatorElements.forEach(el => el.style.opacity = '0.08')
			e.target.style.opacity = '1'
		},

		// Calculate

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

	&_hide
		opacity: 0.08

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

	&__info
		position: absolute
		width: max-content

		&_top
			top: -30px
		&_low
			color: $low
		&_middle
			color: $middle
		&_high
			color: $high
		&_not
			color: $not-hover

		&_bottom
			top: 20px
</style>
