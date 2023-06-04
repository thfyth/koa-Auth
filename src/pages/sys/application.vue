<script lang="ts" setup>
import { register, userList, getUserInfo } from "@/server/api/user";
interface appInfo {
  appTitle?: string;
  appKey?: string;
  appType?: number;
  status?: number;
}
const selectedProduct = ref([]);
const filters = ref(null);
let appInfos = ref([]);
const option = ref([
  {label: '异常',value: 0},
  {label: '正常',value: 1}
])
const getLabel = (val:number)=> {
  return option.value.filter(v=>v.value === val)[0].label
} 
const appInfo: appInfo = reactive({});
// 新增用户
const openNew = () => {
  appDialog.value = true;
};
//
const confirmDeleteSelected = () => {};
const exportCSV = (e: Event) => {};
const submitted = ref(false);
const appDialog = ref(false);
const hideDialog = () => {
  appDialog.value = false;
};
// 保存用户编辑
const saveappInfoChange = async () => {
  console.log(appInfo);
  const res = await register(appInfo)
  console.log(res);
  
  // appDialog.value = false;
};
// 用户等级
const appInfoLevelOpts = reactive([
  { label: "免费", value: 0, },
  { label: "收费", value: 1,},
]);
// 接口调用
onMounted(async () => {
  const res = await userList({});
  if(res.code === 200 && res.data) {
    appInfos.value = res.data.records
  }
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
      :value="appInfos"
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
      <Column field="userName" header="用户名/身份"></Column>
      <Column field="status" header="状态">
        <template #body="slotProps">
            {{ getLabel(slotProps.data.status) }}
        </template>
      </Column>
      <Column field="createdAt" header="创建时间"></Column>
    </DataTable>
    <Dialog
      v-model:visible="appDialog"
      :style="{ width: '450px' }"
      header="APP 信息"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="appTitle">应用名称</label>
        <InputText
          id="appTitle"
          v-model.trim="appInfo.appTitle"
          required="true"
          autofocus
          :class="{ 'p-invalid': submitted && !appInfo.appTitle }"
        />
        <small v-if="submitted && !appInfo.appTitle" class="p-invalid"
          >appTitle is required.</small
        >
      </div>
      <div class="field">
        <label for="appType" class="mb-3">app类型</label>
        <ClientOnly>
          <Dropdown
            id="appType"
            v-model="appInfo.appType"
            :options="appInfoLevelOpts"
            option-label="label"
            placeholder="选择类型"
          >
            <template #value="slotProps">
              <div v-if="slotProps.value">
                <span
                  :class="`product-badge`"
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
          @click="saveappInfoChange"
        />
      </template>
    </Dialog>
  </div>
</template>

