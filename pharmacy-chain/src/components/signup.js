/**
 * Created by finch on 6/28/17.
 */
import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';

import {ROOT_URL} from '../actions/types';
import {signActionCreator, signUp, getCode, checkCode, downloadFile, getTypeList} from '../actions/signup';

var that;
import './css/signup.css';

class SignUp extends Component {
  constructor(props) {
    super(props);

    that = this;
    this.state = {
      index: 0,
      spin: false,
      isApplyFileDone: false,
      isImgFileDone: false,
      isIdFrontDone: false,
      isIdBackDone: false,
      isLicenseFileDone: false,
      isFormSubmit: false,
      isSignUpSuccess: false
    };

    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleApplyFile = this.handleApplyFile.bind(this);
    this.handleImgFile = this.handleImgFile.bind(this);
    this.handleIdFront = this.handleIdFront.bind(this);
    this.handleIdBack = this.handleIdBack.bind(this);
    this.handleLicenseFile = this.handleLicenseFile.bind(this);
  }

  renderField({input, label, type, meta: {touched, error}}) {
    return (
      <div className={`form-group has-feedback ${touched && error ? 'has-error' : ''}`}>
        <label className="col-sm-4 control-label"><strong>{label}</strong></label>
        <div className="col-sm-8">
          <input {...input} placeholder={label} type={type} className="form-control"/>
          <div className="help-block with-errors">{touched && error ? error : ''}</div>
        </div>
      </div>
    )
  }

  renderCodeField({input, label, type, meta: {touched, error}}) {
    return (
      <div className={`form-group has-feedback ${touched && error ? 'has-error' : ''}`}>
        <label className="col-sm-4 control-label"><strong>{label}</strong></label>
        <div className="col-sm-4">
          <input {...input} placeholder={label} type={type} className="form-control"/>
          <div className="help-block with-errors">{touched && error ? error : ''}</div>
        </div>
        <div className="col-sm-4">
          <img src={that.props.code ? `${that.props.code}` : ""} alt="code"/>
        </div>
      </div>
    )
  }

  handleApplyFile(e) {
    this.state.isApplyFileDone = true;
  }

  handleLicenseFile(e) {
    this.state.isLicenseFileDone = true;
  }

  handleIdFront(e) {
    this.state.isIdFrontDone = true;
  }

  handleIdBack(e) {
    this.state.isIdBackDone = true;
  }

  handleImgFile(e) {
    this.state.isImgFileDone = true;
  }

  nextPage() {
    let {index} = this.state;
    index++;
    if (index > 4) {
      index = 4;
    }

    this.setState({
      index
    })
  }

  prevPage() {
    let {index} = this.state;
    index--;

    if (index < 0) {
      index = 0;
    }

    this.setState({
      index
    })
  }

  handleSelect(e) {
    console.log(`signType : ${e.target.value}`);
    // TODO 1. 与服务器做验证码的判断
    // TODO 2. 是否点击下载了入盟申请书

    this.state.registertype = e.target.value;
  }


  handleFormSubmit({email, username, password, phone, company, person}) {
    if (email && username && password && phone && company && person) {
      console.log(`email: ${email}  username: ${username} password: ${password}  phone: ${phone}  company: ${company} person: ${person}`);
      let {isImgFileDone, isIdFrontDone, isLicenseFileDone, isApplyFileDone} = this.state;
      console.log(`isImgFileDone ${isImgFileDone}  isIdFrontDone: ${isIdFrontDone} isLicenseFileDone: ${isLicenseFileDone} isApplyFileDone: ${isApplyFileDone}`)
      let applyOFile = this.applyFileInput.files[0];
      let logoOFile = this.logoFileInput.files[0];
      let licenseOFile = this.licenseInput.files[0];
      let idFrontOFile = this.idFrontInput.files[0];
      let idBackOFile = this.idBackInput.files[0];
      let registertype = this.state.registertype;
      this.setState({spin: true});
      this.props.signUp({
        registertype,
        email,
        username,
        password,
        phone,
        company,
        person,
        applyOFile,
        logoOFile,
        licenseOFile,
        idFrontOFile,
        idBackOFile
      }, (err) => {
        this.setState({
          isFormSubmit: true,
          index: 3,
          spin: false
        })
      });

    }
  }


