<template>
  <div class="blog-wrapper" v-show="inited">
    <div class="blog-item-wrapper">
      <section 
        v-for="(item, index) in articles" 
        :key="index" 
        class="blog-item"
        @click="() => toDetail(index)"
      >
        <h4 class="blog-item__title">{{ item.title }}</h4>
        <p class="blog-item__desc">{{ item.describe }}</p>
        <div class="blog-item__meta">
          <div class="blog-item__meta__time">发布时间：{{ item.addTime }}</div>
          <div class="blog-item__meta__time">最后修改时间：{{ item.modifyTime }}</div>
          <div class="blog-item__meta__support">
            <svg-icon iconName="ding" iconClass="support" />
            {{ item.support }}
          </div>
        </div>
      </section>
    </div>
    <pagination :totalPage="totalPage" :onChoosePage="onPaginationChoosePage" class="blog-pagination" />
  </div>
</template>

<script>
import {ref, computed} from 'vue';
import {get, formatTime} from '@/common/utils';
import {router} from '@/router';
import SvgIcon from '@/common/components/SvgIcon';
import Pagination from '@/common/components/Pagination';

export default {
  name: 'Blog',
  setup(props) {
    const inited = ref(false);
    const page = ref(1);
    const articles = ref([]);
    const count = ref(0);

    const totalPage = computed(() => Math.ceil(count.value / 10));

    const format = (articleList) => {
      return articleList.map(item => {
        item.addTime = formatTime(item.addTime, 'full');
        item.modifyTime = formatTime(item.modifyTime, 'full')
        return item;
      })
    }

    const getList = () => {
      return get('/action/blog/list', {page: page.value, isShow: 1})
        .then(res => {
          const {ret, data, errmsg} = res;
          inited.value = true;
          if (ret === 0) {
            count.value = data.count || 0;
            articles.value = format(data.list);
          } else {
            props.showTips(errmsg);
          }
        })
    }

    const onPaginationChoosePage = (pageIndex) => {
      page.value = pageIndex;
      getList(pageIndex);
    }

    const toDetail = (index) => {
      console.log(articles.value);
      router.push('/article/detail?id=' + articles.value[index].id);
    }

    getList();

    return {
      inited,
      count,
      page,
      totalPage,
      articles,
      toDetail,
      onPaginationChoosePage
    }
  },
  props: {
    showTips: {
      type: Function
    }
  },
  components: {
    SvgIcon,
    Pagination
  }
}
</script>

<style lang="scss" scoped>
.blog-wrapper {
  width: 800px;
  padding: 10px 15px 30px;
}
.blog-item-wrapper {
  margin-bottom: 30px;
}
.blog-item {
  cursor: default;
  padding: 10px 20px 20px;
  color: #333;
  box-sizing: border-box;
  position: relative;
  &:hover:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    margin: auto 0;
    background-color: #ebe6de;
  }
  .blog-item__title {
    font-size: 20px;
    margin: 12px 0;
  }
  .blog-item__desc {
    margin-bottom: 15px;
    font-weight: 300;
    color: #555;
    font-size: 18px;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .blog-item__meta {
    display: flex;
    color: #333;
    font-size: 14px;
  }
  .blog-item__meta__time {
    margin-right: 20px;
  }
  .blog-item__meta__support {
    // margin-left: 20px;
  }
}
</style>

<style>
.blog-item .support {
  width: 14px;
  height: 14px;
}
</style>
