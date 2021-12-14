import Vue from 'vue'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import {
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Menu,
  MenuItem,
  Button,
  Carousel,
  CarouselItem,
  Form,
  FormItem,
  Input
} from 'element-ui'

const components = [
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Menu,
  Carousel,
  CarouselItem,
  MenuItem,
  Button,
  Form,
  FormItem,
  Input
];

const Element = {
  install (Vue) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}
Vue.use(Element,{locale})
