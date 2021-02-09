<template>
  <div class="comment-wrapper">
    <div class="main-comment">
      <textarea class="main-comment-input" v-model="mainCommentInput" />
      <div class="main-comment-btn" @click="onAddComment">提交评论或留言</div>
    </div>
    <div>
      <div
        v-for="(val, index) in commentList"
        :key="index"
        class="user-comment-item"
      >
        <div class="user-comment-content">
          <svg-icon
            iconName="wind-rose"
            iconClass="user-comment-content-avatar"
            :clickEvent="() => mode = 0"
          />
          <span class="user-comment-content-detail">{{ val.content }}</span>
          ——
          <span class="user-comment-info--name">{{ val.commenter }}</span>
          <span class="user-comment-info--time">{{ formatTime(val.time, 'full') }}</span>
          <a href="javascript:;" class="user-comment-info--comment" @click="commentToComment(index)">添加评论</a>
        </div>

        <div class="user-comment-comment">
          <ul>
            <li
              v-for="(sub, idx) in val.subordinate"
              :key="idx"
              class="user-comment-comment--item"
            >
              <svg-icon
                iconName="blossom"
                iconClass="user-comment-comment--content-avatar"
                :clickEvent="() => mode = 0"
              />
              <span class="user-comment-content-detail">{{ sub.content }}</span>
              ——
              <span class="user-comment-info--name">{{ sub.commenter }}</span>
              <span class="user-comment-info--time">{{ formatTime(sub.time, 'full') }}</span>
            </li>
          </ul>
          <div v-if="toComIndex === index" class="user-comment-comment--item user-comment-comment--add">
            <textarea class="user-comment-comment--input" v-model="toComContent" />
            <a
              href="javascript:;"
              class="user-comment-comment--save"
              @click="onAddComment($event, val.id)"
            >提交</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {get, post, getStorage, setStorage, formatTime} from '@/common/utils';
import {ref, onMounted} from 'vue';
import store from '../../store';
import SvgIcon from '../../common/components/SvgIcon'

export default {
  name: 'Article',
  setup(props) {
    // 添加评论
    const commentList = ref([]);
    const mainCommentInput = ref('');
    // 是否是游客用户
    const isTmpUser = ref(false);
    // 对评论进行评论的id
    const toComIndex = ref(-1);
    // 对评论进行的评论
    const toComContent = ref('');

    // 拉评论列表
    const getCommentList = () => get('/action/comment/search', { articleId: props.articleId })
      .then(res => {
        const { ret, data, errmsg } = res;
        if (ret === 0) {
          const { list = [] } = data;
          commentList.value = list;
        } else {
          props.showTips(errmsg);
        }
      })

    getCommentList();

    // 添加新评论, targetId: 对评论进行评论的目标ID
    const onAddComment = (e, targetId = 0) => {
      const user = store.state.currentUser || getStorage('KOVAR_SITE_TEMP_USER') || '';
      // 对评论进行评论，使用小框中的输入；否则使用大框中的输入
      const targetCommentInput = targetId ? toComContent : mainCommentInput
      if (targetCommentInput.value.trim() === '') {
        props.showTips('评论为空，请填写内容后提交。');
      }

      post('/action/comment/add', {
        articleId: props.articleId,
        content: targetCommentInput.value,
        targetId,
        commenter: user,
      }).then(res => {
        const { ret, data, errmsg } = res;
        if (ret === 0) {
          const { newUser = '' } = data;
          // 游客用户，缓存一下以免重复创建
          if (newUser) {
            setStorage('KOVAR_SITE_TEMP_USER', newUser);
            isTmpUser.value = true;
          }
          props.showTips('评论成功');
          targetCommentInput.value = '';
          getCommentList();
        } else {
          props.showTips(errmsg);
        }
      })
    }

    // 对评论进行评论，点击“添加评论”按钮
    const commentToComment = (index) => {
      toComIndex.value = index;
    }

    return {
      toComContent,
      toComIndex,
      commentList,
      commentToComment,
      onAddComment,
      mainCommentInput,
      formatTime
    }
  },
  props: {
    articleId: {
      type: String,
    },
    showTips: {
      type: Function
    }
  },
  components: {
    SvgIcon
  }
}
</script>

<style lang="scss">
.comment-wrapper {
  width: 720px;
  .main-comment {
    display: flex;
    &-input {
      padding: 4px;
      width: 540px;
      height: 140px;
      border: 1px solid #ff8e22;
      border-radius: 2px;
      resize: none;
    }
    &-btn {
      cursor: pointer;
      margin-left: 20px;
      padding: 0 5px;
      height: 30px;
      border-radius: 2px;
      line-height: 30px;
      font-size: 16px;
      text-align: center;
      background:chocolate;
      color: #fff;
    }
  }

  .user-comment-item {
    margin-top: 36px;
    position: relative;
    .user-comment-content {
      padding-left: 20px;
      font-size: 16px;
      line-height: 1.5;
      border-bottom: 1px solid #f0f0f0;
      color: #333;
      &-avatar {
        position: absolute;
        top: 3px;
        left: 0;
        width: 16px;
        height: 16px;
      }
    }
    .user-comment-info {
      &--name {
        color: rgb(44, 58, 192);
        margin-right: 6px;
      }
      &--time {
        color: rgb(80, 46, 82);
      }
      &--comment {
        font-size: 14px;
        margin-left: 20px;
        color: rgb(160, 160, 160);
        &:hover {
          color: rgb(240, 36, 63);
        }
      }
    }
  }
  
  .user-comment-comment {
    padding-left: 33px;
    &--item {
      padding-left: 20px;
      position: relative;
    }
    &--content-avatar {
      position: absolute;
      top: 3px;
      left: 0;
      width: 16px;
      height: 16px;
    }
    &--item {
      margin: 10px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    &--add {

    }
    &--input {
      width: 460px;
      height: 50px;
      padding: 4px 10px;
      resize: none;
      border-left: 2px solid rgb(209, 209, 209);
    }
    &--save {
      font-size: 14px;
      color: rgb(21, 136, 243);
    }
  }
}
</style>
