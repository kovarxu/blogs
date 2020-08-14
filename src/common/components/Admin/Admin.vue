<template>
  <div class="admin-panel">
    <div class="admin-panel__header">
      控制板
      <svg-icon 
        iconName="close" 
        iconClass="admin-panel__close" 
        :clickEvent="closeThePanel" 
      />
      <svg-icon
        v-show="mode !== 0"
        iconName="left-arrow-1"
        iconClass="admin-panel__left-icon"
        :clickEvent="() => mode = 0"
      />
    </div>

    <div v-if="mode === 0" class="admin-panel__body admin-panel__controls">
      <a class="admin-panel__controls__btn" @click="toAddArticle">写文章</a>
      <a class="admin-panel__controls__btn" @click="editArticle">编辑当前文章</a>
      <a class="admin-panel__controls__btn" @click="manageDrafts">草稿箱</a>
    </div>
    <div v-else-if="mode === 1" class="admin-panel__body admin-panel__drafts">
      <draft-manager :closeThePanel="closeThePanel" :changeAdminMessage="changeAdminMessage" />
    </div>

    <div class="admin-panel__footer" v-html="adminMessage"></div>
  </div>
</template>

<script>
import {ref} from 'vue';
import {router} from '@/router';
import SvgIcon from '@/common/components/SvgIcon';
import DraftManager from './Drafts';

export default {
  name: 'AdminPanel',
  setup(props, context) {
    const adminMessage = ref('欢迎管理员');
    const mode = ref(0); // 0 控制板 1 草稿管理

    const closeThePanel = () => {
      context.emit('close');
    }

    const toAddArticle = () => {
      router.push('/article/add');
      closeThePanel();
    }

    const changeAdminMessage = mes => {
      const nowMes = adminMessage.value;
      adminMessage.value = mes;
      setTimeout(() => {
        adminMessage.value = nowMes || '';
      }, 2000)
    }

    const editArticle = () => {
      const currentRoute = router.currentRoute.value;
      // const path = currentRoute.path;
      const id = currentRoute.query.id;
      if (!id) {
        changeAdminMessage('<span style="color:#e00">非文章页面</span>');
      } else {
        router.push('/article/edit?id=' + id);
        closeThePanel();
      }
    }

    const manageDrafts = () => {
      mode.value = 1;
    }

    return {
      mode,
      adminMessage,
      toAddArticle,
      editArticle,
      closeThePanel,
      manageDrafts,
      changeAdminMessage
    }
  },
  components: {
    SvgIcon,
    DraftManager
  }
}
</script>

<style lang="scss">
.admin-panel {
  position: fixed;
  z-index: 1;
  top: 70px;
  width: 600px;
  min-height: 300px;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  background: #fafafa;
  border-radius: 6px;
  .admin-panel__header {
    line-height: 40px;
    font-size: 24px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }
  .admin-panel__body {
    flex: 1;
    max-height: 400px;
    overflow: auto;
    padding: 10px;
  }
  .admin-panel__controls {
    display: flex;
  }
  .admin-panel__controls__btn {
    height: 30px;
    margin-right: 10px;
    padding: 0 10px;
    min-width: 5em;
    background: cadetblue;
    border-radius: 2px;
    color: #fff;
    line-height: 30px;
    text-align: center;
  }
  .admin-panel__footer {
    line-height: 24px;
    font-size: 14px;
    padding-left: 10px;
    border-top: 1px solid #ddd;
  }
}
</style>

<style>
.admin-panel__close {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 20px;
  height: 20px;
}
.admin-panel__left-icon {
  position: absolute;
  top: 8px;
  left: 10px;
  width: 22px;
  height: 22px;
}
</style>
