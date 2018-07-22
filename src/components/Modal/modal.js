import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames'
// import modalManager from'./../ResponsiveModal/modal-manager'
import './style.css';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPortal: props.open,
    };
    this.shouldClose = null;
  }

  static getDerivedStateFromProps(nextProps, prevState) { 
    // 之前showPortal为false, 现在open为true的话
    if (!prevState.showPortal && nextProps.open) {
      return {
        showPortal: true,
      };
    }
    return {
      showPortal: false,
    };
  }

  componentDidMount() {
    // 当初始化是开启的时候, 那么给modal绑定事件
    if (this.props.open) {
      this.handleOpen();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.showPortal && !this.state.showPortal) {
      // 取消esc监听函数
      this.handleClose();
    } else if (!prevProps.open && this.props.open) {
      // 添加esc监听函数
      this.handleOpen();
    }
  }

  componentWillUnmount() {
    // 在组件卸载的时候, 干掉绑定的事件
    if (this.props.open) {
      this.handleClose();
    }
  }

  handleOpen = () => {
    // 在modal打开的时候, 做一些事情
    document.addEventListener('keydown', this.handleKeydown);
  };

  handleClose = () => {
    // 在modal关闭的时候, 做一些事情
    document.removeEventListener('keydown', this.handleKeydown);
  };

  handleKeydown = event => {
    const { onEscKeyDown, closeOnEsc, onClose} = this.props;
    // ESC 键盘事件监听 不是27键值的话, 直接return
    if (event.keyCode !== 27) {
      return;
    }

    if (onEscKeyDown) {
      onEscKeyDown(event);
    }

    if (closeOnEsc) {
      onClose(event);
    }
  };


  handleClickOverlay = (event)=> {

    // 点击遮罩层是否关闭
    if (this.shouldClose === null) {
      this.shouldClose = true;
    }

    if (!this.shouldClose) {
      this.shouldClose = null;
      return;
    }

    const { onOverlayClick, closeOnOverlayClick, onClose} = this.props;
    // 点击overlay 调用props的回调方法
    if (onOverlayClick) {
      onOverlayClick(event);
    }

    if (closeOnOverlayClick) { // 默认值给的是true
      onClose(event);
    }

    this.shouldClose = null;
  }

  handleModalEvent = () => {
    this.shouldClose = false;
  }

  // 点击取消按钮关闭的modal事件
  handleClickClose = event => {
    const { onClose } = this.props;
    if (onClose) {
      onClose(event);
    }
  }

  // 点击确定关闭modal
  handleClickOk = event => {
    const { onOk } = this.props;
    if (onOk) {
      onOk(event);
    }
  }

  render() {
    
    const {

      center,
      maskStyle,
      // modal层样式
      style,

      // header
      title,
      closable, // 是否显示右上角关闭按钮

      // 确定按钮文字
      okText,
      // 取消按钮文字
      cancelText,

      // 宽高
      width,

      // 底部自定制
      footer,

      // 默认 destroyOnClose 需要实现关闭的时候仍然保留之前的数据

    } = this.props;

    let modalFooter = (
      <div className="footer">
        <button className="footer-close-button" onClick={this.handleClickClose}>{cancelText}</button>
        <button className="footer-ok-button" onClick={this.handleClickOk}>{okText}</button>
      </div>
    );

    if (footer === null) {
      modalFooter = null;
    }
    const { showPortal } = this.state;

    // 如果不展示, return null即可
    if (!showPortal) {
      return null;
    }
    return (
        <div
          onClick={this.handleClickOverlay}
          className={classnames(
            "overlay",
            center ? "overlay-center" : null,
          )}
          style={maskStyle}
        >
          <div
            className="modal"
            onClick={this.handleModalEvent}
            style={{ width: `${width}px`, ...style}}
          >
            <div className="header">
              { title ?
                (<span className="header-title">{title}</span>) : null
              }

              { closable ? 
                null : (<span className="header-close-button" onClick={this.handleClickClose}>X</span>)
              }
              
            </div>
            <div className="content">
              {this.props.children}
            </div>
            {modalFooter}
          </div>
        </div>
    )
  }
}

Modal.propTypes = {

  width: PropTypes.number,
  /**
   * 点击ESC键盘的时候 是否关闭modal层面
   */
  closeOnEsc: PropTypes.bool,

  /**
   * 点击覆盖层的时候, 是否关闭modal
   */
  closeOnOverlayClick: PropTypes.bool,

  /**
   * modal关闭的时候的回调方法
   */
  onClose: PropTypes.func.isRequired,
  /**
   * ESC 按键被按下的时候的回调方法
   */
  onEscKeyDown: PropTypes.func,

  /**
   * OverLay被点击的时候的回调方法
   */
  onOverlayClick: PropTypes.func,
  /**
   * 控制modal 的显示与隐藏状态
   */
  open: PropTypes.bool.isRequired,
  
  /**
   * Content组件中的内容
   */
  children: PropTypes.node,

  /*
   * modal挂载的位置
  */
  container: PropTypes.object, // eslint-disable-line

  /**
   * modal是否居中显示
   */
  center: PropTypes.bool,

  /*
   * 遮罩层的样式
   */
  maskStyle: PropTypes.object,

  /**
   * modal样式设置
   */
  style: PropTypes.object,

  /**
   * 这是modal的zIndex
   */
  zIndex: PropTypes.number,
};

Modal.defaultProps = {
  closeOnEsc: true,
  closeOnOverlayClick: true,
  onEntered: null,
  onExited: null,
  onEscKeyDown: null,
  onOverlayClick: null,
  showCloseIcon: true,
  children: null,
  center: false,
  width: 600,

  maskStyle: {},
  style: {},
  zIndex: 1000
};

export default Modal;