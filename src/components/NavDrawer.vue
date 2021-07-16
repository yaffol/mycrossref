<template>
  <v-navigation-drawer
    v-model="localDrawer"
    temporary
    app
  >
    <v-system-bar color="secondary"></v-system-bar>
<!--    <v-img :src="this.$logoImageUrl"></v-img>-->
    <v-list>
      <v-list-item class="py-6 py-xs-2">
        <app-logo></app-logo>
      </v-list-item>
      <template v-for="(item, index) in items">
        <v-list-item v-if="!item.items" :key="`item-${index}`" :href="item.url">
          <v-list-item-title>{{ item.label }}</v-list-item-title>
        </v-list-item>
        <template v-if="item.items">
          <v-list-group :key="`multi-level-group${index}`">
            <template v-slot:activator>
              <v-list-item-title>{{ item.label }}</v-list-item-title>
            </template>
            <v-list-item v-for="(multiLevelItem, index) in item.items" :key="`item-${index}`" class="pl-6" :href="multiLevelItem.url">
              <v-list-item-title>{{ multiLevelItem.label }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </template>
      </template>
    </v-list>
    <v-divider></v-divider>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import AppLogo from '@/components/AppLogo.vue'

interface MenuItem {
  label: string, icon: string, url: string
}

interface MultiLevelMenuItem {
  label: string, items: MenuItem[]
}

interface MenuList {
  items: MenuItem[] | MultiLevelMenuItem[]
}
export default defineComponent({
  name: 'NavDrawer',
  components: { AppLogo },
  props: {
    value: {
      type: Boolean
    }
  },
  setup () {
    const items: Array<MenuItem | MultiLevelMenuItem> = []
    function createItem (index: number, text: string): MenuItem {
      const number: number = index + 1
      const label = `${text} ${number}`
      const icon = ''
      const url = `https://www.crossref.org/${number}`
      return { label, icon, url }
    }
    function createMultiLevelMenuItem (index: number, text: string, numberOfSubItems: number) : MultiLevelMenuItem {
      const number: number = index + 1
      const multiItems: MultiLevelMenuItem = {
        label: `${text} ${number}`,
        items: []
      }
      for (let j = 0; j < numberOfSubItems; j++) {
        multiItems.items.push(createItem(j, 'Multi level option'))
      }

      return multiItems
    }
    for (let i = 0; i < 6; i++) {
      if (i === 5) {
        const multiLevelMenuItem: MultiLevelMenuItem = createMultiLevelMenuItem(i, 'Option', 6)
        items.push(multiLevelMenuItem)
      }
      if (i !== 5) {
        items.push(createItem(i, 'Option'))
      }
    }
    return { items }
  },
  data: () => ({
    localDrawer: false
  }),
  watch: {
    value: function () {
      this.localDrawer = this.value
    },
    localDrawer: function () {
      this.$emit('input', this.localDrawer)
    }
  }
})
</script>

<style scoped>

</style>
