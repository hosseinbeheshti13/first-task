<template>
  <div class="profile">
    <a-input v-model:value="userName">
      <template #prefix>
        <user-outlined />
      </template>
      <template #suffix>
        <a-tooltip title="enter your name">
          <info-circle-outlined style="color: rgba(0, 0, 0, 0.45)" />
        </a-tooltip>
      </template>
    </a-input>
    <br />
    <a-select v-model:value="theme" class="mt-4" style="width: 100%">
      <a-select-option value="dark">dark</a-select-option>
      <a-select-option value="light">light</a-select-option>
    </a-select>
    <br />
    <a-select v-model:value="localeChanger" class="mt-4" style="width: 100%">
      <a-select-option value="en">english</a-select-option>
      <a-select-option value="fa">persian</a-select-option>
    </a-select>
    <br />
    <div class="save-info-btn">
      <a-button class="mt-4" type="primary" :loading="loading" @click="saveSetting">
        save
      </a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';
const theme = ref<string>('theme')
const localeChanger = ref<string>('locale')
const loading = ref<boolean>(false)
const userName = ref<string>('')
  const { locale } = useI18n();
async function saveSetting() {
  loading.value = true
  localStorage.setItem('theme', theme.value)
  localStorage.setItem('locale', locale.value)
  localStorage.setItem('name', userName.value)
  locale.value = localeChanger.value;
  loading.value = false
}
</script>

<style scoped>
.profile {
  padding: 10% 20%;
}

.mt-4 {
  margin-top: 25px;
}

.save-info-btn {
  text-align: center;
}
</style>
