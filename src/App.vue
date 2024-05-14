<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible :theme="state.theme">
      <div class="logo" />
      <a-menu
        v-model:selectedKeys="selectedKeys"
        :theme="state.theme"
        mode="inline"
        @select="handleMenuSelect"
      >
        <a-menu-item key="dashboard">
          <HomeOutlined />
          <span>{{ $t('Dashboard') }}</span>
        </a-menu-item>
        <a-menu-item key="toDo">
          <CheckOutlined />
          <span>{{ $t('ToDos') }}</span>
        </a-menu-item>
        <a-menu-item key="weather">
          <AntCloudOutlined />
          <span>{{ $t('Weather') }}</span>
        </a-menu-item>
        <a-menu-item key="profile">
          <user-outlined />
          <span>{{ $t('Profile') }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        <a-switch
          style="float: inline-end; margin: 20px"
          checked-children="Dark"
          un-checked-children="Light"
          :checked="state.theme === 'dark'"
          @change="changeTheme"
        />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import {
  UserOutlined,
  AntCloudOutlined,
  CheckOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  MenuFoldOutlined
} from '@ant-design/icons-vue'
import type { MenuTheme } from 'ant-design-vue'
const currentURL = window.location.href
const selectedKeys = ref<string[]>([''])
if (currentURL.includes('toDoList')) {
  selectedKeys.value[0] = 'toDo'
} else if (currentURL.includes('weathre')) {
  selectedKeys.value[0] = 'weathre'
} else if (currentURL.includes('profile')) {
  selectedKeys.value[0] = 'profile'
} else {
  selectedKeys.value[0] = 'dashboard'
}
const collapsed = ref<boolean>(false)
const router = useRouter()
const state = reactive({
  theme: 'dark' as MenuTheme
})
if (localStorage.getItem('theme') == 'dark') {
  state.theme = 'dark'
} else {
  state.theme = 'light'
}
const changeTheme = (checked: boolean) => {
  state.theme = checked ? 'dark' : 'light'
}

const handleMenuSelect = ({ key }: { key: string }) => {
  selectedKeys.value = [key]
  router.push({ name: key })
}
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

.anticon-menu-unfold,
.anticon-menu-fold {
  padding: 20px;
}
</style>
