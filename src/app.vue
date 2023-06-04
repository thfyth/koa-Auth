<script setup lang="ts">
  import { useToast  } from 'primevue/usetoast';
  const bus = useEventBus<string>('toast')
  const toast = useToast();
  const listener = (msg:string)=> {
    toast.add({ severity: 'error', summary: msg,life: 3000 });
    }
  bus.on(listener)
</script>
<template>
  <Toast position="top-center" />
	<NuxtLayout>
		<NuxtLoadingIndicator />
		<NuxtPage />
	</NuxtLayout>
</template>
