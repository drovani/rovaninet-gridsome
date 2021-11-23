<template>
  <div class="container max-w-screen-lg mx-auto p-2 sm:p-4">
    <nav class="flex items-center justify-between flex-wrap p-6">
      <div class="flex items-center flex-shrink-0 text-black mr-6">
        <span class="font-semibold text-xl tracking-tight">
          <g-link to="/">{{ $static.metadata.siteName }}</g-link>
        </span>
      </div>
      <div class="block sm:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded text-black border-black hover:text-white hover:bg-black focus:text-white focus:bg-black"
          @click="showMenu = !showMenu"
        >
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        class="w-full block flex-grow sm:flex sm:items-center sm:w-auto border border-grey-600 p-2 mt-2 rounded sm:border-t-0 sm:border-l-0 sm:rounded-t-none sm:rounded-l-none"
        :class="{ hidden: !showMenu }"
      >
        <div class="text-sm sm:flex-grow text-right">
          <g-link
            class="block mt-0 sm:inline-block text-black hover:text-red-900 mr-4"
            to="/about/"
          >About Me</g-link>
          <g-link
            class="block mt-4 sm:inline-block sm:mt-0 text-black hover:text-red-900 mr-4"
            to="/mercenaries-helper"
          >HS Mercs</g-link>
          <a
            class="block mt-4 sm:inline-block sm:mt-0 text-black hover:text-red-900 mr-4"
            href="/admin"
          >Admin</a>
        </div>
      </div>
    </nav>
    <transition name="fade" appear>
      <main class="font-sans antialiased">
        <slot />
      </main>
    </transition>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script lang="ts">
export default {
  data: function () {
    return {
      showMenu: false
    }
  }
}
</script>

<style>
</style>