  componentWillMount() {
    // TODO 向服务器请求 1.注册类型 2. 验证码 3. 入盟申请表地址
    // this.props.getCode();
    // this.props.downloadFile();
    this.props.getTypeList();
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <div className="signup-main">
        <div className="signup-header container-fluid">
          <div className="row">
            <div className="col-sm-1-5">
              <div>
                <div className="row-header">
                  <div className="row-title">
                    <div className={`icon-circle ${this.state.index == 0 ? 'icon-circle-purple' : ''}`}>1
                    </div>
                    <span className="glyphicon glyphicon-arrow-right pull-right"></span>
                  </div>
                  <h4 className={`${this.state.index == 0 ? 'h4-purple' : ''}`}>申请入盟</h4>
                </div>
                <div className="divider"></div>
                <p>
                  下载入盟申请表
                </p>
                <p>
                  填写申请信息
                </p>
                <p>
                  提交申请信息
                </p>
              </div>
            </div>

            <div className="col-sm-1-5">
              <div className="row-header">
                <div className="row-title">
                  <div className={`icon-circle ${this.state.index == 1 ? 'icon-circle-purple' : ''}`}>2</div>
                  <span className="glyphicon glyphicon-arrow-right pull-right"></span>
                </div>
                <h4 className={`${this.state.index == 1 ? 'h4-purple' : ''}`}>设置账号密码</h4>
              </div>
              <div className="divider"></div>
              <p>
                下载入盟申请表
              </p>
              <p>
                填写申请信息
              </p>
              <p>
                提交申请信息
              </p>
            </div>

            <div className="col-sm-1-5">
              <div className="row-header">
                <div className="row-title">
                  <div className={`icon-circle ${this.state.index == 2 ? 'icon-circle-purple' : ''}`}>3</div>
                  <span className="glyphicon glyphicon-arrow-right pull-right"></span>
                </div>
                <h4 className={`${this.state.index == 2 ? 'h4-purple' : ''}`}>设置公司信息</h4>
              </div>
              <div className="divider"></div>
              <p>
                下载入盟申请表
              </p>
              <p>
                填写申请信息
              </p>
              <p>
                提交申请信息
              </p>
            </div>

            <div className="col-sm-1-5">
              <div className="row-header">
                <div className="row-title">
                  <div className={`icon-circle ${this.state.index == 3 ? 'icon-circle-purple' : ''}`}>4</div>
                  <span className="glyphicon glyphicon-arrow-right pull-right"></span>
                </div>
                <h4 className={`${this.state.index == 3 ? 'h4-purple' : ''}`}>等待审核</h4>
              </div>
              <div className="divider"></div>
              <p>
                下载入盟申请表
              </p>
              <p>
                填写申请信息
              </p>
              <p>
                提交申请信息
              </p>
            </div>

            <div className="col-sm-1-5">
              <div className="row-header">
                <div className="row-title">
                  <div className={`icon-circle ${this.state.index == 4 ? 'icon-circle-purple' : ''}`}>5</div>
                  <h4 className={`${this.state.index == 4 ? 'h4-purple' : ''}`}>成功注册</h4>
                </div>
              </div>
              <div className="divider"></div>
              <p>
                下载入盟申请表
              </p>
              <p>
                填写申请信息
              </p>
              <p>
                提交申请信息
              </p>
            </div>
          </div>
        </div>
        <div className="divider margin-b-15"></div>
        <div className="signup-content">
          <form className="form-horizontal" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            {/*  第一页  */}
            <div className={`sign-page0 ${this.state.index == 0 ? "show" : "hidden"}`}>

              <div className="row  margin-b-15 ">
                <label className="col-sm-4 control-label"><strong>下载入盟申请表</strong></label>
                <div className="col-sm-8">
                  <a className="btn btn-default"
                     href={`${ROOT_URL}/user/application`}
                     download="download">点击下载</a>
                </div>
              </div>

              <div className="row margin-b-15">
                <label className="col-sm-4 control-label"><strong>提交申请</strong></label>
                <div className="col-sm-8">
                  <input className="" type="file" onChange={this.handleApplyFile}
                         ref={(input) => this.applyFileInput = input}/>
                </div>
              </div>

              <div className="row margin-b-15">
                <label className="col-sm-4 control-label"><strong>注册类型</strong></label>
                <div className="col-sm-8">
                  <select className="form-control" name="company-type" onChange={this.handleSelect}>
                    {
                      this.props.types ? this.props.types.map((value, index) => (
                        <option value={`${value.code}`}>{value.name}</option>
                      )) : ""
                    }
                  </select>
                </div>
              </div>

              <Field name="email" component={this.renderField} type="email" label="注册邮箱"/>
              <Field name="idcode" component={this.renderCodeField} type="text" label="验证码"/>

              <div className="row">
                <div className="col-xs-4">
                </div>
                <div className="col-xs-8">
                  <button type="button" className="btn btn-primary btn-block btn-flat" onClick={this.nextPage}>
                    下一步
                  </button>
                </div>
              </div>
            </div>
            {/*  第一页  */}

            {/*  第二页  */}
            <div className={`sign-page1 ${this.state.index == 1 ? "show" : "hidden"}`}>
              <Field name="username" component={this.renderField} type="text" label="用户名"/>
              <Field name="password" component={this.renderField} type="password" label="密码"/>
              <Field name="repeatpassword" component={this.renderField} type="password" label="重新输入密码"/>
              <Field name="phone" component={this.renderField} type="number" label="联系电话"/>

              <div className="row margin-b-15">
                <label className="col-sm-4 control-label"><strong>上传LOGO</strong></label>
                <div className="col-sm-8">
                  <input className="" type="file" onChange={this.handleImgFile}
                         ref={(input) => this.logoFileInput = input}/>
                </div>
              </div>

              <div className="row">
                <div className="col-xs-6">
                  <button type="button" className="btn btn-primary btn-block btn-flat" onClick={this.prevPage}>
                    上一步
                  </button>
                </div>
                <div className="col-xs-6">
                  <button type="button" className="btn btn-primary btn-block btn-flat" onClick={this.nextPage}>
                    下一步
                  </button>
                </div>
              </div>
            </div>
            {/*  第二页  */}

            {/*  第三页  */}
            <div className={`sign-page2 ${this.state.index == 2 ? "show" : "hidden"}`}>
              <Field name="company" component={this.renderField} type="text" label="公司名称"/>
              <div className="row margin-b-15">
                <label className="col-sm-4 control-label"><strong>上传营业执照</strong></label>
                <div className="col-sm-8">
                  <input className="" type="file" accept="image/png,image/gif"
                         onChange={this.handleLicenseFile} ref={(input) => this.licenseInput = input}/>
                </div>
              </div>

              <Field name="person" component={this.renderField} type="text" label="法人姓名"/>

              <div className="row margin-b-15">
                <label className="col-sm-4 control-label"><strong>上传正反身份证</strong></label>
                <div className="col-sm-4">
                  <input className="" type="file" accept="image/png,image/gif"
                         onChange={this.handleIdFront} ref={(input) => this.idFrontInput = input}/>
                </div>
                <div className="col-sm-4">
                  <input className="" type="file" accept="image/png,image/gif"
                         onChange={this.handleIdBack} ref={(input) => this.idBackInput = input}/>
                </div>
              </div>

              <div className="row">
                <div className="col-xs-6">
                  <button type="button" className="btn btn-primary btn-block btn-flat" onClick={this.prevPage}>
                    上一步
                  </button>
                </div>
                <div className="col-xs-6">
                  <button type="submit" className="btn btn-primary btn-block btn-flat">
                    <i className={`fa fa-spinner fa-spin ${this.state.spin ? '' : 'hidden'}`}></i>提交申请
                  </button>
                </div>
              </div>
            </div>
            {/*  第三页  */}
          </form>

          <div className={`${this.state.isFormSubmit ? "show margin-t-88" : "hidden"} `}>
            <div className="signup-page3 row">
              <div className="icon-center">
                <span>!</span>
              </div>
              <h4 className="margin-b-15"><strong>审核提示</strong></h4>
              <p className="center-block">3个工作日发送审核结果至注册邮箱</p>
              <p className="center-block">如果未通过审核，请与15个工作日完成修改并提交。逾期未提交，申请失效</p>
            </div>
          </div>

          <div className={`${this.state.isSignUpSuccess ? "show margin-t-88" : "hidden"}`}>
            <div className="signup-page4 row">
              <div className="icon-center">
                <span className="glyphicon glyphicon-ok"></span>
              </div>

              <h4 className="center-block margin-b-15"><strong>恭喜你注册成功！</strong></h4>
              <p className="center-block">五秒后跳转到登录页面</p>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = '注册邮箱不能为空';
  }

  if (!values.idcode) {
    errors.idcode = '验证码不能为空';
  }

  if (!values.company) {
    errors.company = '公司名称不能为空';
  }

  if (!values.person) {
    errors.person = '法人姓名不能为空';
  }

  if (!values.username) {
    errors.username = '用户名不能为空';
  }

  if (!values.password) {
    errors.password = '密码不能为空';
  }

  if (!values.repeatpassword) {
    errors.repeatpassword = "重复密码不能为空"
  }

  if (values.repeatpassword !== values.password) {
    errors.repeatpassword = "两次输入密码不一致"
  }

  if (!values.phone) {
    errors.phone = "联系方式不能为空"
  }

  return errors;
};

const reduxPageForm = reduxForm({
  form: 'signup-form',
  validate
})(SignUp);

function mapStateToProps(state) {
  return {
    index: state.sign.index,
    types: state.sign.types
  }
}

export default connect(mapStateToProps, {signActionCreator, getTypeList, signUp})(reduxPageForm);


