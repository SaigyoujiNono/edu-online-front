<template>
  <div class="pagination">
    <span>共{{pageInfo.total}}条</span>
    <span>当前{{pageInfo.current}}/{{pageInfo.pages}}页</span>
    <ul>
      <li v-for="item in pageList">
        <a
          :class="pageInfo.current === item.page ? 'active' : ''"
          href="javascript:void(0)"
          @click="changeHandler(item.page)"
        >
          {{item.left? '左':item.right? '右':item.page}}
        </a>
      </li>
    </ul>
    <div>
      <input v-model="jump" type="text" @keydown.enter.stop="jumpPage">
    </div>
  </div>
</template>

<script>
/**
 * 分页插件
 */
export default {
  name: "Pagination",
  data() {
    return {
      pageInfo: {
        total: 100,
        current: 8,
        pages: 20
      },
      pageList: [],
      jump: 1
    }
  },
  created() {
    this.createPageList()
  },
  watch: {
    'pageInfo.current':{
      handler(val){
        this.createPageList()
        this.$emit('pageChange',val)
      }
    },
    'jump':{
      handler(val){
        if (typeof val !== 'number'){
          if (val*1 < 1){
            this.jump = 1
          }
          else if (val*1 > this.pageInfo.pages){
            this.jump = this.pageInfo.pages
          }
          else {
            this.jump = val*1
          }

        }
      }
    }
  },
  methods: {
    // 生成页码
    createPageList() {
      let {current,pages} = this.pageInfo
      let pageList = []
      if (current <= 5){
        for (let i = 1; i <=(pages<10? pages: 10) ; i++) {
          let page = { page: i }
          pageList.push(page)
        }
      }
      else{
        for (let i = (current+5>=pages? pages-9: current-4); i <=(current+5>=pages? pages: current+5) ; i++) {
          let page = { page: i }
          pageList.push(page)
        }
      }
      if (current > 1){
        pageList.unshift({page: current - 1, left:1 })
      }
      if (current < pages){
        pageList.push({page: current + 1,right:1})
      }
      this.pageList = pageList
    },
    jumpPage() {
      this.pageInfo.current = this.jump
    },
    // 翻页方法
    changeHandler(current) {
      this.pageInfo.current = current
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination{
  width: 100%;
  display: flex;
  margin-top: 40px;
  justify-content:center;
  align-items: center;
  color: #595858;
  >*{
    margin: 0 4px;
  }
  ul {
    display: flex;
    li{
      margin: 0 4px;
      border-radius:4px;
      a {
        box-sizing: border-box;
        display: flex;
        justify-content:center;
        align-items: center;
        background-color:rgba(0, 0, 0, 0.2);
        width: 40px;
        height: 40px;
        border-radius:4px;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
        &:hover{
          border: 2px solid #37ff00;
        }
        &.active{
          background-color:#37ff00;
        }
      }
    }
  }
  input {
    box-sizing: border-box;
    color: inherit;
    padding:0 0.5em;
    outline: none;
    border: none;
    background-color: rgba(0, 0, 0, 0.1);
    height: 40px;
    width: 60px;
    border-radius:4px;
    font-size: inherit;
  }
}
</style>
