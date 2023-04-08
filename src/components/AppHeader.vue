<script lang="ts">
import { RouterLink } from 'vue-router'
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    isActive(routeName: string) {
      return this.$route.matched.some(({ name }) => name === routeName)
    }
  }
})
</script>

<template>
  <header class="bg-white">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      aria-label="Global"
    >
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Dominic Cartwright</span>
          <img class="h-20 w-auto" src="/src/assets/logo.png" alt="Dominic Cartwright" />
        </a>
      </div>

      <div class="lg:flex lg:gap-x-12">
        <RouterLink
          class="text-sm font-semibold leading-6 text-gray-900 px-4 py-2"
          :class="isActive('search') ? 'border-b-2  border-red-700' : ''"
          to="/"
        >
          Search
        </RouterLink>
        <RouterLink
          class="text-sm font-semibold leading-6 text-gray-900 px-4 py-2"
          :class="isActive('history') ? 'border-b-2  border-red-700' : ''"
          to="/history"
        >
          History
        </RouterLink>
      </div>
    </nav>
  </header>
</template>
