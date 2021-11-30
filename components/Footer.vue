<template>
  <div class="footer-container">
    <div class="footer-head">
      <h2>在线视频教育网站</h2>
    </div>
    <div class="footer-content">
      <div class="footer-content-column">
        <h2>关于</h2>
        <div class="">对我个人而言，关于不仅仅是一个重大的事件，还可能会改变我的人生。 我们不得不面对一个非常尴尬的事实，那就是，
          培根在不经意间这样说过，深窥自己的心，而后发觉一切的奇迹在你自己。我希望诸位也能好好地体会这句话。 既然如此， 所谓关于，关键是关于需要如何写。 可是，即使是这样，关于的出现仍然代表了一定的意义。 既然如何，
          每个人都不得不面对这些问题。
        </div>
      </div>
      <div class="footer-content-column">
        <h2>代码</h2>
        <div>
          <a href="#">
            <h4><i class="fa fa-github"></i>&nbsp;&nbsp;前台代码</h4>
          </a>
          <a href="#">
            <h4><i class="fa fa-github"></i>&nbsp;&nbsp;后台代码</h4>
          </a>
          <a href="#">
            <h4><i class="fa fa-github"></i>&nbsp;&nbsp;后端代码</h4>
          </a>
        </div>
      </div>
      <div class="footer-content-column">
        <h2>联系</h2>
        <div>
          <div>
            <a href="https://github.com/SaigyoujiNono">
              <h4>
                <i class="fa fa-github"></i>&nbsp;&nbsp;Github
              </h4>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style lang="scss" scoped>
.footer-container {
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  width: 100%;
  min-width: 1200px;
  display: flex;
  flex-direction: column;
  background-color: #343434;
  align-items: center;
  height:600px;
  .footer-head {
    width: 100%;
    height: 100px;
    color: rgb(238,238,238);
    display: flex;
    justify-content: center;
    align-items: center;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 4px;
      margin: 0 auto;
      background-color: rgb(48, 245, 196);;
    }
  }
  .footer-content {
    margin-top: 15px;
    width: 1200px;
    display: flex;
    flex-direction: row;
    color: rgba(255, 255, 255, 0.8);
    a {
      text-decoration: none;
      color: inherit;
    }
    .footer-content-column {
      margin-top:10px;
      margin-right: 50px;
      width: 30%;
      display: flex;
      flex-direction: column;
      align-items: center;
      >div {
        text-indent: 2em;
      }
      &:nth-last-of-type(1) {
        flex-grow: 1;
        align-items: center;
        h1{
          display: flex;
          justify-content: center;
        }
        >div {
          text-indent: 0;
        }
      }
      &:nth-last-of-type(2) {
        // flex-grow: 1;
        // align-items: flex-start;
        >div {
          margin-top:20px;
          text-indent: 0;
          h4{
            margin-top:10px;
          }
        }
      }
    }
  }
}
</style>
