<script lang="ts" setup>
import { register, userList, getUserInfo } from "@/server/api/user";
interface custom {
  userName?: string;
  email?: string;
  level?: number;
}
const selectedProduct = ref([]);
const filters = ref(null);
const customs = reactive([]);
const custom: custom = reactive({});
// 新增用户
const openNew = () => {
  customDialog.value = true;
};
//
const confirmDeleteSelected = () => {};
const exportCSV = (e: Event) => {};
const submitted = ref(false);
const customDialog = ref(false);
const hideDialog = () => {
  customDialog.value = false;
};
// 保存用户编辑
const saveCustomChange = () => {
  customDialog.value = false;
};
// 用户等级
const customLevelOpts = reactive([
  { label: "管理员", value: 0, class: "one" },
  { label: "分销用户", value: 1, class: "two" },
  { label: "普通用户", value: 2, class: "three" },
]);
// 接口调用
onMounted(async () => {
  const res = await userList({});
  console.log(res);
});
</script>

<template>
  <div class="card">
    <Toolbar class="mb-4">
      <template #start>
        <div class="my-2">
          <Button
            label="新增"
            icon="pi pi-plus"
            class="p-button-success mr-2"
            @click="openNew"
          />
          <Button
            label="删除"
            icon="pi pi-trash"
            class="p-button-danger"
            :disabled="!selectedProduct || !selectedProduct.length"
            @click="confirmDeleteSelected"
          />
        </div>
      </template>

      <template #end>
        <Button
          label="导出"
          icon="pi pi-upload"
          class="p-button-help"
          @click="exportCSV($event)"
        />
      </template>
    </Toolbar>
    <DataTable
      v-model:selection="selectedProduct"
      :value="customs"
      dataKey="id"
      tableStyle="min-width: 50rem"
    >
      <template #header>
        <div
          class="flex flex-column md:flex-row md:justify-content-between md:align-items-center"
        >
          <h5 class="m-0">用户列表</h5>
          <span class="block mt-2 md:mt-0 p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filters" placeholder="Search..." />
          </span>
        </div>
      </template>
      <Column selectionMode="single" headerStyle="width: 3rem"></Column>
      <Column field="id" header="ID"></Column>
      <Column field="code" header="用户名/身份"></Column>
      <Column field="name" header="是否会员"></Column>
      <Column field="category" header="到期时间"></Column>
      <Column field="status" header="状态"></Column>
      <Column field="quantity" header="创建时间"></Column>
    </DataTable>

    <Dialog
      v-model:visible="customDialog"
      :style="{ width: '450px' }"
      header="用户 详情"
      :modal="true"
      class="p-fluid"
    >
      <!-- <img
        v-if="custom.image"
        :src="`/images/product/${product.image}`"
        :alt="product.image"
        width="150"
        class="mt-0 mx-auto mb-5 block shadow-2"
      /> -->
      <div class="field">
        <label for="name">用户名</label>
        <InputText
          id="name"
          v-model.trim="custom.userName"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !custom.userName }"
          placeholder="初始密码为auth123456"
        />
        <small v-if="submitted && !custom.userName" class="p-invalid"
          >userName is required.</small
        >
      </div>
      <div class="field">
        <label for="email">邮箱</label>
        <InputText id="email" v-model="custom.email" required="true" />
        <small v-if="submitted && !custom.email" class="p-invalid"
          >email is required.</small
        >
      </div>

      <div class="field">
        <label for="level" class="mb-3">用户等级</label>
        <ClientOnly>
          <Dropdown
            id="level"
            v-model="custom.level"
            :options="customLevelOpts"
            option-label="label"
            placeholder="选择等级"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value">
                <span
                  :class="`product-badge status-${slotProps.value.class}`"
                  >{{ slotProps.value.label }}</span
                >
              </div>
              <span v-else>
                {{ slotProps.placeholder }}
              </span>
            </template>
          </Dropdown>
        </ClientOnly>
      </div>
      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          class="p-button-text"
          @click="saveCustomChange"
        />
      </template>
    </Dialog>
  </div>
</template>

<style scoped lang="scss">
.product-badge {
  border-radius: 2px;
  padding: 0.25em 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.3px;

  &.status-one {
    background: #c8e6c9;
    color: #256029;
  }

  &.status-two {
    background: #ffcdd2;
    color: #c63737;
  }

  &.status-three {
    background: #feedaf;
    color: #8a5340;
  }
}
</style>
