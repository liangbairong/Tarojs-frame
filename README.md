# Tarojs-frame
tarojs的多端框架 主要是微信小程序使用了ts语法  
# 目录结构：  
> config：配置   
>>dev.js：测试环境配置  
>> prod.js：生产环境配置  
>> index.js：主要配置  
src：开发目录  
    api：接口目录   
    assets：静态文件目录  
    components：组件目录  
    pages：页面  
    uilts：工具类  
    store：全局状态管理（这里使用了mobx)  
dist：生成代码目录  
  
# 安装依赖  
    npm i  

# 开发  
   测试环境 npm run dev:weapp:test  
   生产环境 npm run dev:weapp:pro  
# 打包  
    npm run build:weapp  
    
