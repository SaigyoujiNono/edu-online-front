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
  MenuItem
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
  MenuItem
];

const Element = {
  install (Vue) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}
Vue.use(Element,{locale})
