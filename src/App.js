import React, { Component } from 'react';
import './App.css';

import Modal from './components/Modal'

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
      <div className="App">
        <button onClick={this.handleModalVisible}>显示/隐藏</button>
        <Modal 
          // center
          open={visible}
          onOk={this.handleModalOk}
          onClose={this.handleModalClose} 
          // title="取消报名"
          // title={[<div key="cancelSign">取消报名</div>]}
          title={(<div>title 取消报名</div>)}
          okText="确定"
          cancelText="取消"
          // footer="确定消息来源"
          // footer={[
          //   <button key="close" onClick={this.handleModalClose}>CLOSE</button>,
          //   <button key="ok" onClick={this.handleModalOk}>
          //     OK
          //   </button>,
          // ]}
          // footer={null}
          // footer={(<div>Hello</div>)}
          closeOnEsc
          closeOnOverlayClick={false}
          // width={600}
          // maskStyle={{background: 'rgba(0,122,0,0.5)'}}
          // style={{background: 'green', color: 'white', top: '200px'}}

          onOverlayClick={(event)=> {console.log('overlay click')}}
        >
          <h2>龙同学</h2>
          <p>
            你确认取消&lt;&lt;IMWEB雄鹰计划 - 新人培训&gt;&gt;课程的报名吗?
            {/* 你确认取消&lt;&lt;IMWEB雄鹰计划 - 新人培训&gt;&gt;课程的报名吗?
            你确认取消&lt;&lt;IMWEB雄鹰计划 - 新人培训&gt;&gt;课程的报名吗?
            你确认取消&lt;&lt;IMWEB雄鹰计划 - 新人培训&gt;&gt;课程的报名吗? */}
            {/* <input defaultValue="baoliushuju"/> */}
          </p>
        </Modal>
      </div>
    );
  }
}

export default App;
