<template>
  <div class="sign-layout">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "SignLayout",
};
</script>

<style lang="sass">
.sign-layout
	display: flex
	flex-direction: column
	min-height: 100vh
	background-color: $background-color
</style>
