<script lang="ts" setup>
import { login } from "@/server/api/user";
definePageMeta({
  layout: "empty",
});

const { $appState } = useNuxtApp();

const userObj = reactive({
  userName: "",
  password: "",
});

const { value, errorMessage, errors } = useField("value", validateField);

function validateField(value: string) {
  if (!value) {
    return "Year is required.";
  }

  return true;
}
const checked = ref(false);

const logoColor = computed(() => ($appState.darkTheme ? "white" : "dark"));
const loginFun = async () => {
  const res = await login(userObj);
  console.log(res);
};
</script>

<template>
  <div
    class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width: 80%">
      <div class="col-12 mt-5 xl:mt-0 text-center">
        <img
          :src="`/images/logo-${logoColor}.svg`"
          alt="Sakai logo"
          class="mb-5"
          style="width: 81px; height: 60px"
        />
      </div>
      <div
        class="col-12 xl:col-6"
        style="
          border-radius: 56px;
          padding: 0.3rem;
          min-width: 520px;
          background: linear-gradient(
            180deg,
            var(--primary-color),
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          class="h-full w-full m-0 py-7 px-4"
          style="
            border-radius: 53px;
            background: linear-gradient(
              180deg,
              var(--surface-50) 38.9%,
              var(--surface-0)
            );
          "
        >
          <div class="text-center mb-5">
            <img
              src="/images/avatar/avatar.png"
              alt="Image"
              height="50"
              class="mb-3"
            />
            <div class="text-900 text-3xl font-medium mb-3">欢迎登陆!</div>
            <span class="text-5 font-medium">Sign in to continue</span>
          </div>

          <div class="w-full md:w-10 mx-auto">
            <label
              for="userName"
              class="block text-900 text-xl font-medium mb-2"
              >用户名</label
            >
            <InputText
              id="userName"
              v-model="userObj.userName"
              type="text"
              class="w-full mb-3"
              placeholder="userName"
              style="padding: 1rem"
              required
            />

            <label
              for="password1"
              class="block text-900 font-medium text-xl mb-2"
              >密码</label
            >
            <Password
              id="password"
              v-model="userObj.password"
              placeholder="Password"
              :toggle-mask="true"
              class="w-full mb-3"
              input-class="w-full"
              :input-style="{ padding: '1rem' }"
              required
            />

            <div class="flex align-items-center justify-content-between mb-5">
              <div class="flex align-items-center">
                <Checkbox
                  id="rememberme1"
                  v-model="checked"
                  :binary="true"
                  class="mr-2"
                />
                <label for="rememberme1">记住我</label>
              </div>
              <a
                class="font-medium no-underline ml-2 text-right cursor-pointer"
                style="color: var(--primary-color)"
                >忘记密码?</a
              >
            </div>
            <Button
              label="登 陆"
              @click="loginFun"
              class="w-full p-3 text-xl"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
