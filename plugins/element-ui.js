import Vue from 'vue'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import {
  Aside,
  Button,
  Carousel,
  CarouselItem,
  Container,
  Empty,
  Form,
  FormItem,
  Footer,
  Header,
  Input,
  Main,
  Menu,
  MenuItem,
  Notification,
  Pagination
} from 'element-ui'

const components = [
  Aside,
  Button,
  Carousel,
  CarouselItem,
  Container,
  Empty,
  Form,
  FormItem,
  Footer,
  Header,
  Input,
  Main,
  Menu,
  MenuItem,
  Notification,
  Pagination
];

const Element = {
  install (Vue) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
    Vue.prototype.$notify = Notification
  }
}
Vue.use(Element,{locale})
