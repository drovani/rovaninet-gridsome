<template>
  <div class="container max-w-screen-md mx-auto px-5">
    <header class="flex justify-between items-center mt-8 mb-12">
      <strong>
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </strong>
      <nav>
        <g-link to="/">Home</g-link>
        <g-link class="ml-6" to="/about/">About</g-link>
        <a class="ml-6" href="/admin">Admin</a>
      </nav>
    </header>
    <transition name="fade" appear>
      <main>
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
export default {}
</script>

<style>
</style>
