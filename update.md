非兼容性更新
综合
移除 theme-default

最低兼容 Vue 2.5.2 和 IE 10

表单组件的 change 事件和 Pagination 的 current-change 事件现在仅响应用户交互

Button 和表单组件的 size 属性不再接受 large 值，可接受 medium、small 和 mini

为了方便使用第三方图标，Button 的 icon 属性、Input 的 prefix-icon 和 suffix-icon 属性、Steps 的 icon 属性现在需要传入完整的图标类名

Dialog
移除 size 属性。现在 Dialog 的尺寸由 width 和 fullscreen 控制
移除通过 v-model 控制 Dialog 显示和隐藏的功能

Rate
text-template 属性更名为 score-template

Dropdown
menu-align 属性变更为 placement，增加更多方位属性

Transfer
footer-format 属性更名为 format

Switch
由于 on-* 属性在 JSX 中会被识别为事件，导致 Switch 所有 on-* 属性在 JSX 中无法正常工作，所以 on-* 属性更名为 active-*，对应地，off-* 属性更名为 inactive-*。受到影响的属性有：on-icon-class、off-icon-class、on-text、off-text、on-color、off-color、on-value、off-value
active-text 和 inactive-text 属性不再有默认值

Tag
type 属性现在支持 success、info、warning 和 danger 四个值

Menu
移除 theme 属性。现在通过 background-color、text-color 和 active-text-color 属性进行颜色的自定义

Input
移除 icon 属性。现在通过 suffix-icon 属性或者 suffix 具名 slot 来加入尾部图标
移除 on-icon-click 属性和 click 事件。现在如果需要为输入框中的图标添加点击事件，请以具名 slot 的方式添加图标
change 事件现在仅在输入框失去焦点或用户按下回车时触发，与原生 input 元素一致。如果需要实时响应用户的输入，可以使用 input 事件

Autocomplete
移除 custom-item 属性。现在通过 scoped slot 自定义输入建议列表项的内容
移除 props 属性，现在使用 value-key 属性指定输入建议对象中用于显示的键名

Steps
移除 center 属性
现在步骤条将默认充满父容器

DatePicker
change 事件参数现在为组件的绑定值，格式由 value-format 控制

Table
移除通过 inline-template 自定义列模板的功能
sort-method 现在和 Array.sort 保持一致的逻辑，要求返回一个数字
将 append slot 移至 tbody 元素以外，以保证其只被渲染一次
expand 事件更名为 expand-change，以保证 API 的命名一致性
row-class-name 和 row-style 的函数参数改为对象，以保证 API 的一致性
* 在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 XSS 攻击。因此请在 dangerouslyUseHTMLString 打开的情况下，确保 message 的内容是可信的，永远不要将用户提交的内容赋值给 message 属性。
