<template>
  <div>
    Nuxt module playground!
  </div>
</template>

<script setup>
const toast = useToast()

// Show a toast for 30 seconds
toast.success({
  title: 'Hooray!',
  message: 'iziToast is awesome!',
})
</script>
