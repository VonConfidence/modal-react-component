# Modal对话框

模态对话框。

## 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 `Modal` 在当前页面正中打开一个浮层，承载相应的操作。 

## API代码演示

```jsx
import React, { Component } from 'react';
import Modal from '$components/Modal'

class App extends Component {

  state = {
    visible: false,
  }

  handleModalVisible = ()=> {
    this.setState({
      visible:true,
    })
  }

  handleModalClose = (event)=> {
    this.setState({
      visible: false,
    })
  }

  handleModalOk = (event) => {
    console.log('ok ',event)
    this.setState({
      visible: false,
    })
  }

  render() {
    const { visible } = this.state;
    return (
      <div className="modal-demo">
        <button onClick={this.handleModalVisible}>显示/隐藏</button>
        <Modal
          // title="modal标题"
          title={[<div key="cancelSign">modal标题</div>]}
          // 控制modal的显示与隐藏
          open={this.state.visible}
          // 点击ok事件 
          onOk={this.handleModalOk}
          // 点击cancenl事件
          onClose={this.handleModalClose}
          // ok按钮文本内容
          okText="确定"
          // cancel按钮文本
          cancelText="取消"

          // footer="Footer支持自定制"
          // footer={null}
          footer={[
              <button key="close" onClick={this.handleModalClose}>CLOSE</button>,
              <button key="ok" onClick={this.handleModalOk}>
                  OK
              </button>,
          ]}
          // 键盘事件esc取消
          closeOnEsc
          // 点击遮罩层是否取消遮罩层
          closeOnOverlayClick={false}
          // 支持宽度自定制
          // width={600}

          // 支持遮罩层样式定制
          maskStyle={{background: 'rgba(0,255,0,0.1)'}}
          // modal样式以及位置调整
          style={{background: 'green', color: 'white', top: '200px'}}

          // 点击遮罩层回调
          onOverlayClick={(event)=> {console.log('overlay click')}}
        >
            <h3>
                Modal内容区域
            </h3>
            <p>Imweb 很强大</p>
            <p>Imweb 很强大</p>
            <p>Imweb 很强大</p>
        </Modal>
      </div>
    );
  }
}

export default App;
```

## Modal

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | string\|ReactNode | - |
| footer | 底部内容，当不需要默认底部按钮时，可以设为 `footer={null}` | string\|ReactNode | 确定取消按钮 |
| closeOnEsc | 是否支持键盘esc关闭 | boolean | true |
| closeOnOverlayClick | 点击蒙层是否允许关闭 | boolean | true |
| maskStyle | 遮罩样式 | object | {} |
| okText | 确认按钮文字 | string | '确定' |
| cancelText | 取消按钮文字 | string | '取消 |
| onCancel | 点击遮罩层或右上角叉或取消按钮的回调 | function(e) | 无 |
| onOk | 点击确定回调 | function(e) | 无 |
| open | 对话框是否可见 | boolean | 无 |
| onOverlayClick | 点击遮罩层回调 | function(e) | 无 |
| style | 可用于设置浮层的样式，调整浮层位置等 | object | - |

#### 注意

> `<Modal />` 默认关闭后状态会自动清空数据, 这里暂不支持保存之前的数据状态, 后续会添加支持