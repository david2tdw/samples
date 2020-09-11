创建toast-component组件。

执行：
```
npm run build
npm pack
```

发布：
```
npm publish
npm login
```

[年轻人如何从0到1封装发布一个vue组件](https://juejin.im/post/6867798692460494861?utm_source=gold_browser_extension#comment)


```import Toast from './Toast.vue'```  
import 对文件名大小写不敏感。(由于windows和mac对文件大小写不敏感，无法在同一目录下创建同名文件，eg: HelloWorld.vue and helloworld.vue)