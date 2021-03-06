/**
 * Created by finch on 6/30/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchAuditList} from '../actions/audit';
import './css/unauditlist.css';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class UnAuditList extends Component {
  static propTypes = {
    fetchAuditList: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchAuditList({authenticated: false});
  }

  renderRows() {
    if (this.props.allianceList) {
      return this.props.allianceList.map((item, index) => {
        return (
          <tr key={index} style={{height: '80px', borderColor: '#d9d9d9'}}>
            <td style={{textAlign: 'center'}}>{`${item.company}公司提交了入盟申请`}</td>
            <td>{item.applydate}</td>
            <td><Link to={`${this.props.match.url}/user/${item.id}`}>查看</Link></td>
          </tr>
        )
      })
    }
  }

  render() {
    let {allianceList} = this.props;


    console.log(allianceList);
    return (
      <div className="table-content">
        <table className="table">
          <tbody>
          {this.renderRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    allianceList: state.alliance.not_alliance_list
  }
}

export default connect(mapStateToProps, {fetchAuditList})(UnAuditList);