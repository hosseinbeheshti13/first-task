<template>
  <a-table :columns="columns" :data-source="dataSource" bordered theme="dark">
    <template #bodyCell="{ column, text, record }">
      <template v-if="['title'].includes(column.dataIndex)">
        <div>
          <a-input
            v-if="editableData[record.key]"
            v-model:value="editableData[record.key][column.dataIndex]"
            style="margin: -5px 0"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span v-if="editableData[record.key]">
            <a-typography-link @click="save(record.key)">Save</a-typography-link>
            <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="edit(record.key)"><EditOutlined /></a>
          </span>
        </div>
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="onDelete(record.key)"
        >
          <a><DeleteOutlined /></a>
        </a-popconfirm>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { cloneDeep } from 'lodash-es'
import { reactive, ref } from 'vue'
import type { UnwrapRef } from 'vue'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue'

const columns = [
  {
    title: 'ToDo List',
    dataIndex: 'title',
    width: '90%'
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    width: '10%'
  }
]
interface DataItem {
  key: string
  title: string
}
const data: DataItem[] = []
for (let i = 0; i < 20; i++) {
  data.push({
    key: i.toString(),
    title: `to do day ${i}`
  })
}

const dataSource = ref(data)
const editableData: UnwrapRef<Record<string, DataItem>> = reactive({})

const edit = (key: string) => {
  editableData[key] = cloneDeep(dataSource.value.filter((item) => key === item.key)[0])
}
const save = (key: string) => {
  Object.assign(dataSource.value.filter((item) => key === item.key)[0], editableData[key])
  delete editableData[key]
}
const cancel = (key: string) => {
  delete editableData[key]
}
const onDelete = (key: string) => {
  dataSource.value = dataSource.value.filter((item) => item.key !== key)
}
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
